import { createProducer, createSelector } from "@rbxts/reflex";
import { RootState } from "store";

export type HandleInfo = [number, number] | undefined;
export type MovingInfo = PointInfo & { x: number };

export type PointInfo = {
	y: number;
	handle1: HandleInfo;
	handle2: HandleInfo;
};

interface EditorState {
	Points: Record<number, PointInfo>;
	SelectedPoint: number | undefined;
	MovingPoint: boolean;
	MovingInfo: MovingInfo | undefined;
	MovingHandle: boolean;
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
	MovingInfo: undefined,
	MovingHandle: false,
};

export const selectPoints = (state: RootState) => state.editor.Points;
export const selectPoint = (state: RootState, x: number) => state.editor.Points[x];
export const selectSelectedPoint = (state: RootState) => state.editor.SelectedPoint;
export const selectMovingPoint = (state: RootState) => state.editor.MovingPoint;
export const selectMovingInfo = (state: RootState) => state.editor.MovingInfo;
export const selectMovingHandle = (state: RootState) => state.editor.MovingHandle;

export const selectOrderedPoints = () =>
	createSelector(selectPoints, (Points) => {
		const orderedPoints: MovingInfo[] = [];

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
	setMovingPoint: (state, MovingPoint: boolean, MovingInfo?: MovingInfo) => ({
		...state,
		MovingPoint,
		MovingInfo,
	}),
	setMovingHandle: (state, MovingHandle: boolean) => ({
		...state,
		MovingHandle,
	}),
	setHandle: (state, x: number, handleIndex: 1 | 2, handle: HandleInfo) => ({
		...state,
		Points: { ...state.Points, [x]: { ...state.Points[x], [`handle${handleIndex}`]: handle } },
	}),
});
