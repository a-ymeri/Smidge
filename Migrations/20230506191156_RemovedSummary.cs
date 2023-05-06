﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Smidge.Migrations
{
    /// <inheritdoc />
    public partial class RemovedSummary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Summary",
                table: "Links");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "Links",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
