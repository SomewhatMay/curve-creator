import React, { useEffect, useMemo } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { SettingsTextBox } from "./textbox";
import { Rounded } from "../rounded";
import { FullPadding } from "../full-padding";
import { Toggle } from "./toggle";
import { useSelector } from "@rbxts/react-reflex";
import { selectSettingsVisible } from "store/settings-slice";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import { SettingsOptions } from "./options";

type SettingsComponent = typeof SettingsTextBox | typeof Toggle;

type SettingHandler = {
	title: string;
	component: SettingsComponent;
	handler: (...args: any) => void;
	props?: any;
};

export function SettingsWidget() {
	const rem = useRem();
	const settingsVisible = useSelector(selectSettingsVisible);
	const [animationGoal, setAnimationGoal] = useMotor(0);

	const settingsOptions: SettingHandler[] = useMemo(
		() => [
			{
				title: "Resolution",
				component: SettingsTextBox,
				handler: () => {},
				props: {
					text: "0",
				},
			},
			{
				title: "Guides",
				component: Toggle,
				handler: (enabled: boolean) => {},
			},
		],
		[],
	);

	useEffect(() => {
		if (settingsVisible) {
			setAnimationGoal(new Spring(1));
		} else {
			setAnimationGoal(new Spring(0));
		}
	}, [settingsVisible]);

	return (
		<imagebutton
			AutoButtonColor={false}
			BackgroundColor3={Color3.fromRGB(41, 41, 41)}
			Size={new UDim2(0, rem(150), 0, rem(200))}
			AnchorPoint={new Vector2(1, 0)}
			Position={animationGoal.map((x) => new UDim2(1 + (1 - x), -rem(4), 0, rem(28)))}
			ZIndex={4}
		>
			{/* {settingsOptions.map((option) => (
				<frame Size={new UDim2(1, 0, 0, rem(15))} BackgroundTransparency={1} ZIndex={4}>
					<option.component
						{...option.props}
						title={option.title}
						valueUpdated={option.handler}
					></option.component>
				</frame>
			))} */}
			<SettingsOptions />
			<FullPadding padding={rem(12)} />
			<uilistlayout Padding={new UDim(0, rem(5))} />
			<Rounded />
		</imagebutton>
	);
}
