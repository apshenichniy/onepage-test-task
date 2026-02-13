import type { ReactNode } from "react";
import { ArrowLeft, X } from "@/components/icons";
import { DragHandle } from "./drag-handle";
import { useDragHandle } from "./drag-handle-context";
import { IconButton } from "./icon-button";

interface PanelHeaderProps {
	title: string;
	onBack?: () => void;
	onClose?: () => void;
}

export const PanelHeader = ({
	title,
	onBack,
	onClose,
}: PanelHeaderProps): ReactNode => {
	const dragHandleProps = useDragHandle();

	return (
		<div className="relative flex h-14 shrink-0 items-center border-border border-b px-2">
			<DragHandle
				className="absolute inset-x-0 top-0 justify-center pt-1"
				variant="horizontal"
				{...dragHandleProps}
			/>
			<div className="w-8">
				{onBack && (
					<IconButton onClick={onBack}>
						<ArrowLeft />
					</IconButton>
				)}
			</div>
			<span className="flex-1 text-center font-bold text-base">{title}</span>
			<div className="w-8">
				{onClose && (
					<IconButton onClick={onClose}>
						<X className="size-4" />
					</IconButton>
				)}
			</div>
		</div>
	);
};
