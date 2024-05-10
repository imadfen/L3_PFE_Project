import { polygon, bbox, intersect, area, Feature, Polygon } from '@turf/turf';

export default function getGridCells(coords: number[][], gridSize: number = 0.3): Feature<Polygon>[] {
    // Define the country polygon as a GeoJSON feature
    const countryPolygon = polygon([coords]) as Feature<Polygon>;

    // Calculate the bounding box of the given polygon
    const bounds = bbox(countryPolygon);
    const minLon = bounds[0];
    const minLat = bounds[1];
    const maxLon = bounds[2];
    const maxLat = bounds[3];

    const gridCells: Feature<Polygon>[] = [];
    let currentLat = minLat;
    while (currentLat < maxLat) {
        let currentLon = minLon;
        while (currentLon < maxLon) {
            // Create the grid cell polygon
            const cellCoords = [
                [currentLon, currentLat],
                [currentLon + gridSize, currentLat],
                [currentLon + gridSize, currentLat + gridSize],
                [currentLon, currentLat + gridSize],
                [currentLon, currentLat] // Close the polygon
            ];
            const cellPolygon = polygon([cellCoords]) as Feature<Polygon>;
            gridCells.push(cellPolygon);
            currentLon += gridSize;
        }
        currentLat += gridSize;
    }

    // Filter grid cells based on intersection with the country polygon
    const intersectingCells = gridCells.filter(cell => {
        const intersection = intersect(countryPolygon, cell);
        return intersection ? (area(intersection) / area(cell) * 100 >= 50) : false;
    });

    return intersectingCells;
}
