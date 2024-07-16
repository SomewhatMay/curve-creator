let sizeListener: RBXScriptConnection | undefined = undefined;

export function clearSizeListener() {
	if (sizeListener) {
		sizeListener.Disconnect();
		sizeListener = undefined;
	}
}

/**
 * Create a listener that fires whenever the size of the root changes.
 * Only one listener can exist at a time.
 */
export function createSizeListener(root: DockWidgetPluginGui | Frame, callback: (size: Vector2) => void) {
	clearSizeListener();

	callback(root.AbsoluteSize);
	sizeListener = root.GetPropertyChangedSignal("AbsoluteSize").Connect(() => {
		callback(root.AbsoluteSize);
	});

	return clearSizeListener;
}
