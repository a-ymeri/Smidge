using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smidge.Data;
using Smidge.DTO;
using Smidge.Migrations;
using Smidge.Models;

namespace Smidge.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly DataContext dataContext;

        //logger
        private readonly ILogger<ResourceController> Logger;
        public ResourceController(DataContext context, ILogger<ResourceController> logger)
        {
            dataContext = context;
            Logger = logger;
        }

        // GET: api/Resources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseResourceDTO>>> GetResources()
        {
            if (dataContext.Resources == null)
            {
                return NotFound();
            }

            //query resources, include keywords
            var resources = await dataContext.Resources.
                Include(r => r.ResourceKeywords)
                .ThenInclude(rk => rk.Keyword)
                .Include(r => r.ResourceCategories)
                .ThenInclude(rc => rc.Category)
                .ToListAsync();
            var responseResourceDTOs = new List<ResponseResourceDTO>();
            foreach (var resource in resources)
            {
                var responseResourceDTO = ResourceToResponseResourceDTO(resource);
                responseResourceDTOs.Add(responseResourceDTO);
            }
            return responseResourceDTOs;
        }

        // GET: api/Resources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseResourceDTO>> GetResource(int id)
        {
            if (dataContext.Resources == null)
            {
                return NotFound();
            }
            var resource = await dataContext.Resources.FindAsync(id);

            if (resource == null)
            {
                return NotFound();
            }

            var responseResourceDTO = ResourceToResponseResourceDTO(resource);

            return responseResourceDTO;

        }

        // PUT: api/Resources/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwresource/?resourceid=2123754
        [HttpPut("{id}")]
        [Authorize]

        public async Task<IActionResult> PutResource(int id, ResponseResourceDTO requestResourceDTO)
        {

            var resource = await dataContext.Resources
                     .Include(r => r.ResourceKeywords)
                     .FirstOrDefaultAsync(r => r.Id == id);

            if (resource == null)
            {
                return NotFound();
            }



            resource.Title = requestResourceDTO.Title;
            resource.Description = requestResourceDTO.Description;
            resource.Language = requestResourceDTO.Language;
            resource.Link = requestResourceDTO.Link;
            resource.Origins = requestResourceDTO.Origins;
            resource.TargetAudience = requestResourceDTO.TargetAudience;
            resource.Year = requestResourceDTO.Year;

            //get keywords from db
            var keywords = dataContext.Keywords.Where(k => requestResourceDTO.Keywords.Contains(k.Name)).ToList();
            //get keywords to be added
            var keywordsToBeAdded = requestResourceDTO.Keywords.Where(k => !keywords.Select(k => k.Name).Contains(k)).ToList();
            //add keywords to db
            foreach (var keyword in keywordsToBeAdded)
            {
                var newKeyword = new Keyword(name: keyword);
                dataContext.Keywords.Add(newKeyword);
                keywords.Add(newKeyword);
            }

            var resourceKeywords = keywords.Select(k => new ResourceKeyword
            {
                Keyword = k,
                Resource = resource,
                KeywordId = k.Id
            }).ToList();

            resource.ResourceKeywords.Clear();
            resource.ResourceKeywords = resourceKeywords;

            //get categories from db
            var categories = dataContext.Categories.Where(c => requestResourceDTO.Categories.Contains(c.Name)).ToList();
            //get categories to be added
            var categoriesToBeAdded = requestResourceDTO.Categories.Where(c => !categories.Select(c => c.Name).Contains(c)).ToList();
            //add categories to db
            foreach (var category in categoriesToBeAdded)
            {
                var newCategory = new Category(name: category);
                dataContext.Categories.Add(newCategory);
                categories.Add(newCategory);
            }

            var resourceCategories = categories.Select(c => new ResourceCategory
            {
                Category = c,
                Resource = resource,
                CategoryId = c.Id
            }).ToList();

            resource.ResourceCategories.Clear();
            resource.ResourceCategories = resourceCategories;


            //push to db
            await dataContext.SaveChangesAsync();

            //return the updated resource
            return Ok(ResourceToResponseResourceDTO(resource));
        }


        // To protect from overposting attacks, see https://go.microsoft.com/fwresource/?resourceid=2123754
        [HttpPost]
        [Authorize]

        public async Task<ActionResult<ResponseResourceDTO>> PostResource(RequestResourceDTO body)
        {

            var resource = new Resource(title: body.Title,
                description: body.Description,
                language: body.Language,
                link: body.Link,
                origins: body.Origins,
                targetAudience: body.TargetAudience,
                year: body.Year,
                socialMedia: body.SocialMedia
                );


            if (dataContext.Resources == null)
            {
                return Problem("Entity set 'DataContext.Resources'  is null.");
            }

            var keywords = dataContext.Keywords.Where(k => body.Keywords.Contains(k.Name)).ToList();
            var keywordsToBeAdded = body.Keywords.Where(k => !keywords.Select(k => k.Name).Contains(k)).ToList();
            foreach (var keyword in keywordsToBeAdded)
            {
                var newKeyword = new Keyword(name: keyword);
                dataContext.Keywords.Add(newKeyword);
                keywords.Add(newKeyword);
            }


            resource.ResourceKeywords = keywords.Select(k => new ResourceKeyword
            {
                Keyword = k,
                Resource = resource,
                KeywordId = k.Id
            }).ToList();

            //resource.ResourceCategories = resourceCategories;

            var categories = dataContext.Categories.Where(c => body.Categories.Contains(c.Name)).ToList();
            var categoriesToBeAdded = body.Categories.Where(c => !categories.Select(c => c.Name).Contains(c)).ToList();
            foreach (var category in categoriesToBeAdded)
            {
                var newCategory = new Category(name: category);
                dataContext.Categories.Add(newCategory);
                categories.Add(newCategory);
            }

            resource.ResourceCategories = categories.Select(c => new ResourceCategory
            {
                Category = c,
                Resource = resource,
                CategoryId = c.Id
            }).ToList();


            dataContext.Resources.Add(resource);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(
                "GetResource",
                new { id = resource.Id },
                ResourceToResponseResourceDTO(resource));
        }

        // DELETE: api/Resources/5
        [HttpDelete("{id}")]
        [Authorize]

        public async Task<IActionResult> DeleteResource(int id)
        {
            if (dataContext.Resources == null)
            {
                return NotFound();
            }
            var resource = await dataContext.Resources.FindAsync(id);
            if (resource == null)
            {
                return NotFound();
            }

            dataContext.Resources.Remove(resource);
            await dataContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Resources/DeleteMultiple
        [HttpDelete("DeleteMultiple")]
        [Authorize]

        public async Task<IActionResult> DeleteMultipleResources([FromBody] List<int> ids)
        {
            var resources = dataContext.Resources.Where(r => ids.Contains(r.Id)).ToList();
            if (resources == null)
            {
                return NotFound();
            }

            dataContext.Resources.RemoveRange(resources);
            await dataContext.SaveChangesAsync();
            return NoContent();

        }

        [HttpGet("Wordcloud")]
        public async Task<IActionResult> GetWordcloud()
        {
            var resources = await dataContext.Resources
                .Include(r => r.ResourceKeywords)
                .ThenInclude(rk => rk.Keyword)
                .ToListAsync();
            var keywords = resources.SelectMany(r => r.ResourceKeywords).Select(rk => rk.Keyword).ToList();
            var wordcloud = keywords.GroupBy(k => k.Name).Select(k => new WordcloudDTO(k.Key, k.Count())).ToList();
            return Ok(wordcloud);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var resources = await dataContext.ResourceCategories
                .Include(rc => rc.Category)
                .ToListAsync();
            var categories = resources.GroupBy(r => r.Category).ToList();
            //map
            Dictionary<string, int> categoryBreakdown = new Dictionary<string, int>();
            foreach (var category in categories)
            {
                categoryBreakdown[category.Key.Name] = category.Count();
            }

            return Ok(categoryBreakdown);
        }

        [HttpGet("socialmedia")]
        public async Task<IActionResult> GetSocialMedia()
        {
            var resources = await dataContext.Resources
                .ToListAsync();
            var categories = resources.GroupBy(r => r.SocialMedia).ToList();

            var category_breakdown = categories.Select(category =>
            new
            {
                SocialMedia = category.Key,
                count = category.Count()
            }
            );

            return Ok(category_breakdown);
        }

        [HttpGet("countries")]
        public async Task<IActionResult> GetCountryBreakdown()
        {
            var resources = await dataContext.Resources
                .ToListAsync();
            var countries = resources.GroupBy(r => r.Origins).ToList();
            //countries.Sort();


            var countryBreakdown = countries.Select(country =>
            new
            {
                Country = country.Key,
                count = country.Count()
            }
            );

            return Ok(countryBreakdown);
        }


        private bool ResourceExists(int id)
        {
            return (dataContext.Resources?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private ResponseResourceDTO ResourceToResponseResourceDTO(Resource resource)
        {
            return new ResponseResourceDTO(
                id: resource.Id,
                title: resource.Title,
                description: resource.Description,
                language: resource.Language,
                origins: resource.Origins,
                targetAudience: resource.TargetAudience,
                year: resource.Year,
                link: resource.Link,
                categories: resource.ResourceCategories.Select(rc => rc.Category.Name).ToList(),
                //categories: resource.ResourceCategories.Select(rc => rc.Category.Name).ToList(),
                keywords: resource.ResourceKeywords.Select(k => k.Keyword.Name).ToList(),
                socialMedia: resource.SocialMedia,
                dateRecorded: resource.DateRecorded
                );
        }


    }
}
