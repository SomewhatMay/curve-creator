import React, { Binding, joinBindings, MutableRefObject, useCallback } from "@rbxts/react";
import { useMotion } from "ui/hooks/use-motion";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";
import { useMouseMove } from "ui/hooks/use-mouse-move";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints } from "store/editor-slice";
import { selectRounding } from "store/settings-slice";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";
import { TargetInfo } from "./hooks/use-target-capturer";

interface props {
	graphContainer: MutableRefObject<Frame | undefined>;
	targetInfo: Binding<TargetInfo>;
}

export function Crosshair({ graphContainer, targetInfo }: props) {
	const rem = useRem();

	const points = useSelector(selectPoints);
	const rounding = useSelector(selectRounding);

	const [animationX, motionX] = useMotion(0);
	const [animationY, motionY] = useMotion(0);

	const [markerAnimationX, markerMotionX] = useMotion(0);
	const [markerAnimationY, markerMotionY] = useMotion(0);

	useMouseMove(
		useCallback((position: Vector2) => {
			if (graphContainer.current === undefined) return;
			position = calculateRelativePosition(position, graphContainer.current, true);

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

			if (position.X > 0.25) {
				markerMotionX.spring(1, {
					tension: 200,
					friction: 20,
					mass: 0.5,
				});
			} else {
				markerMotionX.spring(0, {
					tension: 200,
					friction: 20,
					mass: 0.5,
				});
			}

			if (position.Y > 0.75) {
				markerMotionY.spring(1, {
					tension: 200,
					friction: 20,
					mass: 0.5,
				});
			} else {
				markerMotionY.spring(0, {
					tension: 200,
					friction: 20,
					mass: 0.5,
				});
			}
		}, []),
	);

	return (
		<>
			<frame
				Size={new UDim2(0, rem(1), 1, 0)}
				// Position={animationX.map((x) => new UDim2(x, 0, 0, 0))}
				// FIXME: This type assertion may cause lots of issues..
				Position={joinBindings([animationX, targetInfo as unknown as Binding<number>]).map(
					([animationX, info]) => new UDim2((info as unknown as TargetInfo).x ?? animationX ?? 0, 0, 0, 0),
				)}
				BackgroundTransparency={0.8}
				BorderSizePixel={0}
			>
				<textlabel
					Size={new UDim2(0, rem(16), 0, rem(6))}
					Position={markerAnimationX.map((t) => new UDim2(0, rem(4 - (16 + 4 + 4) * t), 1, -rem(12)))}
					BackgroundTransparency={1}
					TextSize={rem(6)}
					TextColor3={new Color3(0.8, 0.8, 0.8)}
					// Text={animationX.map((x) => tostring(math.floor(x * 100) / 100))}
					Text={joinBindings([animationX, targetInfo as unknown as Binding<number>]).map(
						([animationX, info]) =>
							`%.${rounding}f`.format((info as unknown as TargetInfo).x ?? animationX ?? 0),
					)}
				/>
				<Rounded />
			</frame>
			<frame
				Size={new UDim2(1, 0, 0, rem(1))}
				// Position={animationY.map((x) => new UDim2(0, 0, 1 - x, 0))}
				Position={joinBindings([animationY, targetInfo as unknown as Binding<number>]).map(
					([y, info]) =>
						new UDim2(
							0,
							0,
							1 -
								(((info as unknown as TargetInfo).x && points[(info as unknown as TargetInfo).x!].y) ??
									y ??
									0),
							0,
						),
				)}
				BackgroundTransparency={0.8}
				BorderSizePixel={0}
			>
				<textlabel
					Size={new UDim2(0, rem(6), 0, rem(16))}
					Position={markerAnimationY.map((t) => new UDim2(0, rem(10), 0, rem(4 - (16 + 4 + 4) * t)))}
					BackgroundTransparency={1}
					TextSize={rem(6)}
					TextColor3={new Color3(0.8, 0.8, 0.8)}
					// Text={animationY.map((y) => tostring(math.floor(y * 100) / 100))}
					Text={joinBindings([animationY, targetInfo as unknown as Binding<number>]).map(([y, info]) =>
						`%.${rounding}f`.format(
							((info as unknown as TargetInfo).x && points[(info as unknown as TargetInfo).x!].y) ??
								y ??
								0,
						),
					)}
				/>
				<Rounded />
			</frame>
		</>
	);
}
