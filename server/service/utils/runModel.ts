import * as ort from "onnxruntime-node";

export default async function runModel(input: any) {
    const model = await ort.InferenceSession.create("service/model.onnx");
    input = new ort.Tensor(Float32Array.from(input),[1, 3, 1024, 1024]);
    const outputs = await model.run({images:input});
    return outputs["output0"].data;
}