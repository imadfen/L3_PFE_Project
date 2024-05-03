import express, { Application } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import { spawn } from 'child_process';


let app: Application = express();
let server: http.Server | null = null;
dotenv.config();

app.use(cors());

let PORT = 5000
if (process.env.PORT) {
    const parsed = parseInt(process.env.PORT, 10);
    if (!isNaN(parsed)) {
        PORT = parsed;
    }
}

// ============ routes ===========

app.get('/api/hello', (req, res) => {
    res.send('Hello World!');
});

// ===============================


server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export function startServerInBackground() {
    spawn('npm', ['run', 'start'], { detached: true, stdio: 'ignore' }).unref();
};

export function checkStatus() {
    if (server && server.listening) {
        return {
            port: PORT,
            pid: process.pid,
        }
    }

    return false;
}

export function stopServer() {
    if (server) {
        server.close(() => {
            console.log('Server has been stopped');
            process.exit(0);
        });
    } else {
        console.log('Server is not running');
    }
};