using Microsoft.AspNetCore.Mvc;
using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;

namespace RRMSBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController(IRoomRepository roomRepository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
    {
        var rooms = await roomRepository.GetAllAsync();
        return Ok(rooms);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetRoom(string id)
    {
        var room = await roomRepository.GetByIdAsync(id);
        if (room == null) return NotFound();
        return Ok(room);
    }

    [HttpPost]
    public async Task<ActionResult<Room>> CreateRoom(Room room)
    {
        await roomRepository.CreateAsync(room);
        return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, room);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoom(string id, Room room)
    {
        var existingRoom = await roomRepository.GetByIdAsync(id);
        if (existingRoom == null) return NotFound();

        room.Id = id;
        await roomRepository.UpdateAsync(id, room);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(string id)
    {
        var existingRoom = await roomRepository.GetByIdAsync(id);
        if (existingRoom == null) return NotFound();

        await roomRepository.DeleteAsync(id);
        return NoContent();
    }
}