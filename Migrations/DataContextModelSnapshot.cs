﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Smidge.Data;

#nullable disable

namespace Smidge.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Smidge.Models.Keyword", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Keywords");
                });

            modelBuilder.Entity("Smidge.Models.Resource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("DateRecorded")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Origins")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SocialMedia")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TargetAudience")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("Smidge.Models.ResourceKeyword", b =>
                {
                    b.Property<int>("ResourceId")
                        .HasColumnType("integer");

                    b.Property<int>("KeywordId")
                        .HasColumnType("integer");

                    b.HasKey("ResourceId", "KeywordId");

                    b.HasIndex("KeywordId");

                    b.ToTable("ResourceKeywords");
                });

            modelBuilder.Entity("Smidge.Models.ResourceKeyword", b =>
                {
                    b.HasOne("Smidge.Models.Keyword", "Keyword")
                        .WithMany("ResourceKeywords")
                        .HasForeignKey("KeywordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Smidge.Models.Resource", "Resource")
                        .WithMany("ResourceKeywords")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Keyword");

                    b.Navigation("Resource");
                });

            modelBuilder.Entity("Smidge.Models.Keyword", b =>
                {
                    b.Navigation("ResourceKeywords");
                });

            modelBuilder.Entity("Smidge.Models.Resource", b =>
                {
                    b.Navigation("ResourceKeywords");
                });
#pragma warning restore 612, 618
        }
    }
}
