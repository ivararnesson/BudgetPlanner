using Microsoft.EntityFrameworkCore;
using System;
using BudgetPlanner.API;
using BudgetPlanner.API.Models;
using BudgetPlanner.API.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddDbContext<PersonsContext>(o =>
//    o.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=Persons;Integrated Security=true;")
//);
//builder.Services.AddDbContext<IncomeContext>(o =>
//    o.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=Income;Integrated Security=true;")
//);
builder.Services.AddDbContext<BudgetPlannerContext>(o =>
    o.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=Budgetplanner;Integrated Security=true;")
);

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

//builder.Services.AddDbContext<IncomeContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Lägg till Swagger för API-dokumentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapPost("/api/income", async (Income income, BudgetPlannerContext context) =>
{
    if (income == null || income.Amount <= 0 || income.CreatedAt == default)
    {
        return Results.BadRequest("Invalid income data.");
    }

    income.PersonId = 1;
    context.Incomes.Add(income);
    await context.SaveChangesAsync();

    var totalIncome = await context.Incomes.SumAsync(i => i.Amount);

    return Results.Created($"/api/income/{income.Id}", new { income, totalIncome,  });
});

app.MapPut("/api/income/{id}", async (int id, Income income, BudgetPlannerContext context) =>
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
});

app.MapGet("/api/income/total", async (BudgetPlannerContext context) =>
{
    var totalIncome = await context.Incomes.SumAsync(i => i.Amount);
    return Results.Ok(new { totalIncome });
});
app.MapGet("/api/person", GetAllPerson);

app.MapPut("/api/goal/{id}", async (int id, Savings updatedSavings, BudgetPlannerContext db) =>
{
    var saving = await db.Savings.FindAsync(id);

    if (saving == null)
    {
        return Results.NotFound();
    }

    saving.SavingsGoal = updatedSavings.SavingsGoal;

    await db.SaveChangesAsync();

    return Results.Ok(saving);
});

app.MapPut("/api/{id}", async (int id, Savings updatedSavings, BudgetPlannerContext db) =>
{
    var saving = await db.Savings.FindAsync(id);

    if (saving == null)
    {
        return Results.NotFound();
    }

    saving.SavedMoney = updatedSavings.SavedMoney;

    await db.SaveChangesAsync();

    return Results.Ok(saving);
});

app.MapPut("/api/reset/{id}", async (int id, BudgetPlannerContext db) =>
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
});

async Task<List<Savings>> GetAllPerson(BudgetPlannerContext db)
{
    return await db.Savings.ToListAsync();
}

app.Run();
