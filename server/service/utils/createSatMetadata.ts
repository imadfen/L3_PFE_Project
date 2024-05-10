import { Polygon } from '@turf/turf';
import { SatMetaData } from "../types/SatMetaData"
import path from "path"

export default function createMetadata(file_name: string, area: Polygon): SatMetaData {
  const areaCoords = area.coordinates[0];

  const metadata: SatMetaData = {
    file_name: file_name,
    image_location: path.join("images", file_name),
    fetch_date: new Date().toISOString().replace('T', ' ').split('.')[0],
    area_coords: {
      top_left: {
        latitude: areaCoords[1][0],
        longitude: areaCoords[1][1]
      },
      top_right: {
        latitude: areaCoords[2][0],
        longitude: areaCoords[2][1]
      },
      bottom_right: {
        latitude: areaCoords[3][0],
        longitude: areaCoords[3][1]
      },
      bottom_left: {
        latitude: areaCoords[0][0],
        longitude: areaCoords[0][1]
      },
    }
  };

  return metadata;
}
