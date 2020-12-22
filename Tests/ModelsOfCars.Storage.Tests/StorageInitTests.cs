using Microsoft.Extensions.DependencyInjection;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Tests.Helper;
using ModelsOfCars.Tests.Helper.Attributes;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.Tests
{
    public class StorageInitTests
    {
        private readonly IStorageInit _storageInit;
        public StorageInitTests()
        {
            _storageInit = InitHelper.GetServiceCollection().GetRequiredService<IStorageInit>();
        }

        [FactRunnableInDebugOnly]
        public async Task InitTest()
        {
            await _storageInit.BeginInitAsync();
        }
    }
}
