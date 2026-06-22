using MongoDB.Driver;
using RRMSBackend.Application.Rooms;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Infrastructure.Data;

namespace RRMSBackend.Infrastructure.Repository;

public class RoomRepository(MongoDbContext context) : IRoomRepository
{
    public async Task<IEnumerable<Room>> GetAllAsync() =>
        await context.Rooms.Find(_ => true).ToListAsync();

    public async Task<Room?> GetByIdAsync(string id) =>
        await context.Rooms.Find(r => r.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Room room) =>
        await context.Rooms.InsertOneAsync(room);

    public async Task UpdateAsync(string id, Room room) =>
        await context.Rooms.ReplaceOneAsync(r => r.Id == id, room);

    public async Task DeleteAsync(string id) =>
        await context.Rooms.DeleteOneAsync(r => r.Id == id);
}