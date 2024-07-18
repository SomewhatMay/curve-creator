import { createProducer, createSelector } from "@rbxts/reflex";
import { RootState } from "store";

interface EditorState {
	Points: Record<number, number>;
}

export const initialState: EditorState = {
	Points: {
		[0.5]: 0.5,
	},
};

export const selectPoints = (state: RootState) => state.editor.Points;
export const selectPoint = (state: RootState, x: number) => state.editor.Points[x];

export const selectOrderedPoints = () =>
	createSelector(selectPoints, (Points) => {
		const orderedPoints = [];

		for (const [x, y] of pairs(Points)) {
			orderedPoints.push([x, y]);
		}

		orderedPoints.sort((a, b) => a[0] < b[0]);

		return orderedPoints;
	});

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
