import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E5DC] bg-[#F7F6F0]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#727D55] text-lg font-semibold text-white">
            S
          </span>

          <span className="text-xl font-bold tracking-tight text-[#252923]">
            SkillSync
          </span>
        </Link>

        {/* Main navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive
                  ? "font-semibold text-[#566440]"
                  : "text-[#77796F] hover:text-[#252923]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive
                  ? "font-semibold text-[#566440]"
                  : "text-[#77796F] hover:text-[#252923]"
              }`
            }
          >
            Explore Services
          </NavLink>
        </div>

        {/* Authentication actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/services/new"
            className="hidden rounded-lg border border-[#DCDDCF] px-4 py-2.5 text-sm font-semibold text-[#45483F] transition hover:bg-[#ECECE3] sm:inline-flex"
          >
            Offer a Service
          </Link>
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;