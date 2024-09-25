using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetPlanner.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateChoresData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Chores",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsDone",
                value: true);

            migrationBuilder.InsertData(
                table: "Chores",
                columns: new[] { "Id", "Description", "IsDone", "Title" },
                values: new object[] { 4, "Swag", true, "Drip" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Chores",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Chores",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsDone",
                value: false);
        }
    }
}
