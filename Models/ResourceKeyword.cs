namespace Smidge.Models
{
    public class ResourceKeyword
    {
        public int ResourceId { get; set; }
        public Resource Resource { get; set; } = null!;
        public int KeywordId { get; set; }
        public Keyword Keyword { get; set; } = null!;


    }
}
