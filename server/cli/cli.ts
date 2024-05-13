import readline from 'readline';
import { runCommand } from './commands/run';
import { statusCommand } from './commands/status';
import { exitCommand } from './commands/exit';
import { ChildProcess } from "child_process";
import { configCommand } from './commands/config';
import { helpCommand } from './commands/help';
import { simulationCommand } from './commands/simulation';


let nodemonProcess: ChildProcess | null = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const executeCommand = (command: string) => {
    switch (command.trim().split(' ')[0]) {
        case 'run':
            runCommand((process?: ChildProcess) => {
                nodemonProcess = process ? process : null;
                rl.prompt();
            });
            break;
        case 'status':
            statusCommand(nodemonProcess,
                () => rl.prompt(),
                () => nodemonProcess = null
            );
            break;
        case 'stop':
            exitCommand(nodemonProcess, () => {
                nodemonProcess = null;
                rl.prompt();
            });
            break;
        case 'exit':
            exitCommand(nodemonProcess, () => {
                nodemonProcess = null;
                rl.close();
            });
            break;

        case 'config':
            configCommand(command.trim().substring(command.trim().indexOf(' ') + 1), () => {
                rl.prompt();
            });
            break;

        case 'help':
            helpCommand(()=>{
                rl.prompt();
            })
            break;
        
        case 'simulation':
            simulationCommand(nodemonProcess, rl, ()=>{
                rl.prompt();
            })
            break;
        default:
            console.log('Command not recognized.');
            rl.prompt();
    }
};

rl.setPrompt('CLI-Tool> ');
rl.prompt();

rl.on('line', (input) => {
    executeCommand(input);
});

rl.on('close', () => {
    console.log('Exiting CLI-Tool.');
    process.exit(0);
});

rl.on('SIGINT', () => {
    exitQuestion();
});

rl.on('SIGTSTP', () => {
    exitQuestion();
});


function exitQuestion() {
    rl.question('Are you sure you want to exit? (yes/no) ', (answer) => {
        if (answer.trim().toLowerCase() === 'yes') {
            if (nodemonProcess) {
                exitCommand(nodemonProcess, () => {
                    nodemonProcess = null;
                    rl.close();
                });
            } else {
                rl.close();
            }
        } else {
            rl.prompt();
        }
    });
}