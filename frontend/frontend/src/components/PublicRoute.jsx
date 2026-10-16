import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

function PublicRoute({ children }) {
    const [status, setStatus] = useState("checking");

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
                Checking your session...
            </main>
        );
    }

    if (status === "authenticated") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;
