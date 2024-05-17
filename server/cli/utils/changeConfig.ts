import * as fs from 'fs';

export default async function changeConfig(propertyName: string, value: string, configFilePath = "./appConfig.json"){
    const configData = await JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

    try {
        if (configData.hasOwnProperty(propertyName)) {
            configData[propertyName] = value;
            fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2), 'utf8');
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error("Error reading/writing CLI config file: ", error);
    }

}