import React, { Binding } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";

interface props {
	title: string;
	text?: string | Binding<string>;
	placeholder?: string;
	valueUpdated: (rbx: TextBox, enterPressed: boolean) => void;
}

export function SettingsTextBox({ title, text, placeholder, valueUpdated }: props) {
	const rem = useRem();

	return (
		<>
			<textlabel
				Text={title}
				Size={new UDim2(0.45, -rem(3), 1, 0)}
				Position={new UDim2(0, rem(3), 0, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
				TextSize={rem(12)}
				TextColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={1}
				ZIndex={4}
			/>
			<textbox
				PlaceholderText={placeholder}
				TextSize={rem(12)}
				Text={text ?? ""}
				AnchorPoint={new Vector2(1, 0.5)}
				TextColor3={new Color3(1, 1, 1)}
				Position={new UDim2(1, 0, 0.5, 0)}
				Size={new UDim2(0.35, 0, 1, 0)}
				FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
				BackgroundColor3={Color3.fromRGB(36, 36, 36)}
				TextXAlignment={Enum.TextXAlignment.Center}
				ZIndex={4}
				Event={{
					FocusLost: (rbx, enterPressed) => valueUpdated(rbx, enterPressed),
				}}
			>
				<Rounded />
			</textbox>
		</>
	);
}
