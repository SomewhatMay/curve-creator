import { useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import { selectPoints } from "store/editor-slice";

export function calculateHandleX(handle: 1 | 2, pointX: number) {
	if (handle === 1) {
		return math.clamp(pointX < 0.1 ? pointX + 0.05 : pointX - 0.1, 0, 1);
	} else {
		return math.clamp(pointX > 0.9 ? pointX - 0.05 : pointX + 0.1, 0, 1);
	}
}

export function useToggleHandles() {
	const points = useSelector(selectPoints);
	const { setHandle } = useRootProducer();

	return (pointX: number) => {
		const { y, handle1, handle2 } = points[pointX];

		if (handle1 && handle2) {
			setHandle(pointX, 1, undefined);
			setHandle(pointX, 2, undefined);
		} else {
			setHandle(pointX, 1, handle1 ?? [calculateHandleX(1, pointX), y]);
			setHandle(pointX, 2, handle2 ?? [calculateHandleX(2, pointX), y]);
		}
	};
}
