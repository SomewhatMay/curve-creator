import React, { StrictMode } from "@rbxts/react";
import { createLegacyRoot, createPortal, createRoot } from "@rbxts/react-roblox";
import { RootProvider } from "./providers/root-provider";
import { App } from "./app";

/**
 * Mount the React App in the DockWidgetPluginGui or
 * a testing Frame.
 */
export function mountRoot(rootParent: DockWidgetPluginGui | Frame) {
	const root = createRoot(rootParent);

	// root.render(
	// 	createPortal(
	// 		<StrictMode>
	// 			<RootProvider>
	// 				<App />
	// 			</RootProvider>
	// 		</StrictMode>,
	// 		rootParent,
	// 	),
	// );

	root.render(
		<StrictMode>
			<RootProvider>
				<App />
			</RootProvider>
		</StrictMode>,
	);

	return root;
}