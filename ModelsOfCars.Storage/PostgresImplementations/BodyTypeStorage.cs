using ModelsOfCars.Contracts;
using ModelsOfCars.Contracts.Configuration;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using System;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class BodyTypeStorage : CommonStorage, IBodyTypeStorage
    {
        private readonly IDbConnectionConfig _dbConnection;

        public BodyTypeStorage(IDbConnectionConfig dbConnection, IStorageInit storageInit) : base(storageInit)
        {
            _dbConnection = dbConnection;
        }

        public Task<Car> GetAllAsync(Paging paging)
        {
            throw new NotImplementedException();
        }
    }
}
