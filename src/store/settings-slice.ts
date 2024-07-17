import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface SettingsState {
	Visible: boolean;

	Resolution: number;
	Guides: boolean;
}

const initialState: SettingsState = {
	Visible: false,

	Resolution: 1,
	Guides: true,
};

export const selectSettingsVisible = (state: RootState) => state.settings.Visible;
export const selectResolution = (state: RootState) => state.settings.Resolution;
export const selectGuides = (state: RootState) => state.settings.Guides;

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
});
