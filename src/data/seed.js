export const seedData = {
  users: [
    {
      id: 'user-asha',
      name: 'Asha Mehta',
      type: 'Small business owner',
      role: 'user',
      plan: 'Business',
      paymentStatus: 'paid',
      storage: { usedMb: 420, limitMb: 2048 }
    },
    {
      id: 'user-rahul',
      name: 'Rahul Verma',
      type: 'Freelancer',
      role: 'user',
      plan: 'Premium',
      paymentStatus: 'paid',
      storage: { usedMb: 180, limitMb: 1024 }
    },
    {
      id: 'user-neha',
      name: 'Neha Singh',
      type: 'Student',
      role: 'user',
      plan: 'Free',
      paymentStatus: 'trial',
      storage: { usedMb: 40, limitMb: 200 }
    },
    {
      id: 'admin-nancy',
      name: 'Nancy Admin',
      type: 'Operations',
      role: 'admin',
      plan: 'Business',
      paymentStatus: 'internal',
      storage: { usedMb: 90, limitMb: 4096 }
    }
  ],
  reminders: [
    { id: 'rem-1', userId: 'user-asha', text: 'Pay electricity bill', date: '2026-06-09', time: '11:00', repeat: 'monthly', channel: 'WhatsApp' },
    { id: 'rem-2', userId: 'user-asha', text: 'Call CA for GST return', date: '2026-06-09', time: '16:30', repeat: 'none', channel: 'email' },
    { id: 'rem-3', userId: 'user-rahul', text: 'Send portfolio update', date: '2026-06-09', time: '18:00', repeat: 'weekly', channel: 'app' },
    { id: 'rem-4', userId: 'user-neha', text: 'Submit assignment', date: '2026-06-09', time: '20:00', repeat: 'none', channel: 'app' }
  ],
  tasks: [
    { id: 'task-1', userId: 'user-asha', title: 'Prepare supplier payment list', scope: 'business', priority: 'high', status: 'pending' },
    { id: 'task-2', userId: 'user-asha', title: 'Review store stock', scope: 'business', priority: 'medium', status: 'in progress' },
    { id: 'task-3', userId: 'user-asha', title: 'Book family doctor appointment', scope: 'personal', priority: 'low', status: 'completed' },
    { id: 'task-4', userId: 'user-rahul', title: 'Finish client landing page copy', scope: 'business', priority: 'high', status: 'pending' },
    { id: 'task-5', userId: 'user-neha', title: 'Create exam revision plan', scope: 'personal', priority: 'medium', status: 'pending' }
  ],
  documents: [
    { id: 'doc-1', userId: 'user-asha', name: 'Aadhaar card.pdf', category: 'Identity', expiry: '2030-01-01', sizeMb: 2 },
    { id: 'doc-2', userId: 'user-asha', name: 'GST certificate.pdf', category: 'Business', expiry: '2027-03-31', sizeMb: 4 },
    { id: 'doc-3', userId: 'user-asha', name: 'Shop lease agreement.pdf', category: 'Business', expiry: '2026-12-15', sizeMb: 8 },
    { id: 'doc-4', userId: 'user-rahul', name: 'PAN card.pdf', category: 'Identity', expiry: '2030-01-01', sizeMb: 1 },
    { id: 'doc-5', userId: 'user-neha', name: 'College ID.pdf', category: 'Education', expiry: '2027-05-30', sizeMb: 1 }
  ],
  appointments: [
    { id: 'appt-1', userId: 'user-asha', title: 'Distributor pricing call', date: '2026-06-09', time: '14:00', reminderBefore: '15 minutes', notes: 'Discuss new wholesale rates.' },
    { id: 'appt-2', userId: 'user-asha', title: 'Bank loan document review', date: '2026-06-10', time: '12:30', reminderBefore: '30 minutes', notes: 'Carry GST and bank statements.' },
    { id: 'appt-3', userId: 'user-rahul', title: 'Client kickoff', date: '2026-06-09', time: '17:00', reminderBefore: '10 minutes', notes: 'Finalize scope.' }
  ],
  calendarEvents: [
    { id: 'event-1', userId: 'user-asha', title: 'Weekly store planning', date: '2026-06-09', time: '09:30' },
    { id: 'event-2', userId: 'user-asha', title: 'Vendor payment window', date: '2026-06-11', time: '10:00' },
    { id: 'event-3', userId: 'user-rahul', title: 'Invoice review', date: '2026-06-10', time: '11:00' }
  ],
  ledger: [
    { id: 'led-1', userId: 'user-asha', type: 'income', category: 'Sales', amount: 18500, note: 'Morning store sales' },
    { id: 'led-2', userId: 'user-asha', type: 'expense', category: 'Inventory', amount: 6200, note: 'Supplier advance' },
    { id: 'led-3', userId: 'user-asha', type: 'expense', category: 'Transport', amount: 750, note: 'Delivery tempo' },
    { id: 'led-4', userId: 'user-rahul', type: 'income', category: 'Client payment', amount: 12000, note: 'Milestone one' },
    { id: 'led-5', userId: 'user-rahul', type: 'expense', category: 'Software', amount: 999, note: 'Design tool' },
    { id: 'led-6', userId: 'user-neha', type: 'expense', category: 'Books', amount: 850, note: 'Reference book' }
  ],
  supportTickets: [
    { id: 'ticket-1', userId: 'user-asha', subject: 'Need WhatsApp reminder setup', status: 'open' },
    { id: 'ticket-2', userId: 'user-rahul', subject: 'Invoice export request', status: 'resolved' }
  ],
  usageReports: [
    { id: 'usage-1', label: 'Reminder sends queued', value: '46 this week' },
    { id: 'usage-2', label: 'Email drafts generated', value: '31 this week' },
    { id: 'usage-3', label: 'Document searches', value: '74 this week' },
    { id: 'usage-4', label: 'AI chat commands', value: '128 this week' }
  ]
};

export const securityRoadmap = [
  'JWT/session auth with passwordless login',
  'Role-based API access for users and admins',
  'User-scoped database tables and tenant isolation',
  'Encrypted document storage and audit logs',
  'Automated backups and restore points',
  'Razorpay/Stripe payment gateway integration',
  'WhatsApp and email notification providers',
  'Google/Microsoft calendar sync',
  'Real AI assistant API with tool calling'
];
