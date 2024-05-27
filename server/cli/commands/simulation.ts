import { ChildProcess } from "child_process";
import callSimulation from "../utils/callSimulation";
import fs from "fs";
import path from "path";
import { Simulation } from "../../service/types/Simulation";
import readline from "readline";

const simulationsPath = path.join("service", "data", "simulation", "list.json");

function mapChoices(simulations: Simulation[]) {
    return [{
        name: "All",
        value: 0
    }]
        .concat(simulations.map(sim => ({
            name: sim.name,
            value: sim.id
        })))
        .concat({
            name: "Cancel simulation",
            value: simulations.length + 1
        });
}

async function askQuestion(data: Simulation[], rl: readline.Interface, onFinish: () => any) {
    const choices = mapChoices(data);
    for (const sim of choices) {
        console.log(`${sim.value}: ${sim.name}`);
    }

    rl.question('Choose a simulation (enter number): ', async (choice) => {
        const id = parseInt(choice);
        if (id == data.length + 1) {
            console.log('Simulation canceled.');
            onFinish();
        } else if (isNaN(id) || !data.find(sim => sim.id === id)) {
            console.log('Invalid choice.');
            onFinish();
        } else {
            await callSimulation(id);
            onFinish();
        }
    });
}

export async function simulationCommand(nodemonProcess: ChildProcess | null, rl: readline.Interface, cb: () => any) {
    if (!nodemonProcess || !nodemonProcess.pid) {
        console.log("The server is not running.");
        cb()
    } else {
        const simulations: Simulation[] = await JSON.parse(fs.readFileSync(simulationsPath, "utf-8"));
        await askQuestion(simulations, rl, cb);
    }
}