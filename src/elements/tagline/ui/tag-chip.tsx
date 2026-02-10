import type { TagRadius, TagSize, TagStyleVariant } from "../types";
import { tagChipVariants } from "./tag-chip.variants";

interface TagChipProps {
	label: string;
	link?: string;
	variant: TagStyleVariant;
	size: TagSize;
	radius: TagRadius;
}

export function TagChip({ label, link, variant, size, radius }: TagChipProps) {
	const className = tagChipVariants({ variant, size });
	const style = { borderRadius: `${radius}px` };

	if (link) {
		return (
			<a
				className={className}
				href={link}
				rel="noopener noreferrer"
				style={style}
				target="_blank"
			>
				{label}
			</a>
		);
	}

	return (
		<span className={className} style={style}>
			{label}
		</span>
	);
}
