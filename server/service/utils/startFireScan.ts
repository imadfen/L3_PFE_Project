import { GeoConfig } from "../types/GeoConfig";
import { AppConfig } from "../types/AppConfig";
import fetchAndProcessSatImages from "./fetchAndProcessSatImages";
import getGridCells from "./getGridCells";
import getSatImageTimeRange from "./getSatImageTimeRange";
import getSentinelHubToken from "./getSentinelHubToken";
import fs from "fs";

export default async function startFireScan() {
    const geoConfigJson = fs.readFileSync("./appConfig.json", 'utf8');
    const appConfigJson = fs.readFileSync("./appConfig.json", 'utf8');
    const geoConfig: GeoConfig = await JSON.parse(geoConfigJson);
    const appConfig: AppConfig = await JSON.parse(appConfigJson);

    // client credentials
    const clientId: string = appConfig.sentinelHubClientId;
    const clientSecret: string = appConfig.sentinelHubClientSecret;

    // get token
    let accessToken: string = await getSentinelHubToken(clientId, clientSecret);

    // get images time range
    const timeRange = getSatImageTimeRange();

    // get bounding boxes
    const {
        northAlgeriaCoords, 
        // fullAlgeriaCoords
    } = geoConfig;

    // dividing map into grid cells
    // const gridCells = getGridCells(fullAlgeriaCoords)    // use the full Algeria areas
    const gridCells = getGridCells(northAlgeriaCoords)   // use only the north areas of Algeria for minimization the tests


    // Run the get satellite image function
    const randomSamples = gridCells.slice().sort(() => 0.5 - Math.random()).slice(0, 5);

    const startTime = Date.now();
    console.log(`started fetching ${randomSamples.length} areas...`);

    for (const [i, sample] of randomSamples.entries()) {
        await fetchAndProcessSatImages(sample.geometry, accessToken, timeRange);
        console.log(`${i + 1}/${randomSamples.length}`);
    }

    const process_time = (Date.now() - startTime) / 1000;
    console.log(`done in ${process_time.toFixed(2)}s`);
}