import type { ComponentType } from "react";

// biome-ignore lint/suspicious/noEmptyInterface: intentionally empty -- elements extend this via declaration merging
export interface PanelRouteMap {}

export type PanelRoute = PanelRouteMap[keyof PanelRouteMap];

type AnyComponent = ComponentType<Record<string, unknown>>;

const registry = new Map<string, AnyComponent>();

export const registerPanel = <K extends keyof PanelRouteMap>(
	type: K,
	// biome-ignore lint/suspicious/noExplicitAny: panels have heterogeneous prop shapes
	component: ComponentType<any>
): void => {
	registry.set(type as string, component);
};

export const getPanelComponent = (type: string): AnyComponent | undefined =>
	registry.get(type);
