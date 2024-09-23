using BudgetPlanner.API;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ChoreContext>(o =>
    o.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=Chore;Integrated Security=true;")
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

app.MapGet("/api/tasks", GetAllTasks);

async Task<List<Chore>> GetAllTasks(ChoreContext db)
{
    return await db.Chores.ToListAsync();
}

app.Run();

