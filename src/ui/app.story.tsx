import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { RootProvider } from "./providers/root-provider";
import { App } from "./app";
import { producer } from "store";

const story = {
	summary: "App",
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<frame BorderSizePixel={0} Size={new UDim2(0, 700, 0, 400)}>
				<RootProvider>
					<App />
				</RootProvider>
			</frame>
		);
	},
	cleanup: () => {
		producer.resetState();
	},
};

export = story;
