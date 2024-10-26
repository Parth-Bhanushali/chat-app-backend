import Router from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getUserStatus } from "../controllers/userController"

const router = Router();

router.get("/:userId/status", authMiddleware, getUserStatus);

export default router;
