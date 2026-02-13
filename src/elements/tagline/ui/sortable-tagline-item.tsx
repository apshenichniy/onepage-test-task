import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { MouseEvent, ReactNode } from "react";
import { X } from "@/components/icons";
import { cn } from "@/lib/utils";
import { DragHandle } from "@/shared/ui/drag-handle";
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

	const handleRemove = (e: MouseEvent) => {
		e.stopPropagation();
		onRemove();
	};

	return (
		<div
			className={cn(
				"group relative flex h-10 items-center justify-between rounded-sm py-1 pr-1 pl-3 transition-colors hover:bg-white/7",
				isDragging && "z-10 opacity-80"
			)}
			ref={setNodeRef}
			style={style}
		>
			<button
				className="absolute inset-0 cursor-pointer rounded-lg"
				onClick={onEdit}
				type="button"
			>
				<span className="sr-only">Edit {item.label}</span>
			</button>
			<div
				className="absolute right-full -mr-0.5 flex h-10 items-center opacity-0 group-hover:opacity-100"
				ref={setActivatorNodeRef}
				{...attributes}
				{...listeners}
			>
				<DragHandle dotClassName="bg-white/7" size="sm" variant="vertical" />
			</div>
			<span className="truncate font-normal text-sm leading-[140%]">
				{item.label}
			</span>
			<button
				aria-label={`Remove ${item.label}`}
				className="relative z-10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-muted-foreground opacity-0 transition-opacity hover:bg-white/7 group-hover:opacity-100"
				onClick={handleRemove}
				type="button"
			>
				<X className="size-4" />
			</button>
		</div>
	);
};
