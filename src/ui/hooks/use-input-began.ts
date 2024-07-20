import { useEffect } from "@rbxts/react";
import { useInputContext } from "ui/providers/input-provider";

export function useInputBegan(listener: (input: InputObject) => void) {
	const inputContainer = useInputContext();

	useEffect(() => {
		let inputBeganConnection: RBXScriptConnection | undefined = undefined;

		if (inputContainer.current) {
			inputBeganConnection = inputContainer.current.InputBegan.Connect((input) => {
				if (!inputContainer.current) return;
				listener(input);
			});
		}

		return () => {
			if (inputBeganConnection) {
				inputBeganConnection.Disconnect();
			}
		};
	}, [inputContainer.current, listener]);
}
