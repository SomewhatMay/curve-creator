import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { writeFile } from "io";
import { useRootProducer } from "store";
import { selectOrderedPoints } from "store/editor-slice";
import { selectFileName, selectFileObject, selectFileParent } from "store/io-slice";
import { selectFillBounds } from "store/settings-slice";
import { isUnchangedFileDirectory } from "ui/util/unchanged-file-directory";
import { useSaveFileAs } from "./use-save-file-as";
import { Selection } from "@rbxts/services";

export function useSaveFile() {
	const saveFileAs = useSaveFileAs();

	const { setChanged, setSidebarVisible, setFileOpened, setNotification } = useRootProducer();

	const points = useSelectorCreator(selectOrderedPoints);
	const fillBounds = useSelector(selectFillBounds);

	const fileName = useSelector(selectFileName);
	const fileObject = useSelector(selectFileObject);
	const fileParent = useSelector(selectFileParent);

	return () => {
		setSidebarVisible(false);

		if (isUnchangedFileDirectory(fileName, fileObject, fileParent)) {
			// Directory is unchanged and can be saved to the same file object
			setNotification({
				message: "Are you sure you want to overwrite the existing file?",
				options: [
					{
						message: "Cancel",
						handler: () => setNotification(undefined),
					},
					{
						message: "Overwrite",
						handler: () => {
							setNotification(undefined);
							writeFile(fileObject as ModuleScript, { FillBounds: fillBounds, PointsData: points });
							setChanged(false);
							Selection.Set([fileParent!]);
							setFileOpened(true);
						},
					},
				],
			});
		} else {
			// Directory has changed and needs to be 'saved as' again
			saveFileAs();
		}
	};
}
