import React from "@rbxts/react";
import { Toggle } from "../toggle";
import { useSelector } from "@rbxts/react-reflex";
import { selectFillBounds } from "store/settings-slice";
import { useRootProducer } from "store";

export function OptionFillBounds() {
	const fillBoundsEnabled = useSelector(selectFillBounds);
	const { setFillBounds } = useRootProducer();
	return (
		<Toggle
			title="Fill Bounds"
			enabled={fillBoundsEnabled}
			valueUpdated={() => setFillBounds(!fillBoundsEnabled)}
		/>
	);
}
