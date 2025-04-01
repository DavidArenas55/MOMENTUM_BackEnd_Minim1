import { Request, Response } from 'express';
import { CalendarClassifierService } from './clasificador.services';

const classifierService = new CalendarClassifierService();

export async function classifyCalendars(req: Request, res: Response): Promise<Response> {
    try {
        console.log("Classifying calendars");
        const busyThreshold = req.body.busyThreshold || 10;
        const classification = await classifierService.classifyAndPersist(busyThreshold);

        return res.status(201).json({
            message: "Calendars classified successfully",
            classification
        });
    } catch (error) {
        console.error("Error classifying calendars", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function getLatestClassification(req: Request, res: Response): Promise<Response> {
    try {
        console.log("Retrieving latest classification");
        const classification = await classifierService.getLatestClassification();

        if (!classification) {
            return res.status(404).json({ message: "No classification found" });
        }

        return res.status(200).json({
            message: "Latest classification retrieved",
            classification
        });
    } catch (error) {
        console.error("Error retrieving latest classification", error);
        return res.status(500).json({ message: "Server Error" });
    }
}