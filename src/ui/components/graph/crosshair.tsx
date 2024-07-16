import React, { MutableRefObject, useBinding, useCallback, useEffect } from "@rbxts/react";
import { useMotion } from "ui/hooks/use-motion";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";
import { config } from "@rbxts/ripple";
import { useMouseMove } from "ui/hooks/use-mouse-move";

interface props {
	graphContainer: MutableRefObject<Frame | undefined>;
}

export function Crosshair({ graphContainer }: props) {
	const rem = useRem();
	const [animationX, motionX] = useMotion(0);
	const [animationY, motionY] = useMotion(0);
	useMouseMove(
		graphContainer,
		useCallback((position: Vector2) => {
			motionX.spring(position.X, {
				tension: 200,
				friction: 20,
				mass: 0.5,
			});
			motionY.spring(1 - position.Y, {
				tension: 200,
				friction: 20,
				mass: 0.5,
			});
		}, []),
	);

	return (
		<>
			<frame
				Size={new UDim2(0, rem(1), 1, 0)}
				Position={animationX.map((x) => new UDim2(x, 0, 0, 0))}
				BackgroundTransparency={0.8}
				BorderSizePixel={0}
			>
				<Rounded />
			</frame>
			<frame
				Size={new UDim2(1, 0, 0, rem(1))}
				Position={animationY.map((x) => new UDim2(0, 0, 1 - x, 0))}
				BackgroundTransparency={0.8}
				BorderSizePixel={0}
			>
				<Rounded />
			</frame>
		</>
	);
}
