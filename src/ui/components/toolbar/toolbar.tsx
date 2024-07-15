import React, { useBinding, useEffect } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { FullPadding } from "../full-padding";
import { useSelector } from "@rbxts/react-reflex";
import { selectChanged, selectFileName, selectFileOpened } from "store/io-slice";
import { TextService } from "@rbxts/services";
import { ToolbarButton } from "./toolbar-button";

export type ToolbarOption = {
	icon: string;
	tooltip: string;
};

const toolbarOptions: ToolbarOption[] = [
	{
		icon: "http://www.roblox.com/asset/?id=6953989178", // graph icon: http://www.roblox.com/asset/?id=4460062809
		tooltip: "Open settings",
	},
	{
		icon: "http://www.roblox.com/asset/?id=18247708237", // graph icon: http://www.roblox.com/asset/?id=4460062809
		tooltip: "Open in table view",
	},
];

export function Toolbar() {
	const rem = useRem();
	const fileOpened = useSelector(selectFileOpened);
	const fileName = useSelector(selectFileName);
	const fileChanged = useSelector(selectChanged);
	const [fileNameSize, setFileNameSize] = useBinding(0);
	let displayName = fileOpened ? fileName : "No file open";

	useEffect(() => {
		setFileNameSize(
			TextService.GetTextSize(displayName, rem(6), Enum.Font.GothamMedium, new Vector2(math.huge, math.huge)).X,
		);
	}, [rem, displayName]);

	return (
		<frame Size={new UDim2(1, 0, 0, rem(12))} BackgroundTransparency={1}>
			<textlabel
				Size={new UDim2(1, 0, 0, rem(10))}
				TextSize={rem(6)}
				FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
				BackgroundTransparency={1}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextColor3={new Color3(0.8, 0.8, 0.8)}
				Text={displayName}
			/>

			{fileChanged && (
				<textlabel
					Text="  •  Unsaved changes"
					Size={new UDim2(1, 0, 0, rem(10))}
					Position={fileNameSize.map((x) => new UDim2(0, x, 0, 0))}
					TextSize={rem(6)}
					FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
					BackgroundTransparency={1}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextColor3={new Color3(0.55, 0.55, 0.55)}
				/>
			)}

			<frame Size={new UDim2(0.5, 0, 0, rem(10))} Position={new UDim2(0.5, 0, 0, 0)} BackgroundTransparency={1}>
				{toolbarOptions.map((option) => {
					return <ToolbarButton key={option.tooltip} tooltip={option.tooltip} icon={option.icon} />;
				})}

				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={new UDim(0, rem(2))}
				/>
			</frame>

			<FullPadding paddingY={new UDim(0, rem(2))} paddingX={new UDim(0, rem(6))} />
		</frame>
	);
}
