import { MutableRefObject, useEffect } from "@rbxts/react";
import { useInputContext } from "ui/providers/input-provider";

export function useInputBegan<T extends GuiObject>(
	listener: (input: InputObject) => void,
	target?: MutableRefObject<T | undefined>,
) {
	const inputContainer = useInputContext();

	useEffect(() => {
		let inputBeganConnection: RBXScriptConnection | undefined = undefined;

		if (inputContainer.current) {
			inputBeganConnection = (target?.current ?? inputContainer.current).InputBegan.Connect((input) => {
				if (!inputContainer.current) return;
				listener(input);
			});
		}

		return () => {
			if (inputBeganConnection) {
				inputBeganConnection.Disconnect();
			}
		};
	}, [inputContainer.current, target, listener]);
}
