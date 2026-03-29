# Updated Task: Fix MongoDB Connection - Phase 2 (Move to server.ts)

## Steps:
- [x] Step 1: Update src/config/db.ts (debug log removed)
- [x] Step 2: Remove await connectDB() from src/app.ts
- [x] Step 3: Update src/server.ts to async import app after connectDB()
- [x] Step 4: Test `npm run dev` ✅ DB connected with dbname in URI, server on port 3000

