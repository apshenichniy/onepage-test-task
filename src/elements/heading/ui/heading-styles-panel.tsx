import { observer } from "mobx-react-lite";
import { usePreview } from "@/shared/stores/preview.store";
import { alignmentOptions } from "@/shared/ui/alignment-options";
import { PanelHeader } from "@/shared/ui/panel-header";
import { SegmentedControl } from "@/shared/ui/segmented-control";
import { StyleSection } from "@/shared/ui/style-section";
import type { HeadingLevel, HeadingTransform, HeadingWeight } from "../types";

const levelOptions = [
	{ value: "h1" as HeadingLevel, label: "H1" },
	{ value: "h2" as HeadingLevel, label: "H2" },
	{ value: "h3" as HeadingLevel, label: "H3" },
	{ value: "h4" as HeadingLevel, label: "H4" },
	{ value: "h5" as HeadingLevel, label: "H5" },
	{ value: "h6" as HeadingLevel, label: "H6" },
] as const;

const weightNumericValues: Record<HeadingWeight, number> = {
	light: 300,
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
};

const weightOptions = (
	Object.entries(weightNumericValues) as [HeadingWeight, number][]
).map(([value, weight]) => ({
	value,
	label: <span style={{ fontWeight: weight }}>{weight}</span>,
}));

const transformOptions = [
	{ value: "none" as HeadingTransform, label: "None" },
	{ value: "uppercase" as HeadingTransform, label: "AA" },
	{ value: "lowercase" as HeadingTransform, label: "aa" },
	{ value: "capitalize" as HeadingTransform, label: "Aa" },
] as const;

export const HeadingStylesPanel = observer(function HeadingStylesPanel() {
	const { heading, panelNavigation } = usePreview();

	return (
		<div className="flex flex-col bg-panel">
			<PanelHeader
				onBack={() => panelNavigation.pop()}
				onClose={() => panelNavigation.close()}
				title="Styles"
			/>

			<div className="min-h-0 flex-1 overflow-y-auto">
				<StyleSection title="Level">
					<SegmentedControl
						onChange={(level) => heading.setLevel(level)}
						options={levelOptions}
						value={heading.styles.level}
					/>
				</StyleSection>

				<div className="h-px bg-border" />

				<StyleSection title="Weight">
					<SegmentedControl
						onChange={(weight) => heading.setWeight(weight)}
						options={weightOptions}
						value={heading.styles.weight}
					/>
				</StyleSection>

				<div className="h-px bg-border" />

				<StyleSection title="Alignment">
					<SegmentedControl
						onChange={(alignment) => heading.setAlignment(alignment)}
						options={alignmentOptions}
						value={heading.styles.alignment}
					/>
				</StyleSection>

				<div className="h-px bg-border" />

				<StyleSection title="Transform">
					<SegmentedControl
						onChange={(transform) => heading.setTransform(transform)}
						options={transformOptions}
						value={heading.styles.transform}
					/>
				</StyleSection>
			</div>
		</div>
	);
});
