using Microsoft.EntityFrameworkCore;
using BudgetPlanner.API;

var builder = WebApplication.CreateBuilder(args);

// CORS-konfiguration
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
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ChoreContext>();
    // Testa databaskopplingen
    if (await context.Database.CanConnectAsync())
    {
        Console.WriteLine("Database connection successful.");
    }
    else
    {
        Console.WriteLine("Database connection failed.");
    }
}

// Starta applikationen
app.Run();
