import { useBinding } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Selection } from "@rbxts/services";
import { useRootProducer } from "store";
import { selectFileName, selectFileObject, selectFileParent } from "store/io-slice";
import { isUnchangedFileDirectory } from "ui/util/unchanged-file-directory";
import { useSaveFileAs } from "./use-save-file-as";

export function useRenameFile() {
	const saveFileAs = useSaveFileAs();

	const { setFileName, setSidebarVisible, setInputNotification, setNotification } = useRootProducer();

	const fileObject = useSelector(selectFileObject);
	const fileName = useSelector(selectFileName);
	const fileParent = useSelector(selectFileParent);

	const [currentFileName, setCurrentFileName] = useBinding(fileName ?? "");

	return () => {
		setSidebarVisible(false);
		if (isUnchangedFileDirectory(fileName, fileObject, fileParent)) {
			setInputNotification({
				title: "Rename File",
				label: "Enter new file name",
				value: fileName ?? "",
				valueChanged: setCurrentFileName,
				saveDirectory: fileParent,
				options: [
					{
						message: "Cancel",
						handler: () => setInputNotification(undefined),
					},
					{
						message: "Rename",
						handler: () => {
							const newName = currentFileName.getValue();
							setInputNotification(undefined);
							setFileName(newName);
							fileObject!.Name = newName;
							Selection.Set([fileParent!]);
						},
					},
				],
			});
		} else {
			setNotification({
				message: "A file cannot be renamed until it has been saved. Please save it as a new file.",
				options: [
					{ message: "Cancel", handler: () => setNotification(undefined) },
					{
						message: "Save as",
						handler: () => {
							setNotification(undefined);
							saveFileAs();
						},
					},
				],
			});
		}
	};
}
