import * as React from "react";
import { titleCase } from "title-case";
import { cn } from "@/lib/utils";

function formatContent(children: React.ReactNode): React.ReactNode {
  return typeof children === "string" ? titleCase(children) : children;
}

interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

interface VariantTypographyProps {
  className?: string;
  children: React.ReactNode;
  type?: "foreground" | "default";
}

const H1: React.FC<TypographyProps> = ({ className = "", children }) => {
  const content = formatContent(children);
  return (
    <h1
      className={cn(
        "scroll-m-20 text-5xl font-black font-title tracking-tight lg:text-6xl",
        className,
      )}
    >
      {content}
    </h1>
  );
};

const H2: React.FC<TypographyProps> = ({ className = "", children }) => {
  const content = formatContent(children);
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-bold tracking-tight font-spartan lg:text-4xl text-mute",
        className,
      )}
    >
      {content}
    </h2>
  );
};

const H3: React.FC<TypographyProps> = ({ className = "", children }) => {
  const content = formatContent(children);
  return (
    <h3
      className={cn(
        "scroll-m-20 pb-2 text-2xl font-semibold tracking-tight lg:text-3xl first:mt-0",
        className,
      )}
    >
      {content}
    </h3>
  );
};

const H4: React.FC<TypographyProps> = ({ className = "", children }) => {
  const content = formatContent(children);
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {content}
    </h4>
  );
};

const Lead: React.FC<VariantTypographyProps> = ({
  className = "",
  children,
  type = "default",
}) => {
  const content = formatContent(children);
  return (
    <p
      className={cn(
        "scroll-m-20 text-large md:text-xl font-semibold tracking-tight ",
        className,
        {
          "text-muted-foreground": type === "default",
          "text-foreground": type === "foreground",
        },
      )}
    >
      {content}
    </p>
  );
};
const LQuote: React.FC<TypographyProps> = ({ className = "", children }) => {
  const content = formatContent(children);
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 text-lg font-semibold", className)}
    >
      {content}
    </blockquote>
  );
};

const Quote: React.FC<TypographyProps> = ({ className = "", children }) => {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6", className)}>
      {children}
    </blockquote>
  );
};

const L: React.FC<TypographyProps> = ({ className = "", children }) => {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
};

const M: React.FC<TypographyProps> = ({ className = "", children }) => {
  return (
    <p
      className={cn(
        " text-m font-medium leading-7 [&:not(:first-child)]:mt-6",
        className,
      )}
    >
      {children}
    </p>
  );
};

const S: React.FC<TypographyProps> = ({ className = "", children }) => {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
};

const Muted: React.FC<TypographyProps> = ({ className = "", children }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

const Code: React.FC<TypographyProps> = ({ className = "", children }) => {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
    >
      {children}
    </code>
  );
};

export { H1, H2, H3, H4, Lead, LQuote, Quote, L, M, S, Muted, Code };
