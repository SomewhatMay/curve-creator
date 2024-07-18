import { createProducer, createSelector } from "@rbxts/reflex";
import { RootState } from "store";

type PointInfo = {
	y: number;
	handle1: [number, number] | undefined;
	handle2: [number, number] | undefined;
};

interface EditorState {
	Points: Record<number, PointInfo>;
	SelectedPoint: number | undefined;
	MovingPoint: boolean;
}

export const initialState: EditorState = {
	Points: {
		[0.5]: {
			y: 0.5,
			handle1: [0.45, 0.45],
			handle2: [0.55, 0.55],
		},
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
		const orderedPoints: (PointInfo & { x: number })[] = [];

		for (const [x, pointInfo] of pairs(Points)) {
			orderedPoints.push({ x, y: pointInfo.y, handle1: pointInfo.handle1, handle2: pointInfo.handle2 });
		}

		orderedPoints.sort((a, b) => a.x < b.x);

		return orderedPoints;
	});

/* Note: SelectedPoint gets reset whenever the Points array changes */
export const editorSlice = createProducer(initialState, {
	addPoint: (state, x: number, y: number) => ({
		...state,
		Points: { ...state.Points, [x]: { y, handle1: undefined, handle2: undefined } },
		SelectedPoint: undefined,
	}),
	removePoint: (state, x: number) => ({
		...state,
		Points: { ...state.Points, [x]: undefined as unknown as PointInfo },
		SelectedPoint: undefined,
	}),
	clearPoints: (state) => ({
		...state,
		Points: [],
		SelectedPoint: undefined,
	}),
	setPoints: (state, Points: Record<number, PointInfo>) => ({
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
