using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text.RegularExpressions;

namespace Smidge.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpGet("login")]
        public ActionResult<string> Login()
        {
            // Read Authorization header
            var token = Request.Headers["Authorization"].ToString();

            // Remove "Bearer " from the token
            token = token.Split(" ")[1];

            // Decode JWT and get email
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email") ??
                        jwtToken.Claims.First(claim => claim.Type == "preferred_username");
            var emailstr = email.Value;

            var allowedEmails = new string[]
            {
                "arditymeri7@gmail.com",
                "vijon.b@gmail.com",
                "wbsbkcss@gmail.com",
                // "ardit.ymeri@hotmail.com",
                "gramossejdiu7@gmail.com",
                "gramos.sejdiu@qkss.org",
                "info@qkss.org"
            };

            var regexMatch = new Regex(@"^[A-Za-z0-9._%+-]+@qkss\.org$");
            var validUser = regexMatch.IsMatch(emailstr) || allowedEmails.Contains(emailstr);

            if (!validUser)
            {
                return Unauthorized();
            }

            // Do something with the email (e.g., return it as a response)
            return Ok(token);
        }
    }
}