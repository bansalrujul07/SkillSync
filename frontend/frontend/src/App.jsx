import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateService from "./pages/CreateService";
import ServiceDetails from "./pages/ServiceDetails";
import IncomingRequests from "./pages/IncomingRequests";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/services/new" element={<ProtectedRoute><CreateService /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><IncomingRequests /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;