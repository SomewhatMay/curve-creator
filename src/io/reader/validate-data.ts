import { t } from "@rbxts/t";
import { FileData } from "io/writer";
import { $terrify } from "rbxts-transformer-t-new";

const fileDataCheck = $terrify<FileData>();

export function validateData(data: unknown) {
	return fileDataCheck(data);
}
