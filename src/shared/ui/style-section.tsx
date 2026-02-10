import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StyleSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StyleSection = ({
	title,
	children,
	className,
}: StyleSectionProps): ReactNode => {
	return (
		<div className={cn("gap-x-1 px-3.5 py-3", className)}>
			{title && (
				<div className="mb-2 h-5 font-bold text-sm leading-5">{title}</div>
			)}
			{children}
		</div>
	);
};
