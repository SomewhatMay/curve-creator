import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { SettingsTextBox } from "./textbox";

type SettingsComponent = typeof SettingsTextBox;

type SettingHandler = {
	title: string;
	component: SettingsComponent;
	handler: () => void;
};

const settingsOptions: SettingHandler[] = [
	{
		title: "Resolution",
		component: SettingsTextBox,
		handler: () => {},
	},
];

export function SettingsWidget() {
	const rem = useRem();

	return (
		<frame BackgroundColor3={Color3.fromRGB(41, 41, 41)}>
			{settingsOptions.map((option) => (
				<frame Size={new UDim2(1, 0, 0, rem(10))}>
					<option.component title={option.title} valueUpdated={option.handler}></option.component>
				</frame>
			))}
			<uilistlayout />
		</frame>
	);
}
