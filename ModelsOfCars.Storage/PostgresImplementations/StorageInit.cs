using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using Npgsql;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class StorageInit : IStorageInit
    {
        private readonly IDbConnectionConfig _dbConnection;
        private readonly IFirstStart _firstStart;

        public StorageInit(IDbConnectionConfig dbConnection, IFirstStart firstStart)
        {
            _dbConnection = dbConnection;
            _firstStart = firstStart;
        }

        public async Task BeginInitAsync()
        {
            if(_firstStart.InitDataBase)
            {
                using (var connection = new NpgsqlConnection(_dbConnection.ToString()))
                {
                    await connection.OpenAsync().ConfigureAwait(false);

                    using var command = connection.CreateCommand();
                   
                    command.CommandText = @"
                    DROP TABLE IF EXISTS cars;
                    DROP TABLE IF EXISTS brands;
                    DROP TABLE IF EXISTS body_types;

                    CREATE EXTENSION IF NOT EXISTS " + "\"uuid-ossp\"" + @";

                    CREATE TABLE brands(
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        Name VARCHAR NOT NULL
                    );

                    INSERT INTO brands(name) VALUES('Audi');
                    INSERT INTO brands(name) VALUES('Ford');
                    INSERT INTO brands(name) VALUES('Jeep');
                    INSERT INTO brands(name) VALUES('Nissan');
                    INSERT INTO brands(name) VALUES('Toyota');

                    CREATE TABLE body_types(
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        Name VARCHAR NOT NULL
                    );

                    INSERT INTO body_types(name) VALUES('Седан');
                    INSERT INTO body_types(name) VALUES('Хэтчбек');
                    INSERT INTO body_types(name) VALUES('Универсал');
                    INSERT INTO body_types(name) VALUES('Минивэн');
                    INSERT INTO body_types(name) VALUES('Внедорожник');
                    INSERT INTO body_types(name) VALUES('Купе');

                    CREATE TABLE cars(
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        brand_id UUID,
                        FOREIGN KEY(brand_id) REFERENCES brands(id),
                        model VARCHAR(1000) NOT NULL,
                        creation_date TIMESTAMP NOT NULL,
                        body_type_id UUID,
                        FOREIGN KEY(body_type_id) REFERENCES body_types(id),
                        base64_photo BYTEA,
                        seats_count int NOT NULL CHECK(seats_count >= 1 AND seats_count <= 12),
                        url VARCHAR(1000) NOT NULL
                    ); ";

                    await command.ExecuteNonQueryAsync().ConfigureAwait(false);
                    await connection.CloseAsync().ConfigureAwait(false);
                }

                await _firstStart.UpdateAppsettingsAsync();
                _firstStart.InitDataBase = false;
            }
        }
    }
}
