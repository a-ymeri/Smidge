using Smidge.Data;
using Smidge.Interfaces;
using Smidge.Models;

namespace Smidge.Repositories
{
    public class ResourceRepository : IResourceRepository
    {
        private readonly DataContext _context;
        public ResourceRepository(DataContext context)
        {
            _context = context;
        }
        public ICollection<Resource> GetAllResources()
        {
            return _context.Resources.OrderBy(r => r.Id).ToList();
        }
    }
}
