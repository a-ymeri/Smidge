global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
//using npgsql
//using tools
using Smidge.Data;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Claims;

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
            String[] urls = {"https://0.0.0.0:7000"};
            builder.WebHost.UseUrls(urls);




                // Add services to the container.
                builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(options =>
                {
                    options.Authority = "https://accounts.google.com";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "https://accounts.google.com",
                        ValidateAudience = true,
                        ValidAudience = "361463634645-k1brd3lmdc06n66761o6hmi903onipaj.apps.googleusercontent.com",
                        ValidateLifetime = true,
                        IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                        {
                            var httpClient = new HttpClient();
                            var keysJson = httpClient.GetStringAsync("https://www.googleapis.com/oauth2/v3/certs").Result;
                            var keys = JsonConvert.DeserializeObject<JsonWebKeySet>(keysJson).Keys;
                            return keys;
                        },
                        // Only allow admin@gmail.com as email

                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = async context =>
                        {

                            var email = context.Principal.FindFirstValue(ClaimTypes.Email);
                            var allowedEmails = new string[]
                            {
                                "arditymeri7@gmail.com",
                                "vijon.b@gmail.com"
                            };
                            if (!allowedEmails.Contains(email))
                            {
                                context.Fail("Unauthorized");
                            }
                        }
                    };

                });


            builder.Services.AddControllers();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            //Console.WriteLine(connectionStringg);
            //string connectionString = "Host=localhost;Port=5432;Database=smidge;Username=postgres;Password=postgres";
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