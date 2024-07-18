import React, { Binding } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../../rounded";
import { useSelector } from "@rbxts/react-reflex";
import { selectPoints } from "store/editor-slice";
import { FullPadding } from "../../full-padding";
import { PointTextBox } from "./point-textbox";
import { PointButton } from "./point-button";
import { useRootProducer } from "store";

interface props {
	selectedX: number | undefined;
}

export function PointInfo({ selectedX }: props) {
	const rem = useRem();
	const { setMovingPoint, selectPoint, addPoint, removePoint } = useRootProducer();
	const points = useSelector(selectPoints);
	const selectedY = selectedX ? points[selectedX] : undefined;

	let containerX = 0.5;
	let containerY = 1;

	if (selectedX && selectedX < 0.25) {
		containerX = 0;
		containerY = 0.5;
	} else if (selectedX && selectedX > 0.75) {
		containerX = 1;
		containerY = 0.5;
	}

	if (selectedY && selectedY < 0.25) {
		containerY = 1;
	} else if (selectedY && selectedY > 0.75) {
		containerY = 0;
	}

	const handleDelete = () => {
		if (selectedX) removePoint(selectedX);
	};

	const handleRepositionX = (newX: number) => {
		if (selectedX) {
			removePoint(selectedX);
			addPoint(newX, selectedY!);
			selectPoint(newX);
		}
	};

	const handleRepositionY = (newY: number) => {
		if (selectedX) {
			removePoint(selectedX);
			addPoint(selectedX, newY);
			selectPoint(selectedX);
		}
	};

	const handleMove = () => {
		if (selectedX) {
			removePoint(selectedX);
			setMovingPoint(true);
		}
	};

	return (
		<imagebutton
			AutoButtonColor={false}
			Size={new UDim2(0, rem(135), 0, rem(65))}
			BackgroundColor3={Color3.fromRGB(41, 41, 41)}
			AnchorPoint={new Vector2(containerX, containerY)}
			Position={
				selectedX
					? new UDim2(
							selectedX,
							rem(4) * (containerX === 0 ? 1 : containerX === 1 ? -1 : 0),
							1 - selectedY!,
							rem(4) * (containerY === 0 ? 1 : containerY === 1 ? -1 : 0),
						)
					: new UDim2(0.5, 0, 0.25, 0)
			}
			BackgroundTransparency={0}
			BorderSizePixel={0}
			Visible={selectedX !== undefined}
			ZIndex={3}
		>
			<frame Size={new UDim2(1, 0, 0.5, 0)} BackgroundTransparency={1} ZIndex={3}>
				<PointTextBox title="x" value={selectedX} valueUpdated={handleRepositionX} />
				<PointTextBox title="y" value={selectedY} valueUpdated={handleRepositionY} />
				<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />
			</frame>
			<frame
				Size={new UDim2(1, 0, 0.45, 0)}
				Position={new UDim2(0, 0, 0.55, 0)}
				BackgroundTransparency={1}
				ZIndex={3}
			>
				<PointButton icon="http://www.roblox.com/asset/?id=401280200" imageScale={0.6} clicked={handleMove} />
				<PointButton
					icon="http://www.roblox.com/asset/?id=15928976491"
					imageScale={0.6}
					clicked={handleDelete}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					Padding={new UDim(0, rem(4))}
				/>
				<FullPadding padding={rem(1)} />
			</frame>
			<FullPadding padding={rem(6)} />
			<Rounded />
		</imagebutton>
	);
}
