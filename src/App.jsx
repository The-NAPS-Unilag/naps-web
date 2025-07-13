import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/Login";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import VerifyAccount from "./pages/authentication/VerifyAccount";
import DashboardLayout from "./layouts/DashboardLayout";
import ProfileOverview from "./pages/profileOverview";
import ResetPassword from "./pages/authentication/ResetPassword";
import UpcomingEvents from "./pages/upcomingEvents";
import Resources from "./pages/Resources";
// import Resources from "./pages/Resources";
// import Forums from "./pages/Forums";
import MentorProgram from "./pages/MentorProgram";
import ResourceData from "./components/resources/ResourceData";
import AddResource from "./components/resources/AddResource";
// import UpcomingEvents from "./pages/UpcomingEvents";
// import ProfileOverview from "./pages/ProfileOverview";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/verifyAccount" element={<VerifyAccount />} />

          {/* Protected Dashboard Routes with DashboardLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="resources" element={<Resources />} />
            <Route path="/resources/:level" element={<ResourceData />} />
            <Route path="/resources/addResource" element={<AddResource />}></Route>
            {/*<Route path="forums" element={<Forums />} /> */}
            <Route path="mentor-program" element={<MentorProgram />} /> 
            <Route path="upcoming-events" element={<UpcomingEvents />} />
            <Route path="profile-overview" element={<ProfileOverview />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
