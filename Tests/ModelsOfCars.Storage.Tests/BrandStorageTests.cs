using Microsoft.Extensions.DependencyInjection;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Tests.Helper;
using ModelsOfCars.Tests.Helper.Attributes;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace ModelsOfCars.Storage.Tests
{
    public class BrandStorageTests
    {
        private readonly IBrandStorage _brandStorage;
        public BrandStorageTests()
        {
            _brandStorage = InitHelper.GetServiceCollection().GetRequiredService<IBrandStorage>();
        }

        [FactRunnableInDebugOnly]
        public async Task GetAllAsyncTest()
        {
            var expected = new List<string> { "Audi", "Ford", "Jeep", "Nissan", "Toyota" };

            var actual = await _brandStorage.GetAllAsync();

            Assert.Equal(expected, actual.Select(x => x.Name));
        }
    }
}
