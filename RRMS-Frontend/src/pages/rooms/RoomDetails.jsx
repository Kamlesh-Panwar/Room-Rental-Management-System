import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaBuilding,
    FaDoorOpen,
    FaUsers,
    FaUser,
    FaBed,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaEdit
} from "react-icons/fa";

import { getRoomById } from "../../api/roomApi";
import { getPropertyById } from "../../api/propertyApi";

function RoomDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [property, setProperty] = useState(null);

    const [agreement, setAgreement] = useState(null);

    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        loadRoom();
    }, []);

    const loadRoom = async () => {

        try {

            const roomRes = await getRoomById(id);

            const roomData = roomRes.data;

            setRoom(roomData);

            const propertyRes =
                await getPropertyById(roomData.propertyId);

            setProperty(propertyRes.data);

            const agreementRes =
                await getAgreements();

            const activeAgreement =
                agreementRes.data.find(
                    a =>
                        a.roomId === roomData.id &&
                        a.isActive
                );

            setAgreement(activeAgreement);

            if (activeAgreement) {

                const tenantRes =
                    await getTenants();

                const allIds = [

                    activeAgreement.primaryTenantId,

                    ...(activeAgreement.groupMemberTenantIds || [])

                ];

                setTenants(
                    tenantRes.data.filter(t =>
                        allIds.includes(t.id)
                    )
                );

            }

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!room)
        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );

    return (

        <div className="container-fluid py-4">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        Room {room.roomNumber}
                    </h2>

                    <p className="text-muted mb-0">
                        Complete Room Information
                    </p>

                </div>

                <div>

                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => navigate("/rooms")}
                    >
                        <FaArrowLeft className="me-2" />
                        Back
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(`/rooms/edit/${room.id}`)
                        }
                    >
                        <FaEdit className="me-2" />
                        Edit
                    </button>

                </div>

            </div>

            {/* Top Cards */}

            <div className="row g-4 mb-4">

                <div className="col-lg-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body">

                            <small className="text-muted">
                                Room Number
                            </small>

                            <h3 className="fw-bold mt-2">
                                {room.roomNumber}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body">

                            <small className="text-muted">
                                Category
                            </small>

                            <h5 className="fw-bold mt-2">
                                {room.category}
                            </h5>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body">

                            <small className="text-muted">
                                Capacity
                            </small>

                            <h3 className="fw-bold mt-2">

                                <FaUsers className="me-2 text-primary" />

                                {room.maxCapacity}

                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body">

                            <small className="text-muted">
                                Status
                            </small>

                            <div className="mt-2">

                                <span className={`badge fs-6 px-3 py-2 ${room.status === "Available"
                                    ? "bg-success"
                                    : room.status === "Occupied"
                                        ? "bg-danger"
                                        : "bg-warning text-dark"
                                    }`}>

                                    {room.status}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row g-4">

                {/* Left */}

                <div className="col-lg-8">

                    {/* Property */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-header bg-white">

                            <h5 className="mb-0">

                                <FaBuilding className="me-2 text-primary" />

                                Property Information

                            </h5>

                        </div>

                        <div className="card-body">

                            <table className="table">

                                <tbody>

                                    <tr>

                                        <th width="30%">
                                            Property Name
                                        </th>

                                        <td>
                                            {property?.name}
                                        </td>

                                    </tr>

                                    <tr>

                                        <th>
                                            Address
                                        </th>

                                        <td>
                                            {property?.address}
                                        </td>

                                    </tr>

                                    <tr>

                                        <th>
                                            Property Type
                                        </th>

                                        <td>
                                            {property?.type}
                                        </td>

                                    </tr>

                                    <tr>

                                        <th>
                                            Floor
                                        </th>

                                        <td>
                                            {room.floorNumber}
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Lease */}

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-header bg-white">

                            <h5 className="mb-0">

                                <FaCalendarAlt className="me-2 text-success" />

                                Active Lease

                            </h5>

                        </div>

                        <div className="card-body">

                            {
                                agreement ?

                                    <table className="table">

                                        <tbody>

                                            <tr>

                                                <th>Rent</th>

                                                <td>

                                                    ₹{agreement.rentPerMonth}

                                                </td>

                                            </tr>

                                            <tr>

                                                <th>Security Deposit</th>

                                                <td>

                                                    ₹{agreement.securityDeposit}

                                                </td>

                                            </tr>

                                            <tr>

                                                <th>Start Date</th>

                                                <td>

                                                    {agreement.startDate}

                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>

                                    :

                                    <div className="text-center py-4">

                                        <FaBed
                                            size={40}
                                            className="text-muted mb-3"
                                        />

                                        <h5>

                                            Room Vacant

                                        </h5>

                                        <p className="text-muted">

                                            No active lease found.

                                        </p>

                                    </div>

                            }

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="col-lg-4">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-header bg-white">

                            <h5 className="mb-0">

                                <FaUser className="me-2 text-info" />

                                Current Occupants

                            </h5>

                        </div>

                        <div className="card-body">

                            {
                                tenants.length === 0 ?

                                    <div className="text-center py-5">

                                        No Occupants

                                    </div>

                                    :

                                    tenants.map(t => (

                                        <div
                                            key={t.id}
                                            className="d-flex align-items-center mb-3"
                                        >

                                            <img

                                                src={`https://ui-avatars.com/api/?name=${t.name}`}

                                                className="rounded-circle me-3"

                                                width="45"

                                                alt=""

                                            />

                                            <div>

                                                <h6 className="mb-0">

                                                    {t.name}

                                                </h6>

                                                <small>

                                                    {t.phoneNumber}

                                                </small>

                                            </div>

                                        </div>

                                    ))

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RoomDetails;