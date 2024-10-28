import express from "express";
import cors from "cors";
import startPingJob from "./cron/ping";
import connectDatabase from "./config/db";
import { authRoutes, chatRoutes, userRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

startPingJob();
connectDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
	res.send('This url serves the backend for chat-app-frontend');
});

export default app;