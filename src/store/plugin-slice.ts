import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";

interface PluginState {
	Visible: boolean;
	SidebarVisible: boolean;
}

const initialState: PluginState = {
	Visible: true,
	SidebarVisible: false,
};

export const selectPluginVisibility = (state: RootState) => state.plugin.Visible;

export const selectSidebarVisibility = (state: RootState) => state.plugin.SidebarVisible;

export const pluginSlice = createProducer(initialState, {
	setVisible: (state, Visible: boolean) => ({
		...state,
		Visible,
	}),
	setSidebarVisible: (state, SidebarVisible: boolean) => ({
		...state,
		SidebarVisible,
	}),
});
