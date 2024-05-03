import fs from "fs";

export default async function getConfigJson(configFilePath = "./cli/config.json") {
  let configData = null;
  try {
    const data = fs.readFileSync(configFilePath, 'utf8');
    configData = await JSON.parse(data);
  } catch (error) {
    console.error("Error reading CLI config file: ", error);
  }

  return configData;
}