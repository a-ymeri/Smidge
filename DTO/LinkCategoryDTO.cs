namespace Smidge.DTO
{
    public class LinkCategoryDTO
    {
        public string Name { get; set; }

        public LinkCategoryDTO() { }
        public LinkCategoryDTO(string name)
        {
            Name = name;
        }

        public override string ToString()
        {
            return $"Name: {Name}";
        }
    }
}
