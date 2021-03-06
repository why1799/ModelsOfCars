﻿using Microsoft.Extensions.DependencyInjection;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Tests.Helper;
using ModelsOfCars.Tests.Helper.Attributes;
using System.Collections.Generic;
using System.Linq;
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
            var expected = new List<string> { "Седан", "Хэтчбек", "Универсал", "Минивэн", "Внедорожник", "Купе" };

            var actual = await _bodyTypeStorage.GetAllAsync();

            Assert.Equal(expected, actual.Select(x => x.Name));
        }
    }
}
