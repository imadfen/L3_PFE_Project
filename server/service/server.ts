import express, { Application } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import startFireMonitorRoute from "./routes/startFireMonitorRoute";
import serveImagesRoute from "./routes/serveImagesRoute";
import authRoute from "./routes/authRoutes";
import { createUsersTable, getFires, resetFireTable, resetUsersTable, updateFire } from './utils/database';
import processImage from './utils/processImage';
import fs from "fs"
import path from "path"
import createMetadata from './utils/createSatMetadata';
import { DateTime } from 'luxon';
import { Polygon, polygon } from '@turf/turf';


let app: Application = express();
let server: http.Server | null = null;
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
app.use('/api/getsatdata', startFireMonitorRoute);

// auth routes
app.use("/api/auth", authRoute)

// reset the db
app.get("/api/resetdb", async (_, res) => {
    await resetFireTable();
    return res.sendStatus(200)
})

// get fires from db
app.use("/api/getfires", async (_, res) => {
    const fires = await getFires();
    return res.json(fires)
})

app.get("/api/updatedb", async (_, res) => {
    // lat=36.69953&lng=3.97774
    // 36.40553&lng=4.40277
    await updateFire(2, "tl_longitude", 3.97774);
    await updateFire(2, "tl_latitude", 36.69953);
    await updateFire(2, "br_longitude", 4.40277);
    await updateFire(2, "br_latitude", 36.40553);
    
    return res.sendStatus(200);
});

app.get("/api/bejaiafire", async (_, res) => {
    const fileName = "bejaia2";
    const extension = ".jpg";
    const fileBuffer: Buffer = fs.readFileSync(path.join("service", "data", fileName + extension))
    const currentDateTimeString = DateTime.local().setZone("Africa/Algiers").toFormat('yyyyMMddHHmmss');

    const image = {
        file_name: currentDateTimeString + extension,
        content: fileBuffer,
    };

    const coordinates = [
        [
            [36.57005, 4.20502],
            [36.57005, 4.5607],
            [36.31208, 4.5607],
            [36.31208, 4.20502],
            [36.57005, 4.20502],
        ]
    ];

    const cell: Polygon = polygon(coordinates).geometry;

    const imageMetadata = createMetadata(`${currentDateTimeString}.png`, cell)

    await processImage(image, imageMetadata)

    return res.sendStatus(200);
})

// ===============================

server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});