import { useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import { selectChanged, selectFileName, selectFileObject, selectFileParent } from "store/io-slice";
import { useSaveFile } from "./use-save-file";
import { useSaveFileAs } from "./use-save-file-as";
import { isUnchangedFileDirectory } from "ui/util/unchanged-file-directory";
import { Selection } from "@rbxts/services";
import { readFile } from "io";

export function useLoadFile() {
	const saveFile = useSaveFile();
	const saveFileAs = useSaveFileAs();

	const {
		setPointsCollection,
		setFillBounds,
		setFileName,
		setChanged,
		setFileObject,
		setFileParent,
		setFileOpened,
		setSidebarVisible,
		setNotification,
	} = useRootProducer();

	const fileChanged = useSelector(selectChanged);
	const fileName = useSelector(selectFileName);
	const fileObject = useSelector(selectFileObject);
	const fileParent = useSelector(selectFileParent);

	return () => {
		setSidebarVisible(false);

		const tryLoadFile = () => {
			const selection = Selection.Get()[0];

			if (!selection || !selection.IsA("ModuleScript")) {
				setNotification({
					message: selection
						? "Please select a valid ModuleScript containing curve data."
						: "No file selected. Select a file in the FileExplorer.",
					options: [
						{
							message: "Ok",
							handler: () => setNotification(undefined),
						},
					],
				});
				return;
			}

			const result = readFile(selection);

			if (!result.success) {
				setNotification({
					message: `An error occurred loading the file: ${result.error}`,
					options: [
						{
							message: "Ok",
							handler: () => setNotification(undefined),
						},
					],
				});
				return;
			}

			// Everything ready to load file
			const data = result.data;

			setPointsCollection(data.PointsData);
			setFillBounds(data.FillBounds);

			setFileName(selection.Name);
			setFileObject(selection);
			setFileParent(selection.Parent);
			setFileOpened(true);

			setChanged(false);

			Selection.Set([selection.Parent!]);
		};

		if (fileChanged) {
			const targetSaveFunction = isUnchangedFileDirectory(fileName, fileObject, fileParent)
				? saveFile
				: saveFileAs;

			setNotification({
				message: "You have unsaved changes. Do you want to save them?",
				options: [
					{
						message: "Discard",
						handler: () => {
							setNotification(undefined);
							tryLoadFile();
						},
						BackgroundColor3: Color3.fromRGB(212, 99, 99),
					},
					{
						message: "Cancel",
						handler: () => setNotification(undefined),
					},
					{
						message: targetSaveFunction === saveFile ? "Save" : "Save As",
						handler: () => {
							setNotification(undefined);
							targetSaveFunction();
						},
						BackgroundColor3: Color3.fromRGB(64, 153, 64),
					},
				],
			});
		} else {
			tryLoadFile();
		}
	};
}
