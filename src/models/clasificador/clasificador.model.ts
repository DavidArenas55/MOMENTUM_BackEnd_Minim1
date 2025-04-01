import mongoose, { Schema, Document } from "mongoose";

export interface ICalendarClassification extends Document {
  personal: mongoose.Types.ObjectId[];
  shared: mongoose.Types.ObjectId[];
  busy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CalendarClassificationSchema: Schema = new Schema(
  {
    personal: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar", default: [] }],
    shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar", default: [] }],
    busy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar", default: [] }],
  },
  { timestamps: true }
);

const CalendarClassification = mongoose.model<ICalendarClassification>(
  "CalendarClassification",
  CalendarClassificationSchema
);

export default CalendarClassification;
