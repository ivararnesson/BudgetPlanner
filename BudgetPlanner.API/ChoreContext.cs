using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.API
{
    public class ChoreContext : DbContext
    {
        public DbSet<Chore> Chores { get; set; }
        public ChoreContext(DbContextOptions option) : base(option)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chore>().HasData(
            new Chore { Id = 1, Title = "Do the dishes", Description = "Wash", IsDone = true },
            new Chore { Id = 2, Title = "Pet the dog", Description = "Gently", IsDone = false },
            new Chore { Id = 3, Title = "Sleep in ur bed", Description = "Cosy", IsDone = false },
            new Chore { Id = 4, Title = "Drip", Description = "Swag", IsDone = true }
            );
        }
    }
}
