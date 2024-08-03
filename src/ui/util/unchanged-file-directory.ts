export function isUnchangedFileDirectory(
	fileName: string | undefined,
	fileObject: Instance | undefined,
	fileParent: Instance | undefined,
) {
	if (fileName !== undefined && fileObject !== undefined && fileParent !== undefined) {
		if (fileObject.Parent === fileParent && fileObject.Name === fileName) {
			return true;
		}
	}

	return false;
}
