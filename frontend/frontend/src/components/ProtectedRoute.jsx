import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../api/axios";

function ProtectedRoute({ children }) {
    const [status, setStatus] = useState("checking");
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const verifySession = async () => {
            try {
                await api.get("/auth/me");

                if (isMounted) {
                    setStatus("authenticated");
                }
            } catch {
                if (isMounted) {
                    setStatus("unauthenticated");
                }
            }
        };

        verifySession();

        return () => {
            isMounted = false;
        };
    }, []);

    if (status === "checking") {
        return (
            <main className="min-h-screen bg-[#F7F6F0] px-6 py-16 text-center text-[#77796F]">
                Verifying your session...
            </main>
        );
    }

    if (status === "unauthenticated") {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}

export default ProtectedRoute;