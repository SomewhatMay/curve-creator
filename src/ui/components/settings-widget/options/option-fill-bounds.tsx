import React from "@rbxts/react";
import { Toggle } from "../toggle";
import { useSelector } from "@rbxts/react-reflex";
import { selectFillBounds } from "store/settings-slice";
import { useRootProducer } from "store";

export function OptionFillBounds() {
	const { setFillBounds } = useRootProducer();
	const fillBoundsEnabled = useSelector(selectFillBounds);

	return (
		<Toggle
			title="Fill Bounds"
			enabled={fillBoundsEnabled}
			valueUpdated={() => setFillBounds(!fillBoundsEnabled)}
		/>
	);
}
