import { tv } from "tailwind-variants";

export const callout = tv({
	base: "tracking-tight inline font-black font-callout",
	variants: {
		size: {
			sm: "text-3xl lg:text-4xl",
			md: "text-[2.3rem] lg:text-5xl leading-9",
			lg: "text-4xl lg:text-6xl",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const title = tv({
	base: "tracking-tight inline font-black font-callout",
	variants: {
		size: {
			sm: "text-2xl lg:text-3xl",
			md: "text-[2rem] lg:text-4xl leading-8",
			lg: "text-3xl lg:text-5xl",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const header = tv({
	base: "tracking-tight inline font-black font-callout",
	variants: {
		size: {
			sm: "text-2xl lg:text-3xl",
			md: "text-[1.5rem] lg:text-2xl leading-6",
			lg: "text-2xl lg:text-3xl",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const subtitle = tv({
	base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full leading-tight",
	variants: {
		fullWidth: {
			true: "!w-full",
		},
	},
  defaultVariants:{
    fullWidth: true
  }
});




