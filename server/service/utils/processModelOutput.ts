import { calculateIoU } from "./calcOperation";

type BoundingBox = [number, number, number, number, number, number]

export default function processModelOutput(data: Float32Array, img_width: any, img_height: any, confThreshold: number, iouThreshold: number) {
    const numCells = 21504;
    const numAttributes = 5;

    let boxes: BoundingBox[] = [];
    for (let i = 0; i < numCells; i++) {
        let class_id = 0, prob = 0;
        for (let col = 4; col < numAttributes; col++) {
            if (data[numCells * col + i] > prob) {
                prob = data[numCells * col + i];
                class_id = col - 4;
            }
        }

        if (prob < confThreshold) {
            continue;
        }

        const label = class_id;
        const xc = data[i];
        const yc = data[numCells + i];
        const w = data[2 * numCells + i];
        const h = data[3 * numCells + i];
        const x1 = (xc - w / 2) / img_width * img_width;
        const y1 = (yc - h / 2) / img_height * img_height;
        const x2 = (xc + w / 2) / img_width * img_width;
        const y2 = (yc + h / 2) / img_height * img_height;
        boxes.push([x1, y1, x2, y2, label, prob]);
    }

    boxes = boxes.sort((box1, box2) => box2[5] - box1[5])
    const result = [];
    while (boxes.length > 0) {
        result.push(boxes[0]);
        boxes = boxes.filter(box => calculateIoU(boxes[0], box) < iouThreshold);
    }

    return result;
}