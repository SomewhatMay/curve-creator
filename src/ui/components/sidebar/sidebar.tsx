import React, { useEffect, useState } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { FullPadding } from "../full-padding";
import { SidebarButton } from "./sidebar-button";
import { useSelector } from "@rbxts/react-reflex";
import { selectSidebarVisibility } from "store/plugin-slice";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import { useRootProducer } from "store";

export type SidebarOption = {
	title: string;
	icon: string;
};

const sidebarOptions: SidebarOption[] = [
	{
		title: "New",
		icon: "http://www.roblox.com/asset/?id=15929013661",
	},

	{
		title: "Load",
		icon: "http://www.roblox.com/asset/?id=11768914234",
	},

	{
		title: "Save",
		icon: "http://www.roblox.com/asset/?id=12392895702",
	},
	{
		title: "Save as",
		icon: "http://www.roblox.com/asset/?id=12392895702",
	},
	{
		title: "Rename",
		icon: "http://www.roblox.com/asset/?id=14189347195",
	},
];

export function Sidebar() {
	const rem = useRem();
	const [open, setOpen] = useMotor(0);
	const sidebarVisible = useSelector(selectSidebarVisibility);
	const { setSidebarVisible } = useRootProducer();

	useEffect(() => {
		if (sidebarVisible) {
			setOpen(new Spring(1));
		} else {
			setOpen(new Spring(0));
		}
	}, [sidebarVisible]);

	return (
		<>
			<frame
				Size={new UDim2(0, rem(100), 1, 0)}
				BackgroundColor3={Color3.fromRGB(41, 41, 41)}
				BorderSizePixel={0}
				Position={open.map((x) => new UDim2(x - 1, 0, 0, 0))}
				ZIndex={10}
			>
				<textlabel
					Text="Menu"
					Size={new UDim2(1, 0, 0, rem(6))}
					Position={new UDim2(0, rem(3), 0, rem(2))}
					BackgroundTransparency={1}
					TextColor3={new Color3(0.65, 0.65, 0.65)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					ZIndex={10}
				/>
				<frame
					Size={new UDim2(1, 0, 1, -rem(12))}
					BackgroundTransparency={1}
					Position={new UDim2(0, 0, 0, rem(12))}
					ZIndex={10}
				>
					{sidebarOptions.map((option, index) => (
						<SidebarButton key={option.title} option={option} index={index} />
					))}
				</frame>
				<FullPadding padding={rem(6)} PaddingTop={new UDim(0, rem(4))} />
			</frame>
			<frame
				Size={new UDim2(1, 0, 1, 0)}
				Position={new UDim2(0, 0, 0, 0)}
				BackgroundTransparency={open.map((x) => (1 - x) * 0.3 + 0.7)}
				BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				ZIndex={9}
			>
				<imagebutton
					Size={new UDim2(1, 0, 1, 0)}
					Position={new UDim2(0, 0, 0, 0)}
					BackgroundTransparency={1}
					AutoButtonColor={false}
					Visible={sidebarVisible}
					Event={{
						MouseButton1Click: () => setSidebarVisible(false),
					}}
				/>
			</frame>
		</>
	);
}
