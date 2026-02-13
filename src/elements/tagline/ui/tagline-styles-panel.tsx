import { observer } from "mobx-react-lite";
import { cn } from "@/lib/utils";
import { usePreview } from "@/shared/stores/preview.store";
import { alignmentOptions } from "@/shared/ui/alignment-options";
import { PanelHeader } from "@/shared/ui/panel-header";
import { SegmentedControl } from "@/shared/ui/segmented-control";
import { StyleSection } from "@/shared/ui/style-section";
import type { TagRadius, TagSize, TagStyleVariant } from "../types";
import { variantStyles } from "./tag-chip.variants";

const variantOptions = (
	Object.entries(variantStyles) as [TagStyleVariant, string][]
).map(([value, style]) => ({ value, style }));

const sizeOptions = [
	{ value: "xl" as TagSize, label: "XL" },
	{ value: "l" as TagSize, label: "L" },
	{ value: "m" as TagSize, label: "M" },
	{ value: "s" as TagSize, label: "S" },
	{ value: "xs" as TagSize, label: "XS" },
] as const;

const radiusOptions = [
	{ value: 0 as TagRadius, label: "0" },
	{ value: 4 as TagRadius, label: "4" },
	{ value: 8 as TagRadius, label: "8" },
	{ value: 12 as TagRadius, label: "12" },
	{ value: 100 as TagRadius, label: "100" },
] as const;

export const TaglineStylesPanel = observer(function TaglineStylesPanel() {
	const { tagline, panelNavigation } = usePreview();

	return (
		<div className="flex flex-col bg-panel">
			<PanelHeader
				onBack={() => panelNavigation.pop()}
				onClose={() => panelNavigation.close()}
				title="Styles"
			/>

			<div className="min-h-0 flex-1 overflow-y-auto">
				<StyleSection title="Style">
					<div className="flex gap-2">
						{variantOptions.map(({ value, style }) => (
							<button
								aria-label={`${value} variant`}
								className={cn(
									"flex h-9.25 flex-1 items-center justify-center rounded-sm font-medium text-sm leading-[140%] tracking-[-0.002em] transition-colors",
									style
								)}
								key={value}
								onClick={() => tagline.setVariant(value)}
								type="button"
							>
								Aa
							</button>
						))}
					</div>
				</StyleSection>

				<div className="h-px bg-border" />

				<StyleSection title="Size">
					<SegmentedControl
						onChange={(size) => tagline.setSize(size)}
						options={sizeOptions}
						value={tagline.styles.size}
					/>
				</StyleSection>

				<div className="h-px bg-border" />

				<StyleSection title="Radius">
					<SegmentedControl
						onChange={(radius) => tagline.setRadius(radius)}
						options={radiusOptions}
						value={tagline.styles.radius}
					/>
				</StyleSection>

				<div className="h-px bg-border" />

				<StyleSection className="mb-0">
					<SegmentedControl
						onChange={(alignment) => tagline.setAlignment(alignment)}
						options={alignmentOptions}
						value={tagline.styles.alignment}
					/>
				</StyleSection>
			</div>
		</div>
	);
});
