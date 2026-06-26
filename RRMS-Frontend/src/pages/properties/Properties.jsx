import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaHome,
  FaHotel,
  FaPlus,
  FaSearch
} from "react-icons/fa";

import {
  getProperties,
  deleteProperty
} from "../../api/propertyApi";

import PropertyCard from "../../components/properties/PropertyCard";

import { useNavigate } from "react-router-dom";

function Properties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const res = await getProperties();
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Property ?")) return;

    await deleteProperty(id);
    loadProperties();
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      property.address
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalProperties = properties.length;

  const totalHouses =
    properties.filter(
      (p) => p.type === "House"
    ).length;

  const totalHostels =
    properties.filter(
      (p) => p.type === "Hostel"
    ).length;

  return (
    <div
      className="container-fluid py-4 px-4"
      style={{
        background:"linear-gradient(180deg,#DCE6F2,#E9F1FA)",
        minHeight: "100vh",
    }}
    >
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <p className="text-muted mb-0">
            Manage Houses & Hostels
          </p>
        </div>

        <button
          className="btn btn-primary px-4 py-2 rounded-3 shadow-sm"
          onClick={() =>
            navigate("/properties/add")
          }
        >
          <FaPlus className="me-2" />
          Add Property
        </button>

      </div>

        {/* Statistics */}

<div className="row g-3 mb-4">

  {/* Total Properties */}
  <div className="col-lg-4 col-md-6">
    <div
      className="card border-0 shadow-sm rounded-4"
      style={{
        border: "1px solid #E2E8F0",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center py-3 px-4">

        <div>
          <p
            className="text-muted mb-1"
            style={{ fontSize: "14px" }}
          >
            Total Properties
          </p>

          <h3
            className="fw-bold mb-0"
            style={{ fontSize: "30px" }}
          >
            {totalProperties}
          </h3>
        </div>

        <div
          className="d-flex align-items-center justify-content-center shadow-sm"
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg,#2563EB,#3B82F6)",
            color: "#fff",
          }}
        >
          <FaBuilding size={24} />
        </div>

      </div>
    </div>
  </div>

  {/* Houses */}
  <div className="col-lg-4 col-md-6">
    <div
      className="card border-0 shadow-sm rounded-4"
      style={{
        border: "1px solid #E2E8F0",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center py-3 px-4">

        <div>
          <p
            className="text-muted mb-1"
            style={{ fontSize: "14px" }}
          >
            Houses
          </p>

          <h3
            className="fw-bold mb-0"
            style={{ fontSize: "30px" }}
          >
            {totalHouses}
          </h3>
        </div>

        <div
          className="d-flex align-items-center justify-content-center shadow-sm"
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background:"linear-gradient(135deg,#16A34A,#22C55E)",
            color: "#fff",
          }}
        >
          <FaHome size={24} />
        </div>

      </div>
    </div>
  </div>

  {/* Hostels */}
  <div className="col-lg-4 col-md-6">
    <div
      className="card border-0 shadow-sm rounded-4"
      style={{
        border: "1px solid #E2E8F0",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center py-3 px-4">

        <div>
          <p
            className="text-muted mb-1"
            style={{ fontSize: "14px" }}
          >
            Hostels
          </p>

          <h3
            className="fw-bold mb-0"
            style={{ fontSize: "30px" }}
          >
            {totalHostels}
          </h3>
        </div>

        <div
          className="d-flex align-items-center justify-content-center shadow-sm"
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg,#F59E0B,#FBBF24)",
            color: "#fff",
          }}
        >
          <FaHotel size={24} />
        </div>

      </div>
    </div>
  </div>

</div>

      {/* Search */}

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search Property Name or Address..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>
      </div>

      {/* Properties */}

      {filteredProperties.length > 0 ? (
        <div className="row">

          {filteredProperties.map(
            (property) => (
              <div
                key={property.id}
                className="col-xl-4 col-lg-6 mb-4"
              >
                <PropertyCard
                  property={property}
                  onView={(id) =>
                    navigate(
                      `/properties/${id}`
                    )
                  }
                  onDelete={handleDelete}
                />
              </div>
            )
          )}

        </div>
      ) : (
        <div
          className="card border-0 shadow-sm rounded-4"
        >
          <div className="card-body text-center py-5">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt=""
              width="120"
              className="mb-4"
            />

            <h3 className="fw-bold">
              No Properties Found
            </h3>

            <p className="text-muted">
              Start by adding your first
              property to manage rooms,
              tenants and agreements.
            </p>

            <button
              className="btn btn-primary px-4"
              onClick={() =>
                navigate("/properties/add")
              }
            >
              <FaPlus className="me-2" />
              Create Property
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Properties;