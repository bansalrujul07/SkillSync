import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="bg-[#F7F6F0] text-[#252923]">
      {/* Hero section */}
      <section className="relative isolate overflow-hidden">
        {/* Animated background shapes */}
        <div className="hero-orb hero-orb-sage -right-12 top-16 h-64 w-64 md:right-20 md:h-80 md:w-80" />
        <div className="hero-orb hero-orb-cream -left-20 bottom-0 h-56 w-56 md:left-24 md:h-72 md:w-72" />

        <div className="relative mx-auto grid min-h-[590px] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-8 lg:py-28">
          {/* Hero content */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DCDDCF] bg-white/70 px-3 py-1.5 text-sm text-[#626A52]">
              <span className="h-2 w-2 rounded-full bg-[#84916A]" />
              A community built around skills
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your skills have value.
              <span className="mt-2 block text-[#727D55]">
                Put them to work.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#77796F] sm:text-lg">
              Find people who can help you grow, or share what you know with
              someone who needs it. Good work starts with the right connection.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg bg-[#727D55] px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5F6946] hover:shadow-md"
              >
                Explore services
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-[#D8D9CE] bg-white/60 px-6 py-3.5 text-sm font-medium text-[#45483F] transition-colors hover:bg-white"
              >
                Share your skills
              </Link>
            </div>

            <p className="mt-8 text-sm text-[#898A80]">
              Learn together. Help each other. Grow your way.
            </p>
          </div>

          {/* Visual panel */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#E9EBDD]/70 blur-2xl" />

            <div className="relative rounded-2xl border border-[#E4E3D8] bg-white/85 p-6 shadow-[0_20px_60px_rgba(37,41,35,0.06)] backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-[#EEEDE6] pb-5">
                <div>
                  <p className="text-sm text-[#898A80]">The SkillSync community</p>
                  <h2 className="mt-1 text-lg font-semibold">
                    Skills worth sharing
                  </h2>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF0E7] text-xl">
                  ✳
                </span>
              </div>

              <div className="space-y-3 pt-5">
                {[
                  {
                    icon: "✎",
                    title: "Design & Creativity",
                    description: "Bring ideas to life",
                  },
                  {
                    icon: "</>",
                    title: "Technology",
                    description: "Build something useful",
                  },
                  {
                    icon: "↗",
                    title: "Learning & Guidance",
                    description: "Make your next move",
                  },
                ].map((skill) => (
                  <div
                    key={skill.title}
                    className="flex items-center gap-4 rounded-xl border border-[#F0EFE8] p-4 transition-all duration-200 hover:border-[#D8DDCC] hover:bg-[#F8F8F3]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EEF0E7] text-sm font-semibold text-[#66734D]">
                      {skill.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#34372F]">
                        {skill.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#898A80]">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-[#F5F5EF] p-4">
                <p className="text-sm leading-6 text-[#686B60]">
                  Everyone has something valuable to offer. Find your people
                  and make it count.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 rounded-xl border border-[#E4E3D8] bg-white px-4 py-3 shadow-lg sm:-left-8">
              <p className="text-xs text-[#898A80]">The idea</p>
              <p className="mt-1 text-sm font-semibold text-[#566440]">
                Skills create connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#E7E5DC] bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#727D55]">
              Simple by design
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A better way to exchange skills.
            </h2>

            <p className="mt-4 leading-7 text-[#77796F]">
              Whether you need a hand or have knowledge to share, getting
              started should be straightforward.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Discover",
                description:
                  "Explore services and find people whose skills match what you need.",
              },
              {
                number: "02",
                title: "Connect",
                description:
                  "Send a service request and discuss the work you want to get done.",
              },
              {
                number: "03",
                title: "Grow",
                description:
                  "Share your expertise, learn from others, and build meaningful connections.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="border-t border-[#DCDDCF] pt-5"
              >
                <span className="text-sm font-medium text-[#87916F]">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>

                <p className="mt-3 max-w-sm leading-7 text-[#77796F]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#566440] transition-colors hover:text-[#343F28]"
            >
              Start exploring
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E7E5DC]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#77796F] sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span className="font-semibold text-[#34372F]">SkillSync</span>
          <p>Share what you know. Discover what you need.</p>
          <p>© {new Date().getFullYear()} SkillSync</p>
        </div>
      </footer>
    </main>
  );
}

export default Home;