using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using ModelsOfCars.Contracts.Configuration;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using ModelsOfCars.Storage.Interfaces;
using ModelsOfCars.Storage.PostgresImplementations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

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
            services.AddControllers().AddNewtonsoftJson();

            services.AddSingleton(Configuration);

            services.AddTransient<IDbConnectionConfig>(_ => Configuration.GetSection("DbConnection").Get<DbConnectionConfig>());
            services.AddTransient<IFirstStart>(_ => Configuration.GetSection(FirstStart.Section).Get<FirstStart>());

            services.AddSingleton(typeof(IStorageInit), typeof(StorageInit));
            services.AddSingleton(typeof(ICarStorage), typeof(CarStorage));
            services.AddSingleton(typeof(IBodyTypeStorage), typeof(BodyTypeStorage));
            services.AddSingleton(typeof(IBrandStorage), typeof(BrandStorage));

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ModelOfCars API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ModelOfCars API V1");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
