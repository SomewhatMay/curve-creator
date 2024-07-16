import React, { useEffect } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";

export function Sidebar() {
	const rem = useRem();

	useEffect(() => {
		print("Mounted sidebar");
	});

	return (
		<frame Size={new UDim2(0, rem(50), 1, 0)} BackgroundTransparency={0.5}></frame>
	);
}