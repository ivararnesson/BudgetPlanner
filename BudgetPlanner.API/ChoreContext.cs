using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.API
{
    public class ChoreContext : DbContext
    {
        public ChoreContext(DbContextOptions<ChoreContext> options) : base(options) { }

        public DbSet<Income> Incomes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(18,2)"); 
        }
    }
}
