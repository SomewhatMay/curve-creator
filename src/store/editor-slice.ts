import { createProducer } from "@rbxts/reflex";

export type Point = {
	x: number
	y: number
}

interface EditorState {
	Points: Point[]
}

export const initialState: EditorState = {
	Points: [],
};


export const editorSlice = createProducer(initialState, {
	addPoint: (state, Point: Point) => ({
		...state,
		Points: [...state.Points, Point],
	}),
	removePoint: (state, x: number, y: number) => ({
		...state,
		Points: state.Points.filter((point) => point.x !== x || point.y !== y),
	}),
	clearPoints: (state) => ({
		...state,
		Points: [],
	}),
	setPoints: (state, Points: Point[]) => ({
		...state,
		Points,
	}),
})