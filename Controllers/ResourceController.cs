using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smidge.Data;
using Smidge.DTO;
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
            var resources = await dataContext.Resources.Include(r => r.ResourceKeywords)
                .ThenInclude(rk => rk.Keyword).ToListAsync();
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
            resource.Category = requestResourceDTO.Category;

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
            //resource.ResourceCategories.Clear();

            //resource.ResourceCategories = resourceCategories;
            resource.ResourceKeywords = resourceKeywords;


            //push to db
            await dataContext.SaveChangesAsync();

            //return the updated resource
            return Ok(ResourceToResponseResourceDTO(resource));
        }


        // To protect from overposting attacks, see https://go.microsoft.com/fwresource/?resourceid=2123754
        [HttpPost]
        public async Task<ActionResult<ResponseResourceDTO>> PostResource(RequestResourceDTO body)
        {
            var resource = new Resource(title: body.Title,
                category: body.Category,
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


            var resourceKeywords = keywords.Select(k => new ResourceKeyword
            {
                Keyword = k,
                Resource = resource,
                KeywordId = k.Id
            }).ToList();

            //resource.ResourceCategories = resourceCategories;
            resource.ResourceKeywords = resourceKeywords;

            dataContext.Resources.Add(resource);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(
                "GetResource",
                new { id = resource.Id },
                ResourceToResponseResourceDTO(resource));
        }

        // DELETE: api/Resources/5
        [HttpDelete("{id}")]
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
                category: resource.Category,
                //categories: resource.ResourceCategories.Select(rc => rc.Category.Name).ToList(),
                keywords: resource.ResourceKeywords.Select(k => k.Keyword.Name).ToList(),
                socialMedia: resource.SocialMedia
                );
        }


    }
}