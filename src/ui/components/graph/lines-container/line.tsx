import React = require("@rbxts/react");
import { useRem } from "ui/hooks/use-rem";

/**
 * These numbers represent absolute positions,
 * not Scale values.
 */
interface props {
	x1: number;
	x2: number;
	y1: number;
	y2: number;
}

export function Line({ x1, x2, y1, y2 }: props) {
	const rem = useRem();
	const xDiff = x2 - x1;
	const yDiff = y2 - y1;
	const distance = math.sqrt(math.pow(xDiff, 2) + math.pow(yDiff, 2));
	const angle = math.atan2(yDiff, xDiff);

	return (
		<frame
			BackgroundTransparency={0}
			BorderSizePixel={0.5}
			BackgroundColor3={new Color3(1, 1, 1)}
			Position={new UDim2(0, (x1 + x2) / 2, 0, (y1 + y2) / 2)}
			Size={new UDim2(0, distance, 0, rem(1))}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Rotation={math.deg(angle)}
		/>
	);
}