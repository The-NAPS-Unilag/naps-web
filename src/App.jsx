import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/Login";
// import Dashboard from "./pages/Dashboard";
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
import Forums from "./pages/Forums";
import MentorProgram from "./pages/MentorProgram";
import AddResource from "./components/resources/AddResource";
import ResourceLevels from "./components/resources/ResourceLevels";
import ResourceFiles from "./components/resources/ResourceFiles";
// import UpcomingEvents from "./pages/UpcomingEvents";
// import ProfileOverview from "./pages/ProfileOverview";
import Dashboard from "./components/Dashboard/Dashboard";
import ForumHome from "./components/Forums/ForumHome";
import ForumPost from "./components/Forums/ForumPost";
import ForumResponse from "./components/Forums/ForumResponse";
import ForumTopic from "./components/Forums/ForumTopic";
import MyMentor from "./pages/MyMentor";

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
            <Route path="resources" element={<Resources />}>
              <Route index element={<ResourceLevels />} />
              <Route path="/resources:level" element={<ResourceFiles />} />
              <Route path="/resources/addResource" element={<AddResource />} />
            </Route>
            <Route path="forums" element={<Forums />}>
                <Route index element={<ForumHome />} />
                <Route path="/forums/forumPost" element={<ForumPost />} />
                <Route path="/forums/response" element={<ForumResponse />} />
                <Route path="/forums/topic/:topic" element={<ForumTopic />} />
            </Route>
            <Route path="mentor-program" element={<MentorProgram />} />
            <Route path="my-mentor" element={<MyMentor />} />
            <Route path="upcoming-events" element={<UpcomingEvents />} />
            <Route path="profile-overview" element={<ProfileOverview />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
