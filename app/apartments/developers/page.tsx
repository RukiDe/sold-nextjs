import { ButtonPill } from "@/components/ButtonPill";

export default function DevelopersPage() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-4">Developers</h1>

        <p className="text-lg text-gray-700 mb-8">
          <span className="font-medium text-gray-900">Buildings that stay easier to own.</span>{" "}
          Optional financial resilience for apartment projects.
        </p>

        <div className="border border-gray-200 rounded-2xl p-6 mb-10">
          <p className="text-gray-700">
            Sold partners with developers to support stronger long-term building outcomes through a voluntary levy
            offset model that benefits owners without adding risk or complexity.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-3">The long-term challenge</h2>
        <p className="text-gray-700 mb-6">
          Most buildings are compliant at handover. Few are financially resilient years later.
        </p>
        <ul className="text-gray-700 list-disc pl-5 mb-10 space-y-2">
          <li>Maintenance plans drift from reality</li>
          <li>Early special levies erode trust</li>
          <li>Insurance costs rise</li>
          <li>Developers carry reputational tail risk</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">How it works for developers</h2>
        <div className="border border-gray-200 rounded-2xl p-6 mb-10">
          <p className="text-gray-700">
            Levy Offset can be introduced at any stage of a project’s lifecycle:
          </p>
          <ul className="text-gray-700 list-disc pl-5 mt-3 space-y-2">
            <li>During development</li>
            <li>At handover</li>
            <li>Or years after completion</li>
          </ul>

          <div className="mt-4">
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Participation is individual and voluntary</li>
              <li>Finance decisions are owner-initiated</li>
              <li>Rebates are offset directly to owners and appear as a credit on individual strata invoices</li>
              <li>The Owners Corporation does not rely on participation</li>
            </ul>
            <p className="text-gray-700 mt-4">If no owners participate, nothing breaks.</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Why developers engage</h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">During development</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Sustainability-aligned finance narrative</li>
              <li>Stronger long-term asset story</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">During sales</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Clear cost-of-ownership differentiation</li>
              <li>Credible answers to levy questions</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">After handover</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Better-funded maintenance outlook</li>
              <li>Reduced reputational tail risk</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Start the conversation</h2>
        <p className="text-gray-700 mb-6">
          We work with developers on both current and future projects. This begins with a short discussion.
        </p>

        {/* Simple form stub (wire to API later) */}
        <form className="border border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Company name</label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="text"
                name="company"
                placeholder="e.g. SMA Projects"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Contact name</label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="text"
                name="contactName"
                placeholder="Your name"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Email</label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="email"
                name="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Phone</label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="tel"
                name="phone"
                placeholder="04xx xxx xxx"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Project name / portfolio size <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="text"
                name="project"
                placeholder="e.g. 3 projects / 420 lots"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Project stage <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <select
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="stage"
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                <option value="planning">Planning</option>
                <option value="construction">Construction</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Are you currently involved with the Owners Corporation? <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              name="involvedWithOC"
              defaultValue=""
            >
              <option value="" disabled>
                Select…
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="pt-2">
            <ButtonPill href="https://calendly.com/rukid-sold/30min">Let's chat</ButtonPill>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-8">
          Note: This page is general information only and does not constitute financial advice.
        </p>
      </section>
    </main>
  );
}
