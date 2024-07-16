import React, { useEffect } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { SettingsTextBox } from "./textbox";
import { Rounded } from "../rounded";
import { FullPadding } from "../full-padding";
import { Toggle } from "./toggle";
import { useSelector } from "@rbxts/react-reflex";
import { selectSettingsVisible } from "store/settings-slice";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";

type SettingsComponent = typeof SettingsTextBox | typeof Toggle;

type SettingHandler = {
	title: string;
	component: SettingsComponent;
	handler: (arg0: any[]) => void;
	props?: any;
};

const settingsOptions: SettingHandler[] = [
	{
		title: "Resolution",
		component: SettingsTextBox,
		handler: () => {},
		props: {
			text: "0",
		},
	},
	{
		title: "Experimental",
		component: Toggle,
		handler: () => {},
	},
];

export function SettingsWidget() {
	const rem = useRem();
	const settingsVisible = useSelector(selectSettingsVisible);
	const [animationGoal, setAnimationGoal] = useMotor(0);

	useEffect(() => {
		if (settingsVisible) {
			setAnimationGoal(new Spring(1));
		} else {
			setAnimationGoal(new Spring(0));
		}
	}, [settingsVisible]);

	return (
		<frame
			BackgroundColor3={Color3.fromRGB(41, 41, 41)}
			Size={new UDim2(0, rem(150), 0, rem(200))}
			AnchorPoint={new Vector2(1, 0)}
			Position={animationGoal.map((x) => new UDim2(1 + (1 - x), -rem(4), 0, rem(28)))}
			ZIndex={4}
		>
			{settingsOptions.map((option) => (
				<frame Size={new UDim2(1, 0, 0, rem(15))} BackgroundTransparency={1} ZIndex={4}>
					<option.component
						{...option.props}
						title={option.title}
						valueUpdated={option.handler}
					></option.component>
				</frame>
			))}
			<FullPadding padding={rem(12)} />
			<uilistlayout Padding={new UDim(0, rem(5))} />
			<Rounded />
		</frame>
	);
}
