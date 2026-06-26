import {FaHome,FaBuilding,FaDoorOpen,FaUsers,FaFileContract,FaMoneyBillWave,FaUser,FaBars,
  FaSignOutAlt,} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      style={{
        width: collapsed ? "70px" : "240px",
        height: "100vh",
        background: "#111827",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        overflow: "hidden",
        zIndex: 999,
        borderRight: "1px solid #1F2937",
      }}
    >
      <div
        style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed
            ? "center"
            : "space-between",
          padding: collapsed ? "0" : "0 20px",
          borderBottom: "1px solid #374151",
        }}
      >
        {!collapsed && (
          <h3
            className="text-white fw-bold mb-0"
            style={{ letterSpacing: 1 }}
          >
            RRMS
          </h3>
        )}

        <button
          className="btn btn-outline-light"
          style={{
            width: "38px",
            height: "38px",
            padding: 0,
          }}
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          <FaBars />
        </button>
      </div>
      <div
        className="flex-grow-1"
        style={{
          padding: "18px 10px",
        }}
      >
        <MenuItem
          to="/"
          icon={<FaHome />}
          text="Dashboard"
          collapsed={collapsed}
        />

        <MenuItem
          to="/properties"
          icon={<FaBuilding />}
          text="Properties"
          collapsed={collapsed}
        />

        <MenuItem
          to="/rooms"
          icon={<FaDoorOpen />}
          text="Rooms"
          collapsed={collapsed}
        />

        <MenuItem
          to="/tenants"
          icon={<FaUsers />}
          text="Tenants"
          collapsed={collapsed}
        />

        <MenuItem
          to="/agreements"
          icon={<FaFileContract />}
          text="Agreements"
          collapsed={collapsed}
        />

        <MenuItem
          to="/revenue"
          icon={<FaMoneyBillWave />}
          text="Revenue"
          collapsed={collapsed}
        />
      </div>

      <div
        style={{
          borderTop: "1px solid #374151",
          padding: "15px 10px",
        }}
      >
        <MenuItem
          to="/profile"
          icon={<FaUser />}
          text="Profile"
          collapsed={collapsed}
        />

        <div
          style={{
            display: "flex",
            justifyContent: collapsed
              ? "center"
              : "flex-start",
            alignItems: "center",
            padding: "14px",
            borderRadius: "12px",
            color: "#E5E7EB",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt size={18} />

          {!collapsed && (
            <span className="ms-3">
              Logout
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}

function MenuItem({
  to,
  icon,
  text,
  collapsed,
}) {
  return (
    <NavLink to={to}
      style={({ isActive }) => ({display: "flex",justifyContent: collapsed ? "center": "flex-start",
        alignItems: "center",height: "52px",borderRadius: "14px",marginBottom: "10px",textDecoration: "none",
        color: "#E5E7EB",
        background: isActive? "#2563EB": "transparent",
        transition: "0.25s",
        padding: collapsed? "0": "0 18px",
      })}
    >
      <span
        style={{fontSize: "20px",display: "flex",justifyContent: "center",alignItems: "center",width: "24px",
        }}
      >
        {icon}
      </span>

      {!collapsed && (
        <span
          style={{
            marginLeft: "18px",
            fontWeight: 500,
          }}
        >
          {text}
        </span>
      )}
    </NavLink>
  );
}

export default Sidebar;