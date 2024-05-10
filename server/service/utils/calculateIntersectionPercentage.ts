import { intersect, area, Polygon, Feature } from '@turf/turf';

export default function calculateIntersectionPercentage(bigPoly: Feature<Polygon>, smallPoly: Feature<Polygon>): number {
  const intersection = intersect(bigPoly, smallPoly);
  if (intersection !== null) {
    const intersectionArea = area(intersection);
    const smallPolyArea = area(smallPoly);
    const percentage = (intersectionArea / smallPolyArea) * 100;
    return percentage;
  }
  return 0;
}
