import React, { Binding, joinBindings, MutableRefObject, useBinding, useCallback, useEffect } from "@rbxts/react";
import { useMotion } from "ui/hooks/use-motion";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";
import { useMouseMove } from "ui/hooks/use-mouse-move";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints } from "store/editor-slice";
import { selectRounding } from "store/settings-slice";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";

interface props {
	graphContainer: MutableRefObject<Frame | undefined>;
	targetX: Binding<number | undefined>;
	targetHandle: Binding<number | undefined>;
}

export function Crosshair({ graphContainer, targetX, targetHandle }: props) {
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
				Position={joinBindings([animationX, targetX, targetHandle]).map(([x, targetX, targetHandle]) => {
					let n = 0;

					if (targetX) {
						if (targetHandle) {
							n = points[targetX][`handle${targetHandle}` as "handle1" | "handle2"]![0];
						} else {
							n = targetX;
						}
					} else if (x) {
						n = x;
					}

					return new UDim2(n, 0, 0, 0);
				})}
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
					Text={joinBindings([animationX, targetX, targetHandle]).map(([x, targetX, targetHandle]) => {
						let n = 0;

						if (targetX) {
							if (targetHandle) {
								n = points[targetX][`handle${targetHandle}` as "handle1" | "handle2"]![0];
							} else {
								n = targetX;
							}
						} else if (x) {
							n = x;
						}

						return `%.${rounding}f`.format(n);
					})}
				/>
				<Rounded />
			</frame>
			<frame
				Size={new UDim2(1, 0, 0, rem(1))}
				// Position={animationY.map((x) => new UDim2(0, 0, 1 - x, 0))}
				// Position={joinBindings([animationY, targetX, targetHandle]).map(
				// 	([y, targetX]) => new UDim2(0, 0, 1 - ((targetX && points[targetX].y) ?? y ?? 0), 0),
				// )}
				Position={joinBindings([animationY, targetX, targetHandle]).map(([y, targetX, targetHandle]) => {
					let n = 0;

					if (targetX) {
						if (targetHandle) {
							n = points[targetX][`handle${targetHandle}` as "handle1" | "handle2"]![1];
						} else {
							n = points[targetX].y;
						}
					} else if (y) {
						n = y;
					}

					return new UDim2(0, 0, 1 - n, 0);
				})}
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
					// Text={joinBindings([animationY, targetX, targetHandle]).map(([y, targetX]) =>
					// 	`%.${rounding}f`.format((targetX && points[targetX].y) ?? y ?? 0),
					// )}
					Text={joinBindings([animationY, targetX, targetHandle]).map(([y, targetX, targetHandle]) => {
						let n = 0;

						if (targetX) {
							if (targetHandle) {
								n = points[targetX][`handle${targetHandle}` as "handle1" | "handle2"]![1];
							} else {
								n = targetX;
							}
						} else if (y) {
							n = y;
						}

						return `%.${rounding}f`.format(n);
					})}
				/>
				<Rounded />
			</frame>
		</>
	);
}
