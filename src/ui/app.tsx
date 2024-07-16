import React, { useEffect, useRef, useState } from "@rbxts/react";
import { Sidebar } from "./components/sidebar";
import { Navbar, NAVBAR_HEIGHT } from "./components/navbar";
import { useRem } from "./hooks/use-rem";
import { Toolbar, TOOLBAR_HEIGHT } from "./components/toolbar";
import { SettingsWidget } from "./components/settings-widget";
import { Graph } from "./components/graph";
import { FullPadding } from "./components/full-padding";

export function App() {
	const rem = useRem();

	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundColor3={Color3.fromRGB(46, 46, 46)}
			BackgroundTransparency={0}
			BorderSizePixel={0}
		>
			<Navbar />
			<frame
				Size={new UDim2(1, 0, 1, -rem(NAVBAR_HEIGHT))}
				Position={new UDim2(0, 0, 0, rem(NAVBAR_HEIGHT))}
				BackgroundTransparency={1}
				ClipsDescendants={true}
			>
				<Sidebar />
				<Toolbar />
				<SettingsWidget />
				<frame
					Size={new UDim2(1, 0, 1, -rem(TOOLBAR_HEIGHT))}
					Position={new UDim2(0, 0, 0, rem(TOOLBAR_HEIGHT))}
					BackgroundTransparency={1}
				>
					<Graph />
					<FullPadding padding={new UDim(0, rem(8))} PaddingLeft={new UDim(0, rem(16))} />
				</frame>
			</frame>
		</frame>
	);
}
