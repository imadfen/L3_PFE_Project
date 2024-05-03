import { spawn, ChildProcess } from 'child_process';
import getConfigJson from '../utils/getConfigJson';

let nodemonProcess: ChildProcess | null;

export const runCommand = async (callback: (childProcess?: ChildProcess) => void) => {
    if (nodemonProcess) {
        console.log('Server is already running.');
        callback();
        return;
    }

    const config = await getConfigJson();

    if (!config) {
        throw new Error("Cannot get CLI config.");
    }

    let command: string;
    if (process.platform === "win32") {
        command = `Start-Process -NoNewWindow cmd.exe -ArgumentList "/c nodemon service/server.ts"`;
        nodemonProcess = spawn(command, {
            shell: true,
            detached: true,
        });
        nodemonProcess.unref();
    } else {
        command = config.newTerminalCommand as string;
        nodemonProcess = spawn(command, ["nodemon", "service/server.ts"], {
            shell: true,
        });
    }


    nodemonProcess.on("error", (e)=>{
        console.log(e);
    })

    nodemonProcess.on("exit", () => {
        nodemonProcess = null;
    })

    callback(nodemonProcess);
};