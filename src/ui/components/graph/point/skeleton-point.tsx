import React from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";

interface props extends React.PropsWithChildren {
	x: number;
	y: number;
}

export function SkeletonPoint({ x, y, children }: props) {
	const rem = useRem();

	return (
		<frame
			Position={new UDim2(x, 0, 1 - y, 0)}
			Size={new UDim2(0, rem(4), 0, rem(4))}
			BackgroundTransparency={0}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BorderSizePixel={1}
			BackgroundColor3={new Color3(1, 1, 1)}
			ZIndex={2}
		>
			{children}
			<uicorner CornerRadius={new UDim(1, 0)} />
		</frame>
	);
}
