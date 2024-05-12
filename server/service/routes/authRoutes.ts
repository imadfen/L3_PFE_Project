import express from "express";
import { register, login } from "../utils/authController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkauth", verifyToken, (req: any, res) => res.json({ message: "Protected route", user: req.user }));

export default router;
