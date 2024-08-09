export function removeMarkup(text: string) {
	return text.gsub("<[^>]+>", "")[0];
}
