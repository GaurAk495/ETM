// components/Nav.jsx
import { NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  if (location.pathname === "/app" || location.pathname == "/employee") {
    return;
  }

  const linkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : "text-white/80";
  return (
    <nav className="p-4 shadow-md bg-black flex gap-5 items-center align-middle text-xl">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/login" className={linkClass}>
        Login
      </NavLink>
      <NavLink to="/signup" className={linkClass}>
        Signup
      </NavLink>
      <NavLink to="/app" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/employee" className={linkClass}>
        Employee
      </NavLink>
    </nav>
  );
}
