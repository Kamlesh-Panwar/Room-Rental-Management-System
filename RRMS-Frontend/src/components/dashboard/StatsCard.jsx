import {
  FaHome,
  FaBed,
  FaDoorOpen,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

function StatsCard({ title, value }) {
  const cardConfig = {
    "Total Rooms": {
      icon: <FaHome />,
      bg: "primary",
    },
    "Occupied Rooms": {
      icon: <FaBed />,
      bg: "success",
    },
    "Available Rooms": {
      icon: <FaDoorOpen />,
      bg: "warning",
    },
    "Total Tenants": {
      icon: <FaUsers />,
      bg: "info",
    },
    "Monthly Revenue": {
      icon: <FaRupeeSign />,
      bg: "danger",
    },
  };

  const config = cardConfig[title];

  return (
    <div className="card shadow-sm rounded-4 h-100">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

          <div>
            <p className="text-muted mb-1">
              {title}
            </p>

            <h3 className="fw-bold mb-0">
              {value}
            </h3>
          </div>

          <div
            className={`bg-${config.bg} text-white rounded-circle d-flex align-items-center justify-content-center`}
            style={{
              width: "65px",
              height: "65px",
              fontSize: "24px",
            }}
          >
            {config.icon}
          </div>

        </div>

      </div>
    </div>
  );
}

export default StatsCard;