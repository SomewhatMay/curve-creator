import React, { useMemo } from "@rbxts/react";
import { OptionResolution } from "./option-resolution";
import { useRem } from "ui/hooks/use-rem";
import { OptionGuides } from "./option-guides";

export function SettingsOptions() {
	const rem = useRem();
	const options = useMemo(() => [<OptionResolution />, <OptionGuides />], []);

	return (
		<>
			{options.map((option) => (
				<frame Size={new UDim2(1, 0, 0, rem(15))} BackgroundTransparency={1} ZIndex={4}>
					{option}
				</frame>
			))}
		</>
	);
}
