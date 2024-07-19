import React, { MutableRefObject, useEffect, useRef, useState } from "@rbxts/react";
import { Rounded } from "ui/components/rounded";
import { useRem } from "ui/hooks/use-rem";
import { Line } from "../lines-container";
import { useInputBegan } from "ui/hooks/use-input-began";
import { useRootProducer } from "store";
import { useSelector } from "@rbxts/react-reflex";
import { selectMovingHandle } from "store/editor-slice";
import { useInputEnded } from "ui/hooks/use-input-ended";
import { useMouseMove } from "ui/hooks/use-mouse-move";
import { calculateRelativePosition } from "ui/util/calculate-relative-position";

interface props {
	handleX: number;
	handleY: number;
	pointX: number;
	pointY: number;
	handleIndex: number;
	graphicsContainer: MutableRefObject<Frame | undefined>;
}

const handleColor = new Color3(0.49, 0.14, 0.14);

export function Handle({ handleX, handleY, pointX, pointY, handleIndex, graphicsContainer }: props) {
	const handleRef = useRef<Frame>();
	const rem = useRem();
	const movingHandle = useSelector(selectMovingHandle);
	const { setMovingHandle, setHandle } = useRootProducer();
	const [beingMoved, setBeingMoved] = useState(false);

	const mousePosition = useMouseMove();

	useInputBegan((input) => {
		if (movingHandle) return;
		if (!graphicsContainer.current) return;

		if (input.UserInputType === Enum.UserInputType.MouseButton1) {
			setBeingMoved(true);
			setMovingHandle(true);
			print("Moving handle");
		}
	}, handleRef);

	useInputEnded((input) => {
		if (!beingMoved) return;
		if (!graphicsContainer.current) {
			setBeingMoved(false);
			setMovingHandle(false);
			print("Ended moving handle - no graphics container");
			return;
		}

		if (input.UserInputType === Enum.UserInputType.MouseButton1) {
			setBeingMoved(false);
			setMovingHandle(false);
			print("Ended moving handle");

			const relativePos = calculateRelativePosition(mousePosition.getValue(), graphicsContainer.current);
			setHandle(pointX, handleIndex as 1 | 2, [relativePos.X, relativePos.Y]);
		}
	});

	useInputBegan((input) => {
		if (!beingMoved) return;

		if (input.KeyCode === Enum.KeyCode.Escape) {
			setBeingMoved(false);
			setMovingHandle(false);
			print("Ended moving handle - escape");
		}
	});

	return (
		<>
			<frame
				ref={handleRef}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={new UDim2(0, handleX, 0, handleY)}
				Size={new UDim2(0, rem(4), 0, rem(4))}
				BackgroundColor3={handleColor}
				ZIndex={2}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</frame>
			<Line x1={handleX} x2={pointX} y1={handleY} y2={pointY} color={handleColor} />
		</>
	);
}
