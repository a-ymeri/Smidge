namespace Smidge.DTO
{
    public class RequestResourceDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Categories { get; set; }
        public string Language { get; set; } = string.Empty;
        public string[] Keywords { get; set; }
        public string Origins { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string TargetAudience { get; set; } = string.Empty;
        public int Year { get; set; } = 0;
        public string SocialMedia { get; set; } = string.Empty;


        public RequestResourceDTO(string title, string description, string[] categories, string language, string[] keywords, string origins, string link, string targetAudience, int year, string socialMedia)
        {
            Title = title;
            Description = description;
            Categories = categories;
            Language = language;
            Keywords = keywords;
            Origins = origins;
            Link = link;
            TargetAudience = targetAudience;
            Year = year;
            SocialMedia = socialMedia;
        }

        public override string ToString()
        {
            return $"Name: {Title}, Description: {Description}, Categories: {Categories}, Language: {Language}, Keywords: {Keywords}, Origins: {Origins}, Link: {Link}, TargetAudience: {TargetAudience}, Year: {Year}";
        }


    }

    public class ResponseResourceDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<string> Categories { get; set; }
        public string Language { get; set; } = string.Empty;
        public ICollection<string> Keywords { get; set; }
        public string Origins { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string TargetAudience { get; set; } = string.Empty;
        public int Year { get; set; } = 0;
        public string SocialMedia { get; set; } = string.Empty;



        public ResponseResourceDTO(int id, string title, string description, ICollection<string> categories, string language, ICollection<string> keywords, string origins, string link, string targetAudience, int year, string socialMedia)
        {
            Id = id;
            Title = title;
            Description = description;
            Categories = categories;
            Language = language;
            Keywords = keywords;
            Origins = origins;
            Link = link;
            TargetAudience = targetAudience;
            Year = year;
            SocialMedia = socialMedia;
        }
    }
}
