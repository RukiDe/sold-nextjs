import { ButtonPill } from "@/components/ButtonPill";

export default function OwnersCorporationsPage() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-4">Owners Corporations</h1>

        <p className="text-lg text-gray-700 mb-8">
          <span className="font-medium text-gray-900">Reduce levies without increasing risk.</span>{" "}
          A voluntary levy offset model for apartment buildings.
        </p>

        <div className="border border-gray-200 rounded-2xl p-6 mb-10">
          <p className="text-gray-700">
            Sold helps Owners Corporations reduce levy pressure over time by rebating lender payments directly against
            participating owners’ levies.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>Only recommended where the outcome is equal to or better than the current setup</li>
            <li>No governance changes</li>
            <li>No reliance on participation</li>
            <li>No pooled funds</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mb-3">The problem</h2>
        <p className="text-gray-700 mb-6">
          Apartment buildings aren’t under pressure because owners don’t care. They’re under pressure because costs rise
          faster than levies.
        </p>
        <ul className="text-gray-700 list-disc pl-5 mb-10 space-y-2">
          <li>Insurance premiums increase</li>
          <li>Maintenance is deferred</li>
          <li>Special levies become unavoidable</li>
          <li>Committees change before problems surface</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">How Levy Offset works</h2>
        <div className="border border-gray-200 rounded-2xl p-6 mb-10">
          <p className="text-gray-700">
            Individual owners may choose to refinance their loan through Sold.
          </p>
          <p className="text-gray-700 mt-3">
            Where a lender pays an ongoing commission, that payment is rebated directly against the owner’s levy using
            the owner’s BPAY reference details.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            <li>Rebates are calculated quarterly in arrears</li>
            <li>Rebates apply only to participating owners</li>
            <li>Rebates appear as a credit on the owner’s strata invoice</li>
          </ul>

          <p className="text-gray-700 mt-4">
            No fees are paid by the Owners Corporation or Owners.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-3">What this means for your building</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">For the Owners Corporation</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Levy offsets for participating owners</li>
              <li>Reduced pressure on future levies</li>
              <li>Improved cashflow resilience</li>
              <li>Better long-term maintenance outcomes</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">For committees and strata managers</h3>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>No governance changes</li>
              <li>No compliance burden</li>
              <li>No financial dependency</li>
            </ul>
            <p className="text-gray-700 mt-3">This is a buffer, not a budget line.</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">See if your building qualifies</h2>
        <p className="text-gray-700 mb-6">
          This is a building-level assessment. We’ll review suitability and walk you through how the model would work
          for your Owners Corporation.
        </p>

        {/* Simple form stub (wire to API later) */}
        <form className="border border-gray-200 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Building address</label>
            <input
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              name="buildingAddress"
              placeholder="e.g. 123 Example St, Suburb VIC"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Approx. number of apartments</label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="number"
                name="numLots"
                min={1}
                placeholder="e.g. 48"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Year of completion</label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="number"
                name="buildYear"
                min={1800}
                max={2100}
                placeholder="e.g. 2018"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Your role</label>
            <select
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              name="role"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select…
              </option>
              <option value="committee">Committee member</option>
              <option value="strata_manager">Strata manager</option>
              <option value="developer">Developer</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Approx. owner-occupier %
                <span className="text-gray-500 font-normal"> (optional)</span>
              </label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="number"
                name="ownerOccPct"
                min={0}
                max={100}
                placeholder="e.g. 60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Current strata manager
                <span className="text-gray-500 font-normal"> (optional)</span>
              </label>
              <input
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                type="text"
                name="strataManager"
                placeholder="e.g. ABC Strata"
              />
            </div>
          </div>

          <div className="pt-2">
            <ButtonPill href="https://calendly.com/rukid-sold/30min">Request a building review</ButtonPill>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-8">
          Note: This page is general information only and does not constitute financial advice. Eligibility depends on
          individual circumstances.
        </p>
      </section>
    </main>
  );
}
