import { Router } from 'express';
import { registerUser, getUserProfile, updateUserProfile } from '../controller/userController.js';
const router = Router();
router.post('/register', registerUser);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
export default router;
//# sourceMappingURL=userRoutes.js.map