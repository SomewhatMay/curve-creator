import React, { useContext } from "@rbxts/react";
import { createContext, MutableRefObject } from "@rbxts/react";

const InputContext = createContext<MutableRefObject<Frame | undefined>>(undefined as any);

export function useInputContext() {
	return useContext(InputContext);
}

interface props {
	children: React.ReactNode;
	rootContainer: MutableRefObject<Frame | undefined>;
}

export function InputContextProvider({ rootContainer, children }: props) {
	return <InputContext.Provider value={rootContainer}>{children}</InputContext.Provider>;
}
