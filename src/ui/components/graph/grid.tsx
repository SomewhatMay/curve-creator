import React from "@rbxts/react";
import { XAxisSTEP, XAxisTrueSTEP } from "./x-axis";
import { useRem } from "ui/hooks/use-rem";
import { YAxisSTEP, YAxisTrueSTEP } from "./y-axis";

export function Grid() {
	const rem = useRem();

	return (
		<>
			{[...new Array(1 / XAxisTrueSTEP, 0)].map((_, i) => (
				<frame
					key={"X" + tostring(i)}
					Size={new UDim2(0, rem(1), 1, 0)}
					Position={new UDim2((i + 1) * XAxisSTEP, 0, 0, 0)}
					BackgroundTransparency={0.8}
					BorderSizePixel={0}
				/>
			))}
			{[...new Array(1 / YAxisTrueSTEP, 0)].map((_, i) => (
				<frame
					key={"Y" + tostring(i)}
					Size={new UDim2(1, 0, 0, rem(1))}
					Position={new UDim2(0, 0, i * YAxisSTEP, 0)}
					BackgroundTransparency={0.9}
					BorderSizePixel={0}
				/>
			))}
		</>
	);
}
