import { Polygon } from '@turf/turf';

export default function getCellTwoCornersCoords(cell: Polygon): number[] {
  const cellPointsCoords = cell.coordinates[0];

  const point1 = cellPointsCoords[0];
  const point2 = cellPointsCoords[2];

  // the bottom-left and top-right corner of a cell
  const cellTwoCornersCoords = [point1[1], point1[0], point2[1], point2[0]];

  return cellTwoCornersCoords;
}
