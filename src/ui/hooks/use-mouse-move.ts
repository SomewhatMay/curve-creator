import React, { MutableRefObject, useEffect } from "@rbxts/react";

/**
 * Watches for mouse movement on a target GUI object
 * and returns the relative position of the mouse on the object
 * in the range [0, 1] on both X and Y axes.
 */
export function useMouseMove<T extends GuiObject>(
	targetObj: MutableRefObject<T | undefined>,
	listener?: (position: Vector2, input: InputObject) => void,
) {
	const [mousePosition, setMousePosition] = React.useState<Vector2>(new Vector2(0, 0));

	useEffect(() => {
		let mouseMoveConnection: RBXScriptConnection | undefined = undefined;

		if (targetObj.current) {
			mouseMoveConnection = targetObj.current.InputChanged.Connect((input) => {
				if (!targetObj.current) return;

				if (input.UserInputType === Enum.UserInputType.MouseMovement) {
					const relativeX =
						(input.Position.X - targetObj.current.AbsolutePosition.X) / targetObj.current.AbsoluteSize.X;
					const relativeY =
						(input.Position.Y - targetObj.current.AbsolutePosition.Y) / targetObj.current.AbsoluteSize.Y;

					if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) {
						return;
					}

					setMousePosition(new Vector2(relativeX, relativeY));
					listener?.(new Vector2(relativeX, relativeY), input);
				}
			});
		}

		return () => {
			if (mouseMoveConnection) {
				mouseMoveConnection.Disconnect();
			}
		};
	}, [targetObj.current, listener]);

	return mousePosition;
}
