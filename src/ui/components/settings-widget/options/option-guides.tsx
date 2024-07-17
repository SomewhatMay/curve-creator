import React from "@rbxts/react";
import { Toggle } from "../toggle";
import { useSelector } from "@rbxts/react-reflex";
import { selectGuides } from "store/settings-slice";
import { useRootProducer } from "store";

export function OptionGuides() {
	const guidesEnabled = useSelector(selectGuides);
	const { setGuides } = useRootProducer();
	return <Toggle title="Guides" enabled={guidesEnabled} valueUpdated={() => setGuides(!guidesEnabled)} />;
}
