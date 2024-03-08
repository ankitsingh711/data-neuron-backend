import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: String,
  failedLoginAttempts: number,
  emailVerified: boolean
}

const UserSchema: Schema = new Schema({
  email: { type: String, require: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  failedLoginAttempts: { type: Number, default: 0},
  emailVerified: { type: Boolean, default: false }
});

export default mongoose.model<IUser>("User", UserSchema);
