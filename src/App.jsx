import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Homepage from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Supervisors from "./pages/Supervisors";
import ContactUs from "./pages/Contact";

import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyForm from "./pages/admin/FacultyForm";
import ReviewIdeas from "./pages/admin/ReviewIdeas";
import FacultyList from "./pages/admin/FacultyList";

import StudentDashboard from "./pages/student/StudentDashboard";
import IdeaForm from "./pages/student/IdeaForm";

import FacultyDashboard from "./pages/faculty/FacultyDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/supervisors" element={<Supervisors />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Student Protected Routes */}
        <Route path="/student/idea-form" element={
          <ProtectedRoute allowedRole="student">
            <IdeaForm />
          </ProtectedRoute>
        } />
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />

        {/* Faculty Protected Route */}
        <Route path="/faculty/dashboard" element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        } />

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/faculty-form" element={
          <ProtectedRoute allowedRole="admin">
            <FacultyForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/review-ideas" element={
          <ProtectedRoute allowedRole="admin">
            <ReviewIdeas />
          </ProtectedRoute>
        } />
        <Route path="/admin/faculty-list" element={
          <ProtectedRoute allowedRole="admin">
            <FacultyList />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
