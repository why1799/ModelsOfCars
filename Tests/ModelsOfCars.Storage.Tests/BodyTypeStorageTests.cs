using Microsoft.Extensions.DependencyInjection;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Tests.Helper;
using ModelsOfCars.Tests.Helper.Attributes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ModelsOfCars.Storage.Tests
{
    public class BodyTypeStorageTests
    {
        private readonly IBodyTypeStorage _bodyTypeStorage;
        public BodyTypeStorageTests()
        {
            _bodyTypeStorage = InitHelper.GetServiceCollection().GetRequiredService<IBodyTypeStorage>();
        }

        [FactRunnableInDebugOnly]
        public async Task GetAllAsyncTest()
        {
            var expected = 5;

            var actual = await _bodyTypeStorage.GetAllAsync();

            Assert.Equal(expected, actual.Count);
        }
    }
}
