using Microsoft.EntityFrameworkCore;
using System;
using BudgetPlanner.API;
using BudgetPlanner.API.Models;
using BudgetPlanner.API.Context;
using BudgetPlanner.API.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "Budgetplanner",
        Version = "v1",
        Description = "An API for managing personal budgeting, tracking income, expenses, and savings. This API allows users to efficiently plan and manage their finances by adding, updating, and retrieving financial data."
    });
});

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapBudgetPlannerEndpoints();

app.Run();
