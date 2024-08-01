import { PointCollection } from "store/editor-slice";

export function calculateY(points: PointCollection, x: number): number {
	if (points.size() === 0) return 0;

	x = math.clamp(x, 0, 1);
	let previousPoint: PointCollection[number] | undefined;

	for (const point of points) {
		if (point.x === x) {
			return point.y;
		} else if (point.x > x) {
			if (previousPoint) {
				const pointA = previousPoint;
				const pointB = point;
				const handleA = pointA.handle2;
				const handleB = pointB.handle1;
				const tLinear = (x - pointA.x) / (pointB.x - pointA.x);
				let ans: number | undefined;

				if (handleA && handleB) {
					const coefficients = getCubicCoefficients(pointA.x, handleA[0], handleB[0], pointB.x, x);
					const roots = solveCubic(coefficients);
					const validT = roots.find((t) => t >= 0 && t <= 1);

					if (validT !== undefined) {
						ans = cubicBezier(pointA.y, handleA[1], handleB[1], pointB.y, validT);
					}
				} else if (handleA || handleB) {
					const handle = (handleA || handleB)!;
					const discriminant =
						(2 * handle[0] - 2 * pointA.x) ** 2 -
						4 * (pointA.x - 2 * handle[0] + pointB.x) * (pointA.x - x);
					const denominator = 2 * (pointA.x - 2 * handle[0] + pointB.x);
					if (discriminant >= 0 && denominator !== 0) {
						const t = (-(2 * handle[0] - 2 * pointA.x) + math.sqrt(discriminant)) / denominator;
						ans = quadraticBezier(pointA.y, handle[1], pointB.y, t);
					}
				}

				// If no answer was found, we know it is either a linear
				// segment or the handles create a linear segment
				return ans ?? lerp(pointA.y, pointB.y, tLinear);
			} else {
				return point.y;
			}
		}

		previousPoint = point;
	}

	return 0;
}

function getCubicCoefficients(x0: number, x1: number, x2: number, x3: number, x: number) {
	// Coefficients of the cubic equation ax^3 + bx^2 + cx + d = 0
	const a = -x0 + 3 * x1 - 3 * x2 + x3;
	const b = 3 * x0 - 6 * x1 + 3 * x2;
	const c = -3 * x0 + 3 * x1;
	const d = x0 - x;

	return { a, b, c, d };
}

function solveCubic({ a, b, c, d }: { a: number; b: number; c: number; d: number }): number[] {
	// Using Cardano's formula to solve the cubic equation
	const f = ((3 * c) / a - b ** 2 / a ** 2) / 3;
	const g = ((2 * b ** 3) / a ** 3 - (9 * b * c) / a ** 2 + (27 * d) / a) / 27;
	const h = g ** 2 / 4 + f ** 3 / 27;

	if (h > 0) {
		// One real root
		const r = -(g / 2) + math.sqrt(h);
		const s = cbrt(r);
		const t = -(g / 2) - math.sqrt(h);
		const u = cbrt(t);

		const root = s + u - b / (3 * a);
		return [root];
	} else if (f === 0 && g === 0 && h === 0) {
		// All roots are real and equal
		const root = cbrt(d / a);
		return [root, root, root];
	} else {
		// All roots are real
		const i = math.sqrt(g ** 2 / 4 - h);
		const j = cbrt(i);
		const k = math.acos(-(g / (2 * i)));
		const l = -j;
		const m = math.cos(k / 3);
		const n = math.sqrt(3) * math.sin(k / 3);
		const p = -(b / (3 * a));

		const root1 = 2 * j * math.cos(k / 3) - b / (3 * a);
		const root2 = l * (m + n) + p;
		const root3 = l * (m - n) + p;

		return [root1, root2, root3];
	}
}

export function lerp(a: number, b: number, t: number) {
	return a + t * (b - a);
}

export function quadraticBezier(x0: number, x1: number, x2: number, t: number) {
	return (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
}

export function cubicBezier(x0: number, x1: number, x2: number, x3: number, t: number) {
	return (1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3;
}

function cbrt(x: number) {
	if (x < 0) {
		return -math.pow(-x, 1 / 3);
	} else {
		return math.pow(x, 1 / 3);
	}
}
