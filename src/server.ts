import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';
import { UserModel } from './model/User.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect DB first
await connectDB();

// Seed/Update admin - safe upsert with custom messages
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'oriviernduwayesu@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345678';
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME || 'Nduwayesu';
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || 'Olivier';
const ADMIN_NAME = `${ADMIN_FIRST_NAME} ${ADMIN_LAST_NAME}`;

try {
  const existingAdmin = await UserModel.findOne({ email: ADMIN_EMAIL });
  if (existingAdmin) {
    console.log(`✓ Admin user already registered: ${ADMIN_EMAIL} (role: ${existingAdmin.role})`);
    if (existingAdmin.role !== 'ADMIN') {
      await UserModel.findOneAndUpdate(
        { email: ADMIN_EMAIL },
        {
          $set: {
            role: 'ADMIN',
            name: ADMIN_NAME,
            company_name: 'SmartRecruitment Platform'
          }
        }
      );
      console.log(`✓ Updated to ADMIN role for ${ADMIN_EMAIL}`);
    } else {
      console.log(`✓ Admin is ready: ${ADMIN_EMAIL}`);
    }
  } else {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await UserModel.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password_hash: hashedPassword,
      role: 'ADMIN',
      company_name: 'SmartRecruitment Platform'
    });
    console.log(`✓ New Admin created: ${ADMIN_EMAIL} (password: ${ADMIN_PASSWORD}, company: SmartRecruitment Platform)`);
  }
} catch (error: any) {
  if (error.code === 11000) {
    console.log(`✓ Admin email already exists (duplicate ignored): ${ADMIN_EMAIL}`);
  } else {
    console.error('Admin seed error:', error.message);
  }
}

const app = await import('./app.js');

const server = app.default.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

export default server;

