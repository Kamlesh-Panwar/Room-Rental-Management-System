import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getRooms,
  deleteRoom,
} from "../../api/roomApi";

import {
  getProperties,
} from "../../api/propertyApi";

import SearchBar from "../../components/common/SearchBar";
import StatsCard from "../../components/common/StatsCard";
import RoomCard from "../../components/rooms/RoomCard";

import {
  FaDoorOpen,
  FaCheckCircle,
  FaUsers,
  FaTools,
  FaPlus,
} from "react-icons/fa";

function Rooms() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [properties, setProperties] = useState([]);

  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [floor, setFloor] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const roomRes = await getRooms();
      const propertyRes = await getProperties();

      setRooms(roomRes.data);
      setProperties(propertyRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?"))
      return;

    await deleteRoom(id);

    loadData();
  };

  const filteredRooms = rooms.filter((room) => {
    return (
      (room.roomNumber
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
        room.propertyName
          ?.toLowerCase()
          .includes(search.toLowerCase())) &&
      (property === "" ||
        room.propertyId == property) &&
      (category === "" ||
        room.category === category) &&
      (status === "" ||
        room.status === status) &&
      (floor === "" ||
        String(room.floor) === floor)
    );
  });

  const totalRooms = rooms.length;

  const availableRooms = rooms.filter(
    (r) => r.status === "Available"
  ).length;

  const occupiedRooms = rooms.filter(
    (r) => r.status === "Occupied"
  ).length;

  const maintenanceRooms = rooms.filter(
    (r) => r.status === "Maintenance"
  ).length;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-muted mb-0">
            Manage all rooms in your properties
          </p>

        </div>

        <button
          className="btn btn-primary px-4"
          onClick={() =>
            navigate("/rooms/add")
          }
        >
          <FaPlus className="me-2" />
          Add Room
        </button>

      </div>

      <div className="row g-4 mb-4">

        <div className="col-lg-3">
          <StatsCard
            title="Total Rooms"
            value={totalRooms}
            icon={<FaDoorOpen />}
            color="primary"
          />
        </div>

        <div className="col-lg-3">
          <StatsCard
            title="Available"
            value={availableRooms}
            icon={<FaCheckCircle />}
            color="success"
          />
        </div>

        <div className="col-lg-3">
          <StatsCard
            title="Occupied"
            value={occupiedRooms}
            icon={<FaUsers />}
            color="warning"
          />
        </div>

        <div className="col-lg-3">
          <StatsCard
            title="Maintenance"
            value={maintenanceRooms}
            icon={<FaTools />}
            color="danger"
          />
        </div>

      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-4">

        <div className="card-body">

          <div className="row g-3">

            <div className="col-lg-4">
              <SearchBar
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search Room..."
              />
            </div>

            <div className="col-lg-2">

              <select
                className="form-select"
                value={property}
                onChange={(e) =>
                  setProperty(e.target.value)
                }
              >
                <option value="">
                  Property
                </option>

                {properties.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

            <div className="col-lg-2">

              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="">
                  Category
                </option>

                <option>Single</option>

                <option>Double</option>

                <option>Triple</option>

                <option>Dormitory</option>

              </select>

            </div>

            <div className="col-lg-2">

              <select
                className="form-select"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="">
                  Status
                </option>

                <option>
                  Available
                </option>

                <option>
                  Occupied
                </option>

                <option>
                  Maintenance
                </option>

              </select>

            </div>

            <div className="col-lg-2">

              <select
                className="form-select"
                value={floor}
                onChange={(e) =>
                  setFloor(e.target.value)
                }
              >
                <option value="">
                  Floor
                </option>

                <option>1</option>

                <option>2</option>

                <option>3</option>

                <option>4</option>

                <option>5</option>

              </select>

            </div>

          </div>

        </div>

      </div>

      {filteredRooms.length === 0 ? (

        <div className="card border-0 shadow-sm rounded-4">

          <div className="card-body text-center py-5">

            <img
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt=""
              width="120"
            />

            <h3 className="mt-4">
              No Rooms Found
            </h3>

            <p className="text-muted">
              Create your first room to
              start managing occupancy.
            </p>

            <button
              className="btn btn-primary px-4"
              onClick={() =>
                navigate("/rooms/add")
              }
            >
              Add Room
            </button>

          </div>

        </div>

      ) : (

        <div className="row">

          {filteredRooms.map((room) => (

            <div
              className="col-xl-4 col-lg-6 mb-4"
              key={room.id}
            >

              <RoomCard
                room={room}
                onView={(id) =>
                  navigate(`/rooms/${id}`)
                }
                onEdit={(id) =>
                  navigate(`/rooms/edit/${id}`)
                }
                onDelete={handleDelete}
              />

            </div>

          ))}

        </div>

      )}
    </div>
  );
}

export default Rooms;