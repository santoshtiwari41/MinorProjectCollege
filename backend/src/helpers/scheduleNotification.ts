import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

const expo = new Expo();

type NotificationData = {
  [key: string]: any;
};

const scheduleNotification = (
  title: string, 
  body: string, 
  data: NotificationData, 
  scheduleTime: Date, 
  expoPushToken: string
): void => {

  const sendNotification = async (): Promise<void> => {
    if (!Expo.isExpoPushToken(expoPushToken)) {
      throw new Error(`Push token ${expoPushToken} is not a valid Expo push token`);
    }

    const messages: ExpoPushMessage[] = [{
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body,
      data: data,
    }];

    const chunks = expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const now = new Date();
  const timeDifference = scheduleTime.getTime() - now.getTime();

  if (timeDifference > 0) {
    setTimeout(() => {
      sendNotification().catch(console.error);
    }, timeDifference);
  } else {
    console.error('Scheduled time is in the past. Notification not scheduled.');
  }
};

export default scheduleNotification;
