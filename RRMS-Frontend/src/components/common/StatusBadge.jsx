import React from "react";

function StatusBadge({ status }) {

  const badgeMap = {
    Available: "success",
    Occupied: "danger",
    Maintenance: "warning",
    Active: "success",
    Inactive: "secondary",
    Expired: "danger",
  };

  return (
    <span
      className={`badge bg-${
        badgeMap[status] || "primary"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;