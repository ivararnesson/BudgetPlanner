using Microsoft.EntityFrameworkCore;
using System;

namespace BudgetPlanner.API
{
    public class PersonsContext : DbContext
    {
        public DbSet<Persons> Persons { get; set; }
        public PersonsContext(DbContextOptions<PersonsContext> option) : base(option)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Persons>().HasData(
            new Persons { Id = 1, SavingsGoal = 10000, SavedMoney = 1000, Expences = 1000, Income = 1000 }
            );
        }
    }
}
