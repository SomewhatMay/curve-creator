import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";

interface props {
	x: number;
	y: number;
}

export function Point({ x, y }: props) {
	const rem = useRem();
	return (
		<frame
			Position={new UDim2(x, 0, 1 - y, 0)}
			Size={new UDim2(0, rem(4), 0, rem(4))}
			BackgroundTransparency={0}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BorderSizePixel={0}
			BackgroundColor3={new Color3(1, 0, 0)}
		>
			<uicorner CornerRadius={new UDim(1, 0)} />
		</frame>
	);
}
