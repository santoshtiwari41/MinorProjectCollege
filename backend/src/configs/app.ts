import cors from "cors";
import express from "express";
import morgan from "morgan";

import errorMiddleware from "../middlewares/error.middleware";

import adminRoutes from "../modules/admin/admin.routes";
import authRoutes from "../modules/auth/auth.routes";
import studentRoutes from "../modules/student/student.routes";

import batchRoutes from "../modules/batch/batch.routes";
import departmentRoutes from "../modules/department/department.routes";
import eventRoutes from "../modules/event/event.routes";
import notificationRoutes from "../modules/notifications/notification.routes";
import bodyParser from 'body-parser'
import { sendSingleNotification } from "../helpers/notification.helper";

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (_, res) => {
  await sendSingleNotification(
    "ExponentPushToken[-RZtHlHZ7X6n9JBlc2H_FC]",
    "Holiday Alert",
    "2057/11/12 is holiday"
  );
  res.json({ message: "Hello from hamro college server!" });
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/students", studentRoutes);

app.use("/events", eventRoutes);
app.use("/notifications", notificationRoutes);

app.use("/batchs", batchRoutes);
app.use("/departments", departmentRoutes);

// GLOBAL ERROR HANDLER
app.use(errorMiddleware);

export default app;
