interface Commands {
    [key: string]: string;
}

export function helpCommand(cb: () => any) {
    const commands: Commands = {
        "run": "Starts the server using nodemon, automatically restarting on file changes.",
        "status": "Displays details of the running server, including open connections and ports.",
        "stop": "Closing all connections and terminating the server process.",
        "config": "Manages configuration settings.\n\t\t--ls, --list:\tDisplay configuration values.\n\t\t--set <property> <value>:\tSet configuration property.",
        "exit": "Stops the server and exits the program.",
        "help": "Displays help message for all commands."
    }

    console.log("Usage: <command> [<options>]");
    console.log("\nAvailable commands:");
    Object.keys(commands).forEach((cmd: string) => {
        console.log(`\t${cmd.padEnd(15)}${commands[cmd]}`);
    });

    cb();
}