using BudgetPlanner.API;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PersonsContext>(o =>
    o.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=Persons;Integrated Security=true;")
);

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll", p =>
    p.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader())
);

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

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

