import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark focus-visible:outline-accent",
  secondary:
    "bg-transparent text-paper-100 border border-ink-600 hover:border-paper-300 focus-visible:outline-paper-300",
  ghost:
    "bg-transparent text-paper-100 hover:text-accent-light",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type AsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type AsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button(props: AsLink | AsButton) {
  const { children, variant = "primary", className } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    className
  );

  if ("href" in props && props.href) {
    const isExternal = props.href.startsWith("http") || props.href.startsWith("tel:") || props.href.startsWith("mailto:");
    return (
      <Link
        href={props.href}
        className={classes}
        {...(isExternal ? { target: props.href.startsWith("tel:") || props.href.startsWith("mailto:") ? undefined : "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {children}
    </button>
  );
}
