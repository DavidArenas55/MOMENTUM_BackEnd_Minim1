import Calendar, { ICalendar } from "../calendari/calendar.model";
import CalendarClassification, { ICalendarClassification } from "./clasificador.model";
import mongoose from "mongoose";


export class CalendarClassifierService {
  /**
   * Ejecuta la clasificación de calendarios y persiste el resultado en la base de datos.
   *
   * @param busyThreshold Número mínimo de citas para considerar un calendario como "busy" (por defecto: 10).
   * @returns El documento de clasificación persistido.
   */
  async classifyAndPersist(busyThreshold: number = 10): Promise<ICalendarClassification> {
    try {
      // Obtener todos los calendarios activos
      const calendars: ICalendar[] = await Calendar.find({ isDeleted: false });

      const classified = {
        personal: [] as mongoose.Types.ObjectId[],
        shared: [] as mongoose.Types.ObjectId[],
        busy: [] as mongoose.Types.ObjectId[],
      };

      // Clasificar los calendarios según las reglas
      calendars.forEach((calendar) => {
        if (calendar.invitees.length === 0 && calendar._id) {
          classified.personal.push(calendar._id);
        } else if (calendar.appointments.length >= busyThreshold && calendar._id) {
          classified.busy.push(calendar._id);
        } else if (calendar._id) {
          classified.shared.push(calendar._id);
        }
      });

      // Crear y guardar la clasificación en la base de datos
      const classification = new CalendarClassification(classified);
      return await classification.save();
    } catch (error) {
      throw new Error(`Error en la clasificación de calendarios: ${error}`);
    }
  }
  
  async getLatestClassification() {
    try {
        const latestClassification = await CalendarClassification.findOne().sort({ createdAt: -1 });
        return latestClassification;
    } catch (error) {
        throw new Error(`Error retrieving latest classification: ${error}`);
    }
}
}
