import { type Document } from 'mongoose';
export interface User extends Document {
    name: string;
    email: string;
    password_hash: string;
    role: 'RECRUITER' | 'CANDIDATE';
    company_name?: string;
    profile_image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserModel: import("mongoose").Model<User, {}, {}, {}, Document<unknown, {}, User, {}, {}> & User & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map