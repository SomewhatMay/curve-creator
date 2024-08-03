export function stringFit(text: string, maxChars: number, trimEnd: boolean = true) {
	if (text.size() > maxChars) {
		return trimEnd ? text.sub(0, maxChars - 3) + "..." : "..." + text.sub(0, maxChars - 3);
	}

	return text;
}
