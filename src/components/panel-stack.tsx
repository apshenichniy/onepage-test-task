import { observer } from "mobx-react-lite";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { getPanelComponent } from "@/shared/lib/panel-registry";
import { usePreview } from "@/shared/stores/preview.store";

const renderPanel = (panel: {
	type: string;
	[key: string]: unknown;
}): ReactNode => {
	const Component = getPanelComponent(panel.type);
	if (!Component) {
		return null;
	}
	const { type, ...props } = panel;
	return <Component {...props} />;
};

const slideVariants = {
	enter: (direction: "forward" | "backward") => ({
		x: direction === "forward" ? "100%" : "-100%",
	}),
	center: { x: 0 },
	exit: { zIndex: 0 },
};

export const PanelStack = observer(function PanelStack() {
	const { panelNavigation } = usePreview();
	const { currentPanel, direction, stack } = panelNavigation;

	if (!currentPanel) {
		return null;
	}

	return (
		<div className="grid overflow-hidden">
			<AnimatePresence
				custom={direction}
				initial={false}
				onExitComplete={() => panelNavigation.clearTransition()}
			>
				<motion.div
					animate="center"
					className="z-10 bg-card [grid-area:1/1]"
					custom={direction}
					exit="exit"
					initial="enter"
					key={`${currentPanel.type}-${stack.length}`}
					transition={{ duration: 0.2, ease: "easeOut" }}
					variants={slideVariants}
				>
					{renderPanel(currentPanel)}
				</motion.div>
			</AnimatePresence>
		</div>
	);
});
