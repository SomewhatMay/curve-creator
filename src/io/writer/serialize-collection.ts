/**
 * Serializes the PointCollection Type into a multiline
 * lua-interpretable string that can be written to a module script.
 */

import { PointCollection } from "store/editor-slice";

function serializeHandle(handle: [number, number]) {
	return "{" + handle[0] + ", " + handle[1] + "}";
}

export function serializeCollection(collection: PointCollection) {
	let result = "\tPointsData = {";
	for (const [index, point] of pairs(collection)) {
		result += "\n\t\t[" + index + "] = {";
		result += "\n\t\t\ty = " + point.y + ",";
		result += point.handle1 ? "\n\t\t\thandle1 = " + serializeHandle(point.handle1) + "," : "";
		result += point.handle2 ? "\n\t\t\thandle2 = " + serializeHandle(point.handle2) + "," : "";
		result += "\n\t\t},";
	}

	result += "\n\t}";

	return result;
}
