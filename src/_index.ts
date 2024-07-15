import { producer } from "store";
import { selectPluginVisibility } from "store/plugin-slice";
import { mountRoot } from "ui";

const toolbar = plugin.CreateToolbar("Curve Creator");
const toggleButton = toolbar.CreateButton("Open", "Create and edit curves", "");

const dockWidgetGui = plugin.CreateDockWidgetPluginGui(
	"CurveCreator",
	new DockWidgetPluginGuiInfo(Enum.InitialDockState.Left, false, true, 700, 400, 700, 400),
);

mountRoot(dockWidgetGui);

function openPlugin() {
	dockWidgetGui.Enabled = true;
	producer.setVisible(true);
}

function cleanupPlugin() {
	dockWidgetGui.Enabled = false;
	producer.setVisible(false);
}

function togglePlugin() {
	if (!producer.getState(selectPluginVisibility)) {
		openPlugin();
	} else {
		cleanupPlugin();
	}
}

toggleButton.Click.Connect(togglePlugin);

plugin.Deactivation.Connect(cleanupPlugin);
plugin.Unloading.Connect(cleanupPlugin);
dockWidgetGui.BindToClose(cleanupPlugin);