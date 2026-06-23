using RRMSBackend.Domain.Enums;

namespace RRMSBackend.Domain.Entities;

public class Room : BaseEntity
{
    public string PropertyId { get; set; } = string.Empty; 
    public string RoomNumber { get; set; } = string.Empty;
    public int FloorNumber { get; set; }
    public int MaxCapacity { get; set; } 
    public UnitCategory Category { get; set; }
    public RoomStatus Status { get; set; } = RoomStatus.Available;
}