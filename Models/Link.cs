using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Smidge.Models
{
    public class Link
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }


        public ICollection<Category> Categories { get; set; }

        public Link()
        {
            Categories = new List<Category>();
            Title = string.Empty;
            Description = string.Empty;
        }

        public Link(string title, string description, ICollection<Category> categories)
        {
            Categories = categories;
            Title = title;
            Description = description;
        }

        public override string ToString()
        {
            return $"Title: {Title}, Description: {Description}, Categories: {Categories}";
        }

    }
}