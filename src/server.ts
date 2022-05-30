import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./assistant/Logging";
import authorRoutes from "./routes/Author";
import bookRoutes from "./routes/Book";
import tagRoutes from "./routes/Tag";

const router = express();

/** Connect to Mongo **/
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to mongoDB.");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Unable to Connect: ");
    Logging.error(error);
  });

const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incomming -> Method: ${req.method} - Url: ${req.url} - IP: ${req.socket.remoteAddress}`
    );

    res.on("finish", () => {
      Logging.info(
        `Response -> Method: ${req.method} - Url: ${req.url} - Status: ${res.statusCode}`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  router.use("/authors", authorRoutes);
  router.use("/books", bookRoutes);
  router.use("/tags", tagRoutes);

  /** Healthcheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  /** Error Handling */
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.prot, () =>
      Logging.info(`Server is running on port ${config.server.prot}`)
    );
};
