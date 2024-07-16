import React, { useEffect, useRef, useState } from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { RootProvider } from "./providers/root-provider";
import { App } from "./app";
import { producer } from "store";
import { clearSizeListener, createSizeListener } from "./util/size-listener";
import { StoryWrapper } from "./story-wrapper";

const story = {
	summary: "App",
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<StoryWrapper>
				<App />
			</StoryWrapper>
		);
	},
	cleanup: () => {
		producer.resetState();
	},
};

export = story;
