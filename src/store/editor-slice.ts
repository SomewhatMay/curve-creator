import { createProducer } from "@rbxts/reflex";

interface EditorState {
	Points: Record<number, number>;
}

export const initialState: EditorState = {
	Points: {},
};


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
})