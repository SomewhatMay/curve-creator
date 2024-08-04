import { useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import { selectChanged, selectFileName, selectFileObject, selectFileParent } from "store/io-slice";
import { isUnchangedFileDirectory } from "ui/util/unchanged-file-directory";
import { useSaveFile } from "./use-save-file";
import { useSaveFileAs } from "./use-save-file-as";

export function useNewFile() {
	const saveFile = useSaveFile();
	const saveFileAs = useSaveFileAs();

	const { clearPoints, setSidebarVisible, setChanged, setFileName, setFileOpened, setNotification } =
		useRootProducer();

	const fileChanged = useSelector(selectChanged);
	const fileName = useSelector(selectFileName);
	const fileObject = useSelector(selectFileObject);
	const fileParent = useSelector(selectFileParent);

	return () => {
		setSidebarVisible(false);

		const newFile = () => {
			clearPoints();
			setChanged(false);
			setFileName("");
			setFileOpened(false);
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
							newFile();
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
			newFile();
		}
	};
}
