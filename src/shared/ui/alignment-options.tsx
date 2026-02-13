import { AlignCenter, AlignLeft, AlignRight } from "@/components/icons";
import type { Alignment } from "@/shared/types";

export const alignmentOptions: { value: Alignment; label: React.ReactNode }[] = [
	{ value: "left", label: <AlignLeft /> },
	{ value: "center", label: <AlignCenter /> },
	{ value: "right", label: <AlignRight /> },
];
