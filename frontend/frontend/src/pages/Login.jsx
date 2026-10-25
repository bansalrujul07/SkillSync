
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8081"}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that the backend is running."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#F7F6F0] px-6 py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#E4E3D8] bg-white shadow-[0_20px_60px_rgba(37,41,35,0.05)] md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#E9EBDD] p-10 md:flex md:flex-col md:justify-between lg:p-14">
          <div className="hero-orb hero-orb-sage -right-12 top-20 h-56 w-56" />
          <div className="hero-orb hero-orb-cream -bottom-12 -left-10 h-48 w-48" />

          <div className="relative">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#727D55] text-lg font-semibold text-white">
              S
            </span>
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-[#66734D]">
              Welcome to SkillSync
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#252923] lg:text-5xl">
              Good things happen when skills connect.
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-[#686B60]">
              Find the help you need. Share what you know. Build something
              meaningful together.
            </p>
          </div>

          <p className="relative mt-12 text-sm text-[#77796F]">
            A community built on shared knowledge.
          </p>
        </div>

        <div className="p-7 sm:p-10 lg:p-14">
          <div className="mb-8 md:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#727D55] font-semibold text-white">
              S
            </span>
          </div>

          <p className="text-sm font-medium text-[#727D55]">
            Your journey continues
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#252923]">
            Welcome back
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#77796F]">
            Enter your details to access your SkillSync account.
          </p>

          {location.state?.message && (
            <p
              role="status"
              className="mt-5 rounded-lg border border-[#D8DFC9] bg-[#F0F2E9] px-4 py-3 text-sm text-[#566440]"
            >
              {location.state.message}
            </p>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#45483F]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[#DCDDCF] bg-white px-4 py-3 text-sm text-[#252923] outline-none transition placeholder:text-[#A0A195] focus:border-[#87916F] focus:ring-4 focus:ring-[#E9EBDD]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#45483F]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-[#DCDDCF] bg-white px-4 py-3 text-sm text-[#252923] outline-none transition placeholder:text-[#A0A195] focus:border-[#87916F] focus:ring-4 focus:ring-[#E9EBDD]"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#727D55] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5F6946] focus:outline-none focus:ring-4 focus:ring-[#E9EBDD] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#77796F]">
            New to SkillSync?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#566440] hover:text-[#343F28]"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;