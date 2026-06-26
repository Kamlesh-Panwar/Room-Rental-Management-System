import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBed,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function TenantCard({ tenant, onView, onEdit, onDelete }) {
  return (
    <div className="card tenant-card border-0 shadow-sm h-100">

      {/* Header */}
      <div className="card-body pb-2">

        <div className="d-flex justify-content-between align-items-start">

          <div className="d-flex align-items-center">

            {/* Avatar */}
            <div className="tenant-avatar me-3">
              {tenant.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h5 className="fw-bold mb-1">{tenant.name}</h5>

              <small className="text-muted">
                Tenant ID #{tenant.id}
              </small>
            </div>

          </div>

          <span
            className={`badge px-3 py-2 rounded-pill ${
              tenant.status === "Active"
                ? "bg-success-subtle text-success"
                : "bg-danger-subtle text-danger"
            }`}
          >
            {tenant.status}
          </span>
        </div>

        {/* Room */}
        <div className="mt-4 mb-3">
          <span className="room-badge">
            <FaBed className="me-2" />
            Room {tenant.roomNumber}
          </span>
        </div>

        {/* Details */}
        <div className="tenant-info">

          <div className="info-item">
            <FaPhoneAlt className="text-primary" />
            <span>{tenant.phone}</span>
          </div>

          <div className="info-item">
            <FaEnvelope className="text-danger" />
            <span>{tenant.email}</span>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="text-success" />
            <span>{tenant.address}</span>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="card-footer bg-white border-0 pt-0">

        <div className="d-flex justify-content-between">

          <button
            className="btn btn-light action-btn"
            onClick={() => onView(tenant)}
          >
            <FaEye />
          </button>

          <button
            className="btn btn-light action-btn"
            onClick={() => onEdit(tenant)}
          >
            <FaEdit className="text-warning" />
          </button>

          <button
            className="btn btn-light action-btn"
            onClick={() => onDelete(tenant.id)}
          >
            <FaTrash className="text-danger" />
          </button>

        </div>
      </div>

    </div>
  );
}

export default TenantCard;