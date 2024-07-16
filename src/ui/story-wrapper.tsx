import React, { MutableRefObject, useEffect, useRef, useState } from "@rbxts/react";
import { RootProvider } from "./providers/root-provider";
import { clearSizeListener, createSizeListener } from "./util/size-listener";

export function StoryWrapper({ children }: React.PropsWithChildren) {
	const rootWidget = useRef<Frame | undefined>();
	const [rootSize, setRootSize] = useState(new Vector2(700, 400));

	useEffect(() => {
		if (rootWidget.current) {
			createSizeListener(rootWidget.current, setRootSize);
		}

		return clearSizeListener;
	}, [rootWidget]);

	return (
		<RootProvider rootSize={rootSize}>
			<frame ref={rootWidget} BorderSizePixel={0} Size={new UDim2(0, 700, 0, 400)}>
				{children}
			</frame>
		</RootProvider>
	);
}
