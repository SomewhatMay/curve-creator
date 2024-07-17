import React, { useBinding, useEffect } from "@rbxts/react";
import { SettingsTextBox } from "../textbox";
import { useSelector } from "@rbxts/react-reflex";
import { selectRounding } from "store/settings-slice";
import { useRootProducer } from "store";
import { useUpdate } from "@rbxts/pretty-react-hooks";

export function OptionRounding() {
	const roundingLevel = useSelector(selectRounding);
	const [roundingBind, setRoundingBind] = useBinding(roundingLevel);
	const { setRounding } = useRootProducer();
	const rerender = useUpdate();

	const handleChange = (rbx: TextBox, enterPressed: boolean) => {
		let cleanedRounding = tonumber(rbx.Text.gsub("%s+", "")[0]);
		cleanedRounding = math.clamp(cleanedRounding ?? 1, 1, 24);

		setRounding(cleanedRounding);
		rerender();
	};

	useEffect(() => setRoundingBind(roundingLevel), [rerender, roundingLevel]);

	return <SettingsTextBox title="Rounding" text={roundingBind.map((x) => tostring(x))} valueUpdated={handleChange} />;
}
