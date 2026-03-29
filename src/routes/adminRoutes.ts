import { Router } from 'express';
import { UserModel } from '../model/User.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken, authorizeAdmin);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Search and filter users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ADMIN, RECRUITER, CANDIDATE, COMPANY]
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Filtered users list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                       profile_image:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                 total:
 *                   type: number
 */
router.get('/users', async (req, res) => {
  try {
    const { search, role, limit = 20 } = req.query;
    
    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } }
      ];
    }
    if (role) {
      query.role = role as string;
    }

    const users = await UserModel.find(query)
      .select('-password_hash -otp -otp_expires')
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await UserModel.countDocuments(query);

    res.json({ users, total });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Edit user by admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, RECRUITER, CANDIDATE, COMPANY]
 *               company_name:
 *                 type: string
 *             example:
 *               name: "John Doe"
 *               email: "john@example.com"
 *               role: "RECRUITER"
 *               company_name: "Tech Corp"
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already exists
 */
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, role, company_name } = req.body;
    
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if email changed and exists
    if (email && email !== user.email) {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) return res.status(409).json({ error: 'Email already exists' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    if (company_name !== undefined) {
      user.company_name = company_name;
    }

    await user.save();

    const userResponse = await UserModel.findById(user._id).select('-password_hash -otp -otp_expires');
    res.json({ message: 'User updated successfully', user: userResponse });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;

