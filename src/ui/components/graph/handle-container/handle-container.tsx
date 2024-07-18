import React, { Element, useEffect, useRef, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints } from "store/editor-slice";
import { Handle } from "./handle";

export function HandleContainer() {
	const handlesContainerFrame = useRef<Frame | undefined>();
	const points = useSelector(selectPoints);
	const [handlesDisplay, setHandlesDisplay] = useState<Element[]>([]);

	useEffect(() => {
		if (handlesContainerFrame.current) {
			const absoluteSize = handlesContainerFrame.current.AbsoluteSize;
			const handlesDisplay: Element[] = [];

			for (const [pointX, { y: pointY, handle1, handle2 }] of pairs(points)) {
				if (handle1) {
					handlesDisplay.push(
						<Handle
							key={"h1" + pointX}
							handleX={handle1[0] * absoluteSize.X}
							handleY={(1 - handle1[1]) * absoluteSize.Y}
							pointX={pointX * absoluteSize.X}
							pointY={(1 - pointY) * absoluteSize.Y}
						/>,
					);
				}

				if (handle2) {
					handlesDisplay.push(
						<Handle
							key={"h2" + pointX}
							handleX={handle2[0] * absoluteSize.X}
							handleY={(1 - handle2[1]) * absoluteSize.Y}
							pointX={pointX * absoluteSize.X}
							pointY={(1 - pointY) * absoluteSize.Y}
						/>,
					);
				}
			}

			setHandlesDisplay(handlesDisplay);
		}
	}, [points]);

	return (
		<frame ref={handlesContainerFrame} BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
			{handlesDisplay}
		</frame>
	);
}
