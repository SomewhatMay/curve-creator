import React, { useEffect } from "@rbxts/react";
import { RootProvider } from "./providers/root-provider";
import { clearSizeListener, createSizeListener } from "./util/size-listener";

interface props extends React.PropsWithChildren {
	rootWidget: DockWidgetPluginGui;
}

export function PluginWrapper({ rootWidget, children }: props) {
	const [rootSize, setRootSize] = React.useState(new Vector2(700, 400));

	useEffect(() => {
		createSizeListener(rootWidget, setRootSize);

		return clearSizeListener;
	}, [rootWidget]);

	return <RootProvider rootSize={rootSize}>{children}</RootProvider>;
}
