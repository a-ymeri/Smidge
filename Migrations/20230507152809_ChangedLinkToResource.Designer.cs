﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Smidge.Data;

#nullable disable

namespace Smidge.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230507152809_ChangedLinkToResource")]
    partial class ChangedLinkToResource
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Smidge.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Smidge.Models.Resource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("Smidge.Models.ResourceCategory", b =>
                {
                    b.Property<int>("ResourceId")
                        .HasColumnType("integer");

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer");

                    b.HasKey("ResourceId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("ResourceCategories");
                });

            modelBuilder.Entity("Smidge.Models.ResourceCategory", b =>
                {
                    b.HasOne("Smidge.Models.Category", "Category")
                        .WithMany("ResourceCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Smidge.Models.Resource", "Resource")
                        .WithMany("ResourceCategories")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Resource");
                });

            modelBuilder.Entity("Smidge.Models.Category", b =>
                {
                    b.Navigation("ResourceCategories");
                });

            modelBuilder.Entity("Smidge.Models.Resource", b =>
                {
                    b.Navigation("ResourceCategories");
                });
#pragma warning restore 612, 618
        }
    }
}
