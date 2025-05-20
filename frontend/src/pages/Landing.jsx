import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
function Landing() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default Landing;
