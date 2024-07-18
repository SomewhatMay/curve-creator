import React from "@rbxts/react";
import { Rounded } from "ui/components/rounded";
import { useRem } from "ui/hooks/use-rem";

interface props {
	icon: string;
	imageScale?: number;
	clicked: () => void;
}

export function PointButton({ icon, imageScale = 1, clicked }: props) {
	const rem = useRem();

	return (
		<imagebutton
			BackgroundColor3={Color3.fromRGB(36, 36, 36)}
			Size={new UDim2(1, 0, 1, 0)}
			Event={{ MouseButton1Click: clicked }}
			ScaleType={Enum.ScaleType.Fit}
			ZIndex={3}
		>
			<imagelabel
				Image={icon}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={new UDim2(imageScale, 0, imageScale, 0)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				BackgroundTransparency={1}
				ZIndex={3}
			/>
			<uiaspectratioconstraint AspectRatio={1} />
			<Rounded />
		</imagebutton>
	);
}
