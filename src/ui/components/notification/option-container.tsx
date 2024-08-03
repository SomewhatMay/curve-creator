import React from "@rbxts/react";
import { Rounded } from "../rounded";
import { useRem } from "ui/hooks/use-rem";
import { FullPadding } from "../full-padding";

export type Option = {
	message?: string;
	BackgroundColor3?: Color3;
	handler: () => void;
};

interface props {
	options: Option[];
}

export function OptionsContainer({ options }: props) {
	const rem = useRem();

	return (
		<frame key="OptionsContainer" Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			{options.map((option, i) => (
				<textbutton
					key={i}
					Size={new UDim2(0.1, 0, 1, 0)}
					Text={option.message}
					Font={Enum.Font.GothamMedium}
					TextSize={rem(12)}
					TextColor3={new Color3(1, 1, 1)}
					BackgroundColor3={option.BackgroundColor3 ?? Color3.fromRGB(35, 35, 35)}
					Event={{ MouseButton1Click: option.handler }}
				>
					<Rounded />
				</textbutton>
			))}
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, rem(6))}
				HorizontalFlex={Enum.UIFlexAlignment.Fill}
			/>
			<FullPadding paddingX={new UDim(0, rem(8))} />
		</frame>
	);
}
