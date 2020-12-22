using Microsoft.Extensions.DependencyInjection;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Tests.Helper;
using ModelsOfCars.Tests.Helper.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace ModelsOfCars.Storage.Tests
{
    public class BodyTypeStorageTests
    {
        private readonly IBodyTypeStorage _carStorage;
        public BodyTypeStorageTests()
        {
            _carStorage = InitHelper.GetServiceCollection().GetRequiredService<IBodyTypeStorage>();
        }

        //[Fact]
        [FactRunnableInDebugOnly]
        public void InitTest()
        {

        }
    }
}
