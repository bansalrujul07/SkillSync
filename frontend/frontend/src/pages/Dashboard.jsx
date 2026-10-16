import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function formatStatus(status) {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [summaryResponse, servicesResponse] = await Promise.all([
        api.get("/dashboard/summary"),
        api.get("/services/mine"),
      ]);

      setDashboard(summaryResponse.data);
      const servicesData = servicesResponse.data;

      setMyServices(
        Array.isArray(servicesData)
          ? servicesData
          : servicesData.services || servicesData.data || []
      );
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load your dashboard. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const stats = [
    {
      label: "Services offered",
      value: dashboard?.stats?.totalServices ?? 0,
    },
    {
      label: "Requests received",
      value: dashboard?.stats?.incomingRequests ?? 0,
    },
    {
      label: "Requests sent",
      value: dashboard?.stats?.outgoingRequests ?? 0,
    },
  ];

  const recentRequests = (dashboard?.recentIncoming || []).map((request) => ({
    id: request._id,
    name: request.requester?.fullName || "Unknown user",
    service: request.service?.title || "Service unavailable",
    status: formatStatus(request.status),
  }));

  return (
    <main className="min-h-screen bg-[#F7F6F0] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[#727D55]">
              YOUR WORKSPACE
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#252923] sm:text-4xl">
              Your dashboard
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#77796F]">
              Keep track of your services, connections, and requests.
            </p>
          </div>

          <Link
            to="/services/new"
            className="inline-flex items-center justify-center rounded-lg bg-[#727D55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5F6946]"
          >
            + Offer a service
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={loadDashboard}
              className="mt-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        <section className="mt-9 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#E7E5DC] bg-white p-6"
            >
              <p className="text-sm text-[#77796F]">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-[#252923]">
                {loading ? "—" : String(stat.value).padStart(2, "0")}
              </p>
            </div>
          ))}
        </section>

        {loading ? (
          <div className="mt-8 rounded-xl border border-[#E7E5DC] bg-white p-8 text-sm text-[#77796F]">
            Loading your dashboard...
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="min-w-0">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#252923]">
                    My services
                  </h2>
                  <p className="mt-1 text-sm text-[#77796F]">
                    Skills you're sharing with the community.
                  </p>
                </div>

                <Link
                  to="/services"
                  className="shrink-0 text-sm font-semibold text-[#566440] hover:text-[#343F28]"
                >
                  Explore
                </Link>
              </div>

              {myServices.length === 0 ? (
                <div className="rounded-xl border border-[#E7E5DC] bg-white p-6">
                  <h3 className="font-semibold text-[#252923]">
                    No services yet
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#77796F]">
                    Create your first listing to start sharing your skills.
                  </p>
                  <Link
                    to="/services/new"
                    className="mt-4 inline-block text-sm font-semibold text-[#566440] hover:text-[#343F28]"
                  >
                    Create a service →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myServices.map((service) => (
                    <article
                      key={service._id || service.title}
                      className="rounded-xl border border-[#E7E5DC] bg-white p-5 sm:p-6"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium text-[#727D55]">
                            {service.category || "General"}
                          </p>
                          <h3 className="mt-2 font-semibold text-[#252923]">
                            {service.title}
                          </h3>
                        </div>

                        <span className="rounded-md bg-[#E7EBDD] px-2.5 py-1 text-xs font-medium text-[#566440]">
                          {formatStatus(service.status || "active")}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-[#77796F]">
                        {service.description || "No description provided."}
                      </p>

                      <Link
                        to={`/services/${service._id}`}
                        className="mt-4 inline-block text-sm font-semibold text-[#566440] hover:text-[#343F28]"
                      >
                        View listing →
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="min-w-0">
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-[#252923]">
                  Recent requests
                </h2>
                <p className="mt-1 text-sm text-[#77796F]">
                  Requests people have sent for your services.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#E7E5DC] bg-white">
                {recentRequests.length === 0 ? (
                  <div className="p-6">
                    <h3 className="font-semibold text-[#252923]">
                      No incoming requests yet
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#77796F]">
                      New requests for your services will appear here.
                    </p>
                  </div>
                ) : (
                  recentRequests.map((request, index) => (
                    <article
                      key={request.id}
                      className={`p-5 sm:p-6 ${
                        index !== recentRequests.length - 1
                          ? "border-b border-[#E7E5DC]"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#252923]">
                            {request.name}
                          </h3>
                          <p className="mt-1 text-sm leading-5 text-[#77796F]">
                            {request.service}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${
                            request.status === "Pending"
                              ? "bg-[#F5EBD4] text-[#80642E]"
                              : request.status === "Accepted"
                                ? "bg-[#E7EBDD] text-[#566440]"
                                : "bg-[#EEEEEA] text-[#62645B]"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <Link
                to="/requests"
                className="mt-4 inline-block text-sm font-semibold text-[#566440] hover:text-[#343F28]"
              >
                View all requests →
              </Link>

              <div className="mt-5 rounded-xl border border-[#E7E5DC] bg-[#E9EBDD] p-6">
                <h3 className="font-semibold text-[#252923]">
                  Have a skill to share?
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#686B60]">
                  Make your knowledge available to people who can benefit from
                  it.
                </p>
                <Link
                  to="/services/new"
                  className="mt-4 inline-block text-sm font-semibold text-[#566440] hover:text-[#343F28]"
                >
                  Create a listing →
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default Dashboard;