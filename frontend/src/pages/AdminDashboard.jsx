import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin-components/AdminHeader.jsx";

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      <Outlet />
    </div>
  );
}
