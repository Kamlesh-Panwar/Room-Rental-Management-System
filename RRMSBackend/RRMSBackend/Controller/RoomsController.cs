using Microsoft.AspNetCore.Mvc;
using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;

namespace RRMSBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController(IRoomRepository roomRepository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetAllRooms()
    {
        var rooms = await roomRepository.GetAllAsync();
        return Ok(rooms);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetRoomById(string id)
    {
        var room = await roomRepository.GetByIdAsync(id);
        if (room == null) return NotFound($"Room with ID {id} not found.");
        return Ok(room);
    }

    [HttpGet("property/{propertyId}")]
    public async Task<ActionResult<IEnumerable<Room>>> GetRoomsByProperty(string propertyId)
    {
        var allRooms = await roomRepository.GetAllAsync();
        var filteredRooms = allRooms.Where(r => r.PropertyId == propertyId);
        return Ok(filteredRooms);
    }

    [HttpPost]
    public async Task<ActionResult<Room>> CreateRoom(Room room)
    {
        await roomRepository.CreateAsync(room);
        return CreatedAtAction(nameof(GetRoomById), new { id = room.Id }, room);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoom(string id, Room room)
    {
        var existingRoom = await roomRepository.GetByIdAsync(id);
        if (existingRoom == null) return NotFound($"Room with ID {id} not found.");

        room.Id = id;
        await roomRepository.UpdateAsync(id, room);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(string id)
    {
        var existingRoom = await roomRepository.GetByIdAsync(id);
        if (existingRoom == null) return NotFound($"Room with ID {id} not found.");

        await roomRepository.DeleteAsync(id);
        return NoContent();
    }
}