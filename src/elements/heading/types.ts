import type { Alignment } from "@/shared/types";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingWeight =
	| "light"
	| "regular"
	| "medium"
	| "semibold"
	| "bold";

export type HeadingTransform =
	| "none"
	| "uppercase"
	| "lowercase"
	| "capitalize";

export interface HeadingStyles {
	level: HeadingLevel;
	weight: HeadingWeight;
	alignment: Alignment;
	transform: HeadingTransform;
}
