import { Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import OverView from "./components/Employee-components/OverView";
import TeamChat from "./components/Employee-components/TeamChat";
import TimeTracker from "./components/Employee-components/TimeTracker";

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Document from "./components/Employee-components/Document";
import MyTasks from "./components/Employee-components/MyTask";
import "./App.css";
import ProjectsManagement from "./components/Admin-components/ProjectsManagement";
import AdminOverview from "./components/Admin-components/AdminOverview";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="signup" element={<Signup />} /> */}
        </Route>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminOverview />} />
          <Route path="project" element={<ProjectsManagement />} />
        </Route>
        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route index element={<OverView />} />
          <Route path="chat" element={<TeamChat />} />
          <Route path="mytask" element={<MyTasks />} />
          <Route path="timetracker" element={<TimeTracker />} />
          <Route path="documents" element={<Document />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
