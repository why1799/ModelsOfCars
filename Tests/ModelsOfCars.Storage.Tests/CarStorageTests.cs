using Microsoft.Extensions.DependencyInjection;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Storage.PostgresImplementations;
using ModelsOfCars.Tests.Helper;
using ModelsOfCars.Tests.Helper.Attributes;
using System;
using Xunit;

namespace ModelsOfCars.Storage.Tests
{
    public class CarStorageTests
    {
        private readonly ICarStorage _carStorage;
        public CarStorageTests()
        {
            _carStorage = InitHelper.GetServiceCollection().GetRequiredService<ICarStorage>();
        }

        //[Fact]
        [FactRunnableInDebugOnly]
        public void InitTest()
        {

        }
    }
}
