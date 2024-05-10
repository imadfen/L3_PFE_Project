import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

type Fire = {
    id: number;
    datetime: string;
    tl_longitude: number;
    tl_latitude: number;
    br_longitude: number;
    br_latitude: number;
    imageFileName: string;
    fire_score: number;
}

type FireWithoutId = Omit<Fire, "id"> & {
    [key: string]: any;
};

// Initialize and open the SQLite database
async function openDb(): Promise<Database> {
    return open({
        filename: './mydatabase.db',
        driver: sqlite3.Database
    });
}

// Initialize the database table
export async function setupDatabase() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS fires (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            datetime TEXT NOT NULL,
            tl_longitude REAL NOT NULL,
            tl_latitude REAL NOT NULL,
            br_longitude REAL NOT NULL,
            br_latitude REAL NOT NULL,
            imageFileName TEXT NOT NULL,
            fire_score REAL NOT NULL
        )
    `);
    await db.close();
}

export async function resetDatabase() {
    const db = await openDb();
    await db.exec('DROP TABLE IF EXISTS fires');
    await setupDatabase()

    await db.close();
}

// Insert a new fire record
export async function insertFire(newFire: FireWithoutId) {
    const db = await openDb();
    let properties = "("
    let valuesString = "("
    const values = []

    let cpt = 0
    for (const prop in newFire) {
        if (Object.prototype.hasOwnProperty.call(newFire, prop)) {
            properties += cpt === 0 ? `${prop}` : `, ${prop}`;
            valuesString += cpt === 0 ? "?" : ", ?";
            values.push(newFire[prop]);
            cpt++;
        }
    }

    properties += ")";
    valuesString += ")";

    await db.run(
        `INSERT INTO fires ${properties} VALUES ${valuesString}`,
        values
    );
    await db.close();
}

// Fetch all fire records
export async function getFires() {
    const db = await openDb();
    const fires: Fire = await db.all('SELECT * FROM fires');
    await db.close();
    return fires;
}

// Get records with the most recent datetime
export async function getRecentFires() {
    const db = await openDb();
    const result = await db.get('SELECT datetime FROM fires ORDER BY datetime DESC LIMIT 1');
    if (result) {
        const fires: Fire[] = await db.all('SELECT * FROM fires WHERE datetime = ?', [result.datetime]);
        await db.close();
        return fires;
    } else {
        await db.close();
        return [];
    }
}

