namespace Smidge.DTO
{
    public class ResourceCategoryDTO
    {
        public string Name { get; set; }

        public ResourceCategoryDTO() { 
            Name = string.Empty;
        }
        public ResourceCategoryDTO(string name)
        {
            Name = name;
        }

        public override string ToString()
        {
            return $"Name: {Name}";
        }
    }
}
