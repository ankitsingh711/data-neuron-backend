import mongoose, { Document, Schema } from 'mongoose';

export interface CountersModel extends Document {
  addCount: number;
  updateCount: number;
}

const CountersSchema = new Schema({
  addCount: { type: Number, default: 0 },
  updateCount: { type: Number, default: 0 },
});

export default mongoose.model<CountersModel>('Counters', CountersSchema);
