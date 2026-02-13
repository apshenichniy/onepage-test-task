import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SegmentedControlOption<T> {
	value: T;
	label: ReactNode;
}

interface SegmentedControlProps<T extends string | number> {
	options: readonly SegmentedControlOption<T>[];
	value: T;
	onChange: (value: T) => void;
}

export function SegmentedControl<T extends string | number>({
	options,
	value,
	onChange,
}: SegmentedControlProps<T>) {
	return (
		<div className="flex gap-1">
			{options.map((option) => (
				<button
					className={cn(
						"flex h-8 flex-1 cursor-pointer items-center justify-center rounded-sm font-medium text-sm leading-[140%] tracking-[-0.002em]",
						value === option.value && "bg-white/7"
					)}
					key={String(option.value)}
					onClick={() => onChange(option.value)}
					type="button"
				>
					{option.label}
				</button>
			))}
		</div>
	);
}
