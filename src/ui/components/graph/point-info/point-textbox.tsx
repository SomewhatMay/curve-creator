import React, { useBinding, useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectRounding } from "store/settings-slice";
import { FullPadding } from "ui/components/full-padding";
import { Rounded } from "ui/components/rounded";
import { useRem } from "ui/hooks/use-rem";

interface props {
	title: string;
	value?: number;
	placeholder?: string;
	valueUpdated: (x: number) => void;
}

export function PointTextBox({ title, value, placeholder, valueUpdated }: props) {
	const rem = useRem();
	const [displayText, setDisplayText] = useBinding(value ?? 0);
	const rounding = useSelector(selectRounding);

	useEffect(() => setDisplayText(value ?? 0), [value]);

	return (
		<frame Size={new UDim2(0.5, 0, 1, 0)} BackgroundTransparency={1}>
			<textlabel
				Size={new UDim2(0.2, -rem(1), 1, 0)}
				Text={title}
				BackgroundTransparency={1}
				TextColor3={new Color3(1, 1, 1)}
			/>
			<textbox
				Size={new UDim2(0.8, -rem(1), 1, 0)}
				Position={new UDim2(0.2, rem(2), 0, 0)}
				Text={displayText.map((x) => `%.${rounding}f`.format(x))}
				PlaceholderText={placeholder}
				BackgroundColor3={Color3.fromRGB(36, 36, 36)}
				TextColor3={new Color3(1, 1, 1)}
				Event={{
					FocusLost: (rbx) => {
						let cleaned = tonumber(rbx.Text.gsub("%s+", "")[0]) ?? 0;

						if (cleaned !== displayText.getValue()) valueUpdated(cleaned);
						setDisplayText(cleaned);
					},
				}}
			>
				<Rounded />
			</textbox>
			<FullPadding padding={4} />
		</frame>
	);
}
