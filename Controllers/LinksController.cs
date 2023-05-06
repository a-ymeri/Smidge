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
    public class LinksController : ControllerBase
    {
        private readonly DataContext dataContext;

        public LinksController(DataContext context)
        {
            dataContext = context;
        }

        // GET: api/Links
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Link>>> GetLinks()
        {
            if (dataContext.Links == null)
            {
                return NotFound();
            }
            return await dataContext.Links.ToListAsync();
        }

        // GET: api/Links/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Link>> GetLink(int id)
        {
            if (dataContext.Links == null)
            {
                return NotFound();
            }
            var link = await dataContext.Links.FindAsync(id);

            if (link == null)
            {
                return NotFound();
            }

            return link;
        }

        // PUT: api/Links/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLink(int id, Link link)
        {
            if (id != link.Id)
            {
                return BadRequest();
            }

            dataContext.Entry(link).State = EntityState.Modified;

            try
            {
                await dataContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Links
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Link>> PostLink(ResourceDTO body)
        {
            if (dataContext.Links == null)
            {
                return Problem("Entity set 'DataContext.Links'  is null.");
            }
            var link = new Link(body.Name, body.Description, dataContext.LinkCategories.Where(c => body.Categories.Contains(c.Id)).ToList());
            dataContext.Links.Add(link);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetLink", new { id = link.Id }, link);
        }

        // DELETE: api/Links/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLink(int id)
        {
            if (dataContext.Links == null)
            {
                return NotFound();
            }
            var link = await dataContext.Links.FindAsync(id);
            if (link == null)
            {
                return NotFound();
            }

            dataContext.Links.Remove(link);
            await dataContext.SaveChangesAsync();

            return NoContent();
        }

        private bool LinkExists(int id)
        {
            return (dataContext.Links?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
