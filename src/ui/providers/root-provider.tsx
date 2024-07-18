import React, { MutableRefObject } from "@rbxts/react";
import { RemProvider } from "./rem-provider";
import { ReflexProvider } from "@rbxts/react-reflex";
import { producer } from "store";
import { InputContextProvider } from "./input-provider";

interface props extends React.PropsWithChildren {
	rootSize: Vector2;
	rootContainer: MutableRefObject<Frame | undefined>;
}

export function RootProvider({ rootSize, rootContainer, children }: props) {
	return (
		<RemProvider rootSize={rootSize}>
			<ReflexProvider producer={producer}>
				<InputContextProvider rootContainer={rootContainer}>{children}</InputContextProvider>
			</ReflexProvider>
		</RemProvider>
	);
}
