import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface SettingsState {
	Visible: boolean;

	Resolution: number;
	Rounding: number;
	Guides: boolean;
	FillBounds: boolean;
	ViewingMode: boolean;
	AutoAddHandles: boolean;
}

const initialState: SettingsState = {
	Visible: false,

	Resolution: 100, // [1, 1024) segments = resolution * distance of two points (measured as a decimal percentage of the graphContainer size)
	Rounding: 2, // [1, inf) rounding to that many decimal places

	Guides: true,
	FillBounds: true,
	ViewingMode: false,
	AutoAddHandles: true,
};

export const selectSettingsVisible = (state: RootState) => state.settings.Visible;
export const selectResolution = (state: RootState) => state.settings.Resolution;
export const selectGuides = (state: RootState) => state.settings.Guides;
export const selectRounding = (state: RootState) => state.settings.Rounding;
export const selectFillBounds = (state: RootState) => state.settings.FillBounds;
export const selectViewingMode = (state: RootState) => state.settings.ViewingMode;
export const selectAutoAddHandles = (state: RootState) => state.settings.AutoAddHandles;

export const settingsSlice = createProducer(initialState, {
	setSettingsVisible: (state, Visible: boolean) => ({
		...state,
		Visible,
	}),
	setResolution: (state, Resolution: number) => ({
		...state,
		Resolution,
	}),
	setGuides: (state, Guides: boolean) => ({
		...state,
		Guides,
	}),
	setRounding: (state, Rounding: number) => ({
		...state,
		Rounding,
	}),
	setFillBounds: (state, FillBounds: boolean) => ({
		...state,
		FillBounds,
	}),
	setViewingMode: (state, ViewingMode: boolean) => ({
		...state,
		ViewingMode,
	}),
	setAutoAddHandles: (state, AutoAddHandles: boolean) => ({
		...state,
		AutoAddHandles,
	}),
});
