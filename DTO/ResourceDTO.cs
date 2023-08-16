using Smidge.Models;

namespace Smidge.DTO
{
    public class RequestResourceDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Language { get; set; } = string.Empty;
        public string[] Keywords { get; set; }
        public string Origins { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string TargetAudience { get; set; } = string.Empty;
        public int Year { get; set; } = 0;
        public string SocialMedia { get; set; } = string.Empty;


        public RequestResourceDTO(string title, string description, string category, string language, string[] keywords, string origins, string link, string targetAudience, int year, string socialMedia)
        {
            Title = title;
            Description = description;
            Category = category;
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
            return $"Name: {Title}, Description: {Description}, Categories: {Category}, Language: {Language}, Keywords: {Keywords}, Origins: {Origins}, Link: {Link}, TargetAudience: {TargetAudience}, Year: {Year}";
        }


    }

    public class ResponseResourceDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Language { get; set; } = string.Empty;
        public ICollection<string> Keywords { get; set; }
        public string Origins { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string TargetAudience { get; set; } = string.Empty;
        public int Year { get; set; } = 0;
        public string SocialMedia { get; set; } = string.Empty;
        public DateTime DateRecorded { get; set; }



        public ResponseResourceDTO(int id, string title, string description, string category, string language, ICollection<string> keywords, string origins, string link, string targetAudience, int year, string socialMedia, DateTime dateRecorded)
        {
            Id = id;
            Title = title;
            Description = description;
            Category = category;
            Language = language;
            Keywords = keywords;
            Origins = origins;
            Link = link;
            TargetAudience = targetAudience;
            Year = year;
            SocialMedia = socialMedia;
            DateRecorded = dateRecorded;

        }

        public ResponseResourceDTO(Resource resource)
        {
            Id = resource.Id;
            Title = resource.Title;
            Description = resource.Description;
            Category = resource.Category;
            Language = resource.Language;
            Keywords = resource.ResourceKeywords.Select(k => k.Keyword).ToList().Select(k => k.Name).ToList();
            Origins = resource.Origins;
            Link = resource.Link;
            TargetAudience = resource.TargetAudience;
            Year = resource.Year;
            SocialMedia = resource.SocialMedia;
            DateRecorded = resource.DateRecorded;
        }
    }
}
