"use client";

import Link from "next/link";
import React from "react";
import { Button, type IButtonProps } from "@/components/ui/retroui/Button";
import { cn } from "@/lib/utils/ui";

// Legacy variant strings still used by callers that haven't migrated to the
// RetroUI Button vocabulary. We translate them inside IconLink so consumers
// can keep their existing variant prop while the visual is preserved via
// className composition.
type LegacyVariant = "accent" | "action" | "neutral" | "noShadow";
type RetroVariant = NonNullable<IButtonProps["variant"]>;
type IconLinkVariant = RetroVariant | LegacyVariant;

const ACCENT_CLASSES =
  "rounded-md bg-accent text-accent-foreground border-2 border-border shadow-sm hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none hover:bg-accent-dark shadow-shadow";

const ACTION_CLASSES =
  "rounded-md w-full text-base border-2 border-border shadow-sm bg-accent text-accent-foreground group hover:shadow-lg hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground shadow-shadow shadow-md";

function resolveVariant(variant: IconLinkVariant | undefined | null): {
  variant: RetroVariant;
  extraClass?: string;
} {
  switch (variant) {
    case "accent":
      return { variant: "default", extraClass: ACCENT_CLASSES };
    case "action":
      return { variant: "default", extraClass: ACTION_CLASSES };
    case "neutral":
      return { variant: "secondary" };
    case "noShadow":
      return { variant: "outline", extraClass: "shadow-none" };
    case undefined:
    case null:
      return { variant: "default" };
    default:
      return { variant };
  }
}

interface IconLinkProps extends Omit<IButtonProps, "asChild" | "variant"> {
  href: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  external?: boolean;
  className?: string;
  linkClassName?: string;
  variant?: IconLinkVariant;
}

export const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      href,
      icon,
      iconPosition = "right",
      external = false,
      className,
      linkClassName,
      children,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    // For standalone icon links (no text)
    const isIconOnly = !children && icon;
    const iconOnlySize = isIconOnly ? "icon" : size;

    const { variant: retroVariant, extraClass } = resolveVariant(variant);

    // Styled icon that respects position
    const styledIcon = icon ? (
      <span
        className={cn(
          "inline-flex transition-transform",
          iconPosition === "right" && "group-hover:translate-x-1",
          iconPosition === "left" && "group-hover:-translate-x-1",
        )}
      >
        {icon}
      </span>
    ) : null;

    return (
      <Link
        href={href}
        className={cn("group", linkClassName)}
        ref={ref}
        {...externalProps}
      >
        <Button
          className={cn(extraClass, className)}
          variant={retroVariant}
          size={iconOnlySize}
          {...props}
        >
          {iconPosition === "left" && styledIcon}
          {children}
          {iconPosition === "right" && styledIcon}
        </Button>
      </Link>
    );
  },
);

IconLink.displayName = "IconLink";

// Standalone Icon Link with no text (for corner links, etc.)
interface CornerIconLinkProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

export const CornerIconLink = ({
  href,
  icon,
  className,
  external = false,
  ariaLabel,
}: CornerIconLinkProps) => {
  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Link
      href={href}
      className={cn(
        "p-2 rounded-md hover:bg-accent/10 transition-colors inline-flex items-center justify-center",
        className,
      )}
      aria-label={ariaLabel}
      {...externalProps}
    >
      {icon}
    </Link>
  );
};
