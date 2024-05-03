import { exec, ChildProcess } from "child_process";
import getNodeServerPid from '../utils/getNodeServerPid';
import getConfigJson from "../utils/getConfigJson";

export const statusCommand = async (nodemonProcess: ChildProcess | null, cb: () => any, resetNode: () => any) => {
    if (!nodemonProcess || !nodemonProcess.pid) {
        console.log("The server is not running.");
        cb()
    } else {
        const config = await getConfigJson();
        if (!config) {
            throw new Error("Cannot get CLI config.");
        }

        getNodeServerPid(nodemonProcess.pid)
            .then(grandchildPid => {
                if (grandchildPid !== -1) {
                    const command = process.platform === "win32" ?
                        `netstat -ano | findstr /C:"LISTENING" /C:"${grandchildPid.toString()}"` :
                        (config.serverStatusCommand as string).replace("<PID>", grandchildPid.toString());
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            throw new Error(error.message);
                        }
                        if (stderr) {
                            throw new Error(stderr);
                        }

                        console.log(stdout);
                        cb()
                    });
                } else {
                    resetNode();
                    console.log("The server is not running.");
                    cb()
                }
            })
            .catch(err => {
                console.error('Error:', err);
                cb()
            });
    }
};
