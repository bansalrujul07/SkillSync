import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
import Chat from "./pages/Chat";
import api from "./api/axios";

function HomeRoute() {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        let active = true;

        api.get("/auth/me")
            .then(() => {
                if (active) setStatus("authenticated");
            })
            .catch(() => {
                if (active) setStatus("unauthenticated");
            });

        return () => {
            active = false;
        };
    }, []);

    if (status === "checking") {
        return (
            <main className="min-h-screen bg-[#F7F6F0] px-6 py-16 text-center text-[#77796F]">
                Checking your session...
            </main>
        );
    }

    return status === "authenticated"
        ? <Navigate to="/dashboard" replace />
        : <Home />;
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />

                <Route
                    path="/login"
                    element={<PublicRoute><Login /></PublicRoute>}
                />
                <Route
                    path="/register"
                    element={<PublicRoute><Register /></PublicRoute>}
                />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
                />
                <Route
                    path="/services/new"
                    element={<ProtectedRoute><CreateService /></ProtectedRoute>}
                />
                <Route
                    path="/requests"
                    element={<ProtectedRoute><IncomingRequests /></ProtectedRoute>}
                />
                <Route
                    path="/chat/:requestId"
                    element={<ProtectedRoute><Chat /></ProtectedRoute>}
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
