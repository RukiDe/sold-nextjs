import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/individuals", label: "Individuals" },
  { href: "/buildings", label: "Buildings" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy Policy" }
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-end">
        <nav className="flex gap-6 text-sm sm:text-base">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
