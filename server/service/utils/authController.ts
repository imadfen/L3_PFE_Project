import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { addUser, comparePassword, findUserByEmail } from "./database";
// import { addUser, comparePassword, findUserByEmail } from "./database";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    if (await findUserByEmail(email)) return res.status(409).json({ message: "User already exists" });

    const newUser = await addUser(email, password);

    if (newUser === undefined) {
        return res.status(400).json({ error: "register new user failed" });
    }

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({ message: "User registered", token });
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
}
