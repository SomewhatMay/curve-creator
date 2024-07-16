import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { SidebarOption } from "./sidebar";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import { Rounded } from "../rounded";

interface props {
	option: SidebarOption;
	index: number;
}

export function SidebarButton({ option, index }: props) {
	const [hovered, setHovered] = useMotor(0);
	const rem = useRem();

	return (
		<imagebutton
			Size={new UDim2(1, 0, 0, rem(12))}
			BackgroundTransparency={hovered.map((value) => 1 - value * 0.2)}
			BackgroundColor3={new Color3(0, 0, 0)}
			Position={new UDim2(0, 0, 0, rem(12) * index)}
			ZIndex={10}
			Event={{
				MouseEnter: () => setHovered(new Spring(1)),
				MouseLeave: () => setHovered(new Spring(0)),
			}}
		>
			<imagelabel
				Image={option.icon}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0.5)}
				Position={new UDim2(0, rem(3), 0.5, 0)}
				Size={new UDim2(0, rem(7), 0, rem(7))}
				ZIndex={10}
			/>
			<textlabel
				Text={option.title}
				Size={new UDim2(1, 0, 0, rem(8))}
				AnchorPoint={new Vector2(0, 0.5)}
				Position={new UDim2(0, rem(15), 0.5, 0)}
				BackgroundTransparency={1}
				TextColor3={new Color3(0.8, 0.8, 0.8)}
				TextScaled={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				ZIndex={10}
			/>
			<Rounded />
		</imagebutton>
	);
}