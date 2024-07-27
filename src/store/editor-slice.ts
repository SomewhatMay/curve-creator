import { createProducer, createSelector } from "@rbxts/reflex";
import { RootState } from "store";

/** [number, number] represents relative [x, y] */
export type HandleInfo = [number, number] | undefined;
export type MovingPointInfo = PointInfo & { x: number };
export type MovingHandleInfo = { x: number; y: number; pointX: number };

export type PointInfo = {
	y: number;
	handle1: HandleInfo;
	handle2: HandleInfo;
};

interface EditorState {
	Points: Record<number, PointInfo>;
	SelectedPoint: number | undefined;
	MovingPoint: boolean;
	MovingPointInfo: MovingPointInfo | undefined;
	MovingHandle: number | undefined;
	MovingHandleInfo: MovingHandleInfo | undefined;
}

export const initialState: EditorState = {
	Points: {
		[0.5]: {
			y: 0.5,
			handle1: [0.3, 0.3],
			handle2: [0.7, 0.7],
		},
	},
	SelectedPoint: undefined,
	MovingPoint: false,
	MovingPointInfo: undefined,
	MovingHandle: undefined,
	MovingHandleInfo: undefined,
};

export const selectPoints = (state: RootState) => state.editor.Points;
export const selectPoint = (state: RootState, x: number) => state.editor.Points[x];
export const selectSelectedPoint = (state: RootState) => state.editor.SelectedPoint;
export const selectMovingPoint = (state: RootState) => state.editor.MovingPoint;
export const selectMovingPointInfo = (state: RootState) => state.editor.MovingPointInfo;
export const selectMovingHandle = (state: RootState) => state.editor.MovingHandle;
export const selectMovingHandleInfo = (state: RootState) => state.editor.MovingHandleInfo;

export const selectOrderedPoints = () =>
	createSelector(selectPoints, (Points) => {
		const orderedPoints: MovingPointInfo[] = [];

		for (const [x, pointInfo] of pairs(Points)) {
			orderedPoints.push({ x, y: pointInfo.y, handle1: pointInfo.handle1, handle2: pointInfo.handle2 });
		}

		orderedPoints.sort((a, b) => a.x < b.x);

		return orderedPoints;
	});

/* Note: SelectedPoint gets reset whenever the Points array changes */
export const editorSlice = createProducer(initialState, {
	addPoint: (state, x: number, y: number, handle1?: HandleInfo, handle2?: HandleInfo) => ({
		...state,
		Points: { ...state.Points, [x]: { y, handle1, handle2 } },
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
	setMovingPoint: (state, MovingPoint: boolean, MovingPointInfo?: MovingPointInfo) => ({
		...state,
		MovingPoint,
		MovingPointInfo,
	}),
	setHandle: (state, pointX: number, handle: 1 | 2, handleInfo?: HandleInfo) => ({
		...state,
		Points: {
			...state.Points,
			[pointX]: {
				...state.Points[pointX],
				[`handle${handle}`]: handleInfo,
			},
		},
	}),
	setMovingHandle: (state, MovingHandle: number | undefined, MovingHandleInfo?: MovingHandleInfo) => ({
		...state,
		MovingHandle,
		MovingHandleInfo,
	}),
});
