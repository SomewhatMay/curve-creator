export function cubicBezierPoint(
	x1: number,
	y1: number, // First control point
	x2: number,
	y2: number, // Second control point
	x3: number,
	y3: number, // Third control point
	t: number, // Parameter t (0 <= t <= 1)
): [number, number] {
	// Calculate the x coordinate
	const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * x2 + t * t * x3;

	// Calculate the y coordinate
	const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * y2 + t * t * y3;

	return [x, y];
}
