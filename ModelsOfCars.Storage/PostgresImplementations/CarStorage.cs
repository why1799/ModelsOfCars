using Microsoft.Extensions.Configuration;
using ModelsOfCars.Contracts;
using ModelsOfCars.Contracts.Configuration;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Text;
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

        public Task<bool> CheckOnExist(Car car)
        {
            throw new NotImplementedException();
        }

        public Task<Car> Create(Car car)
        {
            throw new NotImplementedException();
        }

        public Task<Guid> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<Car>> GetAllAsync(Paging paging)
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM cars;";

            var cars = new List<Car>();

            using NpgsqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    cars.Add(new Car
                    {
                        Id = new Guid(reader.GetValue(0).ToString()),
                       
                    });
                }
            }

            await reader.CloseAsync().ConfigureAwait(false);
            await connection.CloseAsync().ConfigureAwait(false);

            return cars;
        }

        public Task<Car> GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Car> Update(Car car)
        {
            throw new NotImplementedException();
        }
    }
}
