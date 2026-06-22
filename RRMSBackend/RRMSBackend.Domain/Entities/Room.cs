using RRMSBackend.Domain.Enums;

namespace RRMSBackend.Domain.Entities;

public class Room
{
    public string Id { get; set; } = string.Empty;
    public string RoomNumber { get; set; } = string.Empty;
    public int FloorNumber { get; set; }
    public int Capacity { get; set; }
    public decimal RentAmount { get; set; }
    public decimal SecurityDeposit { get; set; }
    public RoomStatus Status { get; set; } = RoomStatus.Available;
}