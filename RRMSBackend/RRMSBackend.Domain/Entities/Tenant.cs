namespace RRMSBackend.Domain.Entities;

public class Tenant : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string AadhaarNumber { get; set; } = string.Empty;
    public string EmergencyContact { get; set; } = string.Empty;
}