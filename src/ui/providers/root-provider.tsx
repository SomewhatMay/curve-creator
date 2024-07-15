import React from "@rbxts/react";
import { RemProvider } from "./rem-provider";
import { ReflexProvider } from "@rbxts/react-reflex";
import { producer } from "store";

export function RootProvider({ children }: React.PropsWithChildren) {
	return <RemProvider><ReflexProvider producer={producer}>{children}</ReflexProvider></RemProvider>;
}