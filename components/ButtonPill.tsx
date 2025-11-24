// components/ButtonPill.tsx
"use client";

import Link from "next/link";
import type { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

type ButtonPillProps = {
  as?: "a" | "button";
  href?: string; // only needed when as="a"
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement & HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "inline-block bg-[#0B0F1B] text-white font-semibold text-[17px] " +
  "rounded-full px-8 py-3.5 transition-all border border-[#0B0F1B] " +
  "hover:bg-white hover:text-black hover:border-black text-center";

export function ButtonPill({
  as = "a",
  href,
  children,
  className = "",
  onClick,
  type,
  ...props
}: ButtonPillProps) {
  // Render as real <button>
  if (as === "button") {
    return (
      <button
        type={type || "button"}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Render as <a> via Next.js Link
  return (
    <Link
      href={href || "#"}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </Link>
  );
}
