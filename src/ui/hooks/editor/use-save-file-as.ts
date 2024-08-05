/// <reference types="@rbxts/types/plugin" />
/// <reference types="@rbxts/services/plugin" />

import { Selection } from "@rbxts/services";
import { useBinding } from "@rbxts/react";
import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { ReplicatedStorage } from "@rbxts/services";
import { writeFile } from "io";
import { useRootProducer } from "store";
import { selectOrderedPoints } from "store/editor-slice";
import { selectFileName, selectFileObject, selectFileParent } from "store/io-slice";
import { selectFillBounds } from "store/settings-slice";

/**
 * Do not use this function unless you explicitly
 * want to 'save file as'. Use the useSaveFile function
 * as it automatically calls this function when necessary.
 */
export function useSaveFileAs() {
	const { setChanged, setFileName, setFileObject, setFileParent, setSidebarVisible, setInputNotification } =
		useRootProducer();

	const points = useSelectorCreator(selectOrderedPoints);
	const fillBounds = useSelector(selectFillBounds);

	const fileName = useSelector(selectFileName);
	const fileObject = useSelector(selectFileObject);
	const fileParent = useSelector(selectFileParent);

	const [currentFileName, setCurrentFileName] = useBinding("");

	return () => {
		setSidebarVisible(false);
		setCurrentFileName(fileName ?? "");

		setInputNotification({
			title: "Save File As",
			label: "Enter new file name",
			value: fileName ?? "",
			valueChanged: setCurrentFileName,
			saveDirectory: game,
			options: [
				{
					message: "Cancel",
					handler: () => setInputNotification(undefined),
				},
				{
					message: "Save",
					handler: () => {
						if (currentFileName.getValue() === "") {
							return;
						}

						const newFileParent = Selection.Get()[0] ?? ReplicatedStorage;

						setInputNotification(undefined);

						const newFileObject = new Instance("ModuleScript");
						newFileObject.Name = currentFileName.getValue() ?? "Untitled";
						newFileObject.Parent = newFileParent;

						writeFile(newFileObject, { FillBounds: fillBounds, PointsData: points });
						setFileName(currentFileName.getValue() ?? "Untitled");
						setFileObject(newFileObject);
						setFileParent(newFileParent);
						setChanged(false);
					},
				},
			],
		});
	};
}
