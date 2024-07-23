import * as cron from "node-cron";

import sendMail from "./nodemailer.helper";

// SECOND(OPTONAL) MINUTE HOUR DAY_OF_MONTH MONTH DAY_OF_WEEK
const cronSchedule = () => {
  try {
    cron.schedule("0 8 * * *", async () => {
      // SEND NOTIFICATIONS

      // SEND EMAIL
      await sendMail(
        "recipient-email@example.com",
        "Daily Notification",
        "This is your daily notification email."
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export default cronSchedule;
