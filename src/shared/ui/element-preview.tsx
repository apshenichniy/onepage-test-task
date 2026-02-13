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
			className="group flex w-full cursor-pointer flex-col items-center rounded-xl p-6"
			onClick={onClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
		>
			<div className="mb-20 pt-30 text-center font-medium text-[38px]">
				{label}
			</div>

			<div className="w-100">{children}</div>
		</div>
	);
};
