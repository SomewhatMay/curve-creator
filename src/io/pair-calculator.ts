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
					// return quarticBezier(pointA.y, handleA[1], handleB[1], pointB.y, t);
				} else if (handleA || handleB) {
					print("quadratic");
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

export function lerp(a: number, b: number, t: number) {
	return a + t * (b - a);
}

export function quadraticBezier(x0: number, x1: number, x2: number, t: number) {
	return (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
}

export function cubicBezier(x0: number, x1: number, x2: number, x3: number, t: number) {
	return (1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3;
}
