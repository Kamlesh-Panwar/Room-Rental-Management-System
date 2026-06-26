import React from "react";
import {FaBuilding,FaDoorOpen,FaUsers,FaEye,FaEdit,FaTrash} from "react-icons/fa";

function PropertyCard({
  property,
  onView,
  onEdit,
  onDelete
}) {
  return (
    <div className="card border-0 shadow-sm h-100">

      <div className="card-body">

        <div className="d-flex justify-content-between">

          <div>
            <h5 className="fw-bold">
              {property.name}
            </h5>

            <small className="text-muted">
              {property.address}
            </small>
            
          </div>

          <span
            className={`badge ${
              property.type === "Hostel"
                ? "bg-primary"
                : "bg-success"
            }`}
          >
            {property.type}
          </span>

        </div>

        <hr />

        <div className="row text-center">

          <div className="col-4">
            <FaDoorOpen />
            <h6 className="mt-2">
              {property.roomsCount}
            </h6>
            <small>Rooms</small>
          </div>

          <div className="col-4">
            <FaUsers />
            <h6 className="mt-2">
              {property.occupied}
            </h6>
            <small>Occupied</small>
          </div>

          <div className="col-4">
            <FaBuilding />
            <h6 className="mt-2">
              {property.available}
            </h6>
            <small>Available</small>
          </div>

        </div>

      </div>

      <div className="card-footer bg-white border-0">

        <button
          className="btn btn-outline-primary btn-sm me-2"
          onClick={() => onView(property.id)}
        >
          <FaEye />
        </button>

        <button
          className="btn btn-outline-warning btn-sm me-2"
          onClick={() => onEdit(property.id)}
        >
          <FaEdit />
        </button>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDelete(property.id)}
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}

export default PropertyCard;