import React, { Element, useEffect, useRef, useState } from "@rbxts/react";
import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { selectOrderedPoints, selectPoints } from "store/editor-slice";
import { Line } from "./line";

export function LinesContainer() {
	const linesContainerFrame = useRef<Frame | undefined>();
	const points = useSelectorCreator(selectOrderedPoints);
	const [linesDisplay, setLinesDisplay] = useState<Element[]>([]);

	useEffect(() => {
		if (linesContainerFrame.current) {
			const absoluteSize = linesContainerFrame.current.AbsoluteSize;
			const linesDisplay: Element[] = [];
			let previousPoint: [number, number] | undefined;

			for (const [_, [x, y]] of pairs(points)) {
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
				}

				previousPoint = [x, y];
			}

			setLinesDisplay(linesDisplay);
		}
	}, [points, linesContainerFrame.current]);

	return (
		<frame ref={linesContainerFrame} BackgroundTransparency={0.9} Size={new UDim2(1, 0, 1, 0)}>
			{linesDisplay}
		</frame>
	);
}
