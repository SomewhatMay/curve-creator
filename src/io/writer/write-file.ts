import { PointCollection } from "store/editor-slice";
import { serializeCollection } from "./serialize-collection";
import { getVersion } from "ui/util/get-version";

export interface FileData {
	Version: string;
	FillBounds: boolean;
	PointsData: PointCollection;
}

export function writeFile(fileObject: ModuleScript, data: Omit<FileData, "Version">) {
	let fileData = "return {\n";
	fileData += "\tVersion = '" + getVersion() + "',\n";
	fileData += "\tFillBounds = " + data.FillBounds + ",\n";
	fileData += serializeCollection(data.PointsData);
	fileData += "\n}";

	try {
		fileObject.Source = fileData;
	} catch (error) {
		warn("[CurveCreator]: Failed to write file: " + error);
	}
}
