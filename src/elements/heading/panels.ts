// Side-effect module: registers heading panels in the global registry
import { registerPanel } from "@/shared/lib/panel-registry";
import { HeadingEditPanel } from "./ui/heading-edit-panel";
import { HeadingMainPanel } from "./ui/heading-main-panel";
import { HeadingStylesPanel } from "./ui/heading-styles-panel";

declare module "@/shared/lib/panel-registry" {
	interface PanelRouteMap {
		"heading-main": { type: "heading-main" };
		"heading-edit": { type: "heading-edit" };
		"heading-styles": { type: "heading-styles" };
	}
}

registerPanel("heading-main", HeadingMainPanel);
registerPanel("heading-edit", HeadingEditPanel);
registerPanel("heading-styles", HeadingStylesPanel);
