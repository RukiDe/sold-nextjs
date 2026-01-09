const html = `
  <h1 class="text-3xl sm:text-4xl font-bold">Terms and Conditions</h1>
  <p class="mt-2 text-neutral-600">Last updated: January 2026</p>

  <div class="mt-8 space-y-6 text-[15px] leading-7 text-neutral-800">

    <div>
      <h2 class="text-xl font-semibold">1. About Sold Financial</h2>
      <p>
        <strong>Sold Financial</strong> is a trading name of
        <strong> Homei Fi Pty Ltd</strong> (ABN 26 691 328 499). Homei Fi Pty Ltd is a Credit Representative
        (No. <strong>573517</strong>) authorised under Australian Credit Licence No. <strong>486112</strong> held by
        Purple Circle Financial Services Pty Ltd.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">2. Purpose of this site</h2>
      <p>
        This site helps you begin the home loan process digitally. You can complete a fact find, view indicative
        options and, if you choose, verify information via Open Banking so a credit representative can assess
        suitability and provide a personalised recommendation.
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>Collect self-reported details about income, expenses, property and preferences.</li>
        <li>Generate indicative comparisons of current lender offers from our panel.</li>
        <li>Enable secure, read-only Open Banking verification when you are ready.</li>
        <li>Allow a licensed representative to conduct a suitability review and make a final recommendation.</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-semibold">3. No credit check or approval at this stage</h2>
      <p>
        Completing our questions does not involve a credit check and does not constitute a credit application
        or approval. Indicative offers rely on the information you provide and may change after verification
        and assessment against lender criteria.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">4. Information accuracy</h2>
      <p>
        Please ensure information you provide is true and complete. Indicative results rely on self-reported
        data until you complete Open Banking verification.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">5. Open Banking data</h2>
      <p>
        If you choose to connect accounts, we use <strong>Frollo Pty Ltd</strong>, a CDR-accredited data recipient,
        to collect read-only financial data with your consent. Data is handled per our
        <a href="/privacy" class="underline">Privacy Policy</a>.
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>Connections are secure, read-only and cannot make payments.</li>
        <li>Your consent can be withdrawn at any time before expiry.</li>
        <li>Only data reasonably necessary for credit assessment is requested.</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-semibold">6. How recommendations are provided</h2>
      <ol class="list-decimal list-inside space-y-1">
        <li><strong>Digital fact find</strong> — you share details and receive indicative options.</li>
        <li><strong>Data verification</strong> — with consent we verify income, expenses and liabilities via Open Banking.</li>
        <li><strong>Suitability assessment</strong> — a credit representative reviews your situation and provides written disclosures.</li>
      </ol>
    </div>

    <div>
    <h2 class="text-xl font-semibold">7. Assignment and continuity</h2>
      <p>If Sold or the Levy Offset program is transferred, assigned, or sold as part of a business sale or restructure, participation in any levy offset arrangement remains voluntary and subject to the new owner’s terms.
            Where a levy offset continues, the new owner may require users to maintain an Open Banking connection (or re-consent where required) to support verification, compliance, and ongoing administration. Users are not obligated to continue participation and may withdraw at any time.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">8. Limitation of information</h2>
      <p>
        Content is general and does not take your personal circumstances into account. Formal credit assistance
        is provided only after written documents are issued and accepted.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">9. Fees and commissions</h2>
      <p>
        There is no charge to use this website. If you proceed with a loan arranged through Sold Financial,
        we may receive commission payments from the lender. All benefits are disclosed in writing before acceptance.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">10. Privacy and data handling</h2>
      <p>
        We comply with the <em>Privacy Act 1988 (Cth)</em> and the CDR Rules. Please see our
        <a href="/privacy" class="underline">Privacy Policy</a>.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">11. Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for loss arising from use of this website or reliance
        on indicative estimates prior to full assessment.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">12. Governing law</h2>
      <p>
        These Terms are governed by the laws of Victoria, Australia.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">13. Contact us</h2>
      <p>
        <strong>Homei Fi Pty Ltd t/a Sold Financial</strong><br />
        Email: <a href="mailto:connect@sold.financial" class="underline">connect@sold.financial</a><br />
        ABN 26 691 328 499 • Credit Representative 573517 of ACL 486112
      </p>
    </div>
  </div>
`;

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </main>
  );
}
