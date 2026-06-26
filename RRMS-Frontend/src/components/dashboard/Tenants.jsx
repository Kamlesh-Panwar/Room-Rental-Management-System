import React, { useState } from "react";
import { FaTable, FaThLarge, FaPhone, FaBed } from "react-icons/fa";
import vectorimage from "../../assets/uploads/vectorimage.png";

function Tenants() {
  const [tableView, setTableView] = useState(false);

  const tenants = [
  {
    id: 1,
    name: "Rahul Sharma",
    room: "101",
    phone: "9876543210",
    photo: "",
  },
  {
    id: 2,
    name: "Amit Verma",
    room: "102",
    phone: "9876543211",
    photo: null,
  },
  {
    id: 3,
    name: "Priya Singh",
    room: "201",
    phone: "9876543212",
    photo: "",
  },
];

  return (
    <div className="card border-0">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Total Tenants ({tenants.length})</h5>

       <div className="d-flex align-items-center gap-3">
        <span className="fw-semibold">
          {tableView ? "Table View" : "Card View"}
        </span>

        <div className="form-check form-switch fs-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={tableView}
            onChange={() => setTableView(!tableView)}
          />
        </div>
      </div>
      </div>

      <div className="card-body">
        {/* Card View */}
        {!tableView && (
          <div className="row">
            {tenants.map((tenant) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={tenant.id}>
                <div className="card border-0 shadow-sm h-100 text-center tenant-card">
                  <div className="card-body">

                    <img
                      src={tenant.photo || vectorimage}
                      alt={tenant.name}
                      className="rounded-circle shadow"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover"
                      }}
                    />

                    <h5 className="fw-bold mt-3">
                      {tenant.name}
                    </h5>

                    <span className="badge bg-success mb-3">
                      Active
                    </span>

                    <div className="text-muted">

                      <p>
                        <FaBed className="text-primary me-2" />
                        Room No : {tenant.room}
                      </p>

                      <p>
                        <FaPhone className="text-success me-2" />
                        {tenant.phone}
                      </p>

                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {tableView && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Room No</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td>{tenant.id}</td>
                    <td>
                      <img
                        src={tenant.photo || vectorimage}
                        alt={tenant.name}
                        className="rounded-circle"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover"
                        }}
                      />
                    </td>
                    <td>{tenant.name}</td>
                    <td>{tenant.room}</td>
                    <td>{tenant.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tenants;