using ModelsOfCars.Contracts;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.Interfaces
{
    public interface ICarStorage
    {
        Task<Car> GetAllAsync(Paging paging);

    }
}
