using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.API
{
    public class ChoreContext : DbContext
    {
        public ChoreContext(DbContextOptions<ChoreContext> options) : base(options) { }

        public DbSet<Income> Incomes { get; set; }
    }
}
