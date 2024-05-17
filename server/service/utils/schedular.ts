import cron from "node-cron";
import startFireScan from "./startFireScan";
import { AppConfig } from "../types/AppConfig";
import fs from "fs";

async function startScheduler() {
    const appConfigJson = fs.readFileSync("./appConfig.json", 'utf8');
    const appConfig: AppConfig = await JSON.parse(appConfigJson);

    const scanDurationHours = appConfig.scanDurationHours;

    cron.schedule(`0 */${scanDurationHours} * * *`, () => {
        console.log("Starting fire scan now...");
        startFireScan();
    });
}

startScheduler();