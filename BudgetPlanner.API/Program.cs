using Microsoft.EntityFrameworkCore;
using System;
using BudgetPlanner.API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PersonsContext>(o =>
    o.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=Persons;Integrated Security=true;")
);
builder.Services.AddDbContext<IncomeContext>(o =>
    o.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=Income;Integrated Security=true;")
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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapPost("/api/income", async (Income income, IncomeContext context) =>
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

app.MapPut("/api/income/{id}", async (int id, Income income, IncomeContext context) =>
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

app.MapGet("/api/income/total", async (IncomeContext context) =>
{
    var totalIncome = await context.Incomes.SumAsync(i => i.Amount);

    return Results.Ok(new { totalIncome });
});
app.MapGet("/api/person", GetAllPerson);

app.MapPut("/api/goal/{id}", async (int id, Persons updatedPerson, PersonsContext db) =>
{
    var person = await db.Persons.FindAsync(id);

    if (person == null)
    {
        return Results.NotFound();
    }

    person.SavingsGoal = updatedPerson.SavingsGoal;

    await db.SaveChangesAsync();

    return Results.Ok(person);
});

app.MapPut("/api/{id}", async (int id, Persons updatedPerson, PersonsContext db) =>
{
    var person = await db.Persons.FindAsync(id);

    if (person == null)
    {
        return Results.NotFound();
    }

    person.SavedMoney = updatedPerson.SavedMoney;

    await db.SaveChangesAsync();

    return Results.Ok(person);
});

app.MapPut("/api/reset/{id}", async (int id, PersonsContext db) =>
{
    var person = await db.Persons.FindAsync(id);

    if (person == null)
    {
        return Results.NotFound();
    }

    person.SavedMoney = 0;
    person.SavingsGoal = 0;

    await db.SaveChangesAsync();

    return Results.Ok(person);
});

async Task<List<Persons>> GetAllPerson(PersonsContext db)
{
    return await db.Persons.ToListAsync();
}

app.Run();
