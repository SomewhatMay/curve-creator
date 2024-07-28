import React, { Element, MutableRefObject, useEffect, useRef, useState } from "@rbxts/react";
import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { MovingPointInfo, selectOrderedPoints } from "store/editor-slice";
import { Line } from "./line";
import { selectFillBounds } from "store/settings-slice";
import { Curve } from "./curve";

export function LinesContainer() {
	const linesContainerFrame = useRef<Frame | undefined>();
	const points = useSelectorCreator(selectOrderedPoints);
	const fillBounds = useSelector(selectFillBounds);
	const [linesDisplay, setLinesDisplay] = useState<Element[]>([]);

	useEffect(() => {
		if (linesContainerFrame.current) {
			const absoluteSize = linesContainerFrame.current.AbsoluteSize;
			const linesDisplay: Element[] = [];
			let previousPoint: MovingPointInfo | undefined;

			for (const [_, pointInfo] of pairs(points)) {
				const { x, y } = pointInfo;
				if (previousPoint) {
					linesDisplay.push(
						// <Line
						// 	key={"l" + x}
						// 	x1={previousPoint.x * absoluteSize.X}
						// 	x2={x * absoluteSize.X}
						// 	y1={(1 - previousPoint.y) * absoluteSize.Y}
						// 	y2={(1 - y) * absoluteSize.Y}
						// />,
						<Curve
							key={"c" + x}
							point0={previousPoint}
							point1={pointInfo}
							linesContainerFrame={linesContainerFrame as MutableRefObject<Frame>}
						/>,
					);
				} else if (fillBounds && x !== 0) {
					linesDisplay.push(
						<Line
							key={"l" + x}
							x1={0}
							x2={x * absoluteSize.X}
							y1={(1 - y) * absoluteSize.Y}
							y2={(1 - y) * absoluteSize.Y}
							autoGenerated={true}
						/>,
					);
				}

				previousPoint = pointInfo;
			}

			if (fillBounds && previousPoint && previousPoint.x !== 1) {
				linesDisplay.push(
					<Line
						key={"l1"}
						x1={previousPoint.x * absoluteSize.X}
						x2={absoluteSize.X}
						y1={(1 - previousPoint.y) * absoluteSize.Y}
						y2={(1 - previousPoint.y) * absoluteSize.Y}
						autoGenerated={true}
					/>,
				);
			}

			setLinesDisplay(linesDisplay);
		}
	}, [fillBounds, points, linesContainerFrame.current]);

	return (
		<frame ref={linesContainerFrame} BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
			{linesDisplay}
		</frame>
	);
}
