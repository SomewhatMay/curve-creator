import React, { Binding, useMemo } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "ui/components/rounded";
import { FullPadding } from "./full-padding";
import { toBinding } from "@rbxts/pretty-react-hooks";

interface props extends React.PropsWithChildren {
	modalHeight?: number | Binding<number>;
}

export const MODAL_WIDTH = 220;

export function ModalContainer({ modalHeight, children }: props) {
	const rem = useRem();
	modalHeight = useMemo(() => toBinding(modalHeight ?? 150), [modalHeight]);

	return (
		<>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				// The + 12 represents the padding around the modal
				Size={modalHeight.map((height) => new UDim2(0, rem(MODAL_WIDTH + 20), 0, height + rem(28)))}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				BorderSizePixel={0}
				BackgroundColor3={Color3.fromRGB(41, 41, 41)}
				ZIndex={15}
				ClipsDescendants={true}
			>
				{children}
				<Rounded />
				<FullPadding paddingY={new UDim(0, rem(14))} padding={new UDim(0, rem(10))} />
			</frame>
			<imagebutton
				Size={new UDim2(1, 0, 1, 0)}
				Position={new UDim2(0, 0, 0, 0)}
				BackgroundTransparency={0.75}
				BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				AutoButtonColor={false}
				ZIndex={14}
			/>
		</>
	);
}
