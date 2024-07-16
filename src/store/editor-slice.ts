import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface EditorState {
	Points: Record<number, number>;
}

export const initialState: EditorState = {
	Points: {},
};

export const selectPoints = (state: RootState) => state.editor.Points;
export const selectPoint = (state: RootState, x: number) => state.editor.Points[x];

export const editorSlice = createProducer(initialState, {
	addPoint: (state, x: number, y: number) => ({
		...state,
		Points: { ...state.Points, [x]: y },
	}),
	removePoint: (state, x: number) => ({
		...state,
		Points: { ...state.Points, [x]: undefined as unknown as number },
	}),
	clearPoints: (state) => ({
		...state,
		Points: [],
	}),
	setPoints: (state, Points: Record<number, number>) => ({
		...state,
		Points,
	}),
});
