import type { KeyboardEvent, ReactNode } from "react";

interface ElementPreviewProps {
	label: string;
	onClick: () => void;
	children: ReactNode;
}

export const ElementPreview = ({
	label,
	onClick,
	children,
}: ElementPreviewProps): ReactNode => {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	};

	return (
		// biome-ignore lint/a11y/useSemanticElements: <button> cannot be used due to nested interactive content (links)
		<div
			className="group w-full cursor-pointer rounded-xl p-6 text-left"
			onClick={onClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
		>
			<div className="mb-2 font-medium text-muted-foreground text-xs">
				{label}
			</div>
			{children}
		</div>
	);
};
