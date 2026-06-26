import { FaBell } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";

    if (path.startsWith("/properties"))
      return "Properties";

    if (path.startsWith("/rooms"))
      return "Rooms";

    if (path.startsWith("/tenants"))
      return "Tenants";

    if (path.startsWith("/agreements"))
      return "Lease Agreements";

    if (path.startsWith("/profile"))
      return "My Profile";

    return "RRMS";
  };

  return (
    <div
      className="bg-blue shadow-sm px-4 py-3 d-flex justify-content-between align-items-center"
    >
      <div>
        <h3 className="mb-1 fw-bold">
          🏠 {getPageTitle()}
        </h3>

        <p
          className="mb-0"
          style={{
            paddingLeft : "10px"
          }}
        >
          Welcome <span className="fw-semibold text-dark">Admin</span> 👋
        </p>
      </div>

      <div className="d-flex align-items-center gap-3">

        <button
          className="btn btn-light position-relative"
        >
          <FaBell size={18} />

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            3
          </span>
        </button>

        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="Admin"
          width="40"
          height="40"
          className="rounded-circle border"
        />

      </div>
    </div>
  );
}

export default Header;