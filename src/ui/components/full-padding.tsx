import React from "@rbxts/react";

interface props extends React.InstanceProps<UIPadding> {
	padding?: UDim | number;
	paddingX?: UDim | number;
	paddingY?: UDim | number;
}

export function FullPadding(props: props) {
	let { padding = new UDim(0, 0), paddingX, paddingY } = props;
	delete props.padding;
	delete props.paddingX;
	delete props.paddingY;

	if (typeIs(padding, "number")) {
		padding = new UDim(0, padding);
	}

	paddingX = paddingX ?? padding;
	paddingY = paddingY ?? padding;

	if (typeIs(paddingX, "number")) {
		paddingX = new UDim(0, paddingX);
	}

	if (typeIs(paddingY, "number")) {
		paddingY = new UDim(0, paddingY);
	}

	return (
		<uipadding
			PaddingBottom={paddingY}
			PaddingTop={paddingY}
			PaddingLeft={paddingX}
			PaddingRight={paddingX}
			{...props}
		/>
	);
}
