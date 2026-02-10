import { AlignCenter, AlignLeft, AlignRight } from "@/components/icons";

export const alignmentOptions = [
	{ value: "left", label: <AlignLeft /> },
	{ value: "center", label: <AlignCenter /> },
	{ value: "right", label: <AlignRight /> },
] as const;
