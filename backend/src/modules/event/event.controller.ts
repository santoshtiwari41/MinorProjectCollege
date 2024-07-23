import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../configs/database";
import { parseISO, isValid } from 'date-fns'; // Importing isValid to check Date validity

class EventController {
  addEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, startTime, endTime, holiday } = req.body;
  console.log('starttime:',startTime, 'endtime:',endTime, 'title',title, 'description',description)
      const formattedStartTime = parseISO(startTime);
     const  formattedEndTime = parseISO(endTime);
   console.log('formated:',formattedStartTime)
    try {
      await prisma.event.create({
        data: {
          title,
          description,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          holiday,
        },
      });

      return res.json({ message: "Event added successfully" });
    } catch (error) {
      console.error("Error creating event:", error);
      return next(createHttpError(500, "Failed to create event. Please try again later."));
    }
  };

  getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await prisma.event.findMany();
      return res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      return next(createHttpError(500, "Failed to fetch events. Please try again later."));
    }
  };

  getEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = +req.params.id; // Convert id to number

    try {
      const event = await prisma.event.findFirst({
        where: {
          id: eventId,
        },
      });

      if (!event) {
        return next(createHttpError(404, "Event not found."));
      }

      return res.json(event);
    } catch (error) {
      console.error(`Error fetching event with id ${eventId}:`, error);
      return next(createHttpError(500, "Failed to fetch event. Please try again later."));
    }
  };

  removeEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = +req.params.id; // Convert id to number

    try {
      await prisma.event.delete({
        where: {
          id: eventId,
        },
      });

      return res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error(`Error deleting event with id ${eventId}:`, error);
      return next(createHttpError(500, "Failed to delete event. Please try again later."));
    }
  };
}

export default EventController;
