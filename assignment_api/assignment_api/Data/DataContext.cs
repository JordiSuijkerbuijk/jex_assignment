using Microsoft.EntityFrameworkCore;

namespace assignment_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Company> Company => Set<Company>();
        public DbSet<Vacancy> Vacancy => Set<Vacancy>();
    }
}
