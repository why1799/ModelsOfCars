using Microsoft.Extensions.DependencyInjection;

namespace ModelsOfCars.Tests.Helper
{
    public static class InitHelper
    {
        public static ServiceProvider GetServiceCollection()
        {
            var startUp = new Startup();

            var services = new ServiceCollection();
            startUp.ConfigureServices(services);

            return services.BuildServiceProvider();
        }

    }
}
