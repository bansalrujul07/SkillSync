import { Link } from "react-router-dom";

function Services() {
  return (
    <main className="min-h-screen bg-[#F7F6F0] text-[#252923]">
      {/* Page heading */}
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

      {/* Service discovery area */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Browse by interest
            </h2>

            <p className="mt-2 text-sm text-[#77796F]">
              Explore different areas of expertise.
            </p>
          </div>

          <span className="text-sm text-[#898A80]">
            More services coming soon
          </span>
        </div>

        {/* Categories */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Design & Creativity",
              description:
                "Graphic design, UI/UX, illustration, and creative work.",
              symbol: "✳",
            },
            {
              number: "02",
              title: "Technology",
              description:
                "Web development, programming, and technical guidance.",
              symbol: "</>",
            },
            {
              number: "03",
              title: "Learning & Tutoring",
              description:
                "Learn new subjects, practice skills, and share knowledge.",
              symbol: "Aa",
            },
            {
              number: "04",
              title: "Business & Growth",
              description:
                "Planning, productivity, and professional development.",
              symbol: "↗",
            },
          ].map((category) => (
            <article
              key={category.number}
              className="group rounded-xl border border-[#E4E3D8] bg-white/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#C8CEB8] hover:bg-white hover:shadow-[0_12px_30px_rgba(37,41,35,0.05)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EEF0E7] text-sm font-semibold text-[#66734D]">
                  {category.symbol}
                </span>

                <span className="text-xs text-[#A0A195]">
                  {category.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#77796F]">
                {category.description}
              </p>
            </article>
          ))}
        </div>

        {/* Empty state */}
        <div className="mt-12 rounded-xl border border-dashed border-[#D8D9CE] px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EBDD] text-xl text-[#66734D]">
            ✳
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Your next connection starts here
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#77796F]">
            We're preparing the service directory. Soon, you'll be able to
            browse individual services and connect with their providers.
          </p>

          <Link
            to="/register"
            className="mt-6 inline-flex rounded-lg bg-[#727D55] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5F6946]"
          >
            Join SkillSync
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Services;