import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

import StatsCard from "../../components/common/StatsCard";

import RevenueChart from "../../components/dashboard/RevenueChart";

import OccupancyChart from "../../components/dashboard/OccupancyChart";

import UpcomingRentTable from "../../components/dashboard/UpcomingRentTable";

import RecentAgreements from "../../components/dashboard/RecentAgreements";

import {FaBuilding,FaDoorOpen,FaUsers,FaFileContract,FaMoneyBill} from "react-icons/fa";

function Dashboard() {

  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [agreements, setAgreements] =
    useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [
        propertyRes,
        roomRes,
        tenantRes,
        agreementRes
      ] = await Promise.all([

        axios.get("/api/properties"),

        axios.get("/api/rooms"),

        axios.get("/api/tenants"),

        axios.get("/api/leaseagreements")
      ]);

      setProperties(propertyRes.data);
      setRooms(roomRes.data);
      setTenants(tenantRes.data);
      setAgreements(agreementRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  const occupiedRooms =
    rooms.filter(
      room => room.status === "Occupied"
    ).length;

  const availableRooms =
    rooms.filter(
      room => room.status === "Available"
    ).length;

  const activeAgreements =
    agreements.filter(
      agreement => agreement.isActive
    ).length;

  const totalRevenue =
    agreements.reduce(
      (sum, agreement) =>
        sum + agreement.rentPerMonth,
      0
    );

  return (
    <div
      className="container-fluid py-4 px-4"
      style={{
        background:"linear-gradient(180deg,#DCE6F2,#E9F1FA)",
        minHeight: "100vh",
        padding: "25px"
    }}
    >

      <div className="row g-4 mb-4">

         <div className="col-xl col-lg col-md-6">
          <StatsCard
            title="Properties"
            value={properties.length}
            icon={<FaBuilding />}
            color="primary"
          />
        </div>

         <div className="col-xl col-lg col-md-6">
          <StatsCard
            title="Rooms"
            value={rooms.length}
            icon={<FaDoorOpen />}
            color="success"
          />
        </div>

         <div className="col-xl col-lg col-md-6">
          <StatsCard
            title="Occupied"
            value={occupiedRooms}
            icon={<FaDoorOpen />}
            color="danger"
          />
        </div>

         <div className="col-xl col-lg col-md-6">
          <StatsCard
            title="Tenants"
            value={tenants.length}
            icon={<FaUsers />}
            color="warning"
          />
        </div>

         <div className="col-xl col-lg col-md-6">
          <StatsCard
            title="Agreements"
            value={activeAgreements}
            icon={<FaFileContract />}
            color="info"
          />
        </div>

        {/* <div className="col-lg-2">
          <StatsCard
            title="Revenue"
            value={`₹${totalRevenue}`}
            icon={<FaMoneyBill />}
            color="success"
          />
        </div> */}

      </div>

      <div className="row g-4">

        <div className="col-lg-8">
          <UpcomingRentTable
            agreements={agreements}
            tenants={tenants}
            rooms={rooms}
          />
        </div>

        <div className="col-lg-4">
          <RecentAgreements
            agreements={agreements}
            tenants={tenants}
          />
        </div>

        {/* <div className="col-lg-8">
          <RevenueChart
            agreements={agreements}
          />
        </div> */}

        {/* <div className="col-lg-4">
          <OccupancyChart
            occupied={occupiedRooms}
            available={availableRooms}
          />
        </div> */}

      </div>

    </div>
  );
}

export default Dashboard;