import { cva } from "class-variance-authority";
import type { TagStyleVariant } from "../types";

export const variantStyles: Record<TagStyleVariant, string> = {
	filled: "bg-white/10 text-foreground",
	soft: "bg-brand/20 text-brand-foreground",
	solid: "bg-brand/93 text-foreground",
	outlined: "border border-white/25 text-foreground",
};

export const tagChipVariants = cva(
	"inline-flex items-center justify-center font-medium transition-colors",
	{
		variants: {
			variant: variantStyles,
			size: {
				xl: "px-6 py-3 text-lg",
				l: "px-5 py-2.5 text-base",
				m: "px-4 py-2 text-sm",
				s: "px-3 py-1.5 text-xs",
				xs: "px-2 py-1 text-xs",
			},
		},
		defaultVariants: {
			variant: "filled",
			size: "m",
		},
	}
);
