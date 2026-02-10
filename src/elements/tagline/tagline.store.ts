import { makeAutoObservable, reaction } from "mobx";
import type { Alignment } from "@/shared/types";
import type {
	TagItem,
	TaglineStyles,
	TagRadius,
	TagSize,
	TagStyleVariant,
} from "./types";

export class TaglineStore {
	items: TagItem[] = [
		{ id: "1", label: "Marketing", link: "" },
		{ id: "2", label: "Design", link: "" },
		{ id: "3", label: "Development", link: "" },
		{ id: "4", label: "Front", link: "" },
		{ id: "5", label: "AI Engineering", link: "" },
	];

	styles: TaglineStyles = {
		variant: "filled",
		size: "m",
		radius: 8,
		alignment: "center",
	};

	constructor() {
		makeAutoObservable(this);

		reaction(
			() => ({
				items: this.items.map((item) => ({ ...item })),
				styles: { ...this.styles },
			}),
			(data) => console.log("POST http://api/tagline", data),
			{ delay: 300 }
		);
	}

	addItem(item: Omit<TagItem, "id">) {
		const id = crypto.randomUUID();
		this.items.push({ ...item, id });
		return id;
	}

	updateItem(id: string, updates: Partial<Omit<TagItem, "id">>) {
		const item = this.items.find((i) => i.id === id);
		if (item) {
			Object.assign(item, updates);
		}
	}

	removeItem(id: string) {
		this.items = this.items.filter((i) => i.id !== id);
	}

	reorderItems(items: TagItem[]) {
		this.items = items;
	}

	getItemById(id: string): TagItem | undefined {
		return this.items.find((i) => i.id === id);
	}

	setVariant(variant: TagStyleVariant) {
		this.styles.variant = variant;
	}

	setSize(size: TagSize) {
		this.styles.size = size;
	}

	setRadius(radius: TagRadius) {
		this.styles.radius = radius;
	}

	setAlignment(alignment: Alignment) {
		this.styles.alignment = alignment;
	}
}
