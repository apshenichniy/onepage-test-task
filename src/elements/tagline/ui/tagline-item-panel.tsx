import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { usePreview } from "@/shared/stores/preview.store";
import { Input } from "@/shared/ui/input";
import { PanelHeader } from "@/shared/ui/panel-header";

interface TaglineItemPanelProps {
	itemId?: string;
}

export const TaglineItemPanel = observer(function TaglineItemPanel({
	itemId: existingItemId,
}: TaglineItemPanelProps) {
	const { tagline, panelNavigation } = usePreview();

	const inputRef = useRef<HTMLInputElement>(null);
	const createdIdRef = useRef<string | null>(null);
	const [draftLabel, setDraftLabel] = useState("");
	const [draftLink, setDraftLink] = useState("");

	useEffect(() => {
		inputRef.current?.focus({ preventScroll: true });
	}, []);

	const id = existingItemId ?? createdIdRef.current;
	const item = id ? tagline.getItemById(id) : undefined;

	const handleLabelChange = (value: string) => {
		if (existingItemId) {
			tagline.updateItem(existingItemId, { label: value });
			return;
		}

		const hasContent = value.trim().length > 0;

		if (hasContent && !createdIdRef.current) {
			createdIdRef.current = tagline.addItem({ label: value, link: draftLink });
		} else if (hasContent && createdIdRef.current) {
			tagline.updateItem(createdIdRef.current, { label: value });
		} else if (!hasContent && createdIdRef.current) {
			tagline.removeItem(createdIdRef.current);
			createdIdRef.current = null;
		}

		setDraftLabel(value);
	};

	const handleLinkChange = (value: string) => {
		if (existingItemId) {
			tagline.updateItem(existingItemId, { link: value });
			return;
		}

		if (createdIdRef.current) {
			tagline.updateItem(createdIdRef.current, { link: value });
		}

		setDraftLink(value);
	};

	const removeIfEmpty = () => {
		if (createdIdRef.current) {
			const created = tagline.getItemById(createdIdRef.current);
			if (!created?.label.trim()) {
				tagline.removeItem(createdIdRef.current);
				createdIdRef.current = null;
			}
		}
	};

	const handleBack = () => {
		removeIfEmpty();
		panelNavigation.pop();
	};

	const handleClose = () => {
		removeIfEmpty();
		panelNavigation.close();
	};

	return (
		<div className="flex flex-col bg-panel">
			<PanelHeader onBack={handleBack} onClose={handleClose} title="Item" />

			<div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4">
				<Input
					label="Label"
					onChange={(e) => handleLabelChange(e.target.value)}
					placeholder="Enter label"
					ref={inputRef}
					value={existingItemId ? (item?.label ?? "") : draftLabel}
				/>
				<Input
					label="Link"
					onChange={(e) => handleLinkChange(e.target.value)}
					placeholder="https://"
					value={existingItemId ? (item?.link ?? "") : draftLink}
				/>
			</div>
		</div>
	);
});
