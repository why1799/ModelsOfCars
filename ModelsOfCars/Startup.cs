using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelsOfCars.Contracts.Configuration;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Storage.PostgresImplementations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ModelsOfCars
{
    public class Startup
    {
        public IConfiguration Configuration;
        public Startup()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

#if DEBUG
            builder.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);
#endif

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSingleton(Configuration);

            services.AddTransient<IDbConnectionConfig>(_ => Configuration.GetSection("DbConnection").Get<DbConnectionConfig>());
            services.AddTransient<IFirstStart>(_ => Configuration.GetSection(FirstStart.Section).Get<FirstStart>());

            services.AddSingleton(typeof(IStorageInit), typeof(StorageInit));
            services.AddSingleton(typeof(ICarStorage), typeof(CarStorage));
            services.AddSingleton(typeof(IBodyTypeStorage), typeof(BodyTypeStorage));
            services.AddSingleton(typeof(IBrandStorage), typeof(BrandStorage));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
