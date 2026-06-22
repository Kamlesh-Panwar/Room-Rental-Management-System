using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using RRMSBackend.Domain.Entities;
using RRMSBackend.Domain.Enums;

namespace RRMSBackend.Infrastructure.Data;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MongoDb");
        var databaseName = configuration["DatabaseName"];

        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);

        RegisterMappings();
    }

    public IMongoCollection<Room> Rooms => _database.GetCollection<Room>("Rooms");

    private static void RegisterMappings()
    {
        if (!BsonClassMap.IsClassMapRegistered(typeof(Room)))
        {
            BsonClassMap.RegisterClassMap<Room>(cm =>
            {
                cm.AutoMap();
                cm.MapIdProperty(c => c.Id)
                  .SetIdGenerator(StringObjectIdGenerator.Instance)
                  .SetSerializer(new StringSerializer(BsonType.ObjectId));

                cm.MapProperty(c => c.Status)
                  .SetSerializer(new EnumSerializer<RoomStatus>(BsonType.String));
            });
        }
    }
}