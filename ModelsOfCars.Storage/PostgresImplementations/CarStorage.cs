using Microsoft.Extensions.Logging;
using ModelsOfCars.Contracts;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class CarStorage : CommonStorage, ICarStorage
    {
        private readonly IDbConnectionConfig _dbConnection;
        private readonly ILogger<CarStorage> _logger;

        public CarStorage(ILogger<CarStorage> logger, IDbConnectionConfig dbConnection, IStorageInit storageInit) : base(storageInit)
        {
            _dbConnection = dbConnection;
            _logger = logger;
            BeginInitDataBase().Wait();
        }

        #region CREATE

        public async Task<Guid> Create(Car car)
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            car.Id = Guid.NewGuid();

            string base64 = null;
            if (car.PhotoBase64 != null)
            {
                base64 = car.PhotoBase64[(car.PhotoBase64.IndexOf("base64,") + 7)..];
            }

            using var command = connection.CreateCommand();
            command.CommandText = @$"
INSERT INTO cars (id, brand_id, model, body_type_id, seats_count, photo" + (string.IsNullOrEmpty(car.Url) ? "" : ", url") + @$") 
VALUES('{car.Id}', '{car.BrandId}', '{car.Model}', '{car.BodyTypeId}', {car.SeatsCount}, decode('{base64}', 'base64')" + (string.IsNullOrEmpty(car.Url) ? "" : $", '{car.Url}'") + ");";

            await command.ExecuteNonQueryAsync().ConfigureAwait(false);

            var carFromDb = await GetCarBrandAndModelAsync(command, car.Id).ConfigureAwait(false);

            if (carFromDb == null)
            {
                throw new ArgumentException("Такой машины в базе не существует.");
            }

            _logger.LogInformation($"Добавление Brand: '{carFromDb.BrandName}', Model: '{carFromDb.Model}'");

            return carFromDb.Id;
        }

        #endregion

        #region READ

        public async Task<IList<Car>> GetAllAsync(Paging paging)
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();
            command.CommandText = @$"SELECT cars.id, cars.brand_id, brands.name as brand_name, cars.model, cars.creation_date, cars.body_type_id, body_types.name as body_type_name, cars.seats_count, cars.url
FROM cars
LEFT JOIN brands on cars.brand_id = brands.id
LEFT JOIN body_types on cars.body_type_id = body_types.id
ORDER BY cars.creation_date DESC 
OFFSET {paging.Size * paging.Current}
LIMIT  {paging.Size}";

            var cars = new List<Car>();

            using NpgsqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    cars.Add(new Car
                    {
                        Id = new Guid(reader.GetValue(0).ToString()),
                        BrandId = new Guid(reader.GetValue(1).ToString()),
                        BrandName = reader.GetValue(2).ToString(),
                        Model = reader.GetValue(3).ToString(),
                        CreationDate = DateTimeOffset.Parse(reader.GetValue(4).ToString()),
                        BodyTypeId = new Guid(reader.GetValue(5).ToString()),
                        BodyTypeName = reader.GetValue(6).ToString(),
                        SeatsCount = uint.Parse(reader.GetValue(7).ToString()),
                        Url = reader.GetValue(8).ToString(),

                    });
                }
            }

            return cars;
        }

        public async Task<uint> GetCount()
        {
            uint count = 0;

            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();
            command.CommandText = "SELECT COUNT(*) FROM cars;";

            using NpgsqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    count = uint.Parse(reader.GetValue(0).ToString());
                }
            }

            await reader.CloseAsync().ConfigureAwait(false);
            await connection.CloseAsync().ConfigureAwait(false);

            return count;
        }

        public async Task<Car> GetById(Guid id)
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();
            command.CommandText = $@"SELECT cars.id, cars.brand_id, brands.name as brand_name, cars.model, cars.creation_date, cars.body_type_id, body_types.name as body_type_name, cars.seats_count, cars.url, encode(cars.photo, 'base64')
FROM cars
LEFT JOIN brands on cars.brand_id = brands.id
LEFT JOIN body_types on cars.body_type_id = body_types.id
WHERE cars.id = '{id}';";

            Car car = null;

            using NpgsqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    car = new Car
                    {
                        Id = new Guid(reader.GetValue(0).ToString()),
                        BrandId = new Guid(reader.GetValue(1).ToString()),
                        BrandName = reader.GetValue(2).ToString(),
                        Model = reader.GetValue(3).ToString(),
                        CreationDate = DateTimeOffset.Parse(reader.GetValue(4).ToString()),
                        BodyTypeId = new Guid(reader.GetValue(5).ToString()),
                        BodyTypeName = reader.GetValue(6).ToString(),
                        SeatsCount = uint.Parse(reader.GetValue(7).ToString()),
                        Url = reader.GetValue(8).ToString(),
                        PhotoBase64 = reader.GetValue(9).ToString()
                    };
                }
            }
            
            if(!string.IsNullOrEmpty(car?.PhotoBase64))
            {
                car.PhotoBase64 = $"data:image/jpeg;base64,{car.PhotoBase64}";
            }

            return car;
        }

        #endregion

        #region UPDATE

        public async Task<Guid> Update(Car car)
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            string base64 = null;
            if(!string.IsNullOrEmpty(car.PhotoBase64))
            {
                base64 = car.PhotoBase64[(car.PhotoBase64.IndexOf("base64,") + 7)..];
            }

            await connection.OpenAsync().ConfigureAwait(false);
            using var command = connection.CreateCommand();
            command.CommandText = @$"
UPDATE cars SET brand_id = '{car.BrandId}', model = '{car.Model}', body_type_id = '{car.BodyTypeId}', seats_count = {car.SeatsCount}, photo = decode('{base64}', 'base64'), url = " + (string.IsNullOrEmpty(car.Url) ? "NULL" : $"'{car.Url}'") + $@" 
WHERE id = '{car.Id}';";

            await command.ExecuteNonQueryAsync().ConfigureAwait(false);

            var carFromDb = await GetCarBrandAndModelAsync(command, car.Id).ConfigureAwait(false);

            if (carFromDb == null)
            {
                throw new ArgumentException("Такой машины в базе не существует.");
            }

            _logger.LogInformation($"Редактирование Brand: '{carFromDb.BrandName}', Model: '{carFromDb.Model}'");

            return carFromDb.Id;
        }

        #endregion

        #region DELETE

        public async Task<int> Delete(Guid id)
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();

            var car = await GetCarBrandAndModelAsync(command, id).ConfigureAwait(false);

            if (car == null)
            {
                throw new ArgumentException("Такой машины в базе не существует.");
            }

            command.CommandText = @$"
DELETE 
FROM cars
WHERE id = '{id}';";


            var rows = await command.ExecuteNonQueryAsync().ConfigureAwait(false);

            if (rows == 0)
            {
                throw new ArgumentException("Такой машины в базе не существует.");
            }

            _logger.LogInformation($"Удаление Brand: '{car.BrandName}', Model: '{car.Model}'");

            return rows;
        }


        #endregion

        #region CHECK ON EXISTS
        public async Task<bool> CheckOnExistWithTheSameParametrs(Car car)
        {
            var found = false;

            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();
            command.CommandText = @$"
SELECT COUNT(*)
FROM cars
WHERE id != '{car.Id}' AND brand_id = '{car.BrandId}' AND model = '{car.Model}' AND body_type_id = '{car.BodyTypeId}' AND seats_count = {car.SeatsCount};";

            using NpgsqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    found = int.Parse(reader.GetValue(0).ToString()) != 0;
                }
            }
            return found;
        }
        #endregion

        #region PRIVATE METHODS

        private async Task<Car> GetCarBrandAndModelAsync(NpgsqlCommand command, Guid id)
        {
            command.CommandText = @$"
SELECT cars.id, brands.name as brand_name, cars.model
FROM cars
LEFT JOIN brands on cars.brand_id = brands.id
WHERE cars.id = '{id}';";

            Car car = null;

            using (NpgsqlDataReader reader = command.ExecuteReader())
            {
                if (reader.HasRows)
                {
                    while (await reader.ReadAsync().ConfigureAwait(false))
                    {
                        car = new Car
                        {
                            Id = new Guid(reader.GetValue(0).ToString()),
                            BrandName = reader.GetValue(1).ToString(),
                            Model = reader.GetValue(2).ToString()
                        };
                    }
                }
            }

            return car;
        }

        #endregion
    }
}
