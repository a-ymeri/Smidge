namespace Smidge.Models
{
    public class ResourceCategory
    {
        public int ResourceId { get; set; }
        public Resource Resource { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public ResourceCategory()
        {
            ResourceId = 0;
            Resource = new Resource();
            CategoryId = 0;
            Category = new Category();
        }
        public ResourceCategory(int resourceId, Resource resource, int categoryId, Category category)
        {
            ResourceId = resourceId;
            Resource = resource;
            CategoryId = categoryId;
            Category = category;
        }
        public override string ToString()
        {
            return $"ResourceId: {ResourceId}, Resource: {Resource}, CategoryId: {CategoryId}, Category: {Category}";
        }   
    }
}
