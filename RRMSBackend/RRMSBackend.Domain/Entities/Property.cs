using RRMSBackend.Domain.Enums;

namespace RRMSBackend.Domain.Entities;

public class Property : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string OwnerId { get; set; } = string.Empty;
    public PropertyType Type { get; set; }
}