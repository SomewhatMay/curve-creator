import React, { useState } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { Rounded } from "../rounded";
import { FullPadding } from "../full-padding";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";

interface props {
	title: string;
	valueUpdated: (enabled: boolean) => void;
}

export function Toggle({ title, valueUpdated }: props) {
	const rem = useRem();
	const [toggled, setToggled] = useState(false);
	const [animationGoal, setAnimationGoal] = useMotor(0);

	const toggle = () => {
		setToggled(!toggled);
		valueUpdated(!toggled);
		setAnimationGoal(!toggled ? new Spring(1) : new Spring(0));
	};

	return (
		<>
			<textlabel
				Text={title}
				Size={new UDim2(0.45, -rem(3), 1, 0)}
				Position={new UDim2(0, rem(3), 0, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
				TextSize={rem(12)}
				TextColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={1}
				ZIndex={4}
			/>
			<imagebutton
				AnchorPoint={new Vector2(1, 0.5)}
				Position={new UDim2(1, 0, 0.5, 0)}
				Size={new UDim2(0, rem(25), 1, -rem(2))}
				ZIndex={4}
				BackgroundColor3={animationGoal.map((x) =>
					Color3.fromRGB(190, 190, 190).Lerp(Color3.fromRGB(33, 144, 255), x),
				)}
				ClipsDescendants={true}
				AutoButtonColor={false}
				Event={{
					MouseButton1Click: toggle,
				}}
			>
				<frame
					AnchorPoint={animationGoal.map((x) => new Vector2(x, 0.5))}
					Size={new UDim2(0, rem(9), 0, rem(9))}
					Position={animationGoal.map((x) => new UDim2(x, 0, 0.5, 0))}
					BackgroundTransparency={0}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					ZIndex={4}
				>
					<Rounded cornerRadius={new UDim(1, 0)} />
				</frame>
				<FullPadding padding={rem(3)} />
				<Rounded cornerRadius={new UDim(1, 0)} />
			</imagebutton>
		</>
	);
}
