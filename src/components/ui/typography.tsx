import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import { titleCase } from "title-case";
import { cn } from "@/lib/utils/ui";

function formatContent(children: React.ReactNode): React.ReactNode {
  return typeof children === "string" ? titleCase(children) : children;
}

// Base typography props that can be shared across components
export interface BaseTypographyProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color" | "children"
> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  asChild?: boolean;
  weight?: "light" | "regular" | "medium" | "bold" | "semibold" | "black";
  color?: "default" | "muted" | "accent" | "foreground";
  highContrast?: boolean;
  truncate?: boolean;
  wrap?: "wrap" | "nowrap" | "pretty" | "balance";
  trim?: "normal" | "start" | "end" | "both";
  align?: "left" | "center" | "right";
}

interface TypographyProps extends BaseTypographyProps {
  className?: string;
  children: React.ReactNode;
}

interface VariantTypographyProps extends BaseTypographyProps {
  className?: string;
  children: React.ReactNode;
  type?: "foreground" | "default";
}

const weightClasses: Record<NonNullable<BaseTypographyProps["weight"]>, string> = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  black: "font-black",
};

const wrapClasses: Record<NonNullable<BaseTypographyProps["wrap"]>, string> = {
  wrap: "",
  nowrap: "whitespace-nowrap",
  pretty: "text-pretty",
  balance: "text-balance",
};

// Note: Leading trim uses margin adjustments as CSS leading-trim has limited support
const trimClasses: Record<NonNullable<BaseTypographyProps["trim"]>, string> = {
  normal: "",
  start: "-mt-[0.42em]",
  end: "-mb-[0.36em]",
  both: "-mt-[0.42em] -mb-[0.36em]",
};

const alignClasses: Record<NonNullable<BaseTypographyProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function getWeightClass(weight?: BaseTypographyProps["weight"]): string {
  return weight ? (weightClasses[weight] ?? "") : "";
}

function getColorClass(
  color?: BaseTypographyProps["color"],
  highContrast?: boolean,
  type?: "foreground" | "default",
): string {
  if (color === "muted" || type === "default") {
    return highContrast ? "text-foreground" : "text-muted-foreground";
  }
  if (color === "accent") return "text-accent";
  if (color === "foreground" || type === "foreground") return "text-foreground";
  return "";
}

function getWrapClass(wrap?: BaseTypographyProps["wrap"]): string {
  return wrap ? (wrapClasses[wrap] ?? "") : "";
}

function getTrimClass(trim?: BaseTypographyProps["trim"]): string {
  return trim ? (trimClasses[trim] ?? "") : "";
}

function getAlignClass(align?: BaseTypographyProps["align"]): string {
  return align ? (alignClasses[align] ?? "") : "";
}

// Responsive sizing: sm/md bigger, lg/xl regular, 2xl bigger, no scaling beyond
// H1: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H1: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "black",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "h1";

  return (
    <Comp
      className={cn(
        "scroll-m-20 tracking-tight mt-8 first:mt-0",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H2: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H2: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "semibold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "h2";

  return (
    <Comp
      className={cn(
        "scroll-m-20 tracking-tight mt-8 first:mt-0",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H3: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H3: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "semibold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "h3";

  return (
    <Comp
      className={cn(
        "scroll-m-20 tracking-tight mt-6 first:mt-0",
        "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H4: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H4: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "semibold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "h4";

  return (
    <Comp
      className={cn(
        "scroll-m-20 tracking-tight mt-6 first:mt-0",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H5: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H5: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "medium",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "h5";

  return (
    <Comp
      className={cn(
        "scroll-m-20 tracking-tight mt-4 first:mt-0",
        // Responsive sizing inspired by body S/M, but slightly bolder for headers
        "text-[0.625rem] sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H6: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H6: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "medium",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "h6";

  return (
    <Comp
      className={cn(
        "scroll-m-20 tracking-tight mt-4 first:mt-0",
        // Responsive sizing inspired by XS body, smaller for the smallest header
        "text-[0.625rem] sm:text-[0.625rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-xs 2xl:text-xs",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// Lead: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const Lead: React.FC<VariantTypographyProps> = ({
  className = "",
  children,
  type = "default",
  as: Component,
  asChild = false,
  weight = "semibold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "p";

  return (
    <Comp
      className={cn(
        "scroll-m-20 tracking-tight",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-sm sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg",
        getWeightClass(weight),
        getColorClass(color, highContrast, type),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// LQuote: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const LQuote: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "semibold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || "blockquote";

  return (
    <Comp
      className={cn(
        "mt-6 border-l-2 pl-6",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-sm sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// Quote: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const Quote: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight,
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "blockquote";

  return (
    <Comp
      className={cn(
        "mt-6 border-l-2 pl-6",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// L: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const L: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "semibold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "p";

  return (
    <Comp
      className={cn(
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-xs sm:text-sm md:text-sm lg:text-xs xl:text-sm 2xl:text-base",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// M: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
// Default styling for Link component
const M: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component = "p",
  asChild = false,
  weight = "medium",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component;

  return (
    <Comp
      className={cn(
        "leading-6 not-first:mt-1",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-xs sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// S: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const S: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "medium",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "small";

  return (
    <Comp
      className={cn(
        "leading-none",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-[0.625rem] sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-sm",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// XS: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const XS: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "light",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "small";

  return (
    <Comp
      className={cn(
        "leading-none",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-[0.625rem] sm:text-[0.625rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-[0.625rem] 2xl:text-xs",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// SMuted: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const SMuted: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight,
  color = "muted",
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "p";

  return (
    <Comp
      className={cn(
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-[0.625rem] sm:text-[0.625rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-[0.625rem] 2xl:text-xs",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Muted: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const Muted: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight,
  color = "muted",
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "p";

  return (
    <Comp
      className={cn(
        "text-mono",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Code: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
// Variants: solid, soft, outline, ghost
interface CodeProps extends BaseTypographyProps {
  variant?: "solid" | "soft" | "outline" | "ghost";
}

const Code: React.FC<CodeProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  variant = "soft",
  weight = "semibold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "code";

  return (
    <Comp
      className={cn(
        "relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-[0.625rem] sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-sm",
        getWeightClass(weight),
        "text-foreground",
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Link component - composable with typography, defaults to M styling
type LinkProps = BaseTypographyProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color" | "children"> & {
    href: string;
    external?: boolean;
  };

const TypographyLink: React.FC<LinkProps> = ({
  href,
  external = false,
  className = "",
  children,
  asChild = false,
  weight = "medium",
  color = "accent",
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  as,
  onClick,
  ...props
}) => {
  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  // If asChild, use Slot; otherwise use Next.js Link
  if (asChild) {
    const Comp = Slot;
    return (
      <Comp
        className={cn(
          "leading-6 not-first:mt-1",
          "text-xs sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm underline",
          getWeightClass(weight),
          getColorClass(color, highContrast),
          getWrapClass(wrap),
          getTrimClass(trim),
          getAlignClass(align),
          truncate && "truncate",
          "transition-all duration-200",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        // M component base styling
        "leading-6 not-first:mt-1",
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        "text-xs sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        "transition-all duration-200",
        className,
      )}
      {...externalProps}
      {...props}
    >
      {children}
    </Link>
  );
};

// Strong component
const Strong: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight = "bold",
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "strong";

  return (
    <Comp
      className={cn(
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Em component
const Em: React.FC<TypographyProps> = ({
  className = "",
  children,
  as: Component,
  asChild = false,
  weight,
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || "em";

  return (
    <Comp
      className={cn(
        "italic",
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Lead,
  LQuote,
  Quote,
  L,
  M,
  S,
  XS,
  Muted,
  SMuted,
  Code,
  TypographyLink as Link,
  Strong,
  Em,
};
