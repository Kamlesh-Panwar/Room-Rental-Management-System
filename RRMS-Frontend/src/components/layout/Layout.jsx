import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        style={{
          width: collapsed ? "50px" : "220px",
          transition: "all 0.3s ease",
          minHeight: "100vh",
          backgroundColor: "#f4f6f9",
        }}
      >
        <Header />

        <div className="container-fluid p-4">
          {children}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Layout;