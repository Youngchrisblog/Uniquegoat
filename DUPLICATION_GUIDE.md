# Project Duplication Guide

## Quick Start: Duplicating for Another Domain

This guide will help you create an exact copy of this Elite Options University site for your brother to use with his own domain and branding.

### Step 1: Fork/Copy the Replit Project

1. **In Replit**: Click the three dots menu → "Fork Repl"
2. **Rename** the forked project (e.g., "options-trading-university-v2")
3. The new project will have all code, but **NOT** your database data

### Step 2: Set Up New Database

The forked project needs its own database:

1. The PostgreSQL database will be automatically created
2. When the server first starts, it will **automatically seed** with:
   - 100 unique realistic testimonials (68 five-star, 20 four-star, 12 three-star)
   - 20 stock symbols in the watchlist
   - Default stats (member count, trades called, etc.)
   - Sample video lessons

**That's it!** The new site is ready to run with fresh, realistic data.

### Step 3: Customize Branding & Content

Edit these key values in the code:

#### A. Company Name & Telegram Link
File: `client/src/pages/home.tsx` (and other pages)
```typescript
// Find and replace:
"Elite Options University" → "Your Brother's Brand Name"
"https://t.me/shtrading01" → "https://t.me/his_telegram"
```

#### B. Contact Information
File: `client/src/pages/contact.tsx`
```typescript
// Update Telegram link
href="https://t.me/his_telegram"
```

#### C. Stats (Member Count, etc.)
Admin panel lets you edit stats without code:
1. Login at `/admin/login` (username: `admin`, password: `admin123`)
2. Go to "Stats" section
3. Update member count, trades called, success rate

#### D. Testimonials
The admin panel has full CRUD for testimonials:
- Add new ones
- Edit existing
- Delete unwanted ones
- Upload profit screenshots

### Step 4: Change Admin Password (CRITICAL!)

**Security First!** Change the default admin credentials:

1. Go to `server/db.ts`, find the `seedDatabase` function
2. Update this section:
```typescript
// CHANGE THESE VALUES:
const hashedPassword = await bcrypt.hash("NEW_SECURE_PASSWORD", 10);
await db.insert(admins).values({
  username: "your_new_username",  // Change this
  password: hashedPassword
});
```
3. Delete the old admin account via database:
```sql
DELETE FROM admins WHERE username = 'admin';
```
4. Restart the server to create the new admin account

### Step 5: Connect Custom Domain

In Replit:
1. Go to "Deployments" tab
2. Click "Deploy"
3. Once deployed, click "Add custom domain"
4. Follow instructions to point the domain's DNS to Replit

---

## What Gets Duplicated Automatically

✅ **Yes - Full Copy:**
- All frontend code and styling
- Backend API logic
- Admin panel functionality
- Database schema and automatic seeding
- TikTok detection and Telegram modal
- File upload system
- Session management and security

❌ **No - Must Be Created Fresh:**
- Database content (gets fresh seed data automatically)
- Uploaded images/videos in `/uploads` folder
- Session data
- Admin accounts (gets default admin, then change it)

---

## Differences Between Original & Duplicate

The duplicate will be **identical** except:
- Different database (starts fresh with 100 new testimonials)
- Different deployment URL (until you add custom domain)
- Different uploaded files (admin needs to re-upload any custom images)

**Everything else is exactly the same.**

---

## Cost Considerations

Each Replit project with database requires:
- Replit account (can be free tier for development)
- For production: Replit Core or higher (~$20/month)
- Database hosting is included with Core plan

Your brother needs his own Replit account to run his version.

---

## Ongoing Maintenance

### Adding Content
Use the admin panel (`/admin/dashboard`) to:
- Add/edit testimonials
- Upload profit screenshots
- Add video lessons
- Update blog posts
- Change stats

### Monitoring Traffic
The visitor analytics track:
- Total visitors
- Page views
- Session duration
- TikTok vs other traffic sources

View in admin panel under "Analytics" (when implemented).

---

## Quick Checklist for Brother

- [ ] Fork the Replit project
- [ ] Wait for database to auto-seed (check console: "Database seeded successfully")
- [ ] Change admin username and password
- [ ] Update all "Elite Options University" text to his brand name
- [ ] Update all Telegram links to his Telegram handle
- [ ] Customize stats (member count, etc.) via admin panel
- [ ] Upload custom testimonial images if desired
- [ ] Deploy to production
- [ ] Add custom domain
- [ ] Test TikTok detection by visiting from TikTok browser
- [ ] Verify Telegram modal opens correctly

---

## Common Issues & Solutions

### "Database already seeded" but no data showing
**Fix:** Clear the database and restart:
```sql
DELETE FROM testimonials;
DELETE FROM stocks;
DELETE FROM stats;
DELETE FROM video_lessons;
```
Then restart the server - it will re-seed automatically.

### Can't login to admin panel
**Fix:** Check the console logs for the default credentials, or reset:
```sql
DELETE FROM admins;
```
Restart server to create fresh admin account.

### Images not uploading
**Fix:** Check folder permissions and ensure `uploads/` folder exists:
```bash
mkdir -p uploads
```

### Telegram link not working from TikTok
**Fix:** TikTok blocks external links. The modal should auto-open on TikTok browsers. Verify browser detection is working.

---

## Need Help?

If your brother gets stuck:
1. Check the console logs in Replit
2. Check browser console for frontend errors
3. Verify database has data: `SELECT COUNT(*) FROM testimonials;`
4. Restart the server (usually fixes most issues)
