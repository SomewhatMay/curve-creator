import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { writeFile } from "io";
import { useRootProducer } from "store";
import { selectOrderedPoints } from "store/editor-slice";
import { selectFileName, selectFileObject, selectFileParent } from "store/io-slice";
import { selectFillBounds } from "store/settings-slice";
import { isUnchangedFileDirectory } from "ui/util/unchanged-file-directory";

export function useSaveFile() {
	const saveFileAs = () => {
		print("save file as");
	};

	const { setChanged, setSidebarVisible } = useRootProducer();

	const points = useSelectorCreator(selectOrderedPoints);
	const fillBounds = useSelector(selectFillBounds);

	const fileName = useSelector(selectFileName);
	const fileObject = useSelector(selectFileObject);
	const fileParent = useSelector(selectFileParent);

	return () => {
		if (isUnchangedFileDirectory(fileName, fileObject, fileParent)) {
			// Directory is unchanged and can be saved to the same file object
			writeFile(fileObject as ModuleScript, { FillBounds: fillBounds, PointsData: points });
			setChanged(false);
			setSidebarVisible(false);
		} else {
			// Directory has changed and needs to be 'saved as' again
			saveFileAs();
		}
	};
}
