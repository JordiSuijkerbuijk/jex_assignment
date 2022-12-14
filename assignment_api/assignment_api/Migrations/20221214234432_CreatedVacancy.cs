using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace assignmentapi.Migrations
{
    /// <inheritdoc />
    public partial class CreatedVacancy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacancy_Company_CompanyId",
                table: "Vacancy");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyId",
                table: "Vacancy",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Vacancy_Company_CompanyId",
                table: "Vacancy",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacancy_Company_CompanyId",
                table: "Vacancy");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyId",
                table: "Vacancy",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Vacancy_Company_CompanyId",
                table: "Vacancy",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
