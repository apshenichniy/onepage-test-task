import { createContext, useContext } from "react";
import { HeadingStore } from "@/elements/heading/heading.store";
import { TaglineStore } from "@/elements/tagline/tagline.store";
import { PanelNavigationStore } from "./panel-navigation.store";

export class PreviewStore {
	tagline = new TaglineStore();
	heading = new HeadingStore();
	panelNavigation = new PanelNavigationStore();
}

export const PreviewContext = createContext<PreviewStore | null>(null);

export const usePreview = (): PreviewStore => {
	const store = useContext(PreviewContext);
	if (!store) {
		throw new Error("usePreview must be used within PreviewContext.Provider");
	}
	return store;
};
