using Microsoft.AspNetCore.Mvc;
using Smidge.Models;

namespace Smidge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LinkController : ControllerBase
    {
        private static readonly string[] Summaries =
        {
        "https://link1.com",
        "https://link2.com",
        "https://link3.com",
        "https://link4.com",
        "https://link5.com",
        "https://link6.com",
        "https://link7.com",

        };

        private readonly ILogger<LinkController> _logger;
        public LinkController(ILogger<LinkController> logger)
        {
            _logger = logger;

        }

        [HttpGet(Name = "GetLink")]
        public IEnumerable<Link> Get()
        {
            return Enumerable.Range(1, Summaries.Length).Select(index => new Link
            {
                Description = Summaries[index - 1],
                Summary = "Summary",
                //Title should be link + a random number, between 1 and 10
                Title = "Link" + new Random().Next(1, 10),
                Categories = new List<string> { "Category1", "Category2" }
            })
            .ToArray();
        }
    }
}