import fs from "fs";
import path from "path";

export default async function updateLastScan() {
    const configJsonPath = path.join("service", "config.json");
    
    const configJson = fs.readFileSync(configJsonPath, "utf-8");
    const configData = await JSON.parse(configJson);

    configData.lastScanDate = new Date().toISOString().replace('T', ' ').split('.')[0]

    const updatedJson = JSON.stringify(configData, null, 2);
    fs.writeFileSync(configJsonPath, updatedJson, 'utf-8');
}