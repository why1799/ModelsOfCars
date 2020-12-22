using ModelsOfCars.Contracts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModelsOfCars.Storage.Interfaces
{
    public interface ICarStorage
    {
        Task<Car> GetById(Guid id);

        Task<IList<Car>> GetAllAsync(Paging paging);

        Task<Guid> Create(Car car);

        Task<Guid> Update(Car car);

        Task<int> Delete(Guid id);

        Task<bool> CheckOnExistWithTheSameParametrs(Car car);
        Task<uint> GetCount();
    }
}
