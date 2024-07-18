import React, { useEffect, useRef } from "@rbxts/react";
import { RootProvider } from "./providers/root-provider";
import { clearSizeListener, createSizeListener } from "./util/size-listener";

interface props extends React.PropsWithChildren {
	rootWidget: DockWidgetPluginGui;
}

export function PluginWrapper({ rootWidget, children }: props) {
	const [rootSize, setRootSize] = React.useState(new Vector2(700, 400));
	const rootContainerRef = useRef<Frame>();

	useEffect(() => {
		createSizeListener(rootWidget, setRootSize);

		return clearSizeListener;
	}, [rootWidget]);

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} ref={rootContainerRef}>
			<RootProvider rootContainer={rootContainerRef} rootSize={rootSize}>
				{children}
			</RootProvider>
		</frame>
	);
}
