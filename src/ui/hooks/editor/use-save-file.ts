import { useSelector } from "@rbxts/react-reflex";
import { useRootProducer } from "store";
import { selectFileName, selectFileObject, selectFileParent } from "store/io-slice";
import { isUnchangedFileDirectory } from "ui/util/unchanged-file-directory";

export function useSaveFile() {
	const saveFileAs = () => {
		print("save file as");
	};

	const { setChanged } = useRootProducer();
	const fileName = useSelector(selectFileName);
	const fileObject = useSelector(selectFileObject);
	const fileParent = useSelector(selectFileParent);

	return () => {
		if (!isUnchangedFileDirectory(fileName, fileObject, fileParent)) {
			saveFileAs();
			return;
		}

		setChanged(false);
	};
}
