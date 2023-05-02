namespace Smidge.Models
{
    public class Link
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }


        public string Summary { get; set; }

        public ICollection<LinkCategory> Categories { get; set; }

        public Link()
        {
            Categories = new List<LinkCategory>();
            Title = string.Empty;
            Description = string.Empty;
            Summary = string.Empty;
        }

        public Link(string title, string description, string summary, ICollection<LinkCategory> categories)
        {
            Categories = categories;
            Title = title;
            Description = description;
            Summary = summary;
        }

        public override string ToString()
        {
            return $"Title: {Title}, Description: {Description}, Summary: {Summary}";
        }

    }
}