using System.Threading.Tasks;

namespace ModelsOfCars.Storage.Interfaces
{
    public interface IStorageInit
    {
        Task BeginInitAsync();
    }
}
