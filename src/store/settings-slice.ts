import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface SettingsState {
	Visible: boolean;

	Resolution: number;
	Experimental: boolean;
}

const initialState: SettingsState = {
	Visible: false,

	Resolution: 1,
	Experimental: false,
};

export const selectSettingsVisible = (state: RootState) => state.settings.Visible;
export const selectResolution = (state: RootState) => state.settings.Resolution;
export const selectExperimental = (state: RootState) => state.settings.Experimental;

export const settingsSlice = createProducer(initialState, {
	setSettingsVisible: (state, Visible: boolean) => ({
		...state,
		Visible,
	}),
	setResolution: (state, Resolution: number) => ({
		...state,
		Resolution,
	}),
	setExperimental: (state, Experimental: boolean) => ({
		...state,
		Experimental,
	}),
})