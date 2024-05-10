import express, { Application } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import getSatDataRoute from "./routes/getSatDataRoute";
import serveImagesRoute from "./routes/serveImagesRoute";
import { getFires, resetDatabase } from './utils/database';
import processImage from './utils/processImage';
import fs from "fs"
import path from "path"
import createMetadata from './utils/createSatMetadata';
import { Polygon, polygon } from '@turf/turf';

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

// hello world test route
app.get('/api/hello', (req, res) => {
    res.send('Hello World!');
});

// serve images route
app.use(serveImagesRoute);

// run the fetching and processing the satellite imagery
app.use('/api/getsatdata', getSatDataRoute);

// reset the db
app.get("/api/resetdb", async (_, res) => {
    await resetDatabase();
    return res.sendStatus(200)
})

// get fires from db
app.use("/api/getfires", async (_, res) => {
    const fires = await getFires();
    return res.json(fires)
})

// ===============================

server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});