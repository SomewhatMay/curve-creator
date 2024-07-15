import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface IoState {
	FileOpened: boolean;
	FileName: string;
	Changed: boolean;
}

const initialState: IoState = {
	FileOpened: false,
	FileName: "",
	Changed: true,
};

export const selectFileOpened = (state: RootState) => state.io.FileOpened;
export const selectFileName = (state: RootState) => state.io.FileName;
export const selectChanged = (state: RootState) => state.io.Changed;

export const ioSlice = createProducer(initialState, {
	setFileOpened: (state, FileOpened: boolean) => ({
		...state,
		FileOpened,
	}),
	setFileName: (state, FileName: string) => ({
		...state,
		FileName,
	}),
	setChanged: (state, Changed: boolean) => ({
		...state,
		Changed,
	}),
})