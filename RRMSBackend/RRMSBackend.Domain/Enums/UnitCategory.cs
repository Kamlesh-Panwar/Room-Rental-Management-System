using System.Text.Json.Serialization;

namespace RRMSBackend.Domain.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum UnitCategory
{
    SingleRoom,
    OneRK,
    OneBHK,
    TwoBHK,
    ThreeBHK,
    HostelRoom
}