import React, { Children, useBinding, useMemo } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";
import { MODAL_WIDTH, ModalContainer } from "../modal-container";
import { FullPadding } from "../full-padding";
import { TextService } from "@rbxts/services";

type Option = {
	message?: string;
	BackgroundColor3?: Color3;
	handler: () => void;
};
interface props {
	message?: string;
	options: Option[];
}

export function Notification({ message, options }: props) {
	const rem = useRem();
	const [messageHeight, setMessageHeight] = useBinding(0);

	useMemo(
		() =>
			setMessageHeight(
				TextService.GetTextSize(
					message ?? "",
					rem(11),
					Enum.Font.GothamMedium,
					new Vector2(rem(MODAL_WIDTH), math.huge),
				).Y,
			),
		[rem, message],
	);

	return (
		<ModalContainer modalHeight={messageHeight.map((height) => height + rem(42))}>
			<textlabel
				Size={messageHeight.map((height) => new UDim2(1, 0, 0, height))}
				Position={new UDim2(0, 0, 0, 0)}
				BackgroundTransparency={1}
				Text={message}
				TextSize={rem(11)}
				Font={Enum.Font.GothamMedium}
				TextColor3={new Color3(1, 1, 1)}
				TextWrapped={true}
				RichText={true}
			/>
			<frame
				key="OptionsContainer"
				Position={messageHeight.map((height) => new UDim2(0, 0, 0, height + rem(16)))}
				Size={new UDim2(1, 0, 0, rem(26))}
				BackgroundTransparency={1}
			>
				{options.map((option, i) => (
					<textbutton
						key={i}
						Size={new UDim2(0.1, 0, 1, 0)}
						Text={option.message}
						Font={Enum.Font.GothamMedium}
						TextSize={rem(12)}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={option.BackgroundColor3 ?? Color3.fromRGB(35, 35, 35)}
						Event={{ MouseButton1Click: option.handler }}
					>
						<Rounded />
					</textbutton>
				))}
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, rem(6))}
					HorizontalFlex={Enum.UIFlexAlignment.Fill}
				/>
				<FullPadding paddingX={new UDim(0, rem(8))} />
			</frame>
		</ModalContainer>
	);
}
