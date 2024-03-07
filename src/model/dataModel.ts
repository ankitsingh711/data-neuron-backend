import mongoose, { Schema, Document } from 'mongoose';

export interface DataInterface extends Document {
  name: string;
  description: string,
  countAdd: Number,
  countUpdate: Number
}

const dataSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, require: true },
  countAdd: { type: Number, default: 0},
  countUpdate: { type: Number, default: 0}
});

const Data = mongoose.model<DataInterface>('Data', dataSchema);

export default Data;
