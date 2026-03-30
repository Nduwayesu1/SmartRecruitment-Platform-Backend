# Server Startup Logs Cleanup

## Changes to src/server.ts:
- [ ] Remove all admin seeding console.logs (email, pw, role).
- [ ] Keep only: DB connected (from connectDB), Server port, Swagger URL.
- [ ] Remove risky defaults, make seeding env-only/silent.
- [ ] Optional: Remove server.ts seeding, rely on npm run seed.

## Status
✅ Complete:
- src/server.ts: Minimal - DB connect + server/Swagger logs only (admin seeding removed).
- src/config/db.ts: Clean "✅ DB Connected".
- tsconfig.json: "types": ["node"].
- Types installed.

Startup now:
```
✅ DB Connected
Server running on port 3000
Swagger docs: http://localhost:3000/api-docs
```

Admin via `npm run seed` only (secure).


