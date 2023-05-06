namespace Smidge.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Link> Links { get; set; } = new List<Link>();

        public Category()
        {
            Name = string.Empty;
        }

        public Category(string name)
        {
            Name = name;
        }

        public Category(int id, string name)
        {
            Id = id;
            Name = name;
        }


    }
}
