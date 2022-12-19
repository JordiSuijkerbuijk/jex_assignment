using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace assignment_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Company> Company => Set<Company>();
        public DbSet<Vacancy> Vacancy => Set<Vacancy>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
            .HasMany(c => c.Vacancies)
            .WithOne(e => e.Company);
        }
    }
}
