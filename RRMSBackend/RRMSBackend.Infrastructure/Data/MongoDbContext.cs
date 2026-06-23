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

    public IMongoDatabase Database => _database;

    public IMongoCollection<Room> Rooms => _database.GetCollection<Room>("Rooms");

    private static void RegisterMappings()
    {
        if (!BsonClassMap.IsClassMapRegistered(typeof(BaseEntity)))
        {
            BsonClassMap.RegisterClassMap<BaseEntity>(cm =>
            {
                cm.MapIdProperty(c => c.Id)
                  .SetIdGenerator(StringObjectIdGenerator.Instance)
                  .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });
        }

        if (!BsonClassMap.IsClassMapRegistered(typeof(Room)))
        {
            BsonClassMap.RegisterClassMap<Room>(cm =>
            {
                cm.AutoMap();
                cm.MapProperty(c => c.Category).SetSerializer(new EnumSerializer<UnitCategory>(BsonType.String));
                cm.MapProperty(c => c.Status).SetSerializer(new EnumSerializer<RoomStatus>(BsonType.String));
            });
        }

        if (!BsonClassMap.IsClassMapRegistered(typeof(Tenant)))
        {
            BsonClassMap.RegisterClassMap<Tenant>(cm =>
            {
                cm.AutoMap();                  
            });            
        }

        if (!BsonClassMap.IsClassMapRegistered(typeof(LeaseAgreement)))
        {
            BsonClassMap.RegisterClassMap<LeaseAgreement>(cm =>
            {
                cm.AutoMap();
                cm.MapProperty(c => c.SecurityDeposit)
                  .SetSerializer(new MongoDB.Bson.Serialization.Serializers.DecimalSerializer(MongoDB.Bson.BsonType.Decimal128));
                cm.MapProperty(c => c.RentPerMonth)
                  .SetSerializer(new MongoDB.Bson.Serialization.Serializers.DecimalSerializer(MongoDB.Bson.BsonType.Decimal128));
            });
        }

        if (!BsonClassMap.IsClassMapRegistered(typeof(Property)))
        {
            BsonClassMap.RegisterClassMap<Property>(cm => {
                cm.AutoMap();
                cm.MapProperty(c => c.Type).SetSerializer(new EnumSerializer<PropertyType>(BsonType.String));
            });
        }
    }
}