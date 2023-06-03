using Microsoft.EntityFrameworkCore;
using Smidge.Models;


namespace Smidge.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Resource> Resources { get; set; }
        //public DbSet<Category> Categories { get; set; }
        public DbSet<Keyword> Keywords { get; set; }

        //public DbSet<ResourceCategory> ResourceCategories { get; set; }
        public DbSet<ResourceKeyword> ResourceKeywords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
         
            modelBuilder.Entity<ResourceKeyword>()
                .HasKey(lc => new { lc.ResourceId, lc.KeywordId });
            modelBuilder.Entity<ResourceKeyword>()
                .HasOne(lc => lc.Resource)
                .WithMany(r => r.ResourceKeywords)
                .HasForeignKey(lc => lc.ResourceId);
            modelBuilder.Entity<ResourceKeyword>()
                .HasOne(lc => lc.Keyword)
                .WithMany(c => c.ResourceKeywords)
                .HasForeignKey(lc => lc.KeywordId);

        }


    }
}
