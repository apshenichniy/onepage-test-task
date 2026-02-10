import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const NotFound = () => (
	<div className="flex min-h-screen items-center justify-center">
		<p className="text-muted-foreground">Page not found</p>
	</div>
);

export const getRouter = () =>
	createRouter({
		routeTree,
		context: {},
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: NotFound,
	});
