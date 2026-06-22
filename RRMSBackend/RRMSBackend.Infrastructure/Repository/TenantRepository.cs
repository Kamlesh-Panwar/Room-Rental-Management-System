using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Infrastructure.Data;

namespace RRMSBackend.Infrastructure.Repository;

public class TenantRepository(MongoDbContext context) : GenericRepository<Tenant>(context), ITenantRepository
{

}