using Smidge.Models;

namespace Smidge.Interfaces
{
    public interface IResourceRepository
    {
        ICollection<Resource> GetAllResources();
    }
}
