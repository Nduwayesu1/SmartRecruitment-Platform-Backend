import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { UserModel } from '../model/User.js';
import transporter from '../config/email.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface OTPSession {
  email: string;
  expires: number;
}

let sessionStore: OTPSession | null = null;

export const loginUser = async (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otp_expires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Store session
    sessionStore = {
      email: user.email,
      expires: Date.now() + 10 * 60 * 1000
    };

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: email,
      subject: 'Your 2FA OTP Code',
      text: `Your OTP code is ${otp}. Valid for 10 minutes.`,
    });

    res.json({ 
      message: 'OTP sent to email. Enter OTP to complete login.',
      sessionId: 'otp-session'
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;

    if (!sessionStore || Date.now() > sessionStore.expires) {
      return res.status(400).json({ error: 'No active session. Login again.' });
    }

    const user = await UserModel.findOne({ email: sessionStore.email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const currentTime = new Date();
    if (!user.otp || user.otp !== otp || user.otp_expires === undefined || user.otp_expires < currentTime) {
      sessionStore = null;
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Clear session & OTP
    sessionStore = null;
    user.otp = undefined;
    user.otp_expires = undefined;
    await user.save();

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_image: user.profile_image
      }
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

