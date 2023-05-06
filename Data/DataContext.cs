using Microsoft.EntityFrameworkCore;
using Smidge.Models;


namespace Smidge.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Link> Links { get; set; }
        public DbSet<Category> LinkCategories { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Category>()
        //        .HasKey(c => new { c.Id, }
        //        .HasMany(lc => lc.Links)
        //        .WithMany(l => l.Categories)
        //        .UsingEntity(j => j.ToTable("LinkCategories"));
        //}
    }
}
