import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { NeoBadge, neoBadgeVariants } from "@/components/ui/neoBadge";
import { cn } from "@/lib/utils/ui";
import { titleCase } from "title-case";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
  padding?: string;
  containerClassName?: string;
  as?: ElementType;
  centerContent?: boolean;
}

function Section({
  children,
  className,
  fullHeight = true,
  fullWidth = false,
  padding = "px-6 py-8 md:py-12 2xl:py-16",
  containerClassName,
  centerContent = true,
  as: Element = "article",
  ...props
}: SectionProps) {
  return (
    <Element
      className={cn(
        "mx-auto relative",
        fullWidth ? "w-full" : "max-w-3xl",
        fullHeight && "min-h-svh",
        "flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full flex flex-col",
          centerContent && "items-center justify-center",
          padding,
          "gap-6 lg:gap-9 xl:gap-12",
          containerClassName,
        )}
      >
        {children}
      </div>
    </Element>
  );
}

type BadgeVariants = VariantProps<typeof neoBadgeVariants>;

function SectionHeader({
  children,
  badge,
  className,
  badgeVariant = "default",
  badgeRotation = "none",
}: {
  children: ReactNode;
  badge?: string;
  className?: string;
  badgeVariant?: BadgeVariants["variant"];
  badgeRotation?: BadgeVariants["rotation"];
}) {
  return (
    <div className={cn("relative pt-4 md:pt-8", className)}>
      {badge && (
        <div className="absolute -top-4 -left-2 md:-top-6 md:-left-6 z-10">
          <NeoBadge
            variant={badgeVariant}
            interactive="lift"
            rotation={badgeRotation}
          >
            {titleCase(badge)}
          </NeoBadge>
        </div>
      )}
      {children}
    </div>
  );
}

function SectionBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export { Section, SectionHeader, SectionBody };
