using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Smidge.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ResourceCategory> ResourceCategories { get; set; }

        public Category()
        {
            Name = string.Empty;
            ResourceCategories = new List<ResourceCategory>();
        }

        public Category(string name)
        {
            Name = name;
            ResourceCategories = new List<ResourceCategory>();
        }

        public Category(int id, string name)
        {
            Id = id;
            Name = name;
            ResourceCategories = new List<ResourceCategory>();
        }


    }
}
