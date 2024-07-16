import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { SidebarToggle } from "./sidebar-toggle";

export const NAVBAR_HEIGHT = 24;

export function Navbar() {
	const rem = useRem();

	return (
		<frame
			Size={new UDim2(1, 0, 0, rem(NAVBAR_HEIGHT))}
			BorderSizePixel={0}
			BackgroundColor3={Color3.fromRGB(41, 41, 41)}
			ZIndex={10}
		>
			<SidebarToggle />
			<textlabel
				AnchorPoint={new Vector2(0, 0.5)}
				Position={new UDim2(0, rem(22), 0.5, 0)}
				Size={new UDim2(0.5, 0, 1, -rem(12))}
				Text="Curve Creator"
				TextColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={1}
				TextScaled={true}
				FontFace={Font.fromEnum(Enum.Font.GothamBold)}
				TextXAlignment={Enum.TextXAlignment.Left}
				ZIndex={11}
			/>
		</frame>
	);
}
