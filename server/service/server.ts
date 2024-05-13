import express, { Application, Request } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import startFireMonitorRoute from "./routes/startFireMonitorRoute";
import serveImagesRoute from "./routes/serveImagesRoute";
import authRoute from "./routes/authRoutes";
import { deleteFire, getFires, getRecentFires } from './utils/database';
import getLastScanDate from './utils/getLastScanDate';
import "./utils/schedular";
import runSimulation from './utils/runSimulation';
import { getIO, initSocket } from './socketManager';
import { verifyToken } from './middlewares/authMiddleware';


let app: Application = express();
const server = http.createServer(app);
initSocket(server);
const io = getIO();

dotenv.config();

app.use(cors());

app.use(express.json());

let PORT = 5000
if (process.env.PORT) {
    const parsed = parseInt(process.env.PORT, 10);
    if (!isNaN(parsed)) {
        PORT = parsed;
    }
}

// ============ routes ===========

// hello world test route
app.get('/api/hello', (req, res) => {
    res.send('Hello World!');
});

// serve images route
app.use(serveImagesRoute);

// run the fetching and processing the satellite imagery
app.use('/api/startscan', startFireMonitorRoute);

// auth routes
app.use("/api/auth", authRoute)

// reset the db
app.get("/api/resetdb", async (_, res) => {
    // await resetFireTable();
    const fires = await getRecentFires();
    for (const fire of fires) {
        await deleteFire(fire.id);
    }
    return res.sendStatus(200)
})

// get fires from db
app.use("/api/getfires", verifyToken, async (_, res) => {
    const fires = await getFires();
    return res.json(fires)
})

type QueryParams = {id?: string}
app.get("/api/runsimulation", async (req: Request<{}, {}, {}, QueryParams>, res) => {
    const id = req.query.id ? parseInt(req.query.id, 10) : undefined;

    if (id !== undefined && isNaN(id)) {
        return res.status(400).json({
            message: 'Invalid query parameter. Please provide a valid integer for id.'
        });
    }

    await runSimulation(id);
    return res.sendStatus(200);
})


// ============ websocket =============
io.on('connection', async (socket) => {
    const fires = await getRecentFires();
    const lastScanDate = await getLastScanDate();

    socket.emit("today-fires", fires);
    socket.emit("last-scan-date", lastScanDate);

    socket.on('get-history', async () => {
        const allFires = await getFires();
        socket.emit('full-history', allFires);
    });
});

// ==================================

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});