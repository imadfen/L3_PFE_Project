import cron from "node-cron";
import startFireScan from "./startFireScan";

cron.schedule("0 0,6,12,18 * * *", () => {
    console.log("Starting fire scan now...");
    startFireScan();
});
