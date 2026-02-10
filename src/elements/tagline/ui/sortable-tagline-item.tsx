import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import { Trash } from "@/components/icons";
import { cn } from "@/lib/utils";
import { DragHandle } from "@/shared/ui/drag-handle";
import { IconButton } from "@/shared/ui/icon-button";
import type { TagItem } from "../types";

interface SortableTaglineItemProps {
	item: TagItem;
	onEdit: () => void;
	onRemove: () => void;
}

export const SortableTaglineItem = ({
	item,
	onEdit,
	onRemove,
}: SortableTaglineItemProps): ReactNode => {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: item.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			className={cn(
				"group relative flex h-10 items-center justify-between pl-3",
				isDragging && "z-10 opacity-80"
			)}
			ref={setNodeRef}
			style={style}
		>
			<div
				className="absolute right-full -mr-1.5 flex h-10 items-center opacity-0 group-hover:opacity-100"
				ref={setActivatorNodeRef}
				{...attributes}
				{...listeners}
			>
				<DragHandle variant="vertical" />
			</div>
			<button
				className="cursor-pointer truncate text-left font-medium text-sm transition-colors hover:text-foreground/80"
				onClick={onEdit}
				type="button"
			>
				{item.label}
			</button>
			<IconButton
				aria-label={`Remove ${item.label}`}
				className="opacity-0 transition-opacity group-hover:opacity-100"
				onClick={onRemove}
			>
				<Trash className="size-4" />
			</IconButton>
		</div>
	);
};
