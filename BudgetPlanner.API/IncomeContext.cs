using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.API
{
    public class IncomeContext : DbContext
    {
        public DbSet<Income> Incomes { get; set; }

        public IncomeContext(DbContextOptions<IncomeContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(18,2)");
        }
    }
}

