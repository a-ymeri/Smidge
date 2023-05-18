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

        // GET: api/ResourceCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            return await _context.Categories.ToListAsync();
        }

        // GET: api/ResourceCategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetResourceCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var resourceCategory = await _context.Categories.FindAsync(id);

            if (resourceCategory == null)
            {
                return NotFound();
            }

            return resourceCategory;
        }

        // PUT: api/ResourceCategory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResourceCategory(int id, Category resourceCategory)
        {
            if (id != resourceCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(resourceCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceCategoryExists(id))
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

        // POST: api/ResourceCategory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostResourceCategory(ResourceCategoryDTO resourceCategoryDTO)
        {
            if (_context.Categories == null)
            {
                return Problem("Entity set 'DataContext.Categories'  is null.");
            }
            var resourceCategory = new Category(resourceCategoryDTO.Name);
            _context.Categories.Add(resourceCategory);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetResourceCategory", new { id = resourceCategory.Id }, resourceCategory);
        }

        // DELETE: api/ResourceCategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResourceCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var resourceCategory = await _context.Categories.FindAsync(id);
            if (resourceCategory == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(resourceCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResourceCategoryExists(int id)
        {
            return (_context.Categories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
