import React, { useBinding, useEffect, useMemo } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { FullPadding } from "../full-padding";
import { useSelector } from "@rbxts/react-reflex";
import { selectChanged, selectFileName, selectFileOpened } from "store/io-slice";
import { TextService } from "@rbxts/services";
import { ToolbarButton } from "./toolbar-button";
import { useRootProducer } from "store";
import { selectSettingsVisible, selectViewingMode } from "store/settings-slice";

export const TOOLBAR_HEIGHT = 20;

export type ToolbarOption = {
	icon: string;
	tooltip: string;
	handler: () => void;
};

export function Toolbar() {
	const rem = useRem();
	const { setViewingMode, setSettingsVisible } = useRootProducer();
	const settingsVisible = useSelector(selectSettingsVisible);
	const viewingMode = useSelector(selectViewingMode);
	const fileOpened = useSelector(selectFileOpened);
	const fileName = useSelector(selectFileName);
	const fileChanged = useSelector(selectChanged);
	const [fileNameSize, setFileNameSize] = useBinding(0);
	let displayName = fileOpened ? fileName : "No file open";

	const toolbarOptions: ToolbarOption[] = useMemo(
		() => [
			{
				icon: "http://www.roblox.com/asset/?id=6953989178",
				tooltip: "Open settings",
				handler: () => setSettingsVisible(!settingsVisible),
			},
			{
				icon: "http://www.roblox.com/asset/?id=18247708237",
				tooltip: "Open in table view",
				handler: () => {},
			},
			{
				icon: viewingMode
					? "http://www.roblox.com/asset/?id=16417282974"
					: "http://www.roblox.com/asset/?id=16060788318",
				tooltip: "Open in viewing mode",
				handler: () => setViewingMode(!viewingMode),
			},
		],
		[settingsVisible, setSettingsVisible, viewingMode],
	);

	useEffect(() => {
		setFileNameSize(
			TextService.GetTextSize(displayName, rem(10), Enum.Font.GothamMedium, new Vector2(math.huge, math.huge)).X,
		);
	}, [rem, displayName]);

	return (
		<frame Size={new UDim2(1, 0, 0, rem(TOOLBAR_HEIGHT))} BackgroundTransparency={1}>
			<textlabel
				Size={new UDim2(1, 0, 0, rem(TOOLBAR_HEIGHT - 2))}
				TextSize={rem(10)}
				FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
				BackgroundTransparency={1}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextColor3={new Color3(0.8, 0.8, 0.8)}
				Text={displayName}
			/>

			{fileChanged && (
				<textlabel
					Text="  •  Unsaved changes"
					Size={new UDim2(1, 0, 0, rem(TOOLBAR_HEIGHT - 2))}
					Position={fileNameSize.map((x) => new UDim2(0, x, 0, 0))}
					TextSize={rem(10)}
					FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
					BackgroundTransparency={1}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextColor3={new Color3(0.55, 0.55, 0.55)}
				/>
			)}

			<frame Size={new UDim2(0.5, 0, 0, rem(10))} Position={new UDim2(0.5, 0, 0, 0)} BackgroundTransparency={1}>
				{toolbarOptions.map((option) => {
					return (
						<ToolbarButton
							key={option.tooltip}
							handler={option.handler}
							tooltip={option.tooltip}
							icon={option.icon}
						/>
					);
				})}

				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={new UDim(0, rem(2))}
				/>
			</frame>

			<FullPadding paddingY={new UDim(0, rem(4))} paddingX={new UDim(0, rem(16))} />
		</frame>
	);
}
