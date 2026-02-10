import { observer } from "mobx-react-lite";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePreview } from "@/shared/stores/preview.store";
import { DragHandleProvider } from "@/shared/ui/drag-handle-context";
import { PanelStack } from "./panel-stack";

const ORIGIN = { x: 0, y: 0 };

export const EditorSidebar = observer(function EditorSidebar() {
	const { panelNavigation } = usePreview();
	const [visible, setVisible] = useState(false);
	const [closing, setClosing] = useState(false);
	const visibleRef = useRef(false);

	const [isDragging, setIsDragging] = useState(false);
	const dragStart = useRef(ORIGIN);
	const offsetRef = useRef(ORIGIN);
	const containerRef = useRef<HTMLDivElement>(null);
	const rafIdRef = useRef(0);

	useEffect(() => {
		if (panelNavigation.isOpen) {
			setVisible(true);
			setClosing(false);
			visibleRef.current = true;
		} else if (visibleRef.current) {
			setClosing(true);
		}
	}, [panelNavigation.isOpen]);

	const handleAnimationEnd = () => {
		if (closing) {
			setVisible(false);
			setClosing(false);
			visibleRef.current = false;
			offsetRef.current = ORIGIN;
			if (containerRef.current) {
				containerRef.current.style.transform = "";
			}
		}
	};

	const handlePointerDown = useCallback((e: PointerEvent) => {
		e.preventDefault();
		setIsDragging(true);
		dragStart.current = {
			x: e.clientX - offsetRef.current.x,
			y: e.clientY - offsetRef.current.y,
		};
		e.currentTarget.setPointerCapture(e.pointerId);
	}, []);

	const handlePointerMove = useCallback((e: PointerEvent) => {
		if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
			return;
		}
		const x = e.clientX - dragStart.current.x;
		const y = e.clientY - dragStart.current.y;
		offsetRef.current = { x, y };
		cancelAnimationFrame(rafIdRef.current);
		rafIdRef.current = requestAnimationFrame(() => {
			if (containerRef.current) {
				containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
			}
		});
	}, []);

	const handlePointerUp = useCallback((e: PointerEvent) => {
		cancelAnimationFrame(rafIdRef.current);
		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			e.currentTarget.releasePointerCapture(e.pointerId);
		}
		setIsDragging(false);
	}, []);

	useEffect(() => {
		return () => cancelAnimationFrame(rafIdRef.current);
	}, []);

	const dragHandleValue = useRef({
		onPointerDown: handlePointerDown,
		onPointerMove: handlePointerMove,
		onPointerUp: handlePointerUp,
	});

	if (!visible) {
		return null;
	}

	return (
		<div
			className={cn(
				"fixed inset-y-0 right-0 z-50 flex items-center p-4",
				isDragging && "select-none"
			)}
			ref={containerRef}
		>
			<div
				className={cn(
					"w-70 overflow-hidden rounded-2xl",
					"bg-panel shadow-panel backdrop-blur-panel",
					closing
						? "fade-out zoom-out-96 animate-out fill-mode-forwards duration-150"
						: "fade-in zoom-in-96 animate-in duration-150"
				)}
				onAnimationEnd={handleAnimationEnd}
			>
				<DragHandleProvider value={dragHandleValue.current}>
					<PanelStack />
				</DragHandleProvider>
			</div>
		</div>
	);
});
