import React, {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import axios from "../../api/axiosInstance";

import {
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaMoneyBillWave,
  FaBed
} from "react-icons/fa";

function PropertyDetails() {

  const { id } = useParams();

  const [property, setProperty] =
    useState(null);

  const [rooms, setRooms] =
    useState([]);

  const [agreements, setAgreements] =
    useState([]);

  const [tenants, setTenants] =
    useState([]);

  useEffect(() => {
    loadPropertyDetails();
  }, []);

  const loadPropertyDetails =
    async () => {

      try {

        const propertyRes =
          await axios.get(
            `/api/properties/${id}`
          );

        const roomRes =
          await axios.get(
            "/api/rooms"
          );

        const tenantRes =
          await axios.get(
            "/api/tenants"
          );

        const agreementRes =
          await axios.get(
            "/api/leaseagreements"
          );

        setProperty(
          propertyRes.data
        );

        const propertyRooms =
          roomRes.data.filter(
            room =>
              room.propertyId === id
          );

        setRooms(
          propertyRooms
        );

        setTenants(
          tenantRes.data
        );

        setAgreements(
          agreementRes.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  if (!property) {
    return (
      <div className="text-center py-5">
        Loading...
      </div>
    );
  }

  const occupiedRooms =
    rooms.filter(
      room =>
        room.status ===
        "Occupied"
    ).length;

  const availableRooms =
    rooms.filter(
      room =>
        room.status ===
        "Available"
    ).length;

  const propertyAgreements =
    agreements.filter(
      agreement =>
        rooms.some(
          room =>
            room.id ===
            agreement.roomId
        )
    );

  const monthlyRevenue =
    propertyAgreements.reduce(
      (sum, agreement) =>
        sum +
        agreement.rentPerMonth,
      0
    );

  return (
    <div className="container-fluid">

      {/* Property Header */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="d-flex align-items-center">

            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: "70px",
                height: "70px"
              }}
            >
              <FaBuilding size={30} />
            </div>

            <div>

              <h3 className="fw-bold mb-1">
                {property.name}
              </h3>

              <p className="text-muted mb-1">
                {property.address}
              </p>

              <span className="badge bg-info">
                {property.type}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6>
                Total Rooms
              </h6>

              <h3>
                {rooms.length}
              </h3>

              <FaDoorOpen
                className="text-primary"
                size={25}
              />

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6>
                Occupied
              </h6>

              <h3>
                {occupiedRooms}
              </h3>

              <FaBed
                className="text-danger"
                size={25}
              />

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6>
                Available
              </h6>

              <h3>
                {availableRooms}
              </h3>

              <FaDoorOpen
                className="text-success"
                size={25}
              />

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6>
                Revenue
              </h6>

              <h3>
                ₹{monthlyRevenue}
              </h3>

              <FaMoneyBillWave
                className="text-warning"
                size={25}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Rooms Table */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Rooms
          </h5>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>
                  <th>Room</th>
                  <th>Floor</th>
                  <th>Category</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {rooms.map(room => (

                  <tr key={room.id}>

                    <td>
                      {room.roomNumber}
                    </td>

                    <td>
                      {room.floorNumber}
                    </td>

                    <td>
                      {room.category}
                    </td>

                    <td>
                      {room.maxCapacity}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          room.status ===
                          "Occupied"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {room.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Agreements */}

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Recent Agreements
          </h5>

          <div className="table-responsive">

            <table className="table">

              <thead>

                <tr>
                  <th>Tenant</th>
                  <th>Rent</th>
                  <th>Start Date</th>
                </tr>

              </thead>

              <tbody>

                {propertyAgreements
                  .slice(0, 5)
                  .map(
                    agreement => {

                      const tenant =
                        tenants.find(
                          t =>
                            t.id ===
                            agreement.primaryTenantId
                        );

                      return (
                        <tr
                          key={
                            agreement.id
                          }
                        >
                          <td>
                            {
                              tenant?.name
                            }
                          </td>

                          <td>
                            ₹
                            {
                              agreement.rentPerMonth
                            }
                          </td>

                          <td>
                            {new Date(
                              agreement.startDate
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    }
                  )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PropertyDetails;