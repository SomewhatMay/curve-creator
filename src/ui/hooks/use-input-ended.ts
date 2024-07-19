import { MutableRefObject, useEffect } from "@rbxts/react";
import { useInputContext } from "ui/providers/input-provider";

export function useInputEnded<T extends GuiObject>(
	listener: (input: InputObject) => void,
	target?: MutableRefObject<T | undefined>,
) {
	const inputContainer = useInputContext();

	useEffect(() => {
		let inputEndedConnection: RBXScriptConnection | undefined = undefined;

		if (inputContainer.current) {
			inputEndedConnection = (target?.current ?? inputContainer.current).InputEnded.Connect((input) => {
				if (!inputContainer.current) return;
				listener(input);
			});
		}

		return () => {
			if (inputEndedConnection) {
				inputEndedConnection.Disconnect();
			}
		};
	}, [inputContainer.current, target, listener]);
}
