import type { Alignment } from "@/shared/types";

export type TagStyleVariant = "filled" | "soft" | "solid" | "outlined";
export type TagSize = "xl" | "l" | "m" | "s" | "xs";
export type TagRadius = 0 | 4 | 8 | 12 | 100;

export interface TagItem {
	id: string;
	label: string;
	link: string;
}

export interface TaglineStyles {
	variant: TagStyleVariant;
	size: TagSize;
	radius: TagRadius;
	alignment: Alignment;
}
