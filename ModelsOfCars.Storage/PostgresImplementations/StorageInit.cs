using ModelsOfCars.Contracts;
using ModelsOfCars.Storage.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public class StorageInit : IStorageInit
    {
        private readonly DbConnection _dbConnection;

        public StorageInit(DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public Task BeginInit()
        {
            throw new NotImplementedException();
        }
    }
}
