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

namespace Smidge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;

        public CategoryController(DataContext context)
        {
            _context = context;
        }

        // GET: api/LinkCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetLinkCategories()
        {
            if (_context.LinkCategories == null)
            {
                return NotFound();
            }
            return await _context.LinkCategories.ToListAsync();
        }

        // GET: api/LinkCategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetLinkCategory(int id)
        {
            if (_context.LinkCategories == null)
            {
                return NotFound();
            }
            var linkCategory = await _context.LinkCategories.FindAsync(id);

            if (linkCategory == null)
            {
                return NotFound();
            }

            return linkCategory;
        }

        // PUT: api/LinkCategory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLinkCategory(int id, Category linkCategory)
        {
            if (id != linkCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(linkCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinkCategoryExists(id))
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

        // POST: api/LinkCategory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostLinkCategory(LinkCategoryDTO linkCategoryDTO)
        {
            if (_context.LinkCategories == null)
            {
                return Problem("Entity set 'DataContext.LinkCategories'  is null.");
            }
            var linkCategory = new Category(linkCategoryDTO.Name);
            _context.LinkCategories.Add(linkCategory);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetLinkCategory", new { id = linkCategory.Id }, linkCategory);
        }

        // DELETE: api/LinkCategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLinkCategory(int id)
        {
            if (_context.LinkCategories == null)
            {
                return NotFound();
            }
            var linkCategory = await _context.LinkCategories.FindAsync(id);
            if (linkCategory == null)
            {
                return NotFound();
            }

            _context.LinkCategories.Remove(linkCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LinkCategoryExists(int id)
        {
            return (_context.LinkCategories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
