import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";

interface props {
	title: string;
	text?: string;
	valueUpdated: (rbx: TextBox, enterPressed: boolean) => void;
}

export function SettingsTextBox({ title, text, valueUpdated }: props) {
	const rem = useRem();

	return (
		<>
			<textlabel
				Text={title}
				Size={new UDim2(1, 0, 1, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
				TextSize={rem(6)}
			/>
			<textbox
				PlaceholderText={text}
				TextSize={rem(6)}
				Size={new UDim2(1, 0, 0, rem(10))}
				FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
				Event={{
					FocusLost: (rbx, enterPressed) => valueUpdated(rbx, enterPressed),
				}}
			>
				<Rounded />
			</textbox>
		</>
	);
}
