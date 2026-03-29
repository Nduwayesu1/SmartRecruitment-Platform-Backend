import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ['RECRUITER', 'CANDIDATE'], required: true },
    company_name: { type: String },
    profile_image: { type: String }
}, { timestamps: true });
export const UserModel = model('users', userSchema);
//# sourceMappingURL=User.js.map