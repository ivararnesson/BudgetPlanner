using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BudgetPlanner.API.Migrations
{
    /// <inheritdoc />
    public partial class AddIncomeModelV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chores");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDone = table.Column<bool>(type: "bit", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chores", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Chores",
                columns: new[] { "Id", "Description", "IsDone", "Title" },
                values: new object[,]
                {
                    { 1, "Wash", true, "Do the dishes" },
                    { 2, "Gently", false, "Pet the dog" },
                    { 3, "Cosy", false, "Sleep in ur bed" },
                    { 4, "Swag", true, "Drip" }
                });
        }
    }
}
