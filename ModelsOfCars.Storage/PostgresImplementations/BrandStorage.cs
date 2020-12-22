using ModelsOfCars.Contracts;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class BrandStorage : CommonStorage, IBrandStorage
    {
        private readonly IDbConnectionConfig _dbConnection;

        public BrandStorage(IDbConnectionConfig dbConnection, IStorageInit storageInit) : base(storageInit)
        {
            _dbConnection = dbConnection;
            BeginInitDataBase().Wait();
        }

        public async Task<IList<Brand>> GetAllAsync()
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM brands;";

            var brands = new List<Brand>();

            using NpgsqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    brands.Add(new Brand
                    {
                        Id = new Guid(reader.GetValue(0).ToString()),
                        Name = reader.GetValue(1).ToString()
                    });
                }
            }

            await reader.CloseAsync().ConfigureAwait(false);
            await connection.CloseAsync().ConfigureAwait(false);

            return brands;
        }
    }
}
