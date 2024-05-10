type BoundingBox = [number, number, number, number, number, number]

function calculateIoU(box1: BoundingBox, box2: BoundingBox): number {
    return intersection(box1,box2)/union(box1,box2);
}

function union(box1: BoundingBox, box2: BoundingBox) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const box1_area = (box1_x2-box1_x1)*(box1_y2-box1_y1)
    const box2_area = (box2_x2-box2_x1)*(box2_y2-box2_y1)
    return box1_area + box2_area - intersection(box1,box2)
}

function intersection(box1: BoundingBox, box2: BoundingBox) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const x1 = Math.max(box1_x1,box2_x1);
    const y1 = Math.max(box1_y1,box2_y1);
    const x2 = Math.min(box1_x2,box2_x2);
    const y2 = Math.min(box1_y2,box2_y2);
    return (x2-x1)*(y2-y1)
}


// function nonMaxSuppression(boxes: BoundingBox[], iouThreshold: number): BoundingBox[] {
//     if (boxes.length === 0) {
//         return [];
//     }

//     boxes.sort((a, b) => b.confidence - a.confidence);

//     const selectedBoxes: BoundingBox[] = [];

//     while (boxes.length > 0) {
//         const chosenBox = boxes.shift()!;
//         selectedBoxes.push(chosenBox);

//         boxes = boxes.filter((box) => calculateIoU(chosenBox, box) < iouThreshold);
//     }

//     return selectedBoxes;
// }

export {
    // nonMaxSuppression,
    calculateIoU
}