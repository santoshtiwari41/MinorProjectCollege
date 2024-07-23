import { NotificationType } from "@prisma/client";
import prisma from "../../configs/database";

import { sendMultipleNotifications } from "../../helpers/notification.helper";

const extractValidFcmTokens = (
  items: { fcmToken: string | null }[]
): string[] => {
  return items
    .map((item) => item.fcmToken)
    .filter((token): token is string => token !== null);
};

export const sendNotification = async (
  type: NotificationType,
  title: string,
  body: string,
  batchId: number,
  departmentId: number,
  
) => {
  let tokens: string[] = [];

  switch (type) {
    case "BATCH":
      const batches = await prisma.student.findMany({
        where: { batchId },
        select: { fcmToken: true },
      });
      tokens = extractValidFcmTokens(batches);
      break;

    case "COLLEGE":
      const college = await prisma.student.findMany({
        
        select: { fcmToken: true },
      });
      tokens = extractValidFcmTokens(college);
      break;

    case "DEPARTMENT":
      const department = await prisma.department.findFirst({
        where: { id: departmentId },
        select: {
          batches: {
            select: {
              students: {
                select: { fcmToken: true },
              },
            },
          },
        },
      });
      if (department) {
        tokens = extractValidFcmTokens(
          department.batches.flatMap((batch) => batch.students)
        );
      }
      break;

    default:
      tokens = [];
      break;
  }

  if (tokens.length > 0) {
    await sendMultipleNotifications(tokens, title, body);
  }
};
