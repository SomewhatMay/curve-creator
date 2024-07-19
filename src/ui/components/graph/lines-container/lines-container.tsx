import React, { Element, useEffect, useRef, useState } from "@rbxts/react";
import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { selectOrderedPoints } from "store/editor-slice";
import { Line } from "./line";
import { selectFillBounds } from "store/settings-slice";
import { useRem } from "ui/hooks/use-rem";

export function LinesContainer() {
	const rem = useRem();
	const linesContainerFrame = useRef<Frame | undefined>();
	const points = useSelectorCreator(selectOrderedPoints);
	const fillBounds = useSelector(selectFillBounds);
	const [linesDisplay, setLinesDisplay] = useState<Element[]>([]);

	useEffect(() => {
		if (linesContainerFrame.current) {
			const absoluteSize = linesContainerFrame.current.AbsoluteSize;
			const linesDisplay: Element[] = [];
			let previousPoint: [number, number] | undefined;

			for (const [_, { x, y }] of pairs(points)) {
				if (previousPoint) {
					linesDisplay.push(
						<Line
							key={"l" + x}
							x1={previousPoint[0] * absoluteSize.X}
							x2={x * absoluteSize.X}
							y1={(1 - previousPoint[1]) * absoluteSize.Y}
							y2={(1 - y) * absoluteSize.Y}
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

				previousPoint = [x, y];
			}

			if (fillBounds && previousPoint && previousPoint[0] !== 1) {
				linesDisplay.push(
					<Line
						key={"l1"}
						x1={previousPoint[0] * absoluteSize.X}
						x2={absoluteSize.X}
						y1={(1 - previousPoint[1]) * absoluteSize.Y}
						y2={(1 - previousPoint[1]) * absoluteSize.Y}
						autoGenerated={true}
					/>,
				);
			}

			setLinesDisplay(linesDisplay);
		}
	}, [fillBounds, rem, points, linesContainerFrame.current]);

	return (
		<frame ref={linesContainerFrame} BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
			{linesDisplay}
		</frame>
	);
}
