import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 py-6 sm:py-8 text-xs sm:text-sm text-neutral-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p>© {year} Sold. All rights reserved.</p>
          <p className="mt-1">
            <strong>Sold Financial</strong> is a trading name of{" "}
            <strong>Homei Fi Pty Ltd</strong> (ABN 26 691 328 499).
          </p>
          <p>
            Homei Fi Pty Ltd (Credit Representative Number{" "}
            <strong>573517</strong>) is authorised under Australian Credit
            Licence Number <strong>486112</strong> (Purple Circle Financial
            Services Pty Ltd).
          </p>
        </div>

    <nav className="flex gap-4 text-xs sm:text-sm whitespace-nowrap">
      <Link href="/terms" className="hover:opacity-70">
      Terms
      </Link>
      <Link href="/privacy" className="hover:opacity-70">
      Privacy Policy
      </Link>
    </nav>

      </div>
    </footer>
  );
}
