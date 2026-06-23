using Microsoft.AspNetCore.Mvc;
using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController(IPropertyRepository repo) : ControllerBase
{
    [HttpGet] public async Task<IActionResult> Get() => Ok(await repo.GetAllAsync());
    [HttpPost] public async Task<IActionResult> Post(Property p) { await repo.CreateAsync(p); return CreatedAtAction(nameof(Get), new { id = p.Id }, p); }
}