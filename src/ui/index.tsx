import React, { StrictMode } from "@rbxts/react";
import { createLegacyRoot, createPortal, createRoot } from "@rbxts/react-roblox";
import { RootProvider } from "./providers/root-provider";
import { App } from "./app";
import { PluginWrapper } from "./plugin-wrapper";

/**
 * Mount the React App in the DockWidgetPluginGui or
 * a testing Frame.
 */
export function mountRoot(rootParent: DockWidgetPluginGui) {
	const root = createRoot(rootParent);

	root.render(
		<StrictMode>
			<PluginWrapper rootWidget={rootParent}>
				<App />
			</PluginWrapper>
		</StrictMode>,
	);

	return root;
}
