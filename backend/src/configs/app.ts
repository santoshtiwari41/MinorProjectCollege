import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "node:path";

import errorMiddleware from "../middlewares/error.middleware";

import adminRoutes from "../modules/admin/admin.routes";
import authRoutes from "../modules/auth/auth.routes";
import studentRoutes from "../modules/student/student.routes";

import batchRoutes from "../modules/batch/batch.routes";
import departmentRoutes from "../modules/department/department.routes";
import eventRoutes from "../modules/event/event.routes";
import notificationRoutes from "../modules/notifications/notification.routes";

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "..", "..", "public")));

// Health Check Endpoint
app.get("/health-check", async (_, res) => {
  res.json({ message: "Hello from hamro college server!" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/students", studentRoutes);
app.use("/events", eventRoutes);
app.use("/notifications", notificationRoutes);
app.use("/batchs", batchRoutes);
app.use("/departments", departmentRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;
