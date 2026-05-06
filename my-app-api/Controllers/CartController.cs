using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_app_api.Data;
using my_app_api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace my_app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            return await _context.CartItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart(CartItem item)
        {
            var existingItem = await _context.CartItems.FirstOrDefaultAsync(c => c.Name == item.Name);
            if (existingItem != null)
            {
                existingItem.Quantity += 1;
                await _context.SaveChangesAsync();
                return Ok(existingItem);
            }
            
            item.Quantity = 1;
            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartItems), new { id = item.Id }, item);
        }

        [HttpPut("{id}/increase")]
        public async Task<IActionResult> IncreaseQuantity(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return NotFound();

            item.Quantity += 1;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}/decrease")]
        public async Task<IActionResult> DecreaseQuantity(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return NotFound();

            if (item.Quantity > 1)
            {
                item.Quantity -= 1;
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.CartItems.Remove(item);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
