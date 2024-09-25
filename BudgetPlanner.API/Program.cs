using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using BudgetPlanner.API.Models; 

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ChoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/income", async (ChoreContext db) =>
{
    var totalIncome = await db.Incomes.SumAsync(i => i.Amount);
    return new { totalIncome }; 
});

app.MapPost("/api/income", async (ChoreContext db, Income income) =>
{
    db.Incomes.Add(income);
    await db.SaveChangesAsync();

    var totalIncome = await db.Incomes.SumAsync(i => i.Amount);

    return Results.Created($"/api/income/{income.Id}", new 
    {
        income,
        totalIncome
    });
});

app.MapPut("/api/income/{id}", async (ChoreContext db, int id, Income income) =>
{
    var existingIncome = await db.Incomes.FindAsync(id);
    if (existingIncome is null) return Results.NotFound();

    existingIncome.Amount = income.Amount; 
    existingIncome.CreatedAt = income.CreatedAt; 
    await db.SaveChangesAsync();

    return Results.NoContent(); 
});

app.Run();
