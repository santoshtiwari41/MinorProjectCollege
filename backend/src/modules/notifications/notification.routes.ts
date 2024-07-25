import express from "express";
import prisma from "../../configs/database";
import asyncWrapper from "../../helpers/async.helper";
import NotificationController from "./notification.controller";
import uploadMiddleware from "../../middlewares/upload.middleware";
import scheduleNotification from "../../helpers/scheduleNotification";
const router = express.Router();
const expoPushToken = "ExponentPushToken[zzFyLKGIFCQNQgbqhuLDN7]"; 
const getNotifications = async () => {
  const batchId = 11;
  const notifications = await prisma.batch.findFirst({
    where: { id: batchId },
    select: {
      notifications: true,
    },
  });
  return notifications?.notifications || [];
};

// (async () => {
//   try {
//     const notifications = await getNotifications();

//     notifications.forEach(notification => {
//       const { title, body, scheduledTime } = notification;
//       const data = { ...notification };
//       const notificationTime = new Date(scheduledTime);

//     //   scheduleNotification(title, body, data, notificationTime, expoPushToken);
//     console.log(data)

//     });
//   } catch (error) {
//     console.error(error);
//   }
// })();
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
router.post("/schedule-notification", async(req, res) => {
  
  const body="this is body"
  const scheduleTime=new Date(Date.now() + 10 * 1000)
  const data={
    image:'image',
    hi:"hello"
  }
  const title='from hamro college'
  try {
    const notificationTime = new Date(scheduleTime);
    scheduleNotification(title, body, data, notificationTime,expoPushToken);
    res.status(200).send('Notification scheduled successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to schedule notification');
  }


    // try {
    //   const notifications = await getNotifications();

    //   notifications.forEach((notification) => {
    //     const { title, body, scheduledTime } = notification;
      
    //     const notificationTime = new Date(scheduledTime);
    //     console.log(notificationTime)
    //     scheduleNotification(title, body, data, notificationTime, expoPushToken);

    //   });
    // } catch (error) {
    //   console.error(error);
    // }
 
});

export default router;
