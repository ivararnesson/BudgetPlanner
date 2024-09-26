using Microsoft.EntityFrameworkCore;
using BudgetPlanner.API;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddDbContext<ChoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseCors("AllowAll");

app.MapPost("/api/income", async (Income income, ChoreContext context) =>
{
    if (income == null || income.Amount <= 0)
    {
        return Results.BadRequest("Invalid income data.");
    }

    context.Incomes.Add(income);
    await context.SaveChangesAsync();

    var totalIncome = await context.Incomes.SumAsync(i => i.Amount);

    return Results.Created($"/api/income/{income.Id}", new { income, totalIncome });
});

app.MapPut("/api/income/{id}", async (int id, Income income, ChoreContext context) =>
{
    var existingIncome = await context.Incomes.FindAsync(id);
    if (existingIncome == null)
    {
        return Results.NotFound();
    }

    existingIncome.Amount = income.Amount;
    await context.SaveChangesAsync();

    var totalIncome = await context.Incomes.SumAsync(i => i.Amount);

    return Results.Ok(new { income = existingIncome, totalIncome });
});

app.MapGet("/api/income/total", async (ChoreContext context) =>
{
    var totalIncome = await context.Incomes.SumAsync(i => i.Amount);

    return Results.Ok(new { totalIncome });
});

app.Run();
