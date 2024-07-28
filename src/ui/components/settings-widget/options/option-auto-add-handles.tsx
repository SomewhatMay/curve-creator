import React from "@rbxts/react";
import { Toggle } from "../toggle";
import { useSelector } from "@rbxts/react-reflex";
import { selectAutoAddHandles, selectGuides } from "store/settings-slice";
import { useRootProducer } from "store";

export function OptionAutoAddHandles() {
	const autoAddHandlesEnabled = useSelector(selectAutoAddHandles);
	const { setAutoAddHandles } = useRootProducer();
	return (
		<Toggle
			title="Auto Add Handles"
			enabled={autoAddHandlesEnabled}
			valueUpdated={() => setAutoAddHandles(!autoAddHandlesEnabled)}
		/>
	);
}
