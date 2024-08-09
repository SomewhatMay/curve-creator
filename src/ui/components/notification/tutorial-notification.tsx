import React, { useBinding, useEffect, useMemo } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { MODAL_WIDTH, ModalContainer } from "../modal-container";
import { TextService } from "@rbxts/services";
import { Option, OptionsContainer } from "./option-container";
import { removeMarkup } from "ui/util/remove-markup";
import { Rounded } from "../rounded";
import { FullPadding } from "../full-padding";

export interface TutorialNotificationProps {
	message?: string;
	displayCode?: boolean;
	options: Option[];
}

const USE_STEPS = `Simply call the <font family="rbxasset://fonts/families/RobotoMono.json"> calculate() </font> function located in the CurveCalculator Module Script with a PointCollection retrieved from any CurveData module script. Following is an example:\n`;
const USE_CODE = `\n<font color="#f86d7c">local</font> curveCalculator = <font color="#69d6f7">require</font>(path.<font color="#61a1f1">to</font>.<font color="#61a1f1">CurveCalculator</font>)
<font color="#f86d7c">local</font> pointCollection = <font color="#69d6f7">require</font>(path.<font color="#61a1f1">to</font>.<font color="#61a1f1">PointCollection</font>)

<font color="rgb(100,100,100)">-- Calculates the y position at x = 0.5</font>
<font color="#f86d7c">local</font> y = curveCalculator.<font color="#fdfb97">calculate</font>(pointCollection,<font color="#ffc600"> 0.5</font>)\n`;

export function TutorialNotification({ message, displayCode = false, options }: TutorialNotificationProps) {
	const rem = useRem();
	const modalWidth = MODAL_WIDTH * 1.5;
	const messageHeight = useMemo(
		() =>
			TextService.GetTextSize(
				message ?? "",
				rem(11),
				Enum.Font.GothamMedium,
				new Vector2(rem(modalWidth), math.huge),
			).Y +
			(displayCode
				? TextService.GetTextSize(
						removeMarkup(USE_STEPS),
						rem(11),
						Enum.Font.GothamMedium,
						new Vector2(rem(modalWidth), math.huge),
					).Y
				: 0),
		[rem, message, displayCode, modalWidth],
	);
	const codeHeight = useMemo(
		() =>
			displayCode
				? TextService.GetTextSize(
						removeMarkup(USE_CODE),
						rem(11),
						Enum.Font.RobotoMono,
						new Vector2(rem(modalWidth), math.huge),
					).Y
				: 0,
		[displayCode, rem, modalWidth],
	);
	const overallHeight = messageHeight + codeHeight;

	return (
		<ModalContainer modalWidth={modalWidth} modalHeight={overallHeight + rem(42)}>
			<textlabel
				key={"Message"}
				Size={new UDim2(1, 0, 0, messageHeight)}
				Position={new UDim2(0, 0, 0, 0)}
				BackgroundTransparency={1}
				Text={message + (displayCode ? "\n" + USE_STEPS : "")}
				TextSize={rem(11)}
				Font={Enum.Font.GothamMedium}
				TextColor3={new Color3(1, 1, 1)}
				TextWrapped
				RichText
			/>
			{displayCode && (
				<frame
					Position={new UDim2(0, 0, 0, messageHeight)}
					Size={new UDim2(1, 0, 0, codeHeight)}
					BackgroundColor3={Color3.fromRGB(36, 36, 36)}
					BorderSizePixel={0}
					key={"CodeFrame"}
				>
					<textlabel
						Size={new UDim2(1, 0, 1, 0)}
						BackgroundTransparency={1}
						Text={USE_CODE}
						TextSize={rem(11)}
						Font={Enum.Font.RobotoMono}
						TextColor3={new Color3(1, 1, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
						RichText
						TextWrapped
						ZIndex={6}
					/>
					<FullPadding paddingX={new UDim(0, rem(4))} />
					<Rounded cornerRadius={new UDim(0, rem(4))} />
					<uistroke Thickness={rem(1)} Color={Color3.fromRGB(30, 30, 30)} />
					{/* 
						This 'hidden' textbox allows syntax highlighting in the code 
						with rich text while letting the user select and copy it from the textbox.
						The TextEditable prop is set to false so that the user cannot edit the code  
					*/}
					<textbox
						Size={new UDim2(1, 0, 1, 0)}
						TextColor3={Color3.fromRGB(36, 36, 36)}
						BackgroundTransparency={1}
						Text={removeMarkup(USE_CODE)}
						TextSize={rem(11)}
						Font={Enum.Font.RobotoMono}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextEditable={false}
						ClearTextOnFocus={false}
						ZIndex={5}
						RichText
						TextWrapped
					/>
				</frame>
			)}
			<frame
				key={"OptionsFrame"}
				Size={new UDim2(1, 0, 0, rem(26))}
				Position={new UDim2(0, 0, 0, overallHeight + rem(16))}
				BackgroundTransparency={1}
			>
				<OptionsContainer options={options} />
			</frame>
			<FullPadding padding={new UDim(0, rem(16))} />
		</ModalContainer>
	);
}
