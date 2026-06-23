using RRMSBackend.Application.Interfaces;
using RRMSBackend.Infrastructure.Data;
using RRMSBackend.Infrastructure.Repository;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddSingleton<MongoDbContext>();

builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<RRMSBackend.Application.Interfaces.ITenantRepository, RRMSBackend.Infrastructure.Repository.TenantRepository>();
builder.Services.AddScoped<RRMSBackend.Application.Interfaces.IPropertyRepository, RRMSBackend.Infrastructure.Repository.PropertyRepository>();
builder.Services.AddScoped<RRMSBackend.Application.Interfaces.ILeaseAgreementRepository, RRMSBackend.Infrastructure.Repository.LeaseAgreementRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();