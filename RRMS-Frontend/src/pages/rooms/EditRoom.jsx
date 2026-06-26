import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getRoomById,
  updateRoom,
} from "../../api/roomApi";

function EditRoom() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [formData, setFormData] =
    useState({

      roomNumber: "",

      propertyId: "",

      floor: "",

      category: "Single",

      capacity: 1,

      rent: "",

      status: "Available",

      description: ""

    });

  useEffect(() => {
    loadRoom();
  }, []);

  const loadRoom = async () => {

    try {

      const res =
        await getRoomById(id);

      setFormData({

        roomNumber:
          res.data.roomNumber || "",

        propertyId:
          res.data.propertyId || "",

        floor:
          res.data.floor || "",

        category:
          res.data.category || "Single",

        capacity:
          res.data.capacity || 1,

        rent:
          res.data.rent || "",

        status:
          res.data.status || "Available",

        description:
          res.data.description || ""

      });

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const validate = () => {

    let temp = {};

    if (!formData.roomNumber)
      temp.roomNumber =
        "Room Number is required";

    if (!formData.floor)
      temp.floor =
        "Floor is required";

    if (!formData.rent)
      temp.rent =
        "Rent is required";

    if (!formData.capacity)
      temp.capacity =
        "Capacity is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!validate()) return;

      try {

        setSaving(true);

        await updateRoom(
          id,
          formData
        );

        navigate("/rooms");

      } catch (err) {

        console.log(err);

      } finally {

        setSaving(false);

      }
    };

  if (loading) {

    return (

      <div className="text-center py-5">

        <div className="spinner-border text-primary" />

      </div>

    );
  }

  return (

    <div className="container-fluid py-4">

      <div className="row justify-content-center">

        <div className="col-lg-9">

          <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-warning text-dark rounded-top-4 py-3">

              <h3 className="mb-1 fw-bold">

                Edit Room

              </h3>

              <small>

                Update room details

              </small>

            </div>

            <div className="card-body p-4">

              <form
                onSubmit={handleSubmit}
              >

                <div className="row">

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Room Number

                    </label>

                    <input
                      type="text"
                      className={`form-control ${
                        errors.roomNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      name="roomNumber"
                      value={
                        formData.roomNumber
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <div className="invalid-feedback">

                      {
                        errors.roomNumber
                      }

                    </div>

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Floor

                    </label>

                    <input
                      type="number"
                      className={`form-control ${
                        errors.floor
                          ? "is-invalid"
                          : ""
                      }`}
                      name="floor"
                      value={
                        formData.floor
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <div className="invalid-feedback">

                      {errors.floor}

                    </div>

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Category

                    </label>

                    <select
                      className="form-select"
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <option>
                        Single
                      </option>

                      <option>
                        Double
                      </option>

                      <option>
                        Triple
                      </option>

                      <option>
                        Dormitory
                      </option>

                    </select>

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Capacity

                    </label>

                    <input
                      type="number"
                      className={`form-control ${
                        errors.capacity
                          ? "is-invalid"
                          : ""
                      }`}
                      name="capacity"
                      value={
                        formData.capacity
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <div className="invalid-feedback">

                      {
                        errors.capacity
                      }

                    </div>

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Monthly Rent

                    </label>

                    <input
                      type="number"
                      className={`form-control ${
                        errors.rent
                          ? "is-invalid"
                          : ""
                      }`}
                      name="rent"
                      value={
                        formData.rent
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <div className="invalid-feedback">

                      {errors.rent}

                    </div>

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Status

                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={
                        formData.status
                      }
                      onChange={
                        handleChange
                      }
                    >

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

                  <div className="col-12 mb-4">

                    <label className="form-label fw-semibold">

                      Description

                    </label>

                    <textarea
                      rows="4"
                      className="form-control"
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                </div>

                <div className="d-flex justify-content-end gap-3">

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() =>
                      navigate("/rooms")
                    }
                  >

                    Cancel

                  </button>

                  <button
                    type="submit"
                    className="btn btn-warning px-5"
                    disabled={saving}
                  >

                    {saving
                      ? "Updating..."
                      : "Update Room"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditRoom;