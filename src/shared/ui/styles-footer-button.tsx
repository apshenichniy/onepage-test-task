import { ArrowRight, Style } from "@/components/icons";

interface StylesFooterButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function StylesFooterButton({ onClick }: StylesFooterButtonProps) {
	return (
		<button
			className="group flex h-12 w-full shrink-0 cursor-pointer items-center justify-between border-border border-t px-3.5 text-sm transition-colors hover:text-foreground/80"
			onClick={onClick}
			type="button"
		>
			<span className="flex items-center gap-3 font-medium group-hover:text-foreground/80">
				<Style className="text-muted-foreground group-hover:text-foreground/80" />
				Styles
			</span>
			<ArrowRight className="text-muted-foreground group-hover:text-foreground/80" />
		</button>
	);
}
