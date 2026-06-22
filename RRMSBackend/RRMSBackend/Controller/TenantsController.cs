using Microsoft.AspNetCore.Mvc;
using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;

namespace RRMSBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TenantsController(ITenantRepository tenantRepository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tenant>>> GetTenants()
    {
        var tenants = await tenantRepository.GetAllAsync();
        return Ok(tenants);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tenant>> GetTenant(string id)
    {
        var tenant = await tenantRepository.GetByIdAsync(id);
        if (tenant == null) return NotFound();
        return Ok(tenant);
    }

    [HttpPost]
    public async Task<ActionResult<Tenant>> CreateTenant(Tenant tenant)
    {
        await tenantRepository.CreateAsync(tenant);
        return CreatedAtAction(nameof(GetTenant), new { id = tenant.Id }, tenant);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTenant(string id, Tenant tenant)
    {
        var existingTenant = await tenantRepository.GetByIdAsync(id);
        if (existingTenant == null) return NotFound();

        tenant.Id = id;
        await tenantRepository.UpdateAsync(id, tenant);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTenant(string id)
    {
        var existingTenant = await tenantRepository.GetByIdAsync(id);
        if (existingTenant == null) return NotFound();

        await tenantRepository.DeleteAsync(id);
        return NoContent();
    }
}