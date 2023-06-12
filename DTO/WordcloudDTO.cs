namespace Smidge.DTO
{
    public class WordcloudDTO
    {
        public string Word { get; set; }
        public int Frequency { get; set; }

        public WordcloudDTO(string word, int frequency)
        {
            Word = word;
            Frequency = frequency;
        }
    }
}
