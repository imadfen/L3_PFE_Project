import saveSatData from "./saveSatData";
import { SatMetaData } from "../types/SatMetaData";
import prepareImage from "./prepareImage";
import processModelOutput from "./processModelOutput";
import runModel from "./runModel";
import updateLastScan from "./updateLastScan";
import { getIO } from "../socketManager";

interface ImageType {
    file_name: string;
    content: Buffer;
}

export default async function processImage(image: ImageType, imageMetadata: SatMetaData) {
    const [input,img_width,img_height] = await prepareImage(image.content);

    const outputData = await runModel(input);
    const confThreshold = 0.5;
    const iouThreshold = 0.7;
    
    const processedOutput = processModelOutput(outputData, img_width, img_height, confThreshold, iouThreshold);

    if (processedOutput.length > 0) {
        const score = processedOutput[0][5];
        const savedFire = await saveSatData(image, imageMetadata, score);
        
        if (savedFire) {
            const io = getIO();
            io.emit("new-fire", savedFire);
            io.emit("full-history");
        }
    }

    await updateLastScan();
}