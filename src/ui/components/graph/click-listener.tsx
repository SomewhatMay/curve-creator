import React, { Binding, MutableRefObject, useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import {
	selectMovingPointInfo,
	selectMovingPoint,
	selectPoints,
	selectSelectedPoint,
	selectMovingHandle,
	selectMovingHandleInfo,
} from "store/editor-slice";
import { selectSidebarVisibility } from "store/plugin-slice";
import { selectSettingsVisible } from "store/settings-slice";
import { calculateHandlePos } from "ui/util/calculate-handle-pos";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";
import { useToggleHandles } from "./hooks/use-toggle-handles";

interface props {
	targetX: Binding<number | undefined>;
	setTargetX: (x: number | undefined) => void;
	targetHandle: Binding<number | undefined>;
	setTargetHandle: (x: number | undefined) => void;
	graphContainer: MutableRefObject<Frame | undefined>;
}

export function ClickListener({ targetX, graphContainer, targetHandle }: props) {
	const points = useSelector(selectPoints);
	const {
		setHandle,
		setMovingHandle,
		setMovingPoint,
		selectPoint,
		removePoint,
		setSettingsVisible,
		addPoint,
		setChanged,
	} = useRootProducer();
	const toggleHandles = useToggleHandles();
	const movingPoint = useSelector(selectMovingPoint);
	const movingPointInfo = useSelector(selectMovingPointInfo);
	const movingHandle = useSelector(selectMovingHandle);
	const movingHandleInfo = useSelector(selectMovingHandleInfo);
	const settingsVisible = useSelector(selectSettingsVisible);
	const sidebarVisible = useSelector(selectSidebarVisibility);
	const selectedPoint = useSelector(selectSelectedPoint);

	useEffect(() => {
		let inputEndedConnection: RBXScriptConnection | undefined;
		let inputBeganConnection: RBXScriptConnection | undefined;
		if (graphContainer.current) {
			inputBeganConnection = graphContainer.current.InputBegan.Connect((input) => {
				if (!graphContainer.current) return;
				if (sidebarVisible) return;

				if (input.UserInputType === Enum.UserInputType.MouseButton1) {
					if (settingsVisible) {
						return;
					}

					const targetXValue = targetX.getValue();
					if (targetXValue !== undefined) {
						const targetHandleValue = targetHandle.getValue() as undefined | 1 | 2;
						if (targetHandleValue !== undefined) {
							const pointInfo =
								points[targetXValue][`handle${targetHandleValue}` as "handle1" | "handle2"]!;
							selectPoint(undefined);
							setMovingHandle(targetHandleValue, {
								x: pointInfo[0],
								y: pointInfo[1],
								pointX: targetXValue,
							});
							setHandle(targetXValue, targetHandleValue, undefined);
							setChanged(true);
						}
					}
				}
			});
			inputEndedConnection = graphContainer.current.InputEnded.Connect((input) => {
				if (!graphContainer.current) return;
				if (sidebarVisible) return;

				if (input.UserInputType === Enum.UserInputType.MouseButton1) {
					if (settingsVisible) {
						setSettingsVisible(false);
						return;
					}

					const relativePos = calculateRelativePosition(
						new Vector2(input.Position.X, input.Position.Y),
						graphContainer.current,
						true,
					);
					const relativeX = relativePos.X;
					const relativeY = relativePos.Y;

					if (movingHandle) {
						setHandle(movingHandleInfo!.pointX, movingHandle as 1 | 2, [relativeX, 1 - relativeY]);
						setMovingHandle(undefined);
						setChanged(true);
						return;
					}

					const targetXValue = targetX.getValue();
					if (targetXValue !== undefined) {
						if (input.IsModifierKeyDown(Enum.ModifierKey.Ctrl)) {
							toggleHandles(targetXValue);
							return;
						}

						selectPoint(targetXValue);
						return;
					}

					if (selectedPoint !== undefined) {
						selectPoint(undefined);
						return;
					}

					// Beyond this point, all actions change the
					// state of the graph.
					setChanged(true);

					if (movingPoint) {
						const newHandle1Position =
							movingPointInfo && movingPointInfo.handle1
								? calculateHandlePos(
										movingPointInfo.handle1,
										movingPointInfo.x,
										movingPointInfo.y,
										relativeX,
										1 - relativeY,
									)
								: undefined;
						const newHandle2Position =
							movingPointInfo && movingPointInfo.handle2
								? calculateHandlePos(
										movingPointInfo.handle2,
										movingPointInfo.x,
										movingPointInfo.y,
										relativeX,
										1 - relativeY,
									)
								: undefined;

						addPoint(relativeX, 1 - relativeY, newHandle1Position, newHandle2Position);
						setMovingPoint(false);
						selectPoint(relativeX);
					} else if (!points[relativeX]) {
						addPoint(relativeX, 1 - relativeY);
					}
				} else if (input.UserInputType === Enum.UserInputType.MouseButton2) {
					if (settingsVisible) {
						return;
					}

					// Beyond this point, all actions change the
					// state of the graph.
					setChanged(true);

					const targetPoint = targetX.getValue();
					if (targetPoint !== undefined) {
						const targetHandleValue = targetHandle.getValue() as undefined | 1 | 2;

						if (targetHandleValue === undefined) {
							removePoint(targetPoint);
						} else {
							setHandle(targetPoint, targetHandleValue, undefined);
						}
					}
				}
			});
		}

		return () => {
			inputEndedConnection?.Disconnect();
			inputBeganConnection?.Disconnect();
		};
	}, [
		graphContainer.current,
		points,
		sidebarVisible,
		settingsVisible,
		selectedPoint,
		movingPoint,
		movingPointInfo,
		movingHandle,
		movingHandleInfo,
	]);

	return undefined;
}
