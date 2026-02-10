import { makeAutoObservable } from "mobx";
import type { PanelRoute } from "@/shared/lib/panel-registry";

export class PanelNavigationStore {
	stack: PanelRoute[] = [];
	isOpen = false;
	direction: "forward" | "backward" = "forward";
	previousPanel: PanelRoute | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get currentPanel(): PanelRoute | undefined {
		return this.stack.at(-1);
	}

	get canGoBack(): boolean {
		return this.stack.length > 1;
	}

	push(route: PanelRoute) {
		this.previousPanel = this.currentPanel ?? null;
		this.direction = "forward";
		this.stack.push(route);
	}

	pop() {
		if (this.stack.length > 1) {
			this.previousPanel = this.currentPanel ?? null;
			this.direction = "backward";
			this.stack.pop();
		}
	}

	reset(route: PanelRoute) {
		this.stack = [route];
	}

	open(route: PanelRoute) {
		this.stack = [route];
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
		this.stack = [];
	}

	clearTransition() {
		this.previousPanel = null;
	}
}
