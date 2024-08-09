import React, { useEffect, useMemo, useState } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { FullPadding } from "../full-padding";
import { SidebarButton } from "./sidebar-button";
import { useSelector } from "@rbxts/react-reflex";
import { selectSidebarVisibility } from "store/plugin-slice";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import { useRootProducer } from "store";
import { useNewFile, useSaveFile } from "ui/hooks/editor-hooks";
import { getVersion } from "ui/util/get-version";
import { useSaveFileAs } from "ui/hooks/editor-hooks";
import { useRenameFile } from "ui/hooks/editor-hooks";
import { useLoadFile } from "ui/hooks/editor-hooks/use-load-file";
import { useDownloadCalculator } from "ui/hooks/editor-hooks/use-download-calculator";

export type SidebarOption = {
	title: string;
	icon: string;
	handler: () => void;
};

export function Sidebar() {
	const rem = useRem();
	const [open, setOpen] = useMotor(0);
	const sidebarVisible = useSelector(selectSidebarVisibility);
	const { setSidebarVisible } = useRootProducer();

	const newFile = useNewFile();
	const loadFile = useLoadFile();
	const saveFile = useSaveFile();
	const saveFileAs = useSaveFileAs();
	const renameFile = useRenameFile();
	const downloadCalculator = useDownloadCalculator();

	const sidebarOptions: SidebarOption[] = useMemo(
		() => [
			{
				title: "New",
				icon: "http://www.roblox.com/asset/?id=15929013661",
				handler: newFile,
			},
			{
				title: "Load",
				icon: "http://www.roblox.com/asset/?id=11768914234",
				handler: loadFile,
			},
			{
				title: "Save",
				icon: "http://www.roblox.com/asset/?id=12392895702",
				handler: saveFile,
			},
			{
				title: "Save as",
				icon: "http://www.roblox.com/asset/?id=12392895702",
				handler: saveFileAs,
			},
			{
				title: "Place Calculator",
				icon: "http://www.roblox.com/asset/?id=9405930424",
				handler: downloadCalculator,
			},
			{
				title: "Rename",
				icon: "http://www.roblox.com/asset/?id=16417282974",
				handler: renameFile,
			},
		],
		[newFile],
	);

	useEffect(() => {
		if (sidebarVisible) {
			setOpen(new Spring(1));
		} else {
			setOpen(new Spring(0));
		}
	}, [sidebarVisible]);

	return (
		<>
			<imagebutton
				AutoButtonColor={false}
				Size={new UDim2(0, rem(200), 1, 0)}
				BackgroundColor3={Color3.fromRGB(41, 41, 41)}
				BorderSizePixel={0}
				Position={open.map((x) => new UDim2(x - 1, 0, 0, 0))}
				ZIndex={10}
			>
				<textlabel
					Text="Menu"
					Size={new UDim2(1, 0, 0, rem(10))}
					Position={new UDim2(0, rem(3), 0, rem(2))}
					BackgroundTransparency={1}
					TextColor3={new Color3(0.65, 0.65, 0.65)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					ZIndex={10}
				/>
				<frame
					Size={new UDim2(1, 0, 1, -rem(20))}
					BackgroundTransparency={1}
					Position={new UDim2(0, 0, 0, rem(20))}
					ZIndex={10}
				>
					{sidebarOptions.map((option, index) => (
						<SidebarButton key={option.title} option={option} index={index} handler={option.handler} />
					))}
				</frame>
				<frame
					Size={new UDim2(1, 0, 0, rem(25))}
					Position={new UDim2(0, 0, 1, 0)}
					AnchorPoint={new Vector2(0, 1)}
					ZIndex={10}
					BackgroundTransparency={1}
				>
					<textlabel
						Size={new UDim2(1, 0, 0, rem(10))}
						Text={getVersion()}
						TextColor3={new Color3(0.65, 0.65, 0.65)}
						RichText={true}
						BackgroundTransparency={1}
						TextScaled={true}
					/>
					<textlabel
						Size={new UDim2(1, 0, 0, rem(10))}
						Text="Developed by <font color='#dddddd'>SomewhatMay</font>"
						TextColor3={new Color3(0.65, 0.65, 0.65)}
						RichText={true}
						BackgroundTransparency={1}
						TextScaled={true}
					/>
					<uilistlayout Padding={new UDim(0, rem(5))} VerticalAlignment={Enum.VerticalAlignment.Bottom} />
				</frame>
				<FullPadding padding={rem(14)} PaddingTop={new UDim(0, rem(10))} />
			</imagebutton>
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
