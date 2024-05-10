import { DateTime } from "luxon";
import getCellTwoCornersCoords from "./getCellTwoCornersCoords";
import getSatImagery from "./getSatImagery";
import { Polygon } from "@turf/turf";
import { TimeRange } from "../types/TimeRange";
import createMetadata from "./createSatMetadata";
import processImage from "./processImage";

export default async function fetchAndProcessSatImages(cell: Polygon, accessToken: string, timeRange: TimeRange) {
    const sample_bbox = getCellTwoCornersCoords(cell);

    const currentDateTimeString = DateTime.local().setZone("Africa/Algiers").toFormat('yyyyMMddHHmmss');
    const response = await getSatImagery(accessToken, sample_bbox, timeRange, { fileName: currentDateTimeString });

    if (response) {
        const fileBlob = await response.blob();
        const fileArrayBuffer = await fileBlob.arrayBuffer();
        const fileBuffer = Buffer.from(fileArrayBuffer)
        
        const image = {
            file_name: `${currentDateTimeString}.png`,
            content: fileBuffer,
        };

        const imageMetadata = createMetadata(`${currentDateTimeString}.png`, cell)

        processImage(image, imageMetadata)
    }
}