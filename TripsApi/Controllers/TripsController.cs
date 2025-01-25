using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripApi.Models;

namespace TripApi.Controllers;

[Route("api/[controller]")]
[ApiController]

public class TripItemsController : ControllerBase
{
    private readonly TripContext _context;

    public TripItemsController(TripContext context)
    {
        _context = context;
    }

    //GET: api/TripItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TripItem>>> GetTripItems()
    {
        return await _context.TripItems.ToListAsync();
    }

    //GET: api/TripItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TripItem>> GetTripItem(long id)
    {
        var tripItem = await _context.TripItems.FindAsync(id);

        if (tripItem == null)
        {
            return NotFound();
        }

        return tripItem;
    }

    //PUT: api/TripItems/5
    [HttpPut("(id)")]
    public async Task<IActionResult> PutTripItem(long id, TripItem tripItem)
    {
        if (id != tripItem.Id)
        {
            return BadRequest();
        }

        _context.Entry(tripItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TripItemExists(id))
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

    //POST api/TripItems
    [HttpPost]
    public async Task<ActionResult<TripItem>> PostTripItem(TripItem tripItem)
    {
        _context.TripItems.Add(tripItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTripItem), new { id = tripItem.Id}, tripItem); //the method gets the value of the TripItem from the body of the http request. The C# nameof keyword is used to avoid hard-coding the action name(GetTripItem(id)) in the CreatedAtAction call
    }

    // DELETE: api/TripItem/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTripItem(long id)
    {
        var tripItem = await _context.TripItems.FindAsync(id);
        if (tripItem == null)
        {
            return NotFound();
        }

        _context.TripItems.Remove(tripItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TripItemExists(long id)
    {
        return _context.TripItems.Any(e => e.Id == id);
    }
    
}