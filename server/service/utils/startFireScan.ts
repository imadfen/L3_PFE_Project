import { Config } from "../types/Config";
import fetchAndProcessSatImages from "./fetchAndProcessSatImages";
import getGridCells from "./getGridCells";
import getSatImageTimeRange from "./getSatImageTimeRange";
import getSentinelHubToken from "./getSentinelHubToken";
import fs from "fs";

export default async function startFireScan() {
    const configJson = fs.readFileSync("./service/config.json", 'utf8');
    const config: Config = await JSON.parse(configJson);

    // client credentials
    const clientId: string = config.sentinelHubClientId;
    const clientSecret: string = config.sentinelHubClientSecret;

    // get token
    let accessToken: string = await getSentinelHubToken(clientId, clientSecret);

    // get images time range
    const timeRange = getSatImageTimeRange();

    // get bounding boxes
    const { northAlgeriaCoords, fullAlgeriaCoords } = config;

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