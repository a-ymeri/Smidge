using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

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
            var email = jwtToken.Claims.First(claim => claim.Type == "email").Value;

            var allowedEmails = new string[] {
                "arditymeri7@gmail.com"
            };

            if (!allowedEmails.Contains(email))
            {
                return Unauthorized();
            }
            // Do something with the email (e.g., return it as a response)
            return Ok(token);
        }
    }
}