import React from "@rbxts/react";

interface props {
	cornerRadius?: UDim | number;
}

export function Rounded({ cornerRadius }: props) {
	cornerRadius = cornerRadius ?? new UDim(0, 8);

	if (typeIs(cornerRadius, "number")) {
		cornerRadius = new UDim(0, cornerRadius);
	}
	return <uicorner CornerRadius={cornerRadius} />;
}
