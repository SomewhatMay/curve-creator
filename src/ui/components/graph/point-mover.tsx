import React, { MutableRefObject, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectMovingPoint } from "store/editor-slice";
import { SkeletonPoint } from "./point/skeleton-point";
import { useRem } from "ui/hooks/use-rem";
import { useMouseMove } from "ui/hooks/use-mouse-move";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";

interface props {
	graphicsContainer: MutableRefObject<Frame | undefined>;
}

export function PointMover({ graphicsContainer }: props) {
	const rem = useRem();
	const movingPoint = useSelector(selectMovingPoint);
	const [mousePosition, setMousePosition] = useState<Vector2>(new Vector2(0, 0));
	const mouseRelative =
		graphicsContainer.current && calculateRelativePosition(mousePosition, graphicsContainer.current, true);

	useMouseMove((pos) => movingPoint && setMousePosition(pos));

	return (
		movingPoint && (
			<SkeletonPoint x={mouseRelative?.X ?? 0} y={1 - (mouseRelative?.Y ?? 1)}>
				<uistroke Thickness={rem(2)} Color={Color3.fromRGB(33, 144, 255)} Transparency={0} />
			</SkeletonPoint>
		)
	);
}
