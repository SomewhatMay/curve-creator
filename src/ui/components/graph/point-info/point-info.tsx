import React, { Binding } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../../rounded";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints } from "store/editor-slice";
import { FullPadding } from "../../full-padding";
import { PointTextBox } from "./point-textbox";
import { PointButton } from "./point-button";

interface props {
	x: Binding<number | undefined>;
}

export function PointInfo({ x }: props) {
	const rem = useRem();
	const points = useSelector(selectPoints);

	return (
		<imagebutton
			AutoButtonColor={false}
			Size={new UDim2(0, rem(135), 0, rem(65))}
			BackgroundColor3={Color3.fromRGB(41, 41, 41)}
			AnchorPoint={new Vector2(0.5, 1)}
			Position={x.map((x) => (x ? new UDim2(x, 0, points[x], -rem(8)) : new UDim2(0.5, 0, 0.25, 0)))}
			BackgroundTransparency={0}
			BorderSizePixel={0}
			// Visible={x.map((x) => x !== undefined)}
		>
			<frame Size={new UDim2(1, 0, 0.5, 0)} BackgroundTransparency={1}>
				<PointTextBox title="x" valueUpdated={() => {}} />
				<PointTextBox title="y" valueUpdated={() => {}} />
				<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />
			</frame>
			<frame Size={new UDim2(1, 0, 0.45, 0)} Position={new UDim2(0, 0, 0.55, 0)} BackgroundTransparency={1}>
				<PointButton icon="http://www.roblox.com/asset/?id=15928976491" imageScale={0.6} clicked={() => {}} />
				{/* <PointButton icon="http://www.roblox.com/asset/?id=15928976491" imageScale={0.6} clicked={() => {}} /> */}
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={new UDim(0, rem(4))}
				/>
				<FullPadding padding={rem(1)} />
			</frame>
			<FullPadding padding={rem(6)} />
			<Rounded />
		</imagebutton>
	);
}
