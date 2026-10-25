
import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Navbar() {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const checkAuth = useCallback(async () => {
        setCheckingAuth(true);

        try {
            const response = await api.get("/auth/me");
            setUser(response.data.user);
        } catch {
            setUser(null);
        } finally {
            setCheckingAuth(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth, location.pathname]);

    const handleLogout = async () => {
        setLoggingOut(true);

        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/", { replace: true });
        } catch (error) {
            console.error(
                "Logout failed:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoggingOut(false);
        }
    };

    const navLinkClass = ({ isActive }) =>
        `text-sm transition-colors ${isActive
            ? "font-semibold text-[#566440]"
            : "text-[#77796F] hover:text-[#252923]"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-[#E7E5DC] bg-[#F7F6F0]/95 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <Link
                    to={user ? "/dashboard" : "/"}
                    className="flex items-center gap-2"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#727D55] text-lg font-semibold text-white">
                        S
                    </span>

                    <span className="text-xl font-bold tracking-tight text-[#252923]">
                        SkillSync
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {checkingAuth ? null : user ? (
                        <>
                            <NavLink to="/dashboard" className={navLinkClass}>
                                Dashboard
                            </NavLink>

                            <NavLink to="/services" className={navLinkClass}>
                                Explore Services
                            </NavLink>

                            <NavLink to="/requests" className={navLinkClass}>
                                Incoming Requests
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" end className={navLinkClass}>
                                Home
                            </NavLink>

                            <NavLink to="/services" className={navLinkClass}>
                                Explore Services
                            </NavLink>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {checkingAuth ? (
                        <span className="text-sm text-[#77796F]">
                            Checking session...
                        </span>
                    ) : user ? (
                        <>
                            <Link
                                to="/services/new"
                                className="hidden rounded-lg border border-[#DCDDCF] px-4 py-2.5 text-sm font-semibold text-[#45483F] transition hover:bg-[#ECECE3] sm:inline-flex"
                            >
                                Offer a Service
                            </Link>

                            <Link
                                to="/dashboard"
                                className="hidden text-sm text-[#77796F] hover:text-[#252923] lg:inline"
                            >
                                Hi, {user.fullName}
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="rounded-lg border border-[#DCDDCF] px-4 py-2.5 text-sm font-medium text-[#45483F] transition hover:bg-[#ECECE3] disabled:opacity-60"
                            >
                                {loggingOut ? "Logging out..." : "Log out"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-[#45483F] transition-colors hover:bg-[#ECECE3] sm:inline-flex"
                            >
                                Log in
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-[#727D55] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#5F6946] hover:shadow-sm"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
