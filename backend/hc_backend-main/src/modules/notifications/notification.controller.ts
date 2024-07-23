import { NextFunction, Request, Response } from "express";
import { parseISO } from 'date-fns';
import prisma from "../../configs/database";
import { sendNotification } from "./notification.services";
import { uploadOnCloudinary } from "../../configs/cloudinary";

class NotificationController {
  sendNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { title, body, type, scheduledTime, batchId, departmentId, file } = req.body;
    const batchID = parseInt(batchId);
    const depart = parseInt(departmentId);
    const formattedTime = parseISO(scheduledTime);
    
    let image;

    try {
      if (file) {
        const cloudinaryResponse = await uploadOnCloudinary(file, `notification-${Date.now()}.png`);
        image = cloudinaryResponse?.url;
      }

      await prisma.notification.create({
        data: {
          type,
          title,
          body,
          batchId: batchID,
          departmentId: depart,
          image,
          scheduledTime: formattedTime,
        },
      });

      await sendNotification(type, title, body, +batchId, +departmentId);
      res.json({ message: "SUCCESS" });
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ error: "Failed to create notification" });
    }
  };

  getNotificationByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const departId = parseInt(req.query.departId as string);
    const notifications = await prisma.department.findFirst({
      where: { id: departId },
      select: {
        notifications: true,
      },
    });
    res.json(notifications?.notifications);
  };

  getNotificationByBatch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const batchId = parseInt(req.query.batchId as string);
    const notifications = await prisma.batch.findFirst({
      where: { id: batchId },
      select: {
        notifications: true,
      },
    });
    res.json(notifications?.notifications);
  };

  getNotificationByStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = parseInt(req.query.userId as string); 
  
    const notifications = await prisma.notification.findMany({
      where: {
        type: 'COLLEGE', 
      },
      select: {
        id: true,
        type: true,
        title: true,
        body: true,
        batchId: true,
        departmentId: true,
        image: true,
        scheduledTime: true,
      },
    });
    res.json(notifications);
  };
}

export default NotificationController;
