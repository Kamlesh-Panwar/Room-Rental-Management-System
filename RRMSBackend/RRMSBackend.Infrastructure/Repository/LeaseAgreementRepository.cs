using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Infrastructure.Data;

namespace RRMSBackend.Infrastructure.Repository;

public class LeaseAgreementRepository(MongoDbContext context) : GenericRepository<LeaseAgreement>(context), ILeaseAgreementRepository
{

}
