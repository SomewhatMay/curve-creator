import { Root } from "@rbxts/react-roblox";
import { RunService } from "@rbxts/services";
import { producer } from "store";
import { mountRoot } from "ui";

if (RunService.IsEdit()) {
	const toolbar = plugin.CreateToolbar("Curve Creator");
	const toggleButton = toolbar.CreateButton("Open", "Create and edit curves", "");
	const stopButton = toolbar.CreateButton("Stop", "Stop the plugin", "");

	const dockWidgetGui = plugin.CreateDockWidgetPluginGui(
		"CurveCreator",
		new DockWidgetPluginGuiInfo(Enum.InitialDockState.Left, false, true, 700, 400, 700, 400),
	);

	dockWidgetGui.Title = "Curve Creator";
	dockWidgetGui.Name = "CurveCreator";
	dockWidgetGui.ZIndexBehavior = Enum.ZIndexBehavior.Global;

	let isOpen = false;

	let pluginRoot: Root | undefined;

	const toggleConnection = toggleButton.Click.Connect(() => {
		dockWidgetGui.Enabled = !dockWidgetGui.Enabled;
	});

	const stopConnection = stopButton.Click.Connect(() => {
		stopButton.SetActive(false);
		dockWidgetGui.Enabled = false;

		if (pluginRoot) {
			pluginRoot.unmount();
			pluginRoot = undefined;
			producer.resetState();
		}
	});

	dockWidgetGui.BindToClose(() => {
		dockWidgetGui.Enabled = false;
	});

	const dockEnabledConnection = dockWidgetGui.GetPropertyChangedSignal("Enabled").Connect(() => {
		toggleButton.SetActive(dockWidgetGui.Enabled);
		isOpen = dockWidgetGui.Enabled;

		if (dockWidgetGui.Enabled && !pluginRoot) {
			pluginRoot = mountRoot(dockWidgetGui);
		}
	});

	plugin.Unloading.Connect(() => {
		if (pluginRoot) {
			pluginRoot.unmount();
			pluginRoot = undefined;
		}

		producer.resetState();

		toggleConnection.Disconnect();
		stopConnection.Disconnect();
		dockEnabledConnection.Disconnect();
	});
}
