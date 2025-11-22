// components/ButtonPill.tsx
import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

type ButtonPillProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const baseClasses =
  "inline-block bg-[#0B0F1B] text-white font-semibold text-[17px] " +
  "rounded-full px-8 py-3.5 transition-all border border-[#0B0F1B] " +
  "hover:bg-white hover:text-black hover:border-black text-center";

export function ButtonPill({
  href,
  children,
  className = "",
  onClick,
}: ButtonPillProps) {
  return (
    <Link href={href} onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  );
}
