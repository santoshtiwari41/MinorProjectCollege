import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import EventController from "./event.controller";

const router = express.Router();
const eventsController = new EventController();

router.post("/", asyncWrapper(eventsController.addEvent));
router.get("/", asyncWrapper(eventsController.getEvents));
router.get("/id", asyncWrapper(eventsController.addEvent));
router.delete("/:id", asyncWrapper(eventsController.removeEvent));

export default router;
