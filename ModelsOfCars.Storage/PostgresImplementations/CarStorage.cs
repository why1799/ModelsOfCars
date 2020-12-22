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

        public CarStorage(IDbConnectionConfig dbConnection, IStorageInit storageInit) : base(storageInit)
        {
            _dbConnection = dbConnection;
            BeginInitDataBase().Wait();
        }

        #region CREATE

        public async Task<Guid> Create(Car car)
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            car.Id = Guid.NewGuid();

            using var command = connection.CreateCommand();
            command.CommandText = @$"
INSERT INTO cars (id, brand_id, model, body_type_id, seats_count, url) 
VALUES('{car.Id}', '{car.BrandId}', '{car.Model}', '{car.BodyTypeId}', {car.SeatsCount}, '{car.Url}'); ";

            await command.ExecuteNonQueryAsync().ConfigureAwait(false);

            return car.Id;
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
            command.CommandText = $@"SELECT cars.id, cars.brand_id, brands.name as brand_name, cars.model, cars.creation_date, cars.body_type_id, body_types.name as body_type_name, cars.seats_count, cars.url, cars.base64_photo
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

            return car;
        }

        #endregion

        #region UPDATE

        public Task<Guid> Update(Car car)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region DELETE

        public Task<int> Delete(Guid id)
        {
            throw new NotImplementedException();
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
WHERE brand_id = '{car.BrandId}' AND model = '{car.Model}' AND body_type_id = '{car.BodyTypeId}' AND seats_count = {car.SeatsCount};";

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
    }
}
