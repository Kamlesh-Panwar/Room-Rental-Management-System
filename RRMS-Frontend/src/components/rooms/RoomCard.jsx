import React from "react";

import {FaBuilding,FaLayerGroup,FaUsers,FaRupeeSign,FaEye,FaEdit,FaTrash,FaDoorOpen,} from "react-icons/fa";

function RoomCard({
  room,
  onView,
  onEdit,
  onDelete,
}) {

  const getStatusBadge = (status) => {

    switch (status) {

      case "Available":
        return "success";

      case "Occupied":
        return "danger";

      case "Maintenance":
        return "warning";

      default:
        return "secondary";

    }
  };

  return (
    <div
      className="card border-0 shadow-sm rounded-4 h-100"
      style={{
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "";
      }}
    >
      {/* Header */}

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <div>

            <h5 className="fw-bold mb-1">
              Room {room.roomNumber}
            </h5>

            <small className="text-muted">
              {room.propertyName}
            </small>

          </div>

          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 55,
              height: 55,
              background: "#EEF4FF",
              color: "#2563EB",
              fontSize: 24,
            }}
          >
            <FaDoorOpen />
          </div>

        </div>

        <hr />

        {/* Information */}

        <div className="row gy-3">

          <div className="col-6">

            <small className="text-muted d-block">
              Property
            </small>

            <div className="fw-semibold">
              <FaBuilding className="me-2 text-primary" />
              {room.propertyName}
            </div>

          </div>

          <div className="col-6">

            <small className="text-muted d-block">
              Floor
            </small>

            <div className="fw-semibold">
              <FaLayerGroup className="me-2 text-success" />
              Floor {room.floor}
            </div>

          </div>

          <div className="col-6">

            <small className="text-muted d-block">
              Category
            </small>

            <div className="fw-semibold">
              {room.category}
            </div>

          </div>

          <div className="col-6">

            <small className="text-muted d-block">
              Capacity
            </small>

            <div className="fw-semibold">
              <FaUsers className="me-2 text-warning" />
              {room.capacity}
            </div>

          </div>

          <div className="col-6">

            <small className="text-muted d-block">
              Occupied
            </small>

            <div className="fw-semibold">
              {room.currentOccupants || 0} /{" "}
              {room.capacity}
            </div>

          </div>

          <div className="col-6">

            <small className="text-muted d-block">
              Monthly Rent
            </small>

            <div className="fw-bold text-success">
              <FaRupeeSign />
              {room.monthlyRent}
            </div>

          </div>

        </div>

        {/* Status */}

        <div className="mt-4 d-flex justify-content-between align-items-center">

          <span
            className={`badge bg-${getStatusBadge(
              room.status
            )} px-3 py-2`}
          >
            {room.status}
          </span>

          <span className="text-muted small">
            {room.currentOccupants || 0} Occupants
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="card-footer bg-white border-0 pt-0 pb-4">

        <div className="d-flex gap-2">

          <button
            className="btn btn-outline-primary flex-fill"
            onClick={() =>
              onView(room.id)
            }
          >
            <FaEye className="me-2" />
            View
          </button>

          <button
            className="btn btn-outline-success flex-fill"
            onClick={() =>
              onEdit(room.id)
            }
          >
            <FaEdit className="me-2" />
            Edit
          </button>

          <button
            className="btn btn-outline-danger flex-fill"
            onClick={() =>
              onDelete(room.id)
            }
          >
            <FaTrash className="me-2" />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default RoomCard;