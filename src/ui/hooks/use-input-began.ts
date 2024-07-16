import { MutableRefObject, useEffect } from "@rbxts/react";

export function useInputBegan<T extends GuiObject>(
	targetObj: MutableRefObject<T | undefined>,
	listener: (input: InputObject) => void,
) {
	useEffect(() => {
		let inputBeganConnection: RBXScriptConnection | undefined = undefined;

		if (targetObj.current) {
			inputBeganConnection = targetObj.current.InputBegan.Connect((input) => {
				if (!targetObj.current) return;
				listener(input);
			});
		}

		return () => {
			if (inputBeganConnection) {
				inputBeganConnection.Disconnect();
			}
		};
	}, [targetObj.current, listener]);
}
