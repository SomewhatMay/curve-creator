import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface SettingsState {
	Visible: boolean;

	Resolution: number;
	Rounding: number;
	Guides: boolean;
	FillBounds: boolean;
}

const initialState: SettingsState = {
	Visible: false,

	Resolution: 100,
	Rounding: 2, // [1, inf) rounding to that many decimal places
	Guides: true,
	FillBounds: true,
};

export const selectSettingsVisible = (state: RootState) => state.settings.Visible;
export const selectResolution = (state: RootState) => state.settings.Resolution;
export const selectGuides = (state: RootState) => state.settings.Guides;
export const selectRounding = (state: RootState) => state.settings.Rounding;
export const selectFillBounds = (state: RootState) => state.settings.FillBounds;

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
});
