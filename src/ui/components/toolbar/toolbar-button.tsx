import React from "@rbxts/react";
import { ToolbarOption } from "./toolbar";
import { useRem } from "ui/hooks/use-rem";
import { FullPadding } from "../full-padding";
import { Rounded } from "../rounded";

export function ToolbarButton({ tooltip, handler, icon }: ToolbarOption) {
	const rem = useRem();

	return (
		<imagebutton
			AnchorPoint={new Vector2(0, 0.5)}
			Position={new UDim2(0, 0, 0.5, 0)}
			Size={new UDim2(0, rem(20), 0, rem(20))}
			BackgroundTransparency={0}
			BackgroundColor3={Color3.fromRGB(41, 41, 41)}
			Event={{
				MouseButton1Click: handler,
			}}
		>
			<imagelabel
				Image={icon}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0, rem(12), 0, rem(12))}
				BackgroundTransparency={1}
			/>
			<Rounded />
		</imagebutton>
	);
}
