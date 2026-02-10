import { makeAutoObservable, reaction } from "mobx";
import type { Alignment } from "@/shared/types";
import type {
	HeadingLevel,
	HeadingStyles,
	HeadingTransform,
	HeadingWeight,
} from "./types";

export class HeadingStore {
	text = "Your Heading";
	link = "";

	styles: HeadingStyles = {
		level: "h2",
		weight: "bold",
		alignment: "center",
		transform: "none",
	};

	constructor() {
		makeAutoObservable(this);

		reaction(
			() => ({
				text: this.text,
				link: this.link,
				styles: { ...this.styles },
			}),
			(data) => console.log("POST http://api/heading", data),
			{ delay: 300 }
		);
	}

	setText(text: string) {
		this.text = text;
	}

	setLink(link: string) {
		this.link = link;
	}

	setLevel(level: HeadingLevel) {
		this.styles.level = level;
	}

	setWeight(weight: HeadingWeight) {
		this.styles.weight = weight;
	}

	setAlignment(alignment: Alignment) {
		this.styles.alignment = alignment;
	}

	setTransform(transform: HeadingTransform) {
		this.styles.transform = transform;
	}
}
