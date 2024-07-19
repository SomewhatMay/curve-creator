export function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
	return math.sqrt(math.pow(x1 - x2, 2) + math.pow(y1 - y2, 2));
}
