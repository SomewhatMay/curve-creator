import React from "@rbxts/react";
import { RemProvider } from "./rem-provider";
import { ReflexProvider } from "@rbxts/react-reflex";
import { producer } from "store";

interface props extends React.PropsWithChildren {
	rootSize: Vector2;
}

export function RootProvider({ rootSize, children }: props) {
	return (
		<RemProvider rootSize={rootSize}>
			<ReflexProvider producer={producer}>{children}</ReflexProvider>
		</RemProvider>
	);
}
