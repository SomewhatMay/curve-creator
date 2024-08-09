import { quadraticBezier } from "io/curve-calculator";

export function quadraticBezierPoint(
	x1: number,
	y1: number, // First control point
	x2: number,
	y2: number, // Second control point
	x3: number,
	y3: number, // Third control point
	t: number, // Parameter t (0 <= t <= 1)
): [number, number] {
	// Calculate the x coordinate
	const x = quadraticBezier(x1, x2, x3, t);

	// Calculate the y coordinate
	const y = quadraticBezier(y1, y2, y3, t);

	return [x, y];
}
