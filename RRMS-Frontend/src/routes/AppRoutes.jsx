import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Properties from "../pages/properties/Properties";
import Rooms from "../pages/rooms/Rooms";
import Tenants from "../pages/tenants/TenantsPage";
import Agreements from "../pages/agreements/Agreements";
import MyProfile from "../pages/profile/MyProfile";
import AddProperty from "../pages/properties/AddProperty";
import PropertyDetails from "../pages/properties/PropertyDetails";
import EditProperty from "../pages/properties/EditProperty";
import AddRoom from "../pages/rooms/AddRoom";
import RoomDetails from "../pages/rooms/RoomDetails";
import EditRoom from "../pages/rooms/EditRoom";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
            path="/properties/add"
            element={<AddProperty />}
            />

        <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          /> 

        <Route 
          path="/properties/:id"
          element={<EditProperty />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />
        
        <Route
          path="/rooms/add"
          element={<AddRoom />}
        />

        <Route
          path ="/rooms/:id"
          element = {<RoomDetails />}
        />

        <Route 
          path = "/room/:id"
          element = {<EditRoom/>}
        />

        <Route
          path="/tenants"
          element={<Tenants />}
        />

        <Route
          path="/agreements"
          element={<Agreements />}
        />

        <Route
          path="/profile"
          element={<MyProfile />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;