import React, { useEffect, useRef, useState } from "@rbxts/react";
import { Sidebar } from "./components/sidebar";
import { Navbar, NAVBAR_HEIGHT } from "./components/navbar";
import { useRem } from "./hooks/use-rem";
import { Toolbar } from "./components/toolbar";
import { SettingsWidget } from "./components/settings-widget";
import { Graph } from "./components/graph";
import { Notification } from "./components/notification";
import { InputNotification } from "./components/notification/input-notification";
import { ServerScriptService } from "@rbxts/services";

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
			{/* <Notification
				message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae quas minus."
				options={[
					{
						handler: () => {
							print("Hello");
						},
						message: "Hello",
						BackgroundColor3: Color3.fromRGB(255, 0, 0),
					},
					{
						handler: () => {
							print("World");
						},
						message: "World",
					},
				]}
			/> */}
			{/* <InputNotification
				title="Create New File"
				label="File name"
				placeholder="Enter file name..."
				saveDirectory={ServerScriptService}
				options={[
					{
						handler: () => {
							print("Hello");
						},
						message: "Hello",
						BackgroundColor3: Color3.fromRGB(255, 0, 0),
					},
					{
						handler: () => {
							print("World");
						},
						message: "World",
					},
				]}
			/> */}
			<frame
				Size={new UDim2(1, 0, 1, -rem(NAVBAR_HEIGHT))}
				Position={new UDim2(0, 0, 0, rem(NAVBAR_HEIGHT))}
				BackgroundTransparency={1}
				ClipsDescendants={true}
			>
				<Sidebar />
				<Toolbar />
				<SettingsWidget />
				<Graph />
			</frame>
		</frame>
	);
}
