import EmployeeHeader from "../components/Employee-components/EmployeeHeader";
import { Outlet } from "react-router-dom";

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <EmployeeHeader />
      <Outlet />
    </div>
  );
}
