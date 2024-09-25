using BudgetPlanner.API.Models;
using Microsoft.EntityFrameworkCore;

public class ChoreContext : DbContext
{
    public ChoreContext(DbContextOptions<ChoreContext> options) : base(options)
    {
    }

    public DbSet<Income> Incomes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Income>(entity =>
        {
            entity.Property(e => e.Amount)
                .HasColumnType("decimal(18,2)"); 
        });

        base.OnModelCreating(modelBuilder);
    }
}