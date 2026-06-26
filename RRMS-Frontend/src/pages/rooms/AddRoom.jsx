import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createRoom } from "../../api/roomApi";
import { getProperties } from "../../api/propertyApi";

import {
  FaArrowLeft,
  FaSave,
  FaDoorOpen,
  FaBuilding
} from "react-icons/fa";

function AddRoom() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    propertyId: "",
    roomNumber: "",
    floorNumber: 1,
    maxCapacity: 1,
    category: "SingleRoom",
    status: "Available",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let validation = {};

    if (!formData.propertyId)
      validation.propertyId = "Please select property";

    if (!formData.roomNumber.trim())
      validation.roomNumber = "Room Number is required";

    if (formData.floorNumber < 0)
      validation.floorNumber = "Invalid Floor";

    if (formData.maxCapacity <= 0)
      validation.maxCapacity = "Capacity should be greater than 0";

    setErrors(validation);

    return Object.keys(validation).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await createRoom(formData);

      navigate("/rooms");
    } catch (error) {
      console.log(error);
      alert("Unable to create room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">
            Add New Room
          </h3>

          <p className="text-muted mb-0">
            Create a new room under your property
          </p>

        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/rooms")}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>

      </div>

      {/* Card */}

      <div className="card border-0 shadow rounded-4">

        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* Property */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Property
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <FaBuilding />
                  </span>

                  <select
                    className={`form-select ${
                      errors.propertyId ? "is-invalid" : ""
                    }`}
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Property
                    </option>

                    {properties.map((property) => (
                      <option
                        key={property.id}
                        value={property.id}
                      >
                        {property.name}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    {errors.propertyId}
                  </div>

                </div>

              </div>

              {/* Room Number */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Room Number
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <FaDoorOpen />
                  </span>

                  <input
                    type="text"
                    className={`form-control ${
                      errors.roomNumber ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Room Number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                  />

                  <div className="invalid-feedback">
                    {errors.roomNumber}
                  </div>

                </div>

              </div>

              {/* Floor */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Floor Number
                </label>

                <input
                  type="number"
                  className={`form-control ${
                    errors.floorNumber ? "is-invalid" : ""
                  }`}
                  name="floorNumber"
                  value={formData.floorNumber}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">
                  {errors.floorNumber}
                </div>

              </div>

              {/* Capacity */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Maximum Capacity
                </label>

                <input
                  type="number"
                  className={`form-control ${
                    errors.maxCapacity ? "is-invalid" : ""
                  }`}
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">
                  {errors.maxCapacity}
                </div>

              </div>

              {/* Category */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Room Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>SingleRoom</option>
                  <option>OneRK</option>
                  <option>OneBHK</option>
                  <option>TwoBHK</option>
                  <option>ThreeBHK</option>
                  <option>HostelRoom</option>
                </select>

              </div>

              {/* Status */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Room Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Maintenance</option>
                </select>

              </div>

            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-3">

              <button
                type="button"
                className="btn btn-light px-4"
                onClick={() => navigate("/rooms")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary px-5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" />
                    Save Room
                  </>
                )}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddRoom;