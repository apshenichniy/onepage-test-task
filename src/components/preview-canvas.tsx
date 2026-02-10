import type { ReactNode } from "react";
import { HeadingPreview } from "@/elements/heading/ui/heading-preview";
import { TaglinePreview } from "@/elements/tagline/ui/tagline-preview";

export const PreviewCanvas = (): ReactNode => {
	return (
		<div className="mx-auto w-full max-w-3xl rounded-2xl bg-[#262624] p-8 shadow-sm">
			<HeadingPreview />
			<TaglinePreview />
		</div>
	);
};
