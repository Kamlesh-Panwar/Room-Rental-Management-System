import { useEffect, useState } from "react";
import {useNavigate,useParams,} from "react-router-dom";

import {getPropertyById,updateProperty,} from "../../api/propertyApi";

function EditProperty() {

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

      name: "",

      address: "",

      ownerId: "",

      type: "House",

      description: ""

    });

  useEffect(() => {

    loadProperty();

  }, []);

  const loadProperty = async () => {

    try {

      const res =
        await getPropertyById(id);

      setFormData({

        name:
          res.data.name || "",

        address:
          res.data.address || "",

        ownerId:
          res.data.ownerId || "",

        type:
          res.data.type || "House",

        description:
          res.data.description || ""

      });

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });
  };

  const validate = () => {

    let temp = {};

    if (!formData.name.trim())
      temp.name =
        "Property Name is required";

    if (!formData.address.trim())
      temp.address =
        "Address is required";

    if (!formData.type)
      temp.type =
        "Property Type is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!validate()) return;

      try {

        setSaving(true);

        await updateProperty(
          id,
          formData
        );

        navigate("/properties");

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

        <div className="col-lg-8">

          <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-primary text-white py-3 rounded-top-4">

              <h3 className="fw-bold mb-1">

                Edit Property

              </h3>

              <small>

                Update property information

              </small>

            </div>

            <div className="card-body p-4">

              <form
                onSubmit={handleSubmit}
              >

                <div className="row">

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Property Name

                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                    />

                    <div className="invalid-feedback">

                      {errors.name}

                    </div>

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Property Type

                    </label>

                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="form-select"
                    >

                      <option value="House">

                        House

                      </option>

                      <option value="Hostel">

                        Hostel

                      </option>

                    </select>

                  </div>

                  <div className="col-12 mb-4">

                    <label className="form-label fw-semibold">

                      Address

                    </label>

                    <textarea
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.address
                          ? "is-invalid"
                          : ""
                      }`}
                    />

                    <div className="invalid-feedback">

                      {errors.address}

                    </div>

                  </div>

                  <div className="col-md-12 mb-4">

                    <label className="form-label fw-semibold">

                      Owner ID

                    </label>

                    <input
                      type="text"
                      name="ownerId"
                      value={formData.ownerId}
                      onChange={handleChange}
                      className="form-control"
                    />

                  </div>

                  <div className="col-12 mb-4">

                    <label className="form-label fw-semibold">

                      Description

                    </label>

                    <textarea
                      rows="4"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Write a short description about this property..."
                    />

                  </div>

                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-end gap-3">

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() =>
                      navigate("/properties")
                    }
                  >

                    Cancel

                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-5"
                    disabled={saving}
                  >

                    {saving
                      ? "Updating..."
                      : "Update Property"}

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

export default EditProperty;