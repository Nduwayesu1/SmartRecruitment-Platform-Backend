import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { UserModel } from '../src/model/User.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'oriviernduwayesu@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345678';
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME || 'Nduwayesu';
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || 'Olivier';
const ADMIN_NAME = `${ADMIN_FIRST_NAME} ${ADMIN_LAST_NAME}`;

dotenv.config();
const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    
    await UserModel.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password_hash: hashedPassword,
        role: 'RECRUITER',
        company_name: 'SmartRecruitment Platform'
      },
      { upsert: true, new: true }
    );
    
    console.log(`Admin user seeded: ${ADMIN_EMAIL} (password: ${ADMIN_PASSWORD})`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();

