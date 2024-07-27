export function quarticBezierPoint(
	x0: number,
	y0: number, // First control point
	x1: number,
	y1: number, // Second control point
	x2: number,
	y2: number, // Third control point
	x3: number,
	y3: number, // Fourth control point
	t: number, // Parameter t (0 <= t <= 1)
): [number, number] {
	// Calculate the x coordinate
	const x = (1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3;

	// Calculate the y coordinate
	const y = (1 - t) ** 3 * y0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3;

	return [x, y];
}
