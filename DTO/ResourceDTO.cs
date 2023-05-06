namespace Smidge.DTO
{
    public class ResourceDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int[] Categories { get; set; }

        public ResourceDTO()
        {
            Name = string.Empty;
            Description = string.Empty;
            Categories = new int[0];
        }

        public ResourceDTO(string name, string description, int[] categories)
        {
            Name = name;
            Description = description;
            Categories = categories;
        }

        public override string ToString()
        {
            return $"Name: {Name}, Description: {Description}, Categories: {Categories}";
        }


    }
}
