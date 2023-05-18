namespace Smidge.DTO
{
    public class KeywordDTO
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public KeywordDTO(string name, int id = 0)
        {
            Name = name;
            Id = id;
        }
    }
}
