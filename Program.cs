global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Design;
//using npgsql
global using Npgsql.EntityFrameworkCore.PostgreSQL;
//using tools
using Smidge.Data;

namespace Smidge
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder();
            //var allowedOrigins = new string[] { "http://localhost:5173", "http://127.0.0.1:5173" };

            //allow all origins
            var allowedOrigins = new string[] { "*" };

            builder.WebHost.UseUrls("http://localhost:7000");

            // Add services to the container.

            builder.Services.AddControllers();
            string connectionString = "Host=localhost;Port=5432;Database=smidge;Username=postgres;Password=postgres";
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(options =>
            {
                options.WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });

            //app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}