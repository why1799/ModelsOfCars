using ModelsOfCars.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.Interfaces
{
    public interface IBrandStorage
    {
        Task<IList<Brand>> GetAllAsync();
    }
}
