using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Smidge.Models
{
    public class Resource
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        //public ICollection<ResourceCategory> ResourceCategories { get; set; }
        public string Category { get; set; }
        public ICollection<ResourceKeyword> ResourceKeywords { get; set; }
        public string Language { get; set; }
        public string Origins { get; set; }
        public string Link { get; set; }
        public string TargetAudience { get; set; }
        public int Year { get; set; }
        public string SocialMedia { get; set; }
        public DateTime DateRecorded { get; set; }


        public Resource()
        {
            Category = string.Empty;
            Title = string.Empty;
            Description = string.Empty;
            Language = string.Empty;
            Origins = string.Empty;
            Link = string.Empty;
            TargetAudience = string.Empty;
            Year = 0;
            SocialMedia = string.Empty;
            ResourceKeywords = new List<ResourceKeyword>();
            DateRecorded = DateTime.Now.ToUniversalTime();
        }

        public Resource(string title, string description, string category, string language, string origins, string link, string targetAudience, int year, string socialMedia) {
            Category = category;
            Title = title;
            Description = description;
            Language = language;
            Origins = origins;
            Link = link;
            TargetAudience = targetAudience;
            Year = year;
            ResourceKeywords = new List<ResourceKeyword>();
            SocialMedia = socialMedia;
            DateRecorded = DateTime.Now.ToUniversalTime();

        }

        public override string ToString()
        {
            return $"Title: {Title}, Description: {Description}, Category: {Category}, Language: {Language}, Origins: {Origins}, Link: {Link}, TargetAudience: {TargetAudience}, Year: {Year} SocialMedia: {SocialMedia}, DateRecorded: {DateRecorded}";
        }

    }
}