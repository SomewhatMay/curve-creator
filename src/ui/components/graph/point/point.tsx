import React, { Binding, joinBindings } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../../rounded";
import { useSelector } from "@rbxts/react-reflex";
import { selectSelectedPoint } from "store/editor-slice";
import { SkeletonPoint } from "./skeleton-point";

interface props {
	x: number;
	y: number;
	targetX: Binding<number | undefined>;
	targetHandle: Binding<number | undefined>;
}

export function Point({ x, y, targetX, targetHandle }: props) {
	const rem = useRem();
	const selectedPoint = useSelector(selectSelectedPoint);

	return (
		<SkeletonPoint x={x} y={y}>
			<uistroke
				// Thickness={targetX.map((targetX) => (selectedPoint === x ? rem(2) : targetX === x ? rem(1) : 0))}
				Thickness={joinBindings([targetX, targetHandle]).map(([targetX, targetHandle]) =>
					targetHandle ? 0 : selectedPoint === x ? rem(2) : targetX === x ? rem(1) : 0,
				)}
				Color={Color3.fromRGB(33, 144, 255)}
				Transparency={0}
			/>
		</SkeletonPoint>
	);
}
