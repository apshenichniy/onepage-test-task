import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DragHandleProps extends ComponentProps<"div"> {
	variant: "horizontal" | "vertical";
}

const dots = Array.from({ length: 5 });

export const DragHandle = ({
	variant,
	className,
	...props
}: DragHandleProps): ReactNode => {
	return (
		<div
			className={cn(
				"flex cursor-grab items-center justify-center active:cursor-grabbing",
				variant === "horizontal" ? "px-4 py-2" : "px-2 py-4",
				className
			)}
			{...props}
		>
			<div className={cn("flex gap-0.5", variant === "vertical" && "flex-col")}>
				{dots.map((_, i) => (
					<div
						className="size-0.5 rounded-full bg-accent"
						key={`dot-${i.toString()}`}
					/>
				))}
			</div>
		</div>
	);
};
