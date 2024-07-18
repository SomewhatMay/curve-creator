import { MutableRefObject, useBinding, useCallback } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectMovingPoint, selectPoints, selectSelectedPoint } from "store/editor-slice";
import { useInputBegan } from "ui/hooks/use-input-began";
import { useMouseMove } from "ui/hooks/use-mouse-move";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";

const MAX_TARGET_DISTANCE = 0.025;

export function useTargetCapturer(graphContainer: MutableRefObject<Frame | undefined>) {
	const points = useSelector(selectPoints);
	const movingPoint = useSelector(selectMovingPoint);
	const [targetPointX, setTargetPointX] = useBinding<number | undefined>(undefined);

	useMouseMove(
		useCallback(
			(position: Vector2, input: InputObject) => {
				if (graphContainer.current === undefined) return;

				if (input.IsModifierKeyDown(Enum.ModifierKey.Shift)) {
					setTargetPointX(undefined);
					return;
				}

				if (movingPoint) {
					setTargetPointX(undefined);
					return;
				}

				position = calculateRelativePosition(position, graphContainer.current, true);

				let closestDist = MAX_TARGET_DISTANCE,
					closestX = undefined;

				for (const [x, { y }] of pairs(points)) {
					const dist = math.sqrt(math.pow(x - position.X, 2) + math.pow(1 - y - position.Y, 2));
					if (dist <= closestDist) {
						closestDist = dist;
						closestX = x;
					}
				}

				setTargetPointX(closestX);
			},
			[points],
		),
	);

	useInputBegan((input) => {
		if (input.KeyCode === Enum.KeyCode.LeftShift) {
			setTargetPointX(undefined);
		}
	});

	return targetPointX;
}
