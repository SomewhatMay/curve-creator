import React, { Element, MutableRefObject, useMemo } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { MovingPointInfo } from "store/editor-slice";
import { selectResolution } from "store/settings-slice";
import { Line } from "../line";
import { calculateDistance } from "ui/util/calculate-distance";
import { cubicBezierPoint } from "./cubic-bezier-point";
import { quarticBezierPoint } from "./quartic-bezier-point";

interface props {
	point0: MovingPointInfo;
	point1: MovingPointInfo;
	linesContainerFrame: MutableRefObject<Frame>;
}

export function Curve({ point0, point1, linesContainerFrame }: props) {
	const absoluteSize = linesContainerFrame.current.AbsoluteSize;
	const handle1 = point0.handle2;
	const handle2 = point1.handle1;
	const distance = calculateDistance(point0.x, point0.y, point1.x, point1.y);

	const resolution = useSelector(selectResolution);
	const segments = math.clamp(math.ceil(distance * resolution), 0, math.huge);

	const lines = useMemo(() => {
		print("Segments is now " + segments);
		let lines: Element[] = [];

		if (!handle1 && !handle2) {
			lines = [
				<Line
					x1={point0.x * absoluteSize.X}
					x2={point1.x * absoluteSize.X}
					y1={(1 - point0.y) * absoluteSize.Y}
					y2={(1 - point1.y) * absoluteSize.Y}
				/>,
			];
		} else if (!handle1 || !handle2) {
			const handle = (handle1 || handle2)!;
			let previousPoint = [point0.x, point0.y];

			for (let i of $range(1, segments)) {
				const t = i / segments;
				const [x, y] = cubicBezierPoint(point0.x, point0.y, handle[0], handle[1], point1.x, point1.y, t);
				lines.push(
					<Line
						key={`l-${x}-${t}`}
						x1={previousPoint[0] * absoluteSize.X}
						x2={x * absoluteSize.X}
						y1={(1 - previousPoint[1]) * absoluteSize.Y}
						y2={(1 - y) * absoluteSize.Y}
					/>,
				);
				previousPoint = [x, y];
			}
		} else {
			let previousPoint = [point0.x, point0.y];

			for (let i of $range(1, segments)) {
				const t = i / segments;
				const [x, y] = quarticBezierPoint(
					point0.x,
					point0.y,
					handle1[0],
					handle1[1],
					handle2[0],
					handle2[1],
					point1.x,
					point1.y,
					t,
				);
				lines.push(
					<Line
						key={`l-${x}-${t}`}
						x1={previousPoint[0] * absoluteSize.X}
						x2={x * absoluteSize.X}
						y1={(1 - previousPoint[1]) * absoluteSize.Y}
						y2={(1 - y) * absoluteSize.Y}
					/>,
				);
				previousPoint = [x, y];
			}
		}

		return lines;
	}, [point0, point1, handle1, handle2, resolution, linesContainerFrame.current]);

	return lines;
}
