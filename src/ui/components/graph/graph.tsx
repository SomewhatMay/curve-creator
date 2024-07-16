import React, { Element, useEffect, useMemo, useRef } from "@rbxts/react";
import { XAxis } from "./x-axis";
import { useRem } from "ui/hooks/use-rem";
import { YAxis } from "./y-axis";
import { Grid } from "./grid";
import { Point } from "./point";
import { ClickListener } from "./click-listener";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints } from "store/editor-slice";
import { Line } from "./line";
import { LinesContainer } from "./lines-container";

export function Graph() {
	const rem = useRem();
	const graphContainer = useRef<Frame | undefined>();
	const points = useSelector(selectPoints);

	const pointsDisplay = useMemo(() => {
		const pointsDisplay: Element[] = [];

		for (const [x, y] of pairs(points)) {
			pointsDisplay.push(<Point key={"p" + x} x={x} y={y} />);
		}

		return pointsDisplay;
	}, [points]);

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
				ref={graphContainer}
				Size={new UDim2(1, -rem(30), 1, -rem(20))}
				Position={new UDim2(0, rem(20), 0, 0)}
				BackgroundTransparency={1}
			>
				<Grid />
				<ClickListener graphContainer={graphContainer} />
				{pointsDisplay}
				<LinesContainer />
			</frame>
		</>
	);
}
