import { HandleInfo } from "store/editor-slice";

export function calculateHandlePos(
	handlePos: NonNullable<HandleInfo>,
	prevX: number,
	prevY: number,
	newX: number,
	newY: number,
): [number, number] {
	return [math.clamp(handlePos[0] - prevX + newX, 0, 1), math.clamp(handlePos[1] - prevY + newY, 0, 1)];
}
