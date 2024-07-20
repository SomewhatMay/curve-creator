import { useEffect } from "@rbxts/react";
import { useInputContext } from "ui/providers/input-provider";

export function useInputEnded(listener: (input: InputObject) => void) {
	const inputContainer = useInputContext();

	useEffect(() => {
		let inputEndedConnection: RBXScriptConnection | undefined = undefined;

		if (inputContainer.current) {
			inputEndedConnection = inputContainer.current.InputEnded.Connect((input) => {
				if (!inputContainer.current) return;
				listener(input);
			});
		}

		return () => {
			if (inputEndedConnection) {
				inputEndedConnection.Disconnect();
			}
		};
	}, [inputContainer.current, listener]);
}
