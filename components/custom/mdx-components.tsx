import * as React from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@/lib/utils";
import { Callout } from "@/components/custom/callout";
import { ProjectTech } from "@/components/custom/project-tech";
import Link from "next/link";

const components = {
  h1: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <h1
      className={cn(
        "scroll-m-10 text-2xl font-bold tracking-tight mb:-2 mt-8 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <h2
      className={cn(
        "mscroll-m-10 pb-1 text-xl font-bold tracking-tight mb-2 mt-6 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <h3
      className={cn(
        "scroll-m-5 text-xl font-semibold tracking-tight mt-6 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <h4
      className={cn(
        "scroll-m-5 text-lg font-bold tracking-tight mt-3 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <h5
      className={cn(
        "scroll-m-2 text-lg font-semibold tracking-tight mt-3 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <h6
      className={cn(
        "scroll-m-2 text-base font-semibold tracking-tight mt-2 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: {
    className?: string;
    [key: string]: any;
  }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: { className?: string; [key: string]: any }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    ...props
  }: {
    className?: string;
    [key: string]: any;
  }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className,
      )}
      {...props}
    />
  ),
  code: ({
    className,
    ...props
  }: {
    className?: string;
    [key: string]: any;
  }) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  ProjectTech,
  Link,
};

interface MdxProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className = "" }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className={cn("mdx", className)}>
      <Component components={components} />
    </div>
  );
}
