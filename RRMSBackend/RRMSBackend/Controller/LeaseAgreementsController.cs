using Microsoft.AspNetCore.Mvc;
using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Domain.Enums;

namespace RRMSBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaseAgreementsController(
    ILeaseAgreementRepository agreementRepository,
    IRoomRepository roomRepository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LeaseAgreement>>> GetAllAgreements() =>
        Ok(await agreementRepository.GetAllAsync());

    [HttpPost]
    public async Task<ActionResult<LeaseAgreement>> CreateLeaseAgreement(LeaseAgreement agreement)
    {
        var room = await roomRepository.GetByIdAsync(agreement.RoomId);
        if (room == null) return NotFound("The specified room does not exist.");

        var allAgreements = await agreementRepository.GetAllAsync();
        var activeOccupantsCount = allAgreements.Count(a => a.RoomId == agreement.RoomId && a.IsActive);

        if (activeOccupantsCount >= room.MaxCapacity)
        {
            return BadRequest("Onboarding failed: This room has reached its maximum capacity.");
        }

        agreement.IsActive = true;
        if (agreement.StartDate == default) agreement.StartDate = DateTime.UtcNow;

        await agreementRepository.CreateAsync(agreement);

        if (activeOccupantsCount + 1 >= room.MaxCapacity)
        {
            room.Status = RoomStatus.Occupied;
            await roomRepository.UpdateAsync(room.Id, room);
        }

        return CreatedAtAction(nameof(GetAllAgreements), new { id = agreement.Id }, agreement);
    }

    [HttpPut("{id}/terminate")]
    public async Task<IActionResult> TerminateLeaseAgreement(string id)
    {
        var agreement = await agreementRepository.GetByIdAsync(id);
        if (agreement == null || !agreement.IsActive)
            return NotFound("Active lease agreement not found or already terminated.");

        agreement.IsActive = false;
        agreement.EndDate = DateTime.UtcNow;
        await agreementRepository.UpdateAsync(id, agreement);

        var room = await roomRepository.GetByIdAsync(agreement.RoomId);
        if (room != null && room.Status == RoomStatus.Occupied)
        {
            room.Status = RoomStatus.Available;
            await roomRepository.UpdateAsync(room.Id, room);
        }

        return NoContent();
    }
}