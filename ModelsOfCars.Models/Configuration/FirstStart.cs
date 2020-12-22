using Microsoft.Extensions.Configuration;
using ModelsOfCars.Contracts.Configuration.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Threading.Tasks;

namespace ModelsOfCars.Contracts.Configuration
{
    public class FirstStart : IFirstStart
    {
        static public string Section = "FirstStart";

        public bool InitDataBase { get; set; }

        public async Task UpdateAppsettingsAsync()
        {
            var physicalPaths = new string[]{"appsettings.json", "appsettings.Development.json" };

            foreach (var physicalPath in physicalPaths)
            {
                var jObject = JsonConvert.DeserializeObject<JObject>(await File.ReadAllTextAsync(physicalPath).ConfigureAwait(false));
                var sectionObject = jObject.TryGetValue(Section, out JToken section) ? JsonConvert.DeserializeObject<FirstStart>(section.ToString()) : null;

                if(sectionObject == null)
                {
                    continue;
                }

                sectionObject.InitDataBase = false;

                jObject[Section] = JObject.Parse(JsonConvert.SerializeObject(sectionObject));
                await File.WriteAllTextAsync(physicalPath, JsonConvert.SerializeObject(jObject, Formatting.Indented)).ConfigureAwait(false);
            }
        }
    }
}
