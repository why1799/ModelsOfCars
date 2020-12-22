using Microsoft.Extensions.Configuration;
using ModelsOfCars.Contracts;
using ModelsOfCars.Contracts.Configuration;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
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
        }
        public Task<Car> GetAllAsync(Paging paging)
        {
            throw new NotImplementedException();
        }
    }
}
