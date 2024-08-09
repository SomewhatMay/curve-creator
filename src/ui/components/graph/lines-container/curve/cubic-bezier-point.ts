import { cubicBezier } from "io/curve-calculator";

export function cubicBezierPoint(
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
	const x = cubicBezier(x0, x1, x2, x3, t);

	// Calculate the y coordinate
	const y = cubicBezier(y0, y1, y2, y3, t);

	return [x, y];
}
