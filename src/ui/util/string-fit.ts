import { RunService, TextService } from "@rbxts/services";

export function stringFit(
	text: string,
	maxWidth: number,
	fontSize: number = 12,
	textFont: Enum.Font = Enum.Font.GothamMedium,
	ellipses: boolean = true,
	trimEnd: boolean = true,
) {
	const getWidth = (text: string) =>
		TextService.GetTextSize(text, fontSize, textFont, new Vector2(math.huge, math.huge)).X;

	if (getWidth(text) <= maxWidth) {
		return text;
	}

	if (ellipses) {
		let newMaxWidth = maxWidth - getWidth("...");

		if (newMaxWidth >= 0) {
			maxWidth = newMaxWidth;
		} else {
			// The max width is so small there is no space for the ellipses!
			ellipses = false;
		}
	}

	if (!trimEnd) {
		text = text.reverse();
	}

	let result = "";
	let lowerBound = 0,
		upperBound = text.size();

	while (true) {
		if (upperBound - lowerBound <= 1) {
			result = text.sub(0, lowerBound);
			break;
		} else {
			const middle = math.floor((lowerBound + upperBound) / 2);
			const currentWidth = getWidth(text.sub(0, middle));

			if (currentWidth === maxWidth) {
				result = text.sub(0, middle);
				break;
			} else if (currentWidth > maxWidth) {
				upperBound = middle;
			} else {
				lowerBound = middle;
			}
		}
	}

	if (!trimEnd) {
		result = result.reverse();
	}

	if (ellipses && result.size() < text.size()) {
		if (trimEnd) {
			result += "...";
		} else {
			result = "..." + result;
		}
	}

	return result;
}
