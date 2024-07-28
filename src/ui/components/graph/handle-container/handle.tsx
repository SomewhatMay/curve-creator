import React, { Binding } from "@rbxts/react";
import { Rounded } from "ui/components/rounded";
import { useRem } from "ui/hooks/use-rem";
import { Line } from "../lines-container";
import { joinAnyBindings } from "@rbxts/pretty-react-hooks";

interface props {
	handleX: number | Binding<number>;
	handleY: number | Binding<number>;
	pointX: number;
	pointY: number;
	targetStroke?: Binding<number> | number;
}

const handleColor = new Color3(0.49, 0.14, 0.14);

export function Handle({ handleX, handleY, pointX, pointY, targetStroke }: props) {
	const rem = useRem();

	return (
		<>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={joinAnyBindings([handleX, handleY]).map(
					([handleX, handleY]) => new UDim2(0, handleX, 0, handleY),
				)}
				Size={new UDim2(0, rem(4), 0, rem(4))}
				BackgroundColor3={handleColor}
				ZIndex={2}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				{targetStroke ? <uistroke Thickness={targetStroke} Color={Color3.fromRGB(33, 144, 255)} /> : undefined}
			</frame>
			<Line x1={handleX} x2={pointX} y1={handleY} y2={pointY} color={handleColor} isHandle>
				{targetStroke ? (
					<uistroke Thickness={targetStroke} Transparency={0.5} Color={Color3.fromRGB(33, 144, 255)} />
				) : undefined}
			</Line>
		</>
	);
}
