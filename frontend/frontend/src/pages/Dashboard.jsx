import { Link } from "react-router-dom";

const stats = [
  { label: "Services offered", value: "03" },
  { label: "Requests received", value: "04" },
  { label: "Requests sent", value: "02" },
];

const myServices = [
  {
    title: "UI/UX Design Review",
    category: "Design & Creativity",
    description: "Practical feedback to make your product easier to use.",
    status: "Active",
  },
  {
    title: "Frontend Development",
    category: "Technology",
    description: "Help with responsive interfaces and React applications.",
    status: "Active",
  },
  {
    title: "Portfolio Feedback",
    category: "Learning & Guidance",
    description: "Suggestions to strengthen your portfolio and projects.",
    status: "Active",
  },
];

const requests = [
  {
    name: "Aarav Sharma",
    service: "UI/UX Design Review",
    status: "Pending",
  },
  {
    name: "Meera Kapoor",
    service: "Frontend Development",
    status: "Accepted",
  },
  {
    name: "Ishaan Verma",
    service: "Portfolio Feedback",
    status: "Completed",
  },
];

function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F7F6F0] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
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

        {/* Overview statistics */}
        <section className="mt-9 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#E7E5DC] bg-white p-6"
            >
              <p className="text-sm text-[#77796F]">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-[#252923]">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Main dashboard content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* My services */}
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

            <div className="space-y-4">
              {myServices.map((service) => (
                <article
                  key={service.title}
                  className="rounded-xl border border-[#E7E5DC] bg-white p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-[#727D55]">
                        {service.category}
                      </p>
                      <h3 className="mt-2 font-semibold text-[#252923]">
                        {service.title}
                      </h3>
                    </div>

                    <span className="rounded-md bg-[#E7EBDD] px-2.5 py-1 text-xs font-medium text-[#566440]">
                      {service.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#77796F]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Recent requests */}
          <section className="min-w-0">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[#252923]">
                Recent requests
              </h2>
              <p className="mt-1 text-sm text-[#77796F]">
                An overview of your service connections.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E7E5DC] bg-white">
              {requests.map((request, index) => (
                <article
                  key={`${request.name}-${request.service}`}
                  className={`p-5 sm:p-6 ${
                    index !== requests.length - 1
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
              ))}
            </div>

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
      </div>
    </main>
  );
}

export default Dashboard;