using Microsoft.Extensions.Configuration;
using ModelsOfCars.Contracts;
using ModelsOfCars.Storage.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class CarStorage : ICarStorage
    {
        private readonly DbConnection _dbConnection;

        public CarStorage(DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }
        public Task<Car> GetAllAsync(Paging paging)
        {
            throw new NotImplementedException();
        }
    }
}
