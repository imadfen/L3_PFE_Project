import fs from "fs";
import path from "path";

export default async function getLastScanDate() {
    const configJsonPath = path.join("service", "config.json");
    
    const configJson = fs.readFileSync(configJsonPath, "utf-8");
    const configData = await JSON.parse(configJson);

    return configData.lastScanDate as string;
}