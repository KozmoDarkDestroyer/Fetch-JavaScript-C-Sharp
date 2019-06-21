using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PeticionesAjaxJavaScriptFetch.Migrations
{
    public partial class EstudianteAjax : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Estudiante",
                columns: table => new
                {
                    id_estudiante = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    nombre_completo = table.Column<string>(maxLength: 65, nullable: false),
                    identificacion = table.Column<string>(maxLength: 15, nullable: false),
                    carrera = table.Column<string>(maxLength: 65, nullable: false),
                    semestre = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estudiante", x => x.id_estudiante);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Estudiante_identificacion",
                table: "Estudiante",
                column: "identificacion",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estudiante");
        }
    }
}
