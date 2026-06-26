import React, { useState } from "react";
import { createProperty } from "../../api/propertyApi";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

function AddProperty() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    ownerId: "",
    type: "House",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createProperty(formData);

      navigate("/properties");
    } catch (error) {
      console.log(error);
      alert("Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Add New Property
          </h2>

          <p className="text-muted mb-0">
            Create a new House or Hostel property
          </p>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/properties")}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>

      </div>

      <div className="row">

        {/* Form Section */}

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Property Information
              </h5>

              <form onSubmit={handleSubmit}>

                {/* Property Name */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Property Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter property name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Property Type */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Property Type
                  </label>

                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="House">
                      House
                    </option>

                    <option value="Hostel">
                      Hostel
                    </option>

                  </select>

                </div>

                {/* Address */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Property Address
                  </label>

                  <textarea
                    rows="4"
                    className="form-control"
                    placeholder="Enter complete address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="d-flex gap-2">

                  <button
                    type="button"
                    className="btn btn-light border"
                    onClick={() =>
                      navigate("/properties")
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    <FaSave className="me-2" />

                    {loading
                      ? "Creating..."
                      : "Create Property"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* Preview Card */}

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Live Preview
              </h5>

              <div className="text-center mb-4">

                {formData.type === "House" ? (
                  <FaHome
                    size={60}
                    className="text-success"
                  />
                ) : (
                  <FaBuilding
                    size={60}
                    className="text-primary"
                  />
                )}

              </div>

              <div className="mb-3">

                <small className="text-muted">
                  Property Name
                </small>

                <h6 className="fw-bold">
                  {formData.name ||
                    "Property Name"}
                </h6>

              </div>

              <div className="mb-3">

                <small className="text-muted">
                  Property Type
                </small>

                <h6>
                  {formData.type}
                </h6>

              </div>

              <div>

                <small className="text-muted">
                  Address
                </small>

                <p className="mb-0">
                  {formData.address ||
                    "Property address will appear here"}
                </p>

              </div>

            </div>

          </div>

          {/* Tips Card */}

          <div className="card border-0 shadow-sm mt-3">

            <div className="card-body">

              <h6 className="fw-bold">
                Quick Tips
              </h6>

              <ul className="small text-muted mb-0">
                <li>
                  Use a unique property name.
                </li>

                <li>
                  Select House for flats and homes.
                </li>

                <li>
                  Select Hostel for shared accommodations.
                </li>

                <li>
                  Rooms can be added after property creation.
                </li>
              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddProperty;