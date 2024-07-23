import app from "./configs/app";
import config from "./configs/constants";
import logger from "./helpers/logger.helper";


const server = async () => {
  try {
    app
      .listen(config.port, () => logger.info(`http://localhost${config.port}`))
      .on("error", (err) => {
        console.log("err", err.message);
        process.exit(1);
      });
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
      logger.on("finish", () => {
        process.exit(1);
      });
    }
  }
};

server();
