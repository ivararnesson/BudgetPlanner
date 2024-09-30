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

// Konfigurera DbContext för SQL Server
builder.Services.AddDbContext<ChoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Lägg till Swagger för API-dokumentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Använd CORS-policyn
app.UseCors("AllowAll");


// Aktivera Swagger och Swagger UI
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "BudgetPlanner API V1");
    c.RoutePrefix = "swagger"; // Sätter Swagger UI till att vara på rotvägen
});

// Definiera API-endpoints
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
