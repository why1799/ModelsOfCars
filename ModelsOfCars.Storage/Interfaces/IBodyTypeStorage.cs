using ModelsOfCars.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.Interfaces
{
    public interface IBodyTypeStorage
    {
        Task<IList<BodyType>> GetAllAsync();
    }
}
