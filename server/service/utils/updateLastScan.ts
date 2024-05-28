import fs from "fs";
import path from "path";
import { AppConfig } from "../types/AppConfig";
import { getIO } from "../socketManager";

export default async function updateLastScan() {
    const lastScanDateJsonPath = path.join("lastScanDate.json");
    
    const lastScanDateJson = fs.readFileSync(lastScanDateJsonPath, "utf-8");
    const lastScanDateData: AppConfig = await JSON.parse(lastScanDateJson);

    lastScanDateData.lastScanDate = new Date().toISOString().replace('T', ' ').split('.')[0]

    const updatedJson = JSON.stringify(lastScanDateData, null, 2);
    fs.writeFileSync(lastScanDateJsonPath, updatedJson, 'utf-8');

    const io = getIO();
    io.emit("last-scan-date", lastScanDateData.lastScanDate);
}