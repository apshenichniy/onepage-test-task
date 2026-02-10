import { observer } from "mobx-react-lite";
import { cn } from "@/lib/utils";
import { usePreview } from "@/shared/stores/preview.store";
import type { Alignment } from "@/shared/types";
import { ElementPreview } from "@/shared/ui/element-preview";
import type { HeadingLevel, HeadingWeight } from "../types";

const weightClass: Record<HeadingWeight, string> = {
	light: "font-light",
	regular: "font-normal",
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold",
};

const alignmentClass: Record<Alignment, string> = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

const levelClass: Record<HeadingLevel, string> = {
	h1: "text-5xl",
	h2: "text-4xl",
	h3: "text-3xl",
	h4: "text-2xl",
	h5: "text-xl",
	h6: "text-lg",
};

const toAriaLevel = (level: HeadingLevel): number =>
	Number.parseInt(level.slice(1), 10);

export const HeadingPreview = observer(function HeadingPreview() {
	const { heading, panelNavigation } = usePreview();
	const { level, weight, alignment, transform } = heading.styles;

	// Uses span + role="heading" instead of <h1>-<h6> to keep valid HTML inside <button>
	const content = (
		// biome-ignore lint/a11y/useSemanticElements: h1-h6 tags are invalid inside <button>
		<span
			aria-level={toAriaLevel(level)}
			className={cn(
				"block",
				levelClass[level],
				weightClass[weight],
				alignmentClass[alignment],
				transform !== "none" && transform
			)}
			role="heading"
		>
			{heading.text}
		</span>
	);

	return (
		<ElementPreview
			label="Heading"
			onClick={() => panelNavigation.open({ type: "heading-main" })}
		>
			{heading.link ? (
				<a
					href={heading.link}
					onClick={(e) => e.stopPropagation()}
					rel="noopener noreferrer"
					target="_blank"
				>
					{content}
				</a>
			) : (
				content
			)}
		</ElementPreview>
	);
});
