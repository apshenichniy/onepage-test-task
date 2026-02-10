import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	ref?: Ref<HTMLInputElement>;
	classNames?: {
		container?: string;
		label?: string;
		input?: string;
	};
}

export const Input = ({
	label,
	classNames,
	className,
	ref,
	...props
}: InputProps): ReactNode => {
	return (
		<label
			className={cn(
				"block rounded-sm border border-border bg-[#FFFFFF12] px-3 py-2",
				classNames?.container
			)}
		>
			{label && (
				<span
					className={cn(
						"block font-medium text-muted-foreground text-sm",
						classNames?.label
					)}
				>
					{label}
				</span>
			)}
			<input
				className={cn(
					"w-full rounded-sm bg-transparent text-sm outline-none placeholder:text-muted-foreground/50",
					classNames?.input,
					className
				)}
				ref={ref}
				{...props}
			/>
		</label>
	);
};
