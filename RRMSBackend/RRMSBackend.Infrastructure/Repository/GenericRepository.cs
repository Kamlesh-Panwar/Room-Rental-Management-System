using MongoDB.Driver;
using RRMSBackend.Application.Interfaces;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Infrastructure.Data;

namespace RRMSBackend.Infrastructure.Repository;

public class GenericRepository<T>(MongoDbContext context) : IGenericRepository<T> where T : BaseEntity
{
    protected readonly IMongoCollection<T> _collection = context.Database.GetCollection<T>(typeof(T).Name + "s");

    public async Task<IEnumerable<T>> GetAllAsync() =>
        await _collection.Find(_ => true).ToListAsync();

    public async Task<T?> GetByIdAsync(string id) =>
        await _collection.Find(e => e.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(T entity) =>
        await _collection.InsertOneAsync(entity);

    public async Task UpdateAsync(string id, T entity) =>
        await _collection.ReplaceOneAsync(e => e.Id == id, entity);

    public async Task DeleteAsync(string id) =>
        await _collection.DeleteOneAsync(e => e.Id == id);
}