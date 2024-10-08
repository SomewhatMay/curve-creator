import React, { useBinding, useEffect, useMemo } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { MODAL_WIDTH, ModalContainer } from "../modal-container";
import { TextService } from "@rbxts/services";
import { Option, OptionsContainer } from "./option-container";

export interface NotificationProps {
	message?: string;
	options: Option[];
}

export function Notification({ message, options }: NotificationProps) {
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
				TextWrapped
				RichText
			/>
			<frame
				Size={new UDim2(1, 0, 0, rem(26))}
				Position={messageHeight.map((height) => new UDim2(0, 0, 0, height + rem(16)))}
				BackgroundTransparency={1}
			>
				<OptionsContainer options={options} />
			</frame>
		</ModalContainer>
	);
}
