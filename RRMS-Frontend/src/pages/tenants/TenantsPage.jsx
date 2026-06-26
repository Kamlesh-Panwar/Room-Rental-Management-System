import React, { useState } from "react";
import {FaSearch,FaPlus,FaTable,FaThLarge,FaUsers,FaUserCheck,FaBed,FaDoorOpen} from "react-icons/fa";

import TenantCard from "../../components/tenants/TenantCard";
import TenantTable from "../../components/tenants/TenantTable";
import TenantModal from "../../components/tenants/TenantModal";
import TenantForm from "../../components/tenants/TenantForm";

function TenantsPage() {
  const [tableView, setTableView] = useState(false);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@gmail.com",
      address: "Bhopal, MP",
      aadhaar: "1234-5678-9012",
      emergencyContact: "9876541111",
      roomNumber: "101",
      status: "Active",
    },
    {
      id: 2,
      name: "Amit Verma",
      phone: "9876541234",
      email: "amit@gmail.com",
      address: "Indore, MP",
      aadhaar: "9876-5432-1111",
      emergencyContact: "9999999999",
      roomNumber: "102",
      status: "Active",
    },
  ]);

  // Search Filter
  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.phone.includes(search) ||
      tenant.roomNumber.includes(search)
  );

  // Add Tenant
  const addTenant = (newTenant) => {
    setTenants([
      ...tenants,
      {
        ...newTenant,
        id: Date.now(),
      },
    ]);
  };

  // Update Tenant
  const updateTenant = (updatedTenant) => {
    setTenants(
      tenants.map((tenant) =>
        tenant.id === updatedTenant.id ? updatedTenant : tenant
      )
    );
  };

  // Delete Tenant
  const deleteTenant = (id) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      setTenants(tenants.filter((tenant) => tenant.id !== id));
    }
  };

  // Open Add Modal
  const handleAdd = () => {
    setEditingTenant(null);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setShowModal(true);
  };

  // Submit Form
  const handleSubmit = (tenantData) => {
    if (editingTenant) {
      updateTenant({
        ...tenantData,
        id: editingTenant.id,
      });
    } else {
      addTenant(tenantData);
    }

    setShowModal(false);
  };

  // View Profile
  const handleView = (tenant) => {
    console.log("View Profile:", tenant);

    // Later navigate to:
    // navigate(`/tenants/${tenant.id}`);
  };

  return (
  <div className="container-fluid py-4">

    {/* Header */}
    <div className="d-flex justify-content-between align-items-center mb-4">

    <div>
        <h2 className="fw-bold mb-1">
            Tenant Management
        </h2>
    </div>

    <button
        className="btn btn-primary px-4 shadow-sm"
        onClick={handleAdd}
    >
        <FaPlus className="me-2"/>
        Add Tenant
    </button>

    </div>

    {/* Stats Cards */}
    <div className="row g-4 mb-4">

    <div className="col-lg-3 col-md-6">
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex justify-content-between">

                <div>
                    <p className="text-muted mb-1">
                        Total Tenants
                    </p>

                    <h3>{tenants.length}</h3>
                </div>

                <FaUsers size={35} className="text-primary"/>
            </div>
        </div>
    </div>


    <div className="col-lg-3 col-md-6">
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex justify-content-between">

                <div>
                    <p className="text-muted mb-1">
                        Active Tenants
                    </p>

                    <h3>
                        {
                            tenants.filter(
                                tenant => tenant.status==="Active"
                            ).length
                        }
                    </h3>
                </div>

                <FaUserCheck size={35} className="text-success"/>
            </div>
        </div>
    </div>


    <div className="col-lg-3 col-md-6">
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex justify-content-between">

                <div>
                    <p className="text-muted mb-1">
                        Occupied Rooms
                    </p>

                    <h3>{tenants.length}</h3>
                </div>

                <FaBed size={35} className="text-warning"/>
            </div>
        </div>
    </div>


    <div className="col-lg-3 col-md-6">
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex justify-content-between">

                <div>
                    <p className="text-muted mb-1">
                        Available Rooms
                    </p>

                    <h3>15</h3>
                </div>

                <FaDoorOpen size={35} className="text-danger"/>
            </div>
        </div>
    </div>

</div>

    {/* Toolbar */}
    <div className="card border-0 shadow-sm rounded-4 mb-4">

    <div className="card-body">

        <div className="row align-items-center">

            <div className="col-md-8">

                <div className="input-group">

                    <span className="input-group-text bg-white border-end-0">
                        <FaSearch/>
                    </span>

                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search by name, phone or room number..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />

                </div>

            </div>


            <div className="col-md-4 text-end">

                <div className="btn-group">

                    <button
                        className={`btn ${
                            !tableView
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}
                        onClick={()=>setTableView(false)}
                    >
                        <FaThLarge/>
                    </button>


                    <button
                        className={`btn ${
                            tableView
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}
                        onClick={()=>setTableView(true)}
                    >
                        <FaTable/>
                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

    {/* Grid View */}
    {!tableView ? (
      <div className="row g-4">

    {filteredTenants.map((tenant)=>(

        <div className="col-lg-4 col-md-6" key={tenant.id}>

            <TenantCard
                tenant={tenant}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={deleteTenant}
            />

        </div>

    ))}

  </div>
    ) : (
      <div className="card shadow-sm border-0 rounded-4">

    <div className="card-body">

        <TenantTable
            tenants={filteredTenants}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteTenant}
        />

    </div>

  </div>
    )}

    {/* Modal */}
    {showModal && (
      <TenantModal
        title={editingTenant ? "Edit Tenant" : "Add Tenant"}
        onClose={() => setShowModal(false)}
      >
        <TenantForm
          initialData={editingTenant}
          onSubmit={handleSubmit}
        />
      </TenantModal>
    )}
  </div>
);
}

export default TenantsPage;