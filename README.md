# Nancy AI - Your Personal Assistant 24x7

Working MVP web app for a simple personal assistant SaaS dashboard for daily life and small business work. This is suitable for a professional client demo, freelance handoff, or first paid MVP milestone.

## What is included

- Mock login/signup through separate demo accounts.
- User-scoped mock data for reminders, tasks, documents, appointments, calendar events, hisab-kitab, and AI chat.
- Plan badges for Free, Premium, and Business users.
- Dashboard with today's reminders, pending tasks, appointments, important documents, calendar events, and daily cash summary.
- Reminder creation with date, time, repeat, and channel.
- Task creation with personal/business scope, priority, and status.
- Document mock upload, folders, search, expiry reminders, and storage usage.
- Email assistant with professional templates and copy button.
- Appointment/calendar daily and weekly views with meeting notes.
- Daily hisab-kitab income/expense entries, categories, totals, and placeholder export buttons.
- Rule-based AI chat assistant with code structured so real AI can be connected later.
- Admin panel for users, subscriptions, payment status, storage limits, usage reports, and support tickets.
- Success/error notifications and basic form validation for a cleaner demo experience.
- Client demo guide on the dashboard so a buyer can understand the product flow quickly.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173/
```

## Client demo script

Use this flow when presenting the MVP:

1. Open the app and sign in as `Asha Mehta` to show a business-owner dashboard.
2. Explain that each account has separated data through `userId` filtering in the mock data model.
3. Add a reminder, task, appointment, document, and hisab-kitab entry to show real workflows.
4. Open Email Assistant and copy a professional follow-up draft.
5. Open AI Chat and try: `Show today's expenses` or `Find my uploaded Aadhaar card`.
6. Log out and sign in as `Nancy Admin` to show admin users, plans, payments, storage, usage reports, and support tickets.
7. Close by explaining the production roadmap: database, secure auth, real AI, payments, notifications, and calendar sync.

## Deployment

### Option 1: Vercel

1. Push this folder to a GitHub repository.
2. Go to `https://vercel.com/new`.
3. Import the repository.
4. Keep these settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click Deploy.

### Option 2: Netlify

1. Push this folder to a GitHub repository.
2. Go to `https://app.netlify.com/start`.
3. Import the repository.
4. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click Deploy site.

### Option 3: Static hosting

Run:

```bash
npm run build
```

Upload the generated `dist/` folder to any static host.

## What to tell a client

This MVP is a frontend demo with local mock data. It proves the product workflow, dashboard UX, role-based admin concept, and AI-assistant structure. For production launch, the next paid phase should add backend APIs, database persistence, secure authentication, file storage, payment gateway, notifications, calendar sync, and real AI integration.

## File structure

```text
nancy-ai-mvp/
  index.html
  package.json
  README.md
  src/
    main.jsx          Main React app, views, forms, mock auth, rule-based AI
    styles.css        Responsive SaaS dashboard styles
    data/
      seed.js         User-scoped sample data and security roadmap placeholders
```

## Architecture notes

The current MVP uses local React state and sample seed data. Every user-facing record includes `userId`, and the app filters data by the active session so the database/API version can preserve tenant separation.

Error handling included in the MVP:

- Empty form submissions show action-needed messages.
- Save actions show success notifications.
- Clipboard copy reports success or browser clipboard errors.
- Unknown data collections and invalid session saves are guarded.
- Placeholder exports clearly report that backend implementation is needed.

Planned backend placeholders:

- JWT/session authentication with passwordless or password login.
- Role-based API access for users and admins.
- User-scoped database tables and tenant isolation.
- Encrypted document storage, audit logs, and backups.
- Payment gateway integration for Premium and Business plans.
- WhatsApp/email notification providers.
- Google/Microsoft calendar sync.
- Real AI assistant API with tool calling for reminders, email, document search, and accounting queries.

## Next development roadmap

1. Add a backend API with database persistence.
2. Replace mock auth with secure login and account creation.
3. Add real document upload and encrypted object storage.
4. Connect notification providers for WhatsApp and email reminders.
5. Integrate calendar sync and appointment invites.
6. Connect a payment gateway and plan enforcement.
7. Add real AI with function/tool calls against user-scoped data.
8. Add tests for data separation, forms, admin permissions, and assistant commands.
