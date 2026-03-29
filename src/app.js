import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// DB connection
connectDB();
// Routes
app.use('/api/users', userRoutes);
// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});
export default app;
//# sourceMappingURL=app.js.map