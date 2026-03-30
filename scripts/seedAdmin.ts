import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { UserModel } from '../src/model/User.js';

dotenv.config();

// Validate required env vars
const requiredVars = ['ADMIN_EMAIL', 'ADMIN_PASSWORD', 'ADMIN_FIRST_NAME', 'ADMIN_LAST_NAME', 'MONGODB_URI'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error(`❌ Missing required env vars: ${missingVars.join(', ')}`);
  console.log('Set them in .env and run again.');
  process.exit(1);
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME!;
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME!;
const ADMIN_NAME = `${ADMIN_FIRST_NAME} ${ADMIN_LAST_NAME}`;

const seedAdmin = async () => {
  let conn: typeof mongoose | undefined;
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGODB_URI or MONGO_URI required');
    }
    
    conn = mongoose;
    await conn.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    
    const admin = await UserModel.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password_hash: hashedPassword,
        role: 'ADMIN',
        company_name: 'SmartRecruitment Platform'
      },
      { upsert: true, new: true }
    );
    
    console.log(`✅ Admin user ensured: ${ADMIN_EMAIL}`);
    console.log('💡 Login via /api/auth/login');
    console.log('🔒 Password is set in your .env - NEVER commit it!');
  } catch (error: any) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  } finally {
    if (conn?.connection) {
      await conn.connection.close();
      console.log('🔌 DB connection closed');
    }
  }
  process.exit(0);
};

seedAdmin();

