import React, { MutableRefObject, useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import { selectPoints } from "store/editor-slice";
import { selectSidebarVisibility } from "store/plugin-slice";
import { selectSettingsVisible } from "store/settings-slice";

interface props {
	graphContainer: MutableRefObject<Frame | undefined>;
}

export function ClickListener({ graphContainer }: props) {
	const points = useSelector(selectPoints);
	const { addPoint } = useRootProducer();
	const settingsVisible = useSelector(selectSettingsVisible);
	const sidebarVisible = useSelector(selectSidebarVisibility);

	useEffect(() => {
		let clickConnection: RBXScriptConnection | undefined;
		if (graphContainer.current) {
			clickConnection = graphContainer.current.InputEnded.Connect((input) => {
				if (!graphContainer.current) return;
				if (settingsVisible || sidebarVisible) return;

				if (input.UserInputType === Enum.UserInputType.MouseButton1) {
					const relativeX =
						(input.Position.X - graphContainer.current.AbsolutePosition.X) /
						graphContainer.current.AbsoluteSize.X;
					const relativeY =
						(input.Position.Y - graphContainer.current.AbsolutePosition.Y) /
						graphContainer.current.AbsoluteSize.Y;

					if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) return;

					if (!points[relativeX]) {
						addPoint(relativeX, 1 - relativeY);
					}
				}
			});
		}

		return () => {
			clickConnection?.Disconnect();
		};
	}, [graphContainer.current]);

	return <></>;
}
