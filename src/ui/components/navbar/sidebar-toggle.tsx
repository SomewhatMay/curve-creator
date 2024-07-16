import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useRem } from "ui/hooks/use-rem";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import { selectSidebarVisibility } from "store/plugin-slice";

export function SidebarToggle() {
	const [hover, setHover] = useMotor(0);
	const [open, setOpen] = useMotor(0);
	const rem = useRem();

	const sidebarVisible = useSelector(selectSidebarVisibility);
	const { setSidebarVisible } = useRootProducer();
	const { setSettingsVisible } = useRootProducer();

	useEffect(() => {
		if (sidebarVisible) {
			setOpen(new Spring(1));
			setSettingsVisible(false);
		} else {
			setOpen(new Spring(0));
		}
	}, [sidebarVisible]);

	const handleClick = () => setSidebarVisible(!sidebarVisible);

	return (
		<frame
			AnchorPoint={new Vector2(0, 0.5)}
			Position={new UDim2(0, rem(4), 0.5, 0)}
			Size={new UDim2(0, rem(10), 1, -rem(4))}
			BackgroundTransparency={hover.map((x) => 1 - x * 0.3)}
			BackgroundColor3={new Color3(0, 0, 0)}
			ClipsDescendants={true}
			Event={{
				MouseEnter: () => setHover(new Spring(1)),
				MouseLeave: () => setHover(new Spring(0)),
			}}
			ZIndex={11}
		>
			<imagebutton
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={open.map((x) => new UDim2(0.5, 0, 0.5 + x, 0))}
				Image={"http://www.roblox.com/asset/?id=18161819135"}
				ScaleType={Enum.ScaleType.Fit}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				ImageTransparency={open.map((x) => x)}
				Event={{ MouseButton1Click: handleClick }}
				ZIndex={12}
			/>
			<imagebutton
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={open.map((x) => new UDim2(0.5, 0, 0.5 + (1 - x), 0))}
				Image={"http://www.roblox.com/asset/?id=9545003266"}
				ScaleType={Enum.ScaleType.Fit}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				ImageTransparency={open.map((x) => 1 - x)}
				Event={{ MouseButton1Click: handleClick }}
				ZIndex={13}
			/>
			<uipadding
				PaddingBottom={new UDim(0, rem(1))}
				PaddingTop={new UDim(0, rem(1))}
				PaddingLeft={new UDim(0, rem(1))}
				PaddingRight={new UDim(0, rem(1))}
			/>
			<uicorner CornerRadius={new UDim(0, rem(2))} />
		</frame>
	);
}
