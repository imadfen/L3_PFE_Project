import * as fs from 'fs';
import * as path from 'path';
import { SatMetaData } from '../types/SatMetaData';
import { insertFire } from './database';

interface ImageType {
    file_name: string;
    content: Buffer;
}

export default async function saveSatData(image: ImageType, metadata: SatMetaData, fireScore: number, workingFolder= "./service") {
    try {
        const rootFolder = path.join(workingFolder, "data");
        if (!fs.existsSync(rootFolder)) {
            fs.mkdirSync(rootFolder);
        }

        const imagesFolder = path.join(rootFolder, 'images');
        if (!fs.existsSync(imagesFolder)) {
            fs.mkdirSync(imagesFolder);
        }

        const fileName = image.file_name;
        const fileContent = image.content;

        fs.writeFileSync(path.join(imagesFolder, fileName), fileContent);
        await insertFire({
            datetime: metadata.fetch_date,
            imageFileName: fileName,
            tl_longitude: metadata.area_coords.top_left.longitude,
            tl_latitude: metadata.area_coords.top_left.latitude,
            br_longitude: metadata.area_coords.bottom_right.longitude,
            br_latitude: metadata.area_coords.bottom_right.latitude,
            fire_score: fireScore,
        })

    } catch (e) {
        console.error(`Error saving the files:\n${e}`);
    }
}
