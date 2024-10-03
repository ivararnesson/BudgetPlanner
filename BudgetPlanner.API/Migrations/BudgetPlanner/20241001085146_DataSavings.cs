using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetPlanner.API.Migrations.BudgetPlanner
{
    /// <inheritdoc />
    public partial class DataSavings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Savings",
                columns: new[] { "Id", "SavedMoney", "SavingsGoal" },
                values: new object[] { 1, 1000, 10000 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Savings",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
