// Side-effect module: registers tagline panels in the global registry
import { registerPanel } from "@/shared/lib/panel-registry";
import { TaglineItemPanel } from "./ui/tagline-item-panel";
import { TaglineMainPanel } from "./ui/tagline-main-panel";
import { TaglineStylesPanel } from "./ui/tagline-styles-panel";

declare module "@/shared/lib/panel-registry" {
	interface PanelRouteMap {
		"tagline-main": { type: "tagline-main" };
		"tagline-item": { type: "tagline-item"; itemId?: string };
		"tagline-styles": { type: "tagline-styles" };
	}
}

registerPanel("tagline-main", TaglineMainPanel);
registerPanel("tagline-item", TaglineItemPanel);
registerPanel("tagline-styles", TaglineStylesPanel);
