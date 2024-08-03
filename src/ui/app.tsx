import React, { useEffect, useRef, useState } from "@rbxts/react";
import { Sidebar } from "./components/sidebar";
import { Navbar, NAVBAR_HEIGHT } from "./components/navbar";
import { useRem } from "./hooks/use-rem";
import { Toolbar } from "./components/toolbar";
import { SettingsWidget } from "./components/settings-widget";
import { Graph } from "./components/graph";
import { Notification } from "./components/notification";
import { InputNotification } from "./components/notification/input-notification";
import { useSelector } from "@rbxts/react-reflex";
import { selectInputNotification, selectNotification } from "store/modal-slice";

export function App() {
	const rem = useRem();

	const notificationProps = useSelector(selectNotification);
	const inputNotificationProps = useSelector(selectInputNotification);

	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundColor3={Color3.fromRGB(46, 46, 46)}
			BackgroundTransparency={0}
			BorderSizePixel={0}
		>
			<Navbar />
			{notificationProps && <Notification {...notificationProps} />}
			{inputNotificationProps && <InputNotification {...inputNotificationProps} />}
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
