import path from "path";
import fs from "fs";
import { Simulation } from "../types/Simulation";
import { DateTime } from "luxon";
import { Polygon, polygon } from "@turf/turf";
import createMetadata from "./createSatMetadata";
import processImage from "./processImage";

export default async function runSimulation(id?: number) {
    const imagesPath = path.join("service", "data", "simulation", "images");
    const listJsonPath = path.join("service", "data", "simulation", "list.json");

    const listJson = fs.readFileSync(listJsonPath, "utf-8");
    const list: Simulation[] = await JSON.parse(listJson);

    let simulations: Simulation[] = [];
    if (!id) {
        simulations = list;
    } else {
        const sim = list.find(sim => sim.id === id);
        if (sim) {
            simulations.push(sim);
        }
    }

    for (const sim of simulations) {
        try{
        console.log(`Running simulation ${sim.name}...`);

        const fileName = sim.image_name;
        const fileExtension = sim.image_name.split(".")[1];
        const fileBuffer: Buffer = fs.readFileSync(path.join(imagesPath, fileName));
        const currentDateTimeString = DateTime.local().setZone("Africa/Algiers").toFormat('yyyyMMddHHmmss');

        const image = {
            file_name: `${currentDateTimeString}.${fileExtension}`,
            content: fileBuffer,
        };

        const coordinates = [sim.area_coords];

        const cell: Polygon = polygon(coordinates).geometry;

        const imageMetadata = createMetadata(image.file_name, cell)

        await processImage(image, imageMetadata)
        } catch (e: any) {
            console.log(`Error: ${e.message}`);
        }
    }
}