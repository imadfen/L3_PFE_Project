import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Fire } from '../types/Fire';
import { User } from '../types/User';
import bcrypt from "bcryptjs";

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
export async function createFireTable() {
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

export async function resetFireTable() {
    const db = await openDb();
    await db.exec('DROP TABLE IF EXISTS fires');
    await createFireTable()

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

    let newRowId: number | undefined;
    try {
        const result = await db.run(
            `INSERT INTO fires ${properties} VALUES ${valuesString}`,
            values
        );

        newRowId = result.lastID;

        if (newRowId === undefined) {
            return undefined;
        }

        const row: Fire | undefined = await db.get(`SELECT * FROM fires WHERE id = ?`, [newRowId]);
        return row;
    } catch (error) {
        console.error('Insert fire operation failed:', error);
    } finally {
        await db.close();
    }
}

// Fetch all fire records
export async function getFires() {
    const db = await openDb();
    const fires: Fire[] = await db.all('SELECT * FROM fires');
    await db.close();
    return fires;
}

// Get records with the most recent datetime
export async function getRecentFires() {
    const db = await openDb();
    const result = await db.get('SELECT datetime FROM fires ORDER BY datetime DESC LIMIT 1');
    if (result) {
        const date = result.datetime.split(" ")[0]
        const fires: Fire[] = await db.all('SELECT * FROM fires WHERE datetime LIKE ?', [`%${date}%`]);
        await db.close();
        return fires;
    } else {
        await db.close();
        return [];
    }
}

export async function updateFire(id: number, key: string, value: string | number) {
    const db = await openDb();
    await db.run(`UPDATE fires SET ${key}= ? WHERE id = ?`, [value, id]);
    await db.close();
}

export async function deleteFire(id: number) {
    const db = await openDb();
    await db.run(`DELETE FROM fires WHERE id = ?`, [id]);
    await db.close();
}

// ########### User #############

// Initialize the database table
export async function createUsersTable() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);
    await db.close();
}

export async function resetUsersTable() {
    const db = await openDb();
    await db.exec('DROP TABLE IF EXISTS users');
    await createUsersTable()

    await db.close();
}

export async function addUser(email: string, password: string): Promise<User | undefined> {
    const db = await openDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        if (result.lastID) {
            return findUserById(result.lastID);
        } else {
            return undefined;
        }
    } finally {
        await db.close();
    }
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
    const db = await openDb();
    try {
        const user = await db.get<User>('SELECT * FROM users WHERE email = ?', email);
        return user;
    } finally {
        await db.close();
    }
}

export async function findUserById(id: number): Promise<User | undefined> {
    const db = await openDb();
    try {
        const user = await db.get<User>('SELECT * FROM users WHERE id = ?', id);
        return user;
    } finally {
        await db.close();
    }
}

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}