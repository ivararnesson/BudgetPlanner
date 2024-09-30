using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetPlanner.API.Migrations
{
    /// <inheritdoc />
    public partial class CreatingIncome : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Incomes",
                keyColumn: "Id",
                keyValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Incomes",
                columns: new[] { "Id", "Amount", "CreatedAt", "PersonId" },
                values: new object[] { 1, 1000m, new DateTime(2024, 9, 30, 9, 10, 47, 69, DateTimeKind.Utc).AddTicks(5771), 1 });
        }
    }
}
