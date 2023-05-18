using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Smidge.Migrations
{
    /// <inheritdoc />
    public partial class LinkCategoryAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LinkCategories_Links_LinkId",
                table: "LinkCategories");

            migrationBuilder.DropIndex(
                name: "IX_LinkCategories_LinkId",
                table: "LinkCategories");

            migrationBuilder.DropColumn(
                name: "LinkId",
                table: "LinkCategories");

            migrationBuilder.CreateTable(
                name: "LinkCategory",
                columns: table => new
                {
                    LinkId = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinkCategory", x => new { x.LinkId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_LinkCategory_LinkCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "LinkCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LinkCategory_Links_LinkId",
                        column: x => x.LinkId,
                        principalTable: "Links",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LinkCategory_CategoryId",
                table: "LinkCategory",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LinkCategory");

            migrationBuilder.AddColumn<int>(
                name: "LinkId",
                table: "LinkCategories",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LinkCategories_LinkId",
                table: "LinkCategories",
                column: "LinkId");

            migrationBuilder.AddForeignKey(
                name: "FK_LinkCategories_Links_LinkId",
                table: "LinkCategories",
                column: "LinkId",
                principalTable: "Links",
                principalColumn: "Id");
        }
    }
}
