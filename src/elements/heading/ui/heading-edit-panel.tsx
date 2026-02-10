import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { usePreview } from "@/shared/stores/preview.store";
import { Input } from "@/shared/ui/input";
import { PanelHeader } from "@/shared/ui/panel-header";

export const HeadingEditPanel = observer(function HeadingEditPanel() {
	const { heading, panelNavigation } = usePreview();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus({ preventScroll: true });
	}, []);

	return (
		<div className="flex flex-col bg-panel">
			<PanelHeader
				onBack={() => panelNavigation.pop()}
				onClose={() => panelNavigation.close()}
				title="Edit Heading"
			/>

			<div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4">
				<Input
					label="Text"
					onChange={(e) => heading.setText(e.target.value)}
					placeholder="Enter heading text"
					ref={inputRef}
					value={heading.text}
				/>
				<Input
					label="Link"
					onChange={(e) => heading.setLink(e.target.value)}
					placeholder="https://"
					value={heading.link}
				/>
			</div>
		</div>
	);
});
