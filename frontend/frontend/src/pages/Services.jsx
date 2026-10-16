import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services", {
          params: {
            search: searchTerm,
            category: selectedCategory,
          },
        });
        setServices(response.data.services || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load services. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#F7F6F0] text-[#252923]">
      <section className="border-b border-[#E7E5DC]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#727D55]">
            Find your next connection
          </p>

          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore services.
            <span className="block text-[#727D55]">
              Discover possibilities.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#77796F]">
            Find people with the skills you need, learn something new, or
            discover how you can help someone else.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Explore available services
            </h2>
            <p className="mt-2 text-sm text-[#77796F]">
              Discover skills offered by the SkillSync community.
            </p>
          </div>

          <Link
            to="/services/new"
            className="inline-flex w-fit rounded-lg bg-[#727D55] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5F6946]"
          >
            Offer a Service
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search services..."
            className="w-full rounded-lg border border-[#D8D9CE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#727D55]"
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-lg border border-[#D8D9CE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#727D55]"
          >
            <option value="">All categories</option>
            <option value="Development">  Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
            <option value="Tutoring">Tutoring</option>
          </select>
        </div>

        {loading && (
          <p className="py-16 text-center text-[#77796F]">
            Loading services...
          </p>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service._id}
                className="rounded-xl border border-[#E4E3D8] bg-white/80 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,41,35,0.06)]"
              >
                <span className="inline-flex rounded-full bg-[#EEF0E7] px-3 py-1 text-xs font-medium text-[#66734D]">
                  {service.category}
                </span>

                <h3 className="mt-4 text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#77796F]">
                  {service.description}
                </p>

                <div className="mt-6 border-t border-[#E7E5DC] pt-4">
                  <p className="font-semibold">
                    {
                      service.exchangeType === "skill-exchange"
                        ? "Skill Exchange"
                        : service.exchangeType === "free"
                          ? "Free Service"
                          : Number(service.price) > 0
                            ? `₹${Number(service.price).toLocaleString("en-IN")}`
                            : "Free / Skill Exchange"
                    }
                  </p>

                  <p className="mt-2 text-sm text-[#77796F]">
                    Offered by {service.owner?.fullName || "SkillSync member"}
                  </p>
                </div>
                <Link
                  to={`/services/${service._id}`}
                  className="mt-5 inline-flex text-sm font-medium text-[#66734D] transition hover:text-[#252923]"
                >
                  View details →
                </Link>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-[#D8D9CE] px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EBDD] text-xl text-[#66734D]">
              ✳
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Be the first to offer a service
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#77796F]">
              There are no services available yet. Share a skill and help
              someone in the community.
            </p>

            <Link
              to="/services/new"
              className="mt-6 inline-flex rounded-lg bg-[#727D55] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5F6946]"
            >
              Create your first listing
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Services;