namespace Smidge.Models
{
    public class Keyword
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<ResourceKeyword> ResourceKeywords { get; set; } = new List<ResourceKeyword>();

        public Keyword()
        {
            Name = string.Empty;
            ResourceKeywords = new List<ResourceKeyword>();
        }

        public Keyword(string name)
        {
            Name = name;
            ResourceKeywords = new List<ResourceKeyword>();
        }
    }
}
