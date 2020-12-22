using ModelsOfCars.Storage.Interfaces;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.PostgresImplementations
{
    public abstract class CommonStorage
    {
        private readonly IStorageInit _storageInit;

        protected CommonStorage(IStorageInit storageInit)
        {
            _storageInit = storageInit;
        }

        protected virtual Task BeginInitDataBase()
        {
            return _storageInit.BeginInitAsync();
        }
    }
}
