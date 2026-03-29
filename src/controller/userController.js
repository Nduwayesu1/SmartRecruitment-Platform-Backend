import bcrypt from 'bcryptjs';
import util from 'util';
import { UserModel } from '../model/User.js';
import cloudinary from '../config/cloudinaryConfig.js';
import transporter from '../config/email.js';
import { upload } from '../middleware/multer.js';
export const registerUser = [
    upload,
    async (req, res) => {
        try {
            const { name, email, password, role, company_name } = req.body;
            let profile_image = undefined;
            if (req.file) {
                const uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ folder: 'profile_images' }, (error, result) => {
                        if (error)
                            reject(error);
                        resolve(result);
                    }).end(req.file.buffer);
                });
                profile_image = uploadResult.secure_url;
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await UserModel.create({
                name,
                email,
                password_hash: hashedPassword,
                role,
                company_name: role === 'RECRUITER' ? company_name : undefined,
                profile_image
            });
            // Send welcome email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Welcome ${name}!`,
                text: 'Thanks for joining SmartRecruitmentPlatform.',
            });
            res.status(201).json({ message: 'User registered successfully', userId: user._id });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];
export const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password_hash');
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const updateUserProfile = [
    upload,
    async (req, res) => {
        try {
            const updates = { ...req.body };
            if (req.file) {
                const uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ folder: 'profile_images' }, (error, result) => {
                        if (error)
                            reject(error);
                        resolve(result);
                    }).end(req.file.buffer);
                });
                updates.profile_image = uploadResult.secure_url;
            }
            const user = await UserModel.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password_hash');
            res.json({ message: 'Profile updated', user });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];
//# sourceMappingURL=userController.js.map