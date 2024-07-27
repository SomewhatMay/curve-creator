import React, { MutableRefObject, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectMovingHandle, selectMovingHandleInfo, selectMovingPoint, selectPoints } from "store/editor-slice";
import { SkeletonPoint } from "./point/skeleton-point";
import { useRem } from "ui/hooks/use-rem";
import { useMouseMove } from "ui/hooks/use-mouse-move";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";
import { Handle } from "./handle-container/handle";

interface props {
	graphicsContainer: MutableRefObject<Frame | undefined>;
}

export function TargetMover({ graphicsContainer }: props) {
	const rem = useRem();
	const points = useSelector(selectPoints);
	const movingPoint = useSelector(selectMovingPoint);
	const movingHandle = useSelector(selectMovingHandle);
	const movingHandleInfo = useSelector(selectMovingHandleInfo);

	// const [mousePosition, setMousePosition] = useState<Vector2>(new Vector2(0, 0));
	// const mouseRelative =
	// 	graphicsContainer.current && calculateRelativePosition(mousePosition, graphicsContainer.current, true);

	// useMouseMove((pos) => movingPoint && setMousePosition(pos));
	const relativeMousePosition = useMouseMove().map((pos) =>
		graphicsContainer.current ? calculateRelativePosition(pos, graphicsContainer.current, true) : new Vector2(0, 0),
	);

	return (
		<>
			{movingPoint && (
				<SkeletonPoint
					x={relativeMousePosition.map((pos) => pos.X)}
					y={relativeMousePosition.map((pos) => 1 - pos.Y)}
				>
					<uistroke Thickness={rem(2)} Color={Color3.fromRGB(33, 144, 255)} Transparency={0} />
				</SkeletonPoint>
			)}
			{movingHandle && (
				<>
					{/* <frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={0.5}></frame> */}
					<Handle
						handleX={relativeMousePosition.map((pos) =>
							graphicsContainer.current ? pos.X * graphicsContainer.current.AbsoluteSize.X : 0,
						)}
						handleY={relativeMousePosition.map((pos) =>
							graphicsContainer.current ? pos.Y * graphicsContainer.current.AbsoluteSize.Y : 0,
						)}
						pointX={
							graphicsContainer.current
								? movingHandleInfo!.pointX * graphicsContainer.current.AbsoluteSize.X
								: 0
						}
						pointY={
							graphicsContainer.current
								? (1 - points[movingHandleInfo!.pointX].y) * graphicsContainer.current.AbsoluteSize.Y
								: 0
						}
					/>
				</>
			)}
		</>
	);
}
