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
	ref,
	...props
}: InputProps): ReactNode => {
	return (
		<label
			className={cn(
				"flex h-11.75 flex-col gap-1 rounded-sm border border-border bg-white/7 px-3 pt-2",
				classNames?.container
			)}
		>
			{label && (
				<span
					className={cn(
						"inline-flex h-2 items-center overflow-clip font-medium text-white/65 text-xs leading-none",
						classNames?.label
					)}
				>
					{label}
				</span>
			)}
			<input
				className={cn(
					"w-full text-sm outline-none placeholder:text-muted-foreground/50",
					classNames?.input
				)}
				ref={ref}
				{...props}
			/>
		</label>
	);
};
