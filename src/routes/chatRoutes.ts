import Router from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getMessages, sendMessage, getContacts } from "../controllers/chatController"

const router = Router();

router.post("/messages", authMiddleware, sendMessage);
router.get("/messages/:userId", authMiddleware, getMessages);
router.get("/contacts", authMiddleware, getContacts);

export default router;
