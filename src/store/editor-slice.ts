import { createProducer, createSelector } from "@rbxts/reflex";
import { RootState } from "store";

interface EditorState {
	Points: Record<number, number>;
	SelectedPoint: number | undefined;
	MovingPoint: boolean;
}

export const initialState: EditorState = {
	Points: {
		[0.5]: 0.5,
	},
	SelectedPoint: undefined,
	MovingPoint: false,
};

export const selectPoints = (state: RootState) => state.editor.Points;
export const selectPoint = (state: RootState, x: number) => state.editor.Points[x];
export const selectSelectedPoint = (state: RootState) => state.editor.SelectedPoint;
export const selectMovingPoint = (state: RootState) => state.editor.MovingPoint;

export const selectOrderedPoints = () =>
	createSelector(selectPoints, (Points) => {
		const orderedPoints = [];

		for (const [x, y] of pairs(Points)) {
			orderedPoints.push([x, y]);
		}

		orderedPoints.sort((a, b) => a[0] < b[0]);

		return orderedPoints;
	});

/* Note: SelectedPoint gets reset whenever the Points array changes */
export const editorSlice = createProducer(initialState, {
	addPoint: (state, x: number, y: number) => ({
		...state,
		Points: { ...state.Points, [x]: y },
		SelectedPoint: undefined,
	}),
	removePoint: (state, x: number) => ({
		...state,
		Points: { ...state.Points, [x]: undefined as unknown as number },
		SelectedPoint: undefined,
	}),
	clearPoints: (state) => ({
		...state,
		Points: [],
		SelectedPoint: undefined,
	}),
	setPoints: (state, Points: Record<number, number>) => ({
		...state,
		Points,
		SelectedPoint: undefined,
	}),
	selectPoint: (state, x: number | undefined) => ({
		...state,
		SelectedPoint: x,
	}),
	setMovingPoint: (state, MovingPoint: boolean) => ({
		...state,
		MovingPoint,
	}),
});
