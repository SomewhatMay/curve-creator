import React, { useBinding, useEffect } from "@rbxts/react";
import { SettingsTextBox } from "../textbox";
import { useSelector } from "@rbxts/react-reflex";
import { selectResolution, selectRounding } from "store/settings-slice";
import { useRootProducer } from "store";
import { useUpdate } from "@rbxts/pretty-react-hooks";

export function OptionResolution() {
	const resolution = useSelector(selectResolution);
	const [resolutionBind, setResolutionBind] = useBinding(resolution);
	const { setResolution } = useRootProducer();
	const rerender = useUpdate();

	const handleChange = (rbx: TextBox, enterPressed: boolean) => {
		let cleanedResolution = tonumber(rbx.Text.gsub("%s+", "")[0]);
		cleanedResolution = math.clamp(cleanedResolution ?? 1, 1, 1024);

		setResolution(cleanedResolution);
		rerender();
	};

	useEffect(() => setResolutionBind(resolution), [rerender, resolution]);

	return (
		<SettingsTextBox title="Resolution" text={resolutionBind.map((x) => tostring(x))} valueUpdated={handleChange} />
	);
}
