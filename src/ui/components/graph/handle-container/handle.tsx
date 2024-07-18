import React from "@rbxts/react";
import { Rounded } from "ui/components/rounded";
import { useRem } from "ui/hooks/use-rem";
import { Line } from "../lines-container";

interface props {
	handleX: number;
	handleY: number;
	pointX: number;
	pointY: number;
}

const handleColor = new Color3(0.5, 0.56, 0.49);

export function Handle({ handleX, handleY, pointX, pointY }: props) {
	const rem = useRem();

	return (
		<>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={new UDim2(0, handleX, 0, handleY)}
				Size={new UDim2(0, rem(4), 0, rem(4))}
				BackgroundColor3={handleColor}
				ZIndex={2}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</frame>
			<Line x1={handleX} x2={pointX} y1={handleY} y2={pointY} color={handleColor} />
		</>
	);
}
