import { PointCollection } from "store/editor-slice";
import { serializeCollection } from "./serialize-collection";

export interface FileData {
	FillBounds: boolean;
	PointsData: PointCollection;
}

export function writeFile(fileObject: ModuleScript, data: FileData) {
	let fileData = "return {\n";
	fileData += "\tFillBounds = " + data.FillBounds + ",\n";
	fileData += serializeCollection(data.PointsData);
	fileData += "\n}";

	try {
		fileObject.Source = fileData;
	} catch (error) {
		warn("[CurveCreator]: Failed to write file: " + error);
	}
}
