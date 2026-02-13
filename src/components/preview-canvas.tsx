import type { ReactNode } from "react";
import { TaglinePreview } from "@/elements/tagline/ui/tagline-preview";

export const PreviewCanvas = (): ReactNode => {
	return (
		<div className="mx-auto h-[90vh] w-full max-w-3xl rounded-2xl bg-[#262624] p-8 shadow-sm">
			<TaglinePreview />
		</div>
	);
};
