import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import tenderRoutes from "./routes/tenderRoutes.js";
import materialRoutes from "./routes/meterialRoutes.js";
import projectSiteRoutes from "./routes/projectSiteRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.set("io", io);

io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);

    socket.on("disconnect", () => {

        console.log(`User Disconnected: ${socket.id}`);

    });

});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

app.use(express.json());

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

app.use(morgan("dev"));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Tender Management API Running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/tenders", tenderRoutes);

app.use("/api/materials", materialRoutes);

app.use("/api/sites", projectSiteRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});