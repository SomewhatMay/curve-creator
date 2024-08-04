import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface IoState {
	FileOpened: boolean;
	FileName: string;
	FileObject: Instance | undefined;
	FileParent: Instance | undefined;
	Changed: boolean;
}

const initialState: IoState = {
	FileOpened: false,
	FileName: "",
	FileObject: undefined,
	FileParent: undefined,
	Changed: false,
};

export const selectFileOpened = (state: RootState) => state.io.FileOpened;
export const selectFileName = (state: RootState) => state.io.FileName;
export const selectChanged = (state: RootState) => state.io.Changed;
export const selectFileObject = (state: RootState) => state.io.FileObject;
export const selectFileParent = (state: RootState) => state.io.FileParent;

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
	setFileObject: (state, FileObject: Instance | undefined) => ({
		...state,
		FileObject,
	}),
	setFileParent: (state, FileParent: Instance | undefined) => ({
		...state,
		FileParent,
	}),
});
