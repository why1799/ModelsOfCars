using ModelsOfCars.Contracts;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.Interfaces
{
    public interface IBodyTypeStorage
    {
        Task<Car> GetAllAsync(Paging paging);
    }
}
