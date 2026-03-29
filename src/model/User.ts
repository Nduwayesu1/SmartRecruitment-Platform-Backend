import { Schema, model, type Document, type InferSchemaType } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password_hash: string;
  role: 'ADMIN' | 'RECRUITER' | 'CANDIDATE' | 'COMPANY';
  company_name?: string;
  profile_image?: string;
  otp?: string;
  otp_expires?: Date | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User, {}, {}, {}, {}, {}, InferSchemaType<User>>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'RECRUITER', 'CANDIDATE', 'COMPANY'], required: true },
  company_name: { type: String },
  profile_image: { type: String },
  otp: { type: String },
  otp_expires: { type: Date }
}, { timestamps: true });

export const UserModel = model<User>('User', userSchema);

