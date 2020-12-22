using System.Threading.Tasks;

namespace ModelsOfCars.Contracts.Configuration.Interfaces
{
    public interface IFirstStart
    {
        bool InitDataBase { get; set; }
        Task UpdateAppsettingsAsync();  
    }
}