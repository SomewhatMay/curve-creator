import { MutableRefObject, useBinding } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints } from "store/editor-slice";
import { useInputBegan } from "ui/hooks/use-input-began";
import { useMouseMove } from "ui/hooks/use-mouse-move";

const MAX_TARGET_DISTANCE = 0.025;

export function useTargetCapturer(graphContainer: MutableRefObject<Frame | undefined>) {
	const points = useSelector(selectPoints);
	const [targetPointX, setTargetPointX] = useBinding<number | undefined>(undefined);

	useMouseMove(graphContainer, (position: Vector2, input: InputObject) => {
		if (input.IsModifierKeyDown(Enum.ModifierKey.Shift)) {
			setTargetPointX(undefined);
			return;
		}

		let closestDist = MAX_TARGET_DISTANCE,
			closestX = undefined;

		for (const [x, y] of pairs(points)) {
			const dist = math.sqrt(math.pow(x - position.X, 2) + math.pow(1 - y - position.Y, 2));
			if (dist <= closestDist) {
				closestDist = dist;
				closestX = x;
			}
		}

		setTargetPointX(closestX);
	});

	useInputBegan(graphContainer, (input) => {
		if (input.KeyCode === Enum.KeyCode.LeftShift) {
			setTargetPointX(undefined);
		}
	});

	return targetPointX;
}
