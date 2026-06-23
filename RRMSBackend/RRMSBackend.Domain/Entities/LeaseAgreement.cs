namespace RRMSBackend.Domain.Entities;

public class LeaseAgreement : BaseEntity
{
    public string RoomId { get; set; } = string.Empty;
    public string PrimaryTenantId { get; set; } = string.Empty;
    public List<string> GroupMemberTenantIds { get; set; } = new();
    public decimal RentPerMonth { get; set; }
    public decimal SecurityDeposit { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; } = true;
}