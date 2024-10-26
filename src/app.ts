import express from "express";
import cors from "cors";
import connectDatabase from "./config/db";
import { authRoutes, chatRoutes, userRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);

export default app;