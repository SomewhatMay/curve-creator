import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";

const STEP = 0.1;
const trueStep = STEP / (STEP + 1);

export function YAxis() {
	const rem = useRem();

	return (
		<frame Size={new UDim2(0, rem(10), 1, -rem(10))} Position={new UDim2(0, 0, 0, 0)} BackgroundTransparency={1}>
			<frame
				Size={new UDim2(0, rem(1), 1, 0)}
				AnchorPoint={new Vector2(1, 0)}
				Position={new UDim2(1, 0, 0, 0)}
				BackgroundTransparency={0}
				BackgroundColor3={new Color3(1, 1, 1)}
				BorderSizePixel={0}
			>
				<Rounded />
			</frame>
			<frame Size={new UDim2(1, -rem(6), 1, 0)} Position={new UDim2(0, 0, 0, 0)} BackgroundTransparency={1}>
				{[...new Array(1 / trueStep, 0)].map((_, i) => (
					<textlabel
						key={i}
						LayoutOrder={1 / trueStep - i}
						Text={`${math.round(i * STEP * 100000) / 100000}`}
						Size={new UDim2(1, 0, 0, rem(2))}
						BackgroundTransparency={1}
						TextColor3={new Color3(0.8, 0.8, 0.8)}
						TextXAlignment={Enum.TextXAlignment.Right}
						TextSize={rem(4)}
						TextTransparency={i === 0 ? 1 : 0}
					/>
				))}
				<uilistlayout
					VerticalFlex={Enum.UIFlexAlignment.SpaceBetween}
					FillDirection={Enum.FillDirection.Vertical}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
			</frame>
		</frame>
	);
}
