import changeConfig from "../utils/changeConfig";
import getConfigJson from "../utils/getConfigJson";

export async function configCommand(commandArgs: string, cb: ()=>any) {
    var regex = /(--\S+)\s+(\S+)\s+("[^"]*"|'[^']*')|(--ls|--list)/;
    var matches = commandArgs.match(regex);

    ifstatement: if (!matches) {
        console.log("Invalid options.");
    } else if (matches[4]) {
        const config = await getConfigJson();
        
        if (!config) {
            throw new Error("Cannot get CLI config.");
        }
        
        for (let key in config) {
            console.log(`${key}:\t\t"${config[key]}"`);
        }
    } else {
        const property = matches[2];
        const value = matches[3].slice(1, -1);

        if (property === "lastScanDate") {
            console.log("You cannot update this config property manually.");
            break ifstatement;
        }

        const result = await changeConfig(property, value);

        if (result) console.log("Configuration updated.");
        else if (result === false) console.log(`Invalid property "${property}"`);
    }

    cb();
}