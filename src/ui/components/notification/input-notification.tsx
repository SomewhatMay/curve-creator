import React, { useBinding, useMemo } from "@rbxts/react";
import { Option, OptionsContainer } from "./option-container";
import { useRem } from "ui/hooks/use-rem";
import { TextService } from "@rbxts/services";
import { ModalContainer } from "../modal-container";
import { FullPadding } from "../full-padding";
import { Rounded } from "../rounded";
import { stringFit } from "ui/util/string-fit";

export interface InputNotificationProps {
	title: string;
	label: string;
	placeholder?: string;
	saveDirectory?: Instance;
	options: Option[];
}

export function InputNotification({ title, placeholder, label, saveDirectory, options }: InputNotificationProps) {
	const rem = useRem();
	const [inputValue, setInputValue] = useBinding("");
	/**
	 * 0 => smallest height
	 * 1 => invalid name added
	 * 2 => valid name (largest height)
	 */
	const heightEnum = inputValue.map((value) => (saveDirectory ? (value === "" ? 1 : 2) : 0));

	return (
		<ModalContainer modalHeight={heightEnum.map((x) => (x === 0 ? rem(94) : x === 1 ? rem(113) : rem(135)))}>
			<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				<textlabel
					Size={new UDim2(1, 0, 0, rem(14))}
					Position={new UDim2(0, 0, 0, 0)}
					BackgroundTransparency={1}
					Text={title}
					TextSize={rem(11)}
					Font={Enum.Font.GothamMedium}
					TextColor3={new Color3(1, 1, 1)}
					RichText
				/>
				<textlabel
					Text={label}
					Position={new UDim2(0, 0, 0, rem(20))}
					Size={new UDim2(1, 0, 0, rem(14))}
					TextColor3={new Color3(1, 1, 1)}
					BackgroundTransparency={1}
					TextSize={rem(11)}
					Font={Enum.Font.GothamMedium}
					TextXAlignment={Enum.TextXAlignment.Left}
				/>
				<frame
					Size={new UDim2(1, 0, 0, rem(16))}
					Position={new UDim2(0, 0, 0, rem(40))}
					BackgroundColor3={Color3.fromRGB(36, 36, 36)}
					BorderSizePixel={0}
				>
					<textbox
						Size={new UDim2(1, 0, 1, 0)}
						BackgroundTransparency={1}
						TextColor3={new Color3(1, 1, 1)}
						PlaceholderColor3={Color3.fromRGB(110, 110, 110)}
						PlaceholderText={placeholder}
						Text=""
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Center}
						ClearTextOnFocus={false}
						Change={{ Text: (rbx: TextBox) => setInputValue(rbx.Text) }}
					/>
					<FullPadding paddingX={new UDim(0, rem(4))} />
					<Rounded cornerRadius={new UDim(0, rem(4))} />
					<uistroke Thickness={rem(1)} Color={Color3.fromRGB(30, 30, 30)} />
				</frame>

				{saveDirectory && (
					<>
						<textlabel
							Text={inputValue.map((value) => `Please enter a valid ${label.lower()}.`)}
							Position={new UDim2(0, 0, 0, rem(64))}
							Size={new UDim2(1, 0, 0, rem(14))}
							TextSize={rem(9)}
							TextColor3={new Color3(1, 1, 1)}
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							TextXAlignment={Enum.TextXAlignment.Left}
							Visible={inputValue.map((value) => value === "")}
							TextWrapped
							RichText
						/>

						<textlabel
							Text="The file will be saved as:"
							Position={new UDim2(0, 0, 0, rem(64))}
							Size={new UDim2(1, 0, 0, rem(14))}
							TextSize={rem(9)}
							TextColor3={new Color3(1, 1, 1)}
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							TextXAlignment={Enum.TextXAlignment.Left}
							Visible={inputValue.map((value) => value !== "")}
							TextWrapped
							RichText
						/>
						<textbutton
							Text={inputValue.map((value) =>
								stringFit(`${saveDirectory?.GetFullName()}.${value}`, 40, false),
							)}
							Position={new UDim2(0, 0, 0, rem(75))}
							Size={new UDim2(1, 0, 0, rem(14))}
							TextSize={rem(9)}
							TextColor3={Color3.fromRGB(33, 144, 255)}
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							TextXAlignment={Enum.TextXAlignment.Left}
							Visible={inputValue.map((value) => value !== "")}
							TextWrapped
							RichText
						/>
						<textlabel
							Text={inputValue.map((value) => "Select target parent through FileExplorer.")}
							Position={new UDim2(0, 0, 0, rem(88))}
							Size={new UDim2(1, 0, 0, rem(14))}
							TextSize={rem(9)}
							TextColor3={new Color3(0.7, 0.7, 0.7)}
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							TextXAlignment={Enum.TextXAlignment.Left}
							Visible={inputValue.map((value) => value !== "")}
							TextWrapped
							RichText
						/>
					</>
				)}
				<FullPadding paddingX={new UDim(0, rem(8))} />
			</frame>
			<frame
				Size={new UDim2(1, 0, 0, rem(26))}
				Position={heightEnum.map((x) => new UDim2(0, 0, 0, x === 0 ? rem(70) : x === 1 ? rem(89) : rem(111)))}
				BackgroundTransparency={1}
			>
				<OptionsContainer options={options} />
			</frame>
		</ModalContainer>
	);
}
