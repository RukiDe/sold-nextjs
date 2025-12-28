"use client";

import Link from "next/link";
import type { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

type ButtonPillProps = {
  as?: "a" | "button";
  href?: string; // only needed when as="a"
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement & HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "inline-block font-semibold text-[17px] rounded-full px-8 py-3.5 " +
  "transition-all text-center border";

const variantClasses: Record<NonNullable<ButtonPillProps["variant"]>, string> =
  {
    primary:
      "bg-[#0B0F1B] text-white border-[#0B0F1B] " +
      "hover:bg-white hover:text-black hover:border-black",

    secondary:
      "bg-white text-black border-black " +
      "hover:bg-[#0B0F1B] hover:text-white hover:border-[#0B0F1B]",
  };

export function ButtonPill({
  as = "a",
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
  type,
  ...props
}: ButtonPillProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // Render as real <button>
  if (as === "button") {
    return (
      <button
        type={type || "button"}
        onClick={onClick}
        className={classes}
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
      className={classes}
    >
      {children}
    </Link>
  );
}
