# Hostel seed data (portable)

Use these files on **any machine** to fill the `hostel` table.

| File | Purpose |
|------|---------|
| `hostels-seed.json` | 45 hostels with full details + unique photo URLs |
| `hostels-seed.sql` | Same data as MySQL `INSERT` script |

Each hostel has **3 different images** (`picsum.photos` IDs), so cards do not all share one photo.

## Option A — Automatic (recommended)

Restart the Spring Boot app.  
If the `hostel` table is **empty**, `HostelDataSeeder` loads `src/main/resources/data/hostels-seed.json` automatically.

## Option B — MySQL manually

```bash
mysql -u root -p hostel_finder < hostels-seed.sql
```

Or in MySQL Workbench: open `hostels-seed.sql` → Run.

## Option C — Regenerate data

```bash
node scripts/generate-hostel-seed.js
```

## Notes

- Photos need internet (URLs are remote).
- Seeder does **not** overwrite existing rows (safe to restart).
- To re-seed: delete hostels in DB, then restart the app.
