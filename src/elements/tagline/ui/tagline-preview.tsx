import { observer } from "mobx-react-lite";
import { cn } from "@/lib/utils";
import { usePreview } from "@/shared/stores/preview.store";
import type { Alignment } from "@/shared/types";
import { ElementPreview } from "@/shared/ui/element-preview";
import { TagChip } from "./tag-chip";

const alignmentClass: Record<Alignment, string> = {
	left: "justify-start",
	center: "justify-center",
	right: "justify-end",
};

export const TaglinePreview = observer(function TaglinePreview() {
	const { tagline, panelNavigation } = usePreview();

	return (
		<ElementPreview
			label="Tagline"
			onClick={() => panelNavigation.open({ type: "tagline-main" })}
		>
			<div
				className={cn(
					"flex flex-wrap gap-2",
					alignmentClass[tagline.styles.alignment]
				)}
			>
				{tagline.items
					.filter((item) => item.label.trim())
					.map((item) => (
						<TagChip
							key={item.id}
							label={item.label}
							link={item.link || undefined}
							radius={tagline.styles.radius}
							size={tagline.styles.size}
							variant={tagline.styles.variant}
						/>
					))}
			</div>
		</ElementPreview>
	);
});
