import fs from "fs";
import path from "path";
import { AppConfig } from "../types/AppConfig";
import { getIO } from "../socketManager";

export default async function updateLastScan() {
    const configJsonPath = path.join("appConfig.json");
    
    const configJson = fs.readFileSync(configJsonPath, "utf-8");
    const configData: AppConfig = await JSON.parse(configJson);

    configData.lastScanDate = new Date().toISOString().replace('T', ' ').split('.')[0]

    const updatedJson = JSON.stringify(configData, null, 2);
    fs.writeFileSync(configJsonPath, updatedJson, 'utf-8');

    const io = getIO();
    io.emit("last-scan-date", configData.lastScanDate);
}