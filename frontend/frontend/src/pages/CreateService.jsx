import { Link } from "react-router-dom";

function CreateService() {
  return (
    <main className="min-h-screen bg-[#F7F6F0] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-[#566440] hover:text-[#343F28]"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-6 rounded-2xl border border-[#E7E5DC] bg-white p-6 sm:p-10">
          <p className="text-sm font-medium text-[#727D55]">
            SHARE YOUR EXPERTISE
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#252923]">
            Offer a service
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#77796F]">
            Tell the community what you can help them with.
          </p>

          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-[#45483F]"
              >
                Service title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. React development mentoring"
                required
                maxLength={100}
                className="w-full rounded-lg border border-[#DCDDCF] px-4 py-3 text-sm outline-none focus:border-[#87916F] focus:ring-4 focus:ring-[#E9EBDD]"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-[#45483F]"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="w-full rounded-lg border border-[#DCDDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#87916F] focus:ring-4 focus:ring-[#E9EBDD]"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option>Design & Creativity</option>
                <option>Technology</option>
                <option>Learning & Tutoring</option>
                <option>Business & Growth</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-[#45483F]"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe your service, experience, and what someone can expect..."
                required
                maxLength={2000}
                className="w-full resize-y rounded-lg border border-[#DCDDCF] px-4 py-3 text-sm leading-6 outline-none focus:border-[#87916F] focus:ring-4 focus:ring-[#E9EBDD]"
              />
            </div>

            <div>
              <label
                htmlFor="exchangeType"
                className="mb-2 block text-sm font-medium text-[#45483F]"
              >
                Service arrangement
              </label>
              <select
                id="exchangeType"
                name="exchangeType"
                required
                defaultValue="skill-exchange"
                className="w-full rounded-lg border border-[#DCDDCF] bg-white px-4 py-3 text-sm outline-none focus:border-[#87916F] focus:ring-4 focus:ring-[#E9EBDD]"
              >
                <option value="skill-exchange">Skill exchange</option>
                <option value="free">Free service</option>
                <option value="paid">Paid service</option>
              </select>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#E7E5DC] pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-[#DCDDCF] px-5 py-3 text-sm font-semibold text-[#45483F] hover:bg-[#F7F6F0]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-[#727D55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5F6946]"
              >
                Create listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateService;