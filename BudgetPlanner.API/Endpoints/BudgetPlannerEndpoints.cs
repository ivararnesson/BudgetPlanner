using BudgetPlanner.API.Context;
using BudgetPlanner.API.Handlers;
using BudgetPlanner.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.API.Endpoints
{
    public static class BudgetPlannerEndpoints
    {
        public static void MapBudgetPlannerEndpoints(this IEndpointRouteBuilder app)
        {
            //income endpoints
            app.MapPost("/api/income", BudgetPlannerHandlers.AddIncome)
                .WithOpenApi()
                .WithSummary("Lägger till en ny inkomst");
            app.MapPut("/api/income/{id}", BudgetPlannerHandlers.UpdateIncome)
                .WithOpenApi()
                .WithSummary("Uppdaterar inkomst");
            app.MapGet("/api/income/total", BudgetPlannerHandlers.GetTotalIncome)
                .WithOpenApi()
                .WithSummary("Hämtar den totala inkomsten");

            //savings endpoints
            app.MapGet("/api/savings", BudgetPlannerHandlers.GetTotalSavings)
                .WithOpenApi()
                .WithSummary("Hämtar det det totala värdet på det som sparats");
            app.MapPut("/api/goal/{id}", BudgetPlannerHandlers.UpdateSavingsGoal)
                .WithOpenApi()
                .WithSummary("Uppdaterar summan på sparningsmålet som satts");
            app.MapPut("/api/{id}", BudgetPlannerHandlers.UpdateSavedMoney)
                .WithOpenApi()
                .WithSummary("Uppdaterar summan på hur mycket som sparats");
            app.MapPut("/api/reset/{id}", BudgetPlannerHandlers.ResetSavingsData)
                .WithOpenApi()
                .WithSummary("Nollställer sparningsmålet och den sparade summan till 0");

            //expenses endpoints
            app.MapPost("/api/expenses", BudgetPlannerHandlers.AddExpenses)
                .WithOpenApi()
                .WithSummary("Lägger till en ny utgift");
            app.MapPut("/api/expenses/{id}", BudgetPlannerHandlers.UpdateExpenses)
                .WithOpenApi()
                .WithSummary("Uppdaterar utgifter");
            app.MapGet("/api/expenses/total", BudgetPlannerHandlers.GetTotalExpenses)
                .WithOpenApi()
                .WithSummary("Hämtar den totala summan på utgifter");
        }
    }
}
