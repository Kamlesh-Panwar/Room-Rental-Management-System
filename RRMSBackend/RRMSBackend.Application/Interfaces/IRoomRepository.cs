using RRMSBackend.Domain.Entities;

namespace RRMSBackend.Application.Rooms;

public interface IRoomRepository
{
    Task<IEnumerable<Room>> GetAllAsync();
    Task<Room?> GetByIdAsync(string id);
    Task CreateAsync(Room room);
    Task UpdateAsync(string id, Room room);
    Task DeleteAsync(string id);
}