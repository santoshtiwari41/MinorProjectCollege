import { Expo, ExpoPushMessage } from "expo-server-sdk";
import logger from "./logger.helper";

const expo = new Expo();

export const sendSingleNotification = async (
  token: string,
  title: string,
  body: string
) => {
  if (!Expo.isExpoPushToken(token)) {
    logger.error(`Push token ${token} is not a valid Expo push token`);
    return;
  }

  const message: ExpoPushMessage = {
    to: token,
    sound: "default",
    title: title,
    body: body,
    data: { body },
  };

  try {
    let ticket = await expo.sendPushNotificationsAsync([message]);
    logger.info(ticket);
  } catch (error) {
    logger.error(`Error sending single notification:`, error);
  }
};

export const sendMultipleNotifications = async (
  tokens: string[],
  title: string,
  body: string
) => {
  const messages: ExpoPushMessage[] = [];

  for (let token of tokens) {
    if (!Expo.isExpoPushToken(token)) {
      logger.error(`Push token ${token} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: token,
      sound: "default",
      title,
      body,
      data: { body },
    });
  }

  const chunks = expo.chunkPushNotifications(messages);
  const sendChunks = async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        logger.info(ticketChunk);
      } catch (error) {
        logger.error(`Error sending multiple notifications chunk:`, error);
      }
    }
  };

  await sendChunks();
};
