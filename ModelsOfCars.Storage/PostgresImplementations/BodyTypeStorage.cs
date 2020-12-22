using ModelsOfCars.Contracts;
using ModelsOfCars.Storage.Interfaces;
using System;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class BodyTypeStorage : IBodyTypeStorage
    {
        private readonly DbConnection _dbConnection;

        public BodyTypeStorage(DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public Task<Car> GetAllAsync(Paging paging)
        {
            throw new NotImplementedException();
        }
    }
}
