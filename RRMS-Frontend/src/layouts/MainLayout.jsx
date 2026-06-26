import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function MainLayout() {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="d-flex">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        style={{
          marginLeft: collapsed
            ? "50px"
            : "225px",
          width: "100%",
          background: "linear-gradient(135deg,#DCE6F2 0%, #C9D8EA 100%)",
          minHeight:"100vh",
          transition: "0.3s"
        }}
      >

        <Header />

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default MainLayout;