using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using BudgetPlanner.API.Models; // Kontrollera att denna rad finns

var builder = WebApplication.CreateBuilder(args);

// Lägg till DbContext
builder.Services.AddDbContext<ChoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Konfigurera middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Endpoints för Income
app.MapGet("/api/income", async (ChoreContext db) =>
{
    var totalIncome = await db.Incomes.SumAsync(i => i.Amount);
    return new { totalIncome }; // Returnerar total inkomst
});

app.MapPost("/api/income", async (ChoreContext db, Income income) =>
{
    db.Incomes.Add(income);
    await db.SaveChangesAsync();

    // Beräkna total inkomst
    var totalIncome = await db.Incomes.SumAsync(i => i.Amount);

    return Results.Created($"/api/income/{income.Id}", new 
    {
        income,
        totalIncome
    });
});

// PUT endpoint för att uppdatera inkomst
app.MapPut("/api/income/{id}", async (ChoreContext db, int id, Income income) =>
{
    var existingIncome = await db.Incomes.FindAsync(id);
    if (existingIncome is null) return Results.NotFound();

    existingIncome.Amount = income.Amount; // Uppdatera belopp
    existingIncome.CreatedAt = income.CreatedAt; // Uppdatera datum
    await db.SaveChangesAsync();

    return Results.NoContent(); // Returnera 204 No Content
});

app.Run();
