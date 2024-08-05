import { PointCollection } from "store/editor-slice";
import { serializeCollection } from "./serialize-collection";
import config from "config";

export interface FileData {
	Version: number;
	FillBounds: boolean;
	PointsData: PointCollection;
}

export function writeFile(fileObject: ModuleScript, data: Omit<FileData, "Version">) {
	let fileData = "return {\n";
	fileData += "\tVersion = " + config.version.major + ",\n";
	fileData += "\tFillBounds = " + data.FillBounds + ",\n";
	fileData += serializeCollection(data.PointsData);
	fileData += "\n}";

	try {
		fileObject.Source = fileData;
	} catch (error) {
		warn("[CurveCreator]: Failed to write file: " + error);
	}
}
