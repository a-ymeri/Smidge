global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
//using npgsql
//using tools
using Smidge.Data;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Configuration;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

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
            String[] urls = { "https://0.0.0.0:7000" };

            builder.WebHost.UseUrls(urls);

            // Add services to the container.
            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer("Google",options =>
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
                                "vijon.b@gmail.com",
                                "wbsbkcss@gmail.com",
                                "ardit.ymeri@hotmail.com",
                                "tamara.pavlovic@qkss.org",
                                "tamara22pavlovic@gmail.com"

                        };
                        if (!allowedEmails.Contains(email))
                        {
                            context.Fail("Unauthorized");
                        }
                    }
                };

            })
        .AddJwtBearer("Azure", options =>
            {
                options.Authority = "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0";
                // Outlook-specific configuration
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    //ValidIssuer = "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
                    ValidateAudience = false,
                    ValidAudience = "ea90c1ea-9587-4373-b1ba-cc7b1987e6c2",
                    ValidateLifetime = true,
                };
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {

                        var email = context.Principal.FindFirstValue("preferred_username");
                        var allowedEmails = new string[]
                        {
                                "ardit.ymeri@hotmail.com",
                        };
                        // var regexMatch = new Regex(@"^[A-Za-z0-9._%+-]+@qkss\.org$");
                        var regexMatch = new Regex(@"^[A-Za-z0-9._%+-]+@qkss\.org$");
                        var validUser = email != null && (regexMatch.IsMatch(email) || allowedEmails.Contains(email));

                        if (!validUser)
                        {
                            context.Fail("Unauthorized");
                        }
                        else
                        {
                            context.Success();
                        }
                    },
                    OnForbidden = async context =>
                    {
                        Console.WriteLine(context);
                    },
                    OnAuthenticationFailed = async context =>
                    {
                        Console.WriteLine(context.Principal);
                    }
                };
            });


            builder.Services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddAuthenticationSchemes("Google", "Azure")
                    .Build();
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