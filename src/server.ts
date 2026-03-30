import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect DB first (logs handled in connectDB)
await connectDB();

// Import app
const app = await import('./app.js');

// Start server
const server = app.default.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

export default server;

