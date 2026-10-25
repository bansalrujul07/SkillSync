
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const fullName = formData.get("fullName").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8081"}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ fullName, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please log in." },
      });
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
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#F7F6F0] px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#E4E3D8] bg-white shadow-[0_20px_60px_rgba(37,41,35,0.05)] md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#E9EBDD] p-10 md:flex md:flex-col md:justify-between lg:p-14">
          <div className="hero-orb hero-orb-sage -right-12 top-20 h-56 w-56" />
          <div className="hero-orb hero-orb-cream -bottom-12 -left-10 h-48 w-48" />

          <div className="relative">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#727D55] text-lg font-semibold text-white">
              S
            </span>
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-[#66734D]">
              Join SkillSync
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#252923] lg:text-5xl">
              Your skills can take you places.
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-[#686B60]">
              Meet people, share your expertise, and discover what you can
              accomplish together.
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
            Start something meaningful
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#252923]">
            Create your account
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#77796F]">
            Join SkillSync and start connecting through skills.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-[#45483F]"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={60}
                className="w-full rounded-lg border border-[#DCDDCF] bg-white px-4 py-3 text-sm text-[#252923] outline-none transition placeholder:text-[#A0A195] focus:border-[#87916F] focus:ring-4 focus:ring-[#E9EBDD]"
              />
            </div>

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
                placeholder="At least 6 characters"
                autoComplete="new-password"
                minLength={6}
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#77796F]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#566440] hover:text-[#343F28]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
