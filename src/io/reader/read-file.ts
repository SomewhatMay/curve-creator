import { FileData } from "io/writer";
import { cleanRequire } from "./custom-require";
import { validateData } from "./validate-data";

interface Result {
	success: boolean;
	error?: string;
	data?: FileData;
}

export function readFile(module: ModuleScript): Result {
	try {
		const data = cleanRequire(module);

		if (validateData(data)) {
			return {
				success: true,
				data,
			};
		} else {
			throw "Data is unreadable and could be corrupted.";
		}
	} catch (error) {
		return {
			success: false,
			error: tostring(error),
		};
	}
}
