using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetPlanner.API.Migrations.Persons
{
    /// <inheritdoc />
    public partial class InitialCreatePersons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SavingsGoal = table.Column<int>(type: "int", nullable: false),
                    SavedMoney = table.Column<int>(type: "int", nullable: false),
                    Expences = table.Column<int>(type: "int", nullable: false),
                    Income = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Id", "Expences", "Income", "SavedMoney", "SavingsGoal" },
                values: new object[] { 1, 1000, 1000, 1000, 10000 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Persons");
        }
    }
}
