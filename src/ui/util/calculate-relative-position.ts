export function calculateRelativePosition<T extends GuiBase2d>(pos: Vector2, gui: T, clamp?: boolean) {
	let ans = pos.sub(gui.AbsolutePosition).div(gui.AbsoluteSize);
	if (clamp) {
		ans = new Vector2(math.clamp(ans.X, 0, 1), math.clamp(ans.Y, 0, 1));
	}
	return ans;
}
