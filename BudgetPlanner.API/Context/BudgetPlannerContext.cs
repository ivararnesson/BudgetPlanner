using BudgetPlanner.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BudgetPlanner.API.Context
{
    public class BudgetPlannerContext : DbContext
    {
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Savings> Savings { get; set; }
        public DbSet<Expenses> Expenses { get; set; }

        public BudgetPlannerContext(DbContextOptions<BudgetPlannerContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetDecimal(modelBuilder.Entity<Income>());
            SetDecimal(modelBuilder.Entity<Expenses>());

            modelBuilder.Entity<Savings>().HasData(
            new Savings { Id = 1, SavingsGoal = 10000, SavedMoney = 1000 }
            );
        }
        private void SetDecimal<TEntity>(EntityTypeBuilder<TEntity> builder) where TEntity : class
        {
            builder.Property("Amount").HasColumnType("decimal(18,2)");
        }
    }
}
