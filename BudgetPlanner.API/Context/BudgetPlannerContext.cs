using BudgetPlanner.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.API.Context
{
    public class BudgetPlannerContext : DbContext
    {
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Savings> Savings { get; set; }

        public BudgetPlannerContext(DbContextOptions<BudgetPlannerContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Savings>().HasData(
            new Savings { Id = 1, SavingsGoal = 10000, SavedMoney = 1000 }
            );
        }
    }
}
