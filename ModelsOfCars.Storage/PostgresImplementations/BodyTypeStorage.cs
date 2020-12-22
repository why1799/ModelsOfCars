using ModelsOfCars.Contracts;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class BodyTypeStorage : CommonStorage, IBodyTypeStorage
    {
        private readonly IDbConnectionConfig _dbConnection;

        public BodyTypeStorage(IDbConnectionConfig dbConnection, IStorageInit storageInit) : base(storageInit)
        {
            _dbConnection = dbConnection;
            BeginInitDataBase().Wait();
        }

        public async Task<IList<BodyType>> GetAllAsync()
        {
            using var connection = new NpgsqlConnection(_dbConnection.ToString());

            await connection.OpenAsync().ConfigureAwait(false);

            using var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM brands;";

            var bodyType = new List<BodyType>();

            using NpgsqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows) 
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    bodyType.Add(new BodyType
                    {
                        Id = new Guid(reader.GetValue(0).ToString()),
                        Name = reader.GetValue(1).ToString()
                    });
                }
            }

            await reader.CloseAsync().ConfigureAwait(false);
            await connection.CloseAsync().ConfigureAwait(false);

            return bodyType;
        }
    }
}
