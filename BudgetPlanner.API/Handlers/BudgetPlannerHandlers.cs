using BudgetPlanner.API.Context;
using BudgetPlanner.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.API.Handlers
{
    public static class BudgetPlannerHandlers
    {
        public static async Task<List<Savings>> GetTotalSavings(BudgetPlannerContext db)
        {
            return await db.Savings.ToListAsync();
        }
        public static async Task<IResult> UpdateSavingsGoal(int id, Savings updatedSavings, BudgetPlannerContext db)
        {
            var saving = await db.Savings.FindAsync(id);

            if (saving == null)
            {
                return Results.NotFound();
            }

            saving.SavingsGoal = updatedSavings.SavingsGoal;

            await db.SaveChangesAsync();

            return Results.Ok(saving);
        }
        public static async Task<IResult> UpdateSavedMoney(int id, Savings updatedSavings, BudgetPlannerContext db)
        {
            var saving = await db.Savings.FindAsync(id);

            if (saving == null)
            {
                return Results.NotFound();
            }

            saving.SavedMoney = updatedSavings.SavedMoney;

            await db.SaveChangesAsync();

            return Results.Ok(saving);
        }
        public static async Task<IResult> ResetSavingsData(int id, BudgetPlannerContext db)
        {
            var saving = await db.Savings.FindAsync(id);

            if (saving == null)
            {
                return Results.NotFound();
            }

            saving.SavedMoney = 0;
            saving.SavingsGoal = 0;

            await db.SaveChangesAsync();

            return Results.Ok(saving);
        }
        public static async Task<IResult> AddIncome(Income income, BudgetPlannerContext context)
        {
            if (income == null || income.Amount <= 0 || income.CreatedAt == default)
            {
                return Results.BadRequest("Invalid income data.");
            }

            income.PersonId = 1;
            context.Incomes.Add(income);
            await context.SaveChangesAsync();

            var totalIncome = await context.Incomes.SumAsync(i => i.Amount);

            return Results.Created($"/api/income/{income.Id}", new { income, totalIncome, });
        }
        public static async Task<IResult> UpdateIncome(int id, Income income, BudgetPlannerContext context)
        {
            var existingIncome = await context.Incomes.FindAsync(id);
            if (existingIncome == null)
            {
                return Results.NotFound();
            }

            existingIncome.PersonId = 1;
            existingIncome.Amount = income.Amount;
            await context.SaveChangesAsync();

            var totalIncome = await context.Incomes.SumAsync(i => i.Amount);

            return Results.Ok(new { income = existingIncome, totalIncome, createdAt = income.CreatedAt });

        }
        public static async Task<IResult> GetTotalIncome(BudgetPlannerContext context)
        {
            var totalIncome = await context.Incomes.SumAsync(i => i.Amount);
            return Results.Ok(new { totalIncome });
        }
        public static async Task<IResult> AddExpenses(Expenses expenses, BudgetPlannerContext context)
        {
            if (expenses == null || expenses.Amount <= 0 || expenses.CreatedAt == default)
            {
                return Results.BadRequest("Invalid income data.");
            }

            expenses.PersonId = 1;
            context.Expenses.Add(expenses);
            await context.SaveChangesAsync();

            var totalExpens = await context.Expenses.SumAsync(i => i.Amount);

            return Results.Created($"/api/expenses/{expenses.Id}", new { expenses, totalExpens, });
        }
        public static async Task<IResult> UpdateExpenses(int id, Expenses expenses, BudgetPlannerContext context)
        {
            var existingExpens = await context.Expenses.FindAsync(id);
            if (existingExpens == null)
            {
                return Results.NotFound();
            }

            existingExpens.PersonId = 1;
            existingExpens.Amount = expenses.Amount;
            await context.SaveChangesAsync();

            var totalExpens = await context.Expenses.SumAsync(i => i.Amount);

            return Results.Ok(new { expenses = existingExpens, totalExpens, createdAt = expenses.CreatedAt });
        }
        public static async Task<IResult> GetTotalExpenses(BudgetPlannerContext context)
        {
            var totalExpens = await context.Expenses.SumAsync(i => i.Amount);
            return Results.Ok(new { totalExpens });
        }
    }
}
