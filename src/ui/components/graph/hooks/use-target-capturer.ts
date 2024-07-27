import { MutableRefObject, useBinding, useCallback } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectMovingHandle, selectMovingPoint, selectPoints, selectSelectedPoint } from "store/editor-slice";
import { useInputBegan } from "ui/hooks/use-input-began";
import { useMouseMove } from "ui/hooks/use-mouse-move";
import { calculateDistance } from "ui/util/calculate-distance";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";

const MAX_TARGET_DISTANCE = 0.015;

export function useTargetCapturer(graphContainer: MutableRefObject<Frame | undefined>) {
	const points = useSelector(selectPoints);
	const movingPoint = useSelector(selectMovingPoint);
	const movingHandle = useSelector(selectMovingHandle);
	const [targetPointX, setTargetPointX] = useBinding<number | undefined>(undefined);
	const [targetHandle, setTargetHandle] = useBinding<number | undefined>(undefined); // in the range i[1, 2]

	useMouseMove(
		useCallback(
			(position: Vector2, input: InputObject) => {
				if (graphContainer.current === undefined) return;

				if (input.IsModifierKeyDown(Enum.ModifierKey.Shift)) {
					setTargetPointX(undefined);
					setTargetHandle(undefined);
					return;
				}

				if (movingPoint || movingHandle) {
					setTargetPointX(undefined);
					setTargetHandle(undefined);
					return;
				}

				position = calculateRelativePosition(position, graphContainer.current, true);

				let closestDist = MAX_TARGET_DISTANCE,
					closestX = undefined,
					closestToHandle = undefined;

				for (const [x, { y, handle1, handle2 }] of pairs(points)) {
					const dist = calculateDistance(x, y, position.X, 1 - position.Y);

					if (dist <= closestDist) {
						closestDist = dist;
						closestX = x;
						closestToHandle = undefined;
					}

					// Check if handles are closer
					if (handle1) {
						const handleDist = calculateDistance(handle1[0], handle1[1], position.X, 1 - position.Y);
						if (handleDist < closestDist) {
							closestDist = handleDist;
							closestX = x;
							closestToHandle = 1;
						}
					}

					if (handle2) {
						const handleDist = calculateDistance(handle2[0], handle2[1], position.X, 1 - position.Y);
						if (handleDist < closestDist) {
							closestDist = handleDist;
							closestX = x;
							closestToHandle = 2;
						}
					}
				}

				setTargetPointX(closestX);
				setTargetHandle(closestToHandle);
			},
			[points, movingPoint, movingHandle],
		),
	);

	useInputBegan((input) => {
		if (input.KeyCode === Enum.KeyCode.LeftShift) {
			setTargetPointX(undefined);
			setTargetHandle(undefined);
		}
	});

	return { targetPointX, setTargetPointX, targetHandle, setTargetHandle };
}
