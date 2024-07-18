import React, { Element, useMemo, useRef } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Grid } from "./grid";
import { Point } from "./point";
import { ClickListener } from "./click-listener";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints, selectSelectedPoint } from "store/editor-slice";
import { LinesContainer } from "./lines-container";
import { Crosshair } from "./crosshair";
import { useTargetCapturer } from "./hooks/use-target-capturer";
import { Axes } from "./axes";
import { selectGuides } from "store/settings-slice";
import { PointInfo } from "./point-info";
import { TOOLBAR_HEIGHT } from "../toolbar";
import { PointMover } from "./point-mover";
import { HandleContainer } from "./handle-container";

export function Graph() {
	const rem = useRem();
	const graphContainer = useRef<Frame | undefined>();
	const points = useSelector(selectPoints);
	const guidesEnabled = useSelector(selectGuides);
	const targetX = useTargetCapturer(graphContainer);
	const selectedPoint = useSelector(selectSelectedPoint);

	const pointsDisplay = useMemo(() => {
		const pointsDisplay: Element[] = [];

		for (const [x, { y }] of pairs(points)) {
			pointsDisplay.push(<Point key={"p" + x} x={x} y={y} targetX={targetX} />);
		}

		return pointsDisplay;
	}, [points]);

	return (
		<frame
			Size={new UDim2(1, 0, 1, -rem(TOOLBAR_HEIGHT))}
			Position={new UDim2(0, 0, 0, rem(TOOLBAR_HEIGHT))}
			BackgroundTransparency={1}
		>
			<Axes />
			<frame
				ref={graphContainer}
				Size={new UDim2(1, -rem(30), 1, -rem(20))}
				Position={new UDim2(0, rem(20), 0, 0)}
				BackgroundTransparency={1}
			>
				<Grid />
				<ClickListener targetX={targetX} graphContainer={graphContainer} />
				{pointsDisplay}
				<LinesContainer />
				{guidesEnabled && <Crosshair targetX={targetX} graphContainer={graphContainer} />}
				<PointInfo selectedX={selectedPoint} />
				<PointMover graphicsContainer={graphContainer} />
				<HandleContainer />
			</frame>
			<uipadding
				PaddingTop={new UDim(0, rem(14))}
				PaddingBottom={new UDim(0, rem(10))}
				PaddingLeft={new UDim(0, rem(16))}
				PaddingRight={new UDim(0, rem(14))}
			/>
		</frame>
	);
}
