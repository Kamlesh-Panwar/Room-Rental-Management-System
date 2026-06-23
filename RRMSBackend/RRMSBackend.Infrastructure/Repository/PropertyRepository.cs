using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Infrastructure.Data;

namespace RRMSBackend.Infrastructure.Repository;

public class PropertyRepository(MongoDbContext context) : GenericRepository<Property>(context), IPropertyRepository 
{
    
}