import type { PointerEventHandler } from "react";
import { createContext, useContext } from "react";

interface DragHandleValue {
	onPointerDown: PointerEventHandler;
	onPointerMove: PointerEventHandler;
	onPointerUp: PointerEventHandler;
}

const noop: PointerEventHandler = () => undefined;

const DragHandleContext = createContext<DragHandleValue>({
	onPointerDown: noop,
	onPointerMove: noop,
	onPointerUp: noop,
});

export const DragHandleProvider = DragHandleContext.Provider;
export const useDragHandle = (): DragHandleValue =>
	useContext(DragHandleContext);
