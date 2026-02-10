import { observer } from "mobx-react-lite";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePreview } from "@/shared/stores/preview.store";
import { PanelHeader } from "@/shared/ui/panel-header";
import { StylesFooterButton } from "@/shared/ui/styles-footer-button";

export const HeadingMainPanel = observer(function HeadingMainPanel() {
	const { heading, panelNavigation } = usePreview();

	return (
		<div className="flex flex-col bg-panel">
			<PanelHeader onClose={() => panelNavigation.close()} title="Heading" />

			<div className="min-h-0 flex-1 overflow-y-auto">
				<button
					className={cn(
						"flex w-full items-center justify-between px-4 py-3 text-left",
						"transition-colors hover:bg-secondary"
					)}
					onClick={() => panelNavigation.push({ type: "heading-edit" })}
					type="button"
				>
					<span className="truncate text-sm">{heading.text}</span>
					<ArrowRight className="ml-2 size-4 shrink-0 text-muted-foreground" />
				</button>
			</div>

			<StylesFooterButton
				onClick={() => panelNavigation.push({ type: "heading-styles" })}
			/>
		</div>
	);
});
