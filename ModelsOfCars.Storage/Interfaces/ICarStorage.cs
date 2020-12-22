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

        Task<Car> Create(Car car);

        Task<Car> Update(Car car);

        Task<Guid> Delete(Guid id);

        Task<bool> CheckOnExist(Car car);
    }
}
