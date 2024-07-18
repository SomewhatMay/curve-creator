import React, { Binding, MutableRefObject, useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import { selectMovingInfo, selectMovingPoint, selectPoints, selectSelectedPoint } from "store/editor-slice";
import { selectSidebarVisibility } from "store/plugin-slice";
import { selectSettingsVisible } from "store/settings-slice";
import { calculateHandlePos } from "ui/util/calculate-handle-pos";
import { TargetInfo } from "./hooks/use-target-capturer";

interface props {
	targetX: Binding<TargetInfo>;
	graphContainer: MutableRefObject<Frame | undefined>;
}

export function ClickListener({ targetX, graphContainer }: props) {
	const points = useSelector(selectPoints);
	const { setMovingPoint, selectPoint, setSettingsVisible, addPoint, setChanged } = useRootProducer();
	const movingPoint = useSelector(selectMovingPoint);
	const movingInfo = useSelector(selectMovingInfo);
	const settingsVisible = useSelector(selectSettingsVisible);
	const sidebarVisible = useSelector(selectSidebarVisibility);
	const selectedPoint = useSelector(selectSelectedPoint);

	useEffect(() => {
		let clickConnection: RBXScriptConnection | undefined;
		if (graphContainer.current) {
			clickConnection = graphContainer.current.InputEnded.Connect((input) => {
				if (!graphContainer.current) return;
				if (sidebarVisible) return;

				if (input.UserInputType === Enum.UserInputType.MouseButton1) {
					if (settingsVisible) {
						setSettingsVisible(false);
						return;
					}
					if (targetX.getValue().x !== undefined) {
						selectPoint(targetX.getValue().x);
						return;
					}
					if (selectedPoint !== undefined) {
						selectPoint(undefined);
						return;
					}

					const relativeX =
						(input.Position.X - graphContainer.current.AbsolutePosition.X) /
						graphContainer.current.AbsoluteSize.X;
					const relativeY =
						(input.Position.Y - graphContainer.current.AbsolutePosition.Y) /
						graphContainer.current.AbsoluteSize.Y;

					if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) return;

					if (movingPoint) {
						const newHandle1Position =
							movingInfo && movingInfo.handle1
								? calculateHandlePos(
										movingInfo.handle1,
										movingInfo.x,
										movingInfo.y,
										relativeX,
										1 - relativeY,
									)
								: undefined;
						const newHandle2Position =
							movingInfo && movingInfo.handle2
								? calculateHandlePos(
										movingInfo.handle2,
										movingInfo.x,
										movingInfo.y,
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

					setChanged(true);
				}
			});
		}

		return () => {
			clickConnection?.Disconnect();
		};
	}, [graphContainer.current, sidebarVisible, settingsVisible, selectedPoint, movingPoint, movingInfo]);

	return undefined;
}
