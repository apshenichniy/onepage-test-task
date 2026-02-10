import type { DragEndEvent } from "@dnd-kit/core";
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { observer } from "mobx-react-lite";
import { Plus } from "@/components/icons";
import { usePreview } from "@/shared/stores/preview.store";
import { PanelHeader } from "@/shared/ui/panel-header";
import { StylesFooterButton } from "@/shared/ui/styles-footer-button";
import { SortableTaglineItem } from "./sortable-tagline-item";

export const TaglineMainPanel = observer(function TaglineMainPanel() {
	const { tagline, panelNavigation } = usePreview();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 4 },
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) {
			return;
		}

		const oldIndex = tagline.items.findIndex((i) => i.id === active.id);
		const newIndex = tagline.items.findIndex((i) => i.id === over.id);
		const reordered = arrayMove([...tagline.items], oldIndex, newIndex);
		tagline.reorderItems(reordered);
	};

	return (
		<div className="flex flex-col bg-panel">
			<PanelHeader onClose={() => panelNavigation.close()} title="Tagline" />

			<div className="min-h-0 flex-1 overflow-y-auto">
				<div className="m-3.5 flex flex-col">
					<DndContext
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
						sensors={sensors}
					>
						<SortableContext
							items={tagline.items.map((i) => i.id)}
							strategy={verticalListSortingStrategy}
						>
							{tagline.items.map((item) => (
								<SortableTaglineItem
									item={item}
									key={item.id}
									onEdit={() =>
										panelNavigation.push({
											type: "tagline-item",
											itemId: item.id,
										})
									}
									onRemove={() => tagline.removeItem(item.id)}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>

				<div className="p-4">
					<button
						className="group flex cursor-pointer items-center gap-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground/80"
						onClick={() => panelNavigation.push({ type: "tagline-item" })}
						type="button"
					>
						<span className="flex size-8 items-center justify-center">
							<Plus className="group-hover:text-foreground/80" />
						</span>
						Add item
					</button>
				</div>
			</div>

			<StylesFooterButton
				onClick={() => panelNavigation.push({ type: "tagline-styles" })}
			/>
		</div>
	);
});
