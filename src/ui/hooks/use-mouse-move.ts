import React, { MutableRefObject, useBinding, useEffect } from "@rbxts/react";
import { useInputContext } from "ui/providers/input-provider";

/**
 * Watches for mouse movement on a target GUI object
 * and returns the relative position of the mouse on the object
 * in the range [0, 1] on both X and Y axes.
 */
export function useMouseMove(listener?: (position: Vector2, input: InputObject) => void) {
	const inputContainer = useInputContext();
	const [mousePosition, setMousePosition] = useBinding<Vector2>(new Vector2(0, 0));

	useEffect(() => {
		let mouseMoveConnection: RBXScriptConnection | undefined = undefined;

		if (inputContainer.current) {
			mouseMoveConnection = inputContainer.current.InputChanged.Connect((input) => {
				if (!inputContainer.current) return;

				if (input.UserInputType === Enum.UserInputType.MouseMovement) {
					setMousePosition(new Vector2(input.Position.X, input.Position.Y));
					listener?.(new Vector2(input.Position.X, input.Position.Y), input);
				}
			});
		}

		return () => {
			if (mouseMoveConnection) {
				mouseMoveConnection.Disconnect();
			}
		};
	}, [inputContainer.current, listener]);

	return mousePosition;
}
