import React from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPhoneAlt,
  FaBed,
} from "react-icons/fa";

function TenantTable({ tenants, onView, onEdit, onDelete }) {
  return (
    <div className="table-responsive">

      <table className="table align-middle">

        <thead className="table-light">
          <tr>
            <th>Tenant</th>
            <th>Phone</th>
            <th>Room</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {tenants.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-5">
                No tenants found
              </td>
            </tr>
          ) : (
            tenants.map((tenant) => (
              <tr key={tenant.id}>

                {/* Tenant */}
                <td>
                  <div className="d-flex align-items-center">

                    <div className="tenant-avatar-table me-3">
                      {tenant.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h6 className="mb-1 fw-bold">
                        {tenant.name}
                      </h6>

                      <small className="text-muted">
                        {tenant.email}
                      </small>
                    </div>

                  </div>
                </td>

                {/* Phone */}
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <FaPhoneAlt className="text-primary" />
                    {tenant.phone}
                  </div>
                </td>

                {/* Room */}
                <td>
                  <span className="room-pill">
                    <FaBed className="me-2" />
                    {tenant.roomNumber}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge rounded-pill px-3 py-2 ${
                      tenant.status === "Active"
                        ? "bg-success-subtle text-success"
                        : "bg-danger-subtle text-danger"
                    }`}
                  >
                    {tenant.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="text-center">

                  <div className="d-flex justify-content-center gap-2">

                    <button
                      className="btn btn-light table-action-btn"
                      onClick={() => onView(tenant)}
                    >
                      <FaEye className="text-primary" />
                    </button>

                    <button
                      className="btn btn-light table-action-btn"
                      onClick={() => onEdit(tenant)}
                    >
                      <FaEdit className="text-warning" />
                    </button>

                    <button
                      className="btn btn-light table-action-btn"
                      onClick={() => onDelete(tenant.id)}
                    >
                      <FaTrash className="text-danger" />
                    </button>

                  </div>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default TenantTable;