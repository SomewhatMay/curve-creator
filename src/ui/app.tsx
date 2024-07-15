import React, { useEffect, useRef, useState } from "@rbxts/react";
import { Sidebar } from "./components/sidebar";

export function App() {
	const rootFrameRef = useRef<Frame | undefined>();
	const [enabled, setEnabled]= useState(false);

	print("Rendering App");

	useEffect(() => {
		print("Mounted app");
	}, []);

	useEffect(() => {
		let sizeChangeConnection: RBXScriptConnection | undefined;

		print(rootFrameRef.current);

		if (rootFrameRef.current) {
			sizeChangeConnection = rootFrameRef.current.GetPropertyChangedSignal("AbsoluteSize").Connect(() => {
				print("The size is:", rootFrameRef.current?.AbsoluteSize);
			})
		}

		return () => {
			if (sizeChangeConnection) {
				sizeChangeConnection.Disconnect();
			}
		}
	}, [enabled]);

	return (
		<frame ref={rootFrameRef} Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<Sidebar />
			<textbutton Size={new UDim2(0, 200, 0, 50)} BackgroundTransparency={0} Text={enabled ? "Enabled" : "Disabled"} Event={{ MouseButton1Click: () => setEnabled(!enabled) }}></textbutton>
		</frame>
	);
}