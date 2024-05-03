import { spawn, ChildProcess } from 'child_process';
import getConfigJson from '../utils/getConfigJson';


export const exitCommand = async (childProcess: ChildProcess | null, cb?: () => any) => {
    if (childProcess) {
        const config = await getConfigJson();

        if (!config) {
            throw new Error("Cannot get CLI config.");
        }

        const processId = childProcess.pid;
        if (processId) {
            let command: string;

            if (process.platform === "win32") {
                command = `Get-WmiObject Win32_Process -Filter "ParentProcessId=${processId}" | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }`;
                spawn(command);
            } else {
                command = (config.killProcessesCommand as string).replace("<PID>", processId.toString());
                spawn(command, {
                    shell: true,
                });
            }
        }

        console.log("Server stopped.");
        if (cb) cb();
    } else {
        console.log('Server is not running.');
        if (cb) cb();
    }
};
