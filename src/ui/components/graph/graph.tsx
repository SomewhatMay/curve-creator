import React from "@rbxts/react";
import { XAxis } from "./x-axis";
import { useRem } from "ui/hooks/use-rem";
import { YAxis } from "./y-axis";
import { Grid } from "./grid";
import { Point } from "./point";

export function Graph() {
	const rem = useRem();

	return (
		<>
			<frame
				Position={new UDim2(0, rem(20), 0, 0)}
				Size={new UDim2(1, -rem(30), 1, 0)}
				BackgroundTransparency={1}
			>
				<XAxis />
			</frame>
			<frame Position={new UDim2(0, rem(1), 0, 0)} Size={new UDim2(0, rem(10), 1, 0)} BackgroundTransparency={1}>
				<YAxis />
			</frame>
			<textlabel
				Text="0"
				Position={new UDim2(0, rem(10), 1, -rem(10))}
				TextSize={rem(8)}
				TextColor3={new Color3(0.8, 0.8, 0.8)}
			/>
			<frame
				Size={new UDim2(1, -rem(30), 1, -rem(20))}
				Position={new UDim2(0, rem(20), 0, 0)}
				BackgroundTransparency={1}
			>
				<Grid />
			</frame>
		</>
	);
}
