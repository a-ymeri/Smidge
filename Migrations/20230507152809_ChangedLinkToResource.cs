using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Smidge.Migrations
{
    /// <inheritdoc />
    public partial class ChangedLinkToResource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LinkCategory_LinkCategories_CategoryId",
                table: "LinkCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_LinkCategory_Resources_ResourceId",
                table: "LinkCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LinkCategory",
                table: "LinkCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LinkCategories",
                table: "LinkCategories");

            migrationBuilder.RenameTable(
                name: "LinkCategory",
                newName: "ResourceCategories");

            migrationBuilder.RenameTable(
                name: "LinkCategories",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_LinkCategory_CategoryId",
                table: "ResourceCategories",
                newName: "IX_ResourceCategories_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResourceCategories",
                table: "ResourceCategories",
                columns: new[] { "ResourceId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceCategories_Categories_CategoryId",
                table: "ResourceCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceCategories_Resources_ResourceId",
                table: "ResourceCategories",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResourceCategories_Categories_CategoryId",
                table: "ResourceCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_ResourceCategories_Resources_ResourceId",
                table: "ResourceCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ResourceCategories",
                table: "ResourceCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "ResourceCategories",
                newName: "LinkCategory");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "LinkCategories");

            migrationBuilder.RenameIndex(
                name: "IX_ResourceCategories_CategoryId",
                table: "LinkCategory",
                newName: "IX_LinkCategory_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LinkCategory",
                table: "LinkCategory",
                columns: new[] { "ResourceId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_LinkCategories",
                table: "LinkCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LinkCategory_LinkCategories_CategoryId",
                table: "LinkCategory",
                column: "CategoryId",
                principalTable: "LinkCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LinkCategory_Resources_ResourceId",
                table: "LinkCategory",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
