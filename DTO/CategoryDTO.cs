namespace Smidge.DTO
{
    public class CategoryDTO
    {
        public string Name { get; set; }
        public int Id { get; set; }

        public CategoryDTO(string name, int id = 0)
        {
            Name = name;
            Id = id;
        }
    }
}
