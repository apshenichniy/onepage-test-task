import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
	onClick: () => void;
	children: ReactNode;
	className?: string;
	"aria-label"?: string;
}

export const IconButton = ({
	onClick,
	children,
	className,
	"aria-label": ariaLabel,
}: IconButtonProps): ReactNode => (
	<button
		aria-label={ariaLabel}
		className={cn(
			"flex size-8 cursor-pointer items-center justify-center rounded-[6px] text-muted-foreground transition-colors hover:bg-white/7",
			className
		)}
		onClick={onClick}
		type="button"
	>
		{children}
	</button>
);
