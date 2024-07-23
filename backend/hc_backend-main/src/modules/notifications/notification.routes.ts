import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import NotificationController from "./notification.controller";
import uploadMiddleware from "../../middlewares/upload.middleware";

const router = express.Router();
const notificationController = new NotificationController();

router.post(
  "/",
  uploadMiddleware.single("image"),
  asyncWrapper(notificationController.sendNotification)
);

router.get(
  "/batch",
  asyncWrapper(notificationController.getNotificationByBatch)
);
router.get(
  "/department",
  asyncWrapper(notificationController.getNotificationByDepartment)
);

router.get(
  "/student",
  asyncWrapper(notificationController.getNotificationByStudent)
);

export default router;
