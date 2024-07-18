import React, { Binding } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../../rounded";
import { useSelector } from "@rbxts/react-reflex";
import { selectSelectedPoint } from "store/editor-slice";
import { SkeletonPoint } from "./skeleton-point";
import { TargetInfo } from "../hooks/use-target-capturer";

interface props {
	x: number;
	y: number;
	targetInfo: Binding<TargetInfo>;
}

export function Point({ x, y, targetInfo }: props) {
	const rem = useRem();
	const selectedPoint = useSelector(selectSelectedPoint);

	return (
		<SkeletonPoint x={x} y={y}>
			<uistroke
				Thickness={targetInfo.map((info) =>
					selectedPoint === x ? rem(2) : info.x === x && info.handle === undefined ? rem(1) : 0,
				)}
				Color={Color3.fromRGB(33, 144, 255)}
				Transparency={0}
			/>
		</SkeletonPoint>
	);
}
