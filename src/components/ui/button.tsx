import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "gold" | "link";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  gold: "btn btn-gold",
  link: "btn-link link-underline",
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type AsButton = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export const Button = (props: AsLink | AsButton) => {
  const variant: ButtonVariant = props.variant ?? "primary";
  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, className, children, ...rest } = props;
    return (
      <Link
        href={href}
        className={cn(VARIANT_CLASS[variant], className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }
  const { variant: _v, className, children, ...rest } = props as AsButton;
  return (
    <button className={cn(VARIANT_CLASS[variant], className)} {...rest}>
      {children}
    </button>
  );
};
