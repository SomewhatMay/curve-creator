import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";

const STEP = 0.1;
const trueStep = STEP / (STEP + 1);

export { STEP as XAxisSTEP };
export { trueStep as XAxisTrueSTEP };

export function XAxis() {
	const rem = useRem();

	return (
		<frame
			Size={new UDim2(1, 0, 0, rem(20))}
			AnchorPoint={new Vector2(0.5, 1)}
			Position={new UDim2(0.5, 0, 1, 0)}
			BackgroundTransparency={1}
		>
			<frame
				Size={new UDim2(1, 0, 0, rem(1))}
				BackgroundTransparency={0}
				BackgroundColor3={new Color3(1, 1, 1)}
				BorderSizePixel={0}
			>
				<Rounded />
			</frame>
			<frame Size={new UDim2(1, 0, 1, -rem(4))} Position={new UDim2(0, 0, 0, rem(3))} BackgroundTransparency={1}>
				{[...new Array(1 / trueStep, 0)].map((_, i) => (
					<textlabel
						key={i}
						LayoutOrder={i}
						Text={`${math.round(i * STEP * 100000) / 100000}`}
						Size={new UDim2(0, rem(2), 1, 0)}
						Position={new UDim2(i * trueStep, 0, 0, 0)}
						BackgroundTransparency={1}
						TextColor3={new Color3(0.8, 0.8, 0.8)}
						TextXAlignment={Enum.TextXAlignment.Center}
						TextSize={rem(8)}
						TextTransparency={i === 0 ? 1 : 0}
					/>
				))}
				<uilistlayout
					HorizontalFlex={Enum.UIFlexAlignment.SpaceBetween}
					FillDirection={Enum.FillDirection.Horizontal}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
			</frame>
		</frame>
	);
}
