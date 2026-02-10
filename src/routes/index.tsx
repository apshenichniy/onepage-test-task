// Side-effect imports: register all feature panels before rendering
import "@/elements/heading/panels";
import "@/elements/tagline/panels";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EditorSidebar } from "@/components/editor-sidebar";
import { PreviewCanvas } from "@/components/preview-canvas";
import { PreviewContext, PreviewStore } from "@/shared/stores/preview.store";

export const Route = createFileRoute("/")({ component: RouteComponent });

function RouteComponent() {
	const [store] = useState(() => new PreviewStore());

	return (
		<PreviewContext.Provider value={store}>
			<div className="relative flex min-h-screen items-center justify-center bg-background p-4">
				<PreviewCanvas />
				<EditorSidebar />
			</div>
		</PreviewContext.Provider>
	);
}
