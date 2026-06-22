using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Infrastructure.Data;
using RRMSBackend.Infrastructure.Repository;

public class RoomRepository(MongoDbContext context) : GenericRepository<Room>(context), IRoomRepository
{
   
}