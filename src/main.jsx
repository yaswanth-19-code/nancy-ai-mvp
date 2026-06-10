import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bell,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Copy,
  CreditCard,
  FileText,
  Home,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Plus,
  Rocket,
  Search,
  ShieldCheck,
  Upload,
  Users,
  Wallet,
  X
} from 'lucide-react';
import { seedData, securityRoadmap } from './data/seed.js';
import './styles.css';

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'tasks', label: 'Tasks', icon: ClipboardList },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'hisab', label: 'Hisab-kitab', icon: IndianRupee },
  { id: 'chat', label: 'AI Chat', icon: Bot },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, adminOnly: true }
];

const emailTemplates = {
  followup: 'Subject: Payment Follow-up\n\nDear {{name}},\n\nI hope you are doing well. This is a polite follow-up regarding the pending payment for {{topic}}. Please let me know if you need any further details from my side.\n\nRegards,\nNancy AI User',
  complaint: 'Subject: Concern Regarding {{topic}}\n\nDear {{name}},\n\nI am writing to raise a concern about {{topic}}. Kindly review this matter and share the next steps at the earliest.\n\nRegards,\nNancy AI User',
  thanks: 'Subject: Thank You\n\nDear {{name}},\n\nThank you for your support regarding {{topic}}. I appreciate your time and cooperation.\n\nRegards,\nNancy AI User',
  proposal: 'Subject: Proposal for {{topic}}\n\nDear {{name}},\n\nPlease find my proposal for {{topic}}. I would be happy to discuss the scope, timeline, and pricing at your convenience.\n\nRegards,\nNancy AI User',
  appointment: 'Subject: Appointment Confirmation\n\nDear {{name}},\n\nThis confirms our appointment regarding {{topic}}. Please let me know if the scheduled time needs any changes.\n\nRegards,\nNancy AI User'
};

function App() {
  const [session, setSession] = useState(null);
  const [data, setData] = useState(seedData);
  const [active, setActive] = useState(getInitialSection());
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState(null);

  const currentUser = session ? data.users.find((user) => user.id === session.userId) : null;
  const userData = useMemo(() => {
    if (!currentUser) return null;
    return selectUserData(data, currentUser.id);
  }, [data, currentUser]);

  function login(userId) {
    const user = data.users.find((item) => item.id === userId);
    if (!user) {
      showNotice('error', 'This demo account was not found. Please choose another account.');
      return;
    }
    setSession({ userId, role: user.role });
    setActive('dashboard');
    window.location.hash = 'dashboard';
    showNotice('success', `Signed in as ${user.name}. User data is scoped to this account.`);
  }

  function showNotice(type, message) {
    setNotice({ type, message });
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => setNotice(null), 3600);
  }

  useEffect(() => {
    function syncSectionFromHash() {
      const requested = window.location.hash.replace('#', '') || 'dashboard';
      setActive(nav.some((item) => item.id === requested) ? requested : 'dashboard');
    }
    syncSectionFromHash();
    window.addEventListener('hashchange', syncSectionFromHash);
    return () => window.removeEventListener('hashchange', syncSectionFromHash);
  }, []);

  function addRecord(collection, record, successMessage = 'Saved successfully.') {
    try {
      if (!currentUser) throw new Error('Please sign in again before saving.');
      if (!Array.isArray(data[collection])) throw new Error(`Unknown data collection: ${collection}.`);
      setData((existing) => ({
        ...existing,
        [collection]: [
          { ...record, id: `${collection}-${Date.now()}`, userId: currentUser.id },
          ...existing[collection]
        ]
      }));
      showNotice('success', successMessage);
      return true;
    } catch (error) {
      showNotice('error', error.message || 'Something went wrong while saving.');
      return false;
    }
  }

  if (!session) {
    return <LoginScreen users={data.users} onLogin={login} />;
  }

  const visibleNav = nav.filter((item) => !item.adminOnly || currentUser.role === 'admin');
  const ActiveIcon = visibleNav.find((item) => item.id === active)?.icon || Home;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">N</div>
          <div>
            <strong>Nancy AI</strong>
            <span>Personal Assistant 24x7</span>
          </div>
        </div>
        <nav>
          {visibleNav.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'active' : ''}
                onClick={() => {
                  setActive(item.id);
                  setMenuOpen(false);
                }}
                title={item.label}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="security-note">
          <ShieldCheck size={18} />
          <span>Client demo build. User data is separated in the model; production auth, encrypted storage, backups, payment, notifications, calendar sync, and real AI are documented for handoff.</span>
        </div>
      </aside>

      <main className="main">
        {notice && <Toast notice={notice} onClose={() => setNotice(null)} />}
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)} title="Open menu">
            <Menu size={20} />
          </button>
          <div>
            <p className="eyebrow"><ActiveIcon size={16} /> {visibleNav.find((item) => item.id === active)?.label}</p>
            <h1>{active === 'dashboard' ? `Good day, ${currentUser.name}` : pageTitle(active)}</h1>
          </div>
          <div className="account">
            <span className={`plan ${currentUser.plan.toLowerCase()}`}>{currentUser.plan}</span>
            <div>
              <strong>{currentUser.name}</strong>
              <small>{currentUser.type}</small>
            </div>
            <button className="icon-button" onClick={() => setSession(null)} title="Log out">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {menuOpen && <button className="scrim mobile-only" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>}

        {active === 'dashboard' && <Dashboard userData={userData} currentUser={currentUser} />}
        {active === 'reminders' && <Reminders reminders={userData.reminders} addRecord={addRecord} notify={showNotice} />}
        {active === 'tasks' && <Tasks tasks={userData.tasks} addRecord={addRecord} notify={showNotice} />}
        {active === 'documents' && <Documents documents={userData.documents} addRecord={addRecord} storage={currentUser.storage} notify={showNotice} />}
        {active === 'email' && <EmailAssistant notify={showNotice} />}
        {active === 'calendar' && <Calendar appointments={userData.appointments} events={userData.calendarEvents} addRecord={addRecord} notify={showNotice} />}
        {active === 'hisab' && <Hisab entries={userData.ledger} addRecord={addRecord} notify={showNotice} />}
        {active === 'chat' && <Chat userData={userData} addRecord={addRecord} notify={showNotice} />}
        {active === 'admin' && currentUser.role === 'admin' && <AdminPanel data={data} />}
      </main>
    </div>
  );
}

function LoginScreen({ users, onLogin }) {
  return (
    <main className="login-screen">
      <section className="login-panel">
        <div className="brand big">
          <div className="brand-mark">N</div>
          <div>
            <strong>Nancy AI</strong>
            <span>Your Personal Assistant 24x7</span>
          </div>
        </div>
        <h1>Client demo accounts</h1>
        <p>Use these sample accounts to demonstrate separate user experiences, plan-based positioning, admin controls, and daily assistant workflows.</p>
        <div className="login-grid">
          {users.map((user) => (
            <button key={user.id} className="login-card" onClick={() => onLogin(user.id)}>
              <span className={`plan ${user.plan.toLowerCase()}`}>{user.plan}</span>
              <strong>{user.name}</strong>
              <small>{user.type} · {user.role}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function Dashboard({ userData, currentUser }) {
  const pendingTasks = userData.tasks.filter((task) => task.status !== 'completed');
  const todayCashIn = sum(userData.ledger.filter((entry) => entry.type === 'income'));
  const todayCashOut = sum(userData.ledger.filter((entry) => entry.type === 'expense'));
  return (
    <div className="page-grid">
      <Metric title="Today's Reminders" value={userData.reminders.length} detail={userData.reminders[0]?.text || 'No reminders yet'} icon={Bell} />
      <Metric title="Pending Tasks" value={pendingTasks.length} detail={`${userData.tasks.filter((task) => task.status === 'completed').length} completed`} icon={ClipboardList} />
      <Metric title="Appointments" value={userData.appointments.length} detail={userData.appointments[0]?.title || 'No meetings'} icon={CalendarDays} />
      <Metric title="Daily Hisab-kitab" value={`₹${todayCashIn - todayCashOut}`} detail={`Cash in ₹${todayCashIn} · cash out ₹${todayCashOut}`} icon={Wallet} />

      <Panel title="Client Demo Guide" wide>
        <div className="guide-grid">
          <GuideStep title="1. Open the dashboard" text={`Show ${currentUser.name}'s separated ${currentUser.plan} workspace and daily summary.`} />
          <GuideStep title="2. Add real work" text="Create a reminder, task, appointment, document, and hisab-kitab entry with validation." />
          <GuideStep title="3. Show AI value" text="Use chat examples and email drafts to explain how real AI can be connected later." />
          <GuideStep title="4. Close with roadmap" text="Open Admin to show plans, usage, support, security, payment, and deployment direction." />
        </div>
      </Panel>

      <Panel title="Today at a Glance" wide>
        <div className="summary-list">
          {userData.reminders.slice(0, 3).map((item) => <ListRow key={item.id} title={item.text} meta={`${item.date} · ${item.time} · ${item.channel}`} />)}
          {pendingTasks.slice(0, 3).map((item) => <ListRow key={item.id} title={item.title} meta={`${item.priority} priority · ${item.status}`} />)}
        </div>
      </Panel>
      <Panel title="Important Documents">
        {userData.documents.slice(0, 4).map((doc) => <ListRow key={doc.id} title={doc.name} meta={`${doc.category} · expires ${doc.expiry}`} />)}
      </Panel>
      <Panel title="Calendar Events">
        {userData.calendarEvents.map((event) => <ListRow key={event.id} title={event.title} meta={`${event.date} · ${event.time}`} />)}
      </Panel>
    </div>
  );
}

function Reminders({ reminders, addRecord, notify }) {
  return (
    <TwoColumn
      left={<ReminderForm onAdd={(record) => addRecord('reminders', record, 'Reminder added and queued for notification.')} notify={notify} />}
      right={<Panel title="Reminder List">{reminders.map((item) => <ListRow key={item.id} title={item.text} meta={`${item.date} ${item.time} · ${item.repeat} · ${item.channel}`} />)}</Panel>}
    />
  );
}

function ReminderForm({ onAdd, notify }) {
  const [form, setForm] = useState({ text: '', date: today(), time: '10:00', repeat: 'none', channel: 'app' });
  function submit() {
    if (!form.text.trim()) {
      notify('error', 'Please enter reminder text before saving.');
      return;
    }
    onAdd({ ...form, text: form.text.trim() });
    setForm({ ...form, text: '' });
  }
  return (
    <Panel title="Add Reminder">
      <FormGrid>
        <input value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Renew shop license" />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <select value={form.repeat} onChange={(e) => setForm({ ...form, repeat: e.target.value })}><option>none</option><option>daily</option><option>weekly</option><option>monthly</option></select>
        <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}><option>app</option><option>email</option><option>WhatsApp</option></select>
        <button className="primary" onClick={submit}><Plus size={16} /> Add Reminder</button>
      </FormGrid>
    </Panel>
  );
}

function Tasks({ tasks, addRecord, notify }) {
  const [form, setForm] = useState({ title: '', scope: 'business', priority: 'medium', status: 'pending' });
  const byStatus = ['pending', 'in progress', 'completed'].map((status) => ({ status, count: tasks.filter((task) => task.status === status).length }));
  function submit() {
    if (!form.title.trim()) {
      notify('error', 'Please enter a task title before saving.');
      return;
    }
    addRecord('tasks', { ...form, title: form.title.trim() }, 'Task added to the daily work summary.');
    setForm({ ...form, title: '' });
  }
  return (
    <TwoColumn
      left={<Panel title="Add Task"><FormGrid>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Call supplier" />
        <select value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })}><option>personal</option><option>business</option></select>
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>high</option><option>medium</option><option>low</option></select>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>pending</option><option>in progress</option><option>completed</option></select>
        <button className="primary" onClick={submit}><Plus size={16} /> Add Task</button>
      </FormGrid></Panel>}
      right={<Panel title="Daily Task Summary">
        <div className="mini-metrics">{byStatus.map((item) => <span key={item.status}>{item.status}<strong>{item.count}</strong></span>)}</div>
        {tasks.map((task) => <ListRow key={task.id} title={task.title} meta={`${task.scope} · ${task.priority} · ${task.status}`} />)}
      </Panel>}
    />
  );
}

function Documents({ documents, addRecord, storage, notify }) {
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ name: '', category: 'Identity', expiry: today(), sizeMb: 1 });
  const filtered = documents.filter((doc) => `${doc.name} ${doc.category}`.toLowerCase().includes(query.toLowerCase()));
  function submit() {
    if (!form.name.trim()) {
      notify('error', 'Please enter a document name before saving.');
      return;
    }
    addRecord('documents', { ...form, name: form.name.trim() }, 'Document saved with expiry reminder metadata.');
    setForm({ ...form, name: '' });
  }
  return (
    <TwoColumn
      left={<Panel title="Mock Upload"><FormGrid>
        <label className="upload-box"><Upload size={22} /> Choose file UI placeholder</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Aadhaar card.pdf" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Identity</option><option>Finance</option><option>Business</option><option>Education</option><option>Health</option></select>
        <input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
        <button className="primary" onClick={submit}><Plus size={16} /> Save Document</button>
      </FormGrid></Panel>}
      right={<Panel title="Documents">
        <div className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Aadhaar, GST, invoice..." /></div>
        <div className="storage"><span style={{ width: `${Math.min(100, (storage.usedMb / storage.limitMb) * 100)}%` }} /></div>
        <small>{storage.usedMb} MB of {storage.limitMb} MB used</small>
        {filtered.map((doc) => <ListRow key={doc.id} title={doc.name} meta={`${doc.category} · expiry reminder ${doc.expiry}`} />)}
      </Panel>}
    />
  );
}

function EmailAssistant({ notify }) {
  const [type, setType] = useState('followup');
  const [name, setName] = useState('Client');
  const [topic, setTopic] = useState('pending invoice');
  const draft = emailTemplates[type].replaceAll('{{name}}', name).replaceAll('{{topic}}', topic);
  return (
    <TwoColumn
      left={<Panel title="Generate Draft"><FormGrid>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="followup">Follow-up</option><option value="complaint">Complaint</option><option value="thanks">Thank you</option><option value="proposal">Proposal</option><option value="appointment">Appointment confirmation</option>
        </select>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={topic} onChange={(e) => setTopic(e.target.value)} />
      </FormGrid></Panel>}
      right={<Panel title="Professional Email Draft">
        <textarea className="draft" value={draft} readOnly />
        <button className="secondary" onClick={() => copyDraft(draft, notify)}><Copy size={16} /> Copy Draft</button>
      </Panel>}
    />
  );
}

function Calendar({ appointments, events, addRecord, notify }) {
  const [view, setView] = useState('daily');
  const [form, setForm] = useState({ title: '', date: today(), time: '15:00', reminderBefore: '15 minutes', notes: '' });
  function submit() {
    if (!form.title.trim()) {
      notify('error', 'Please enter an appointment title before saving.');
      return;
    }
    addRecord('appointments', { ...form, title: form.title.trim() }, 'Appointment added with meeting reminder details.');
    setForm({ ...form, title: '', notes: '' });
  }
  return (
    <TwoColumn
      left={<Panel title="Add Appointment"><FormGrid>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Meeting with accountant" />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <select value={form.reminderBefore} onChange={(e) => setForm({ ...form, reminderBefore: e.target.value })}><option>10 minutes</option><option>15 minutes</option><option>30 minutes</option><option>1 hour</option></select>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Meeting notes" />
        <button className="primary" onClick={submit}><Plus size={16} /> Add Appointment</button>
      </FormGrid></Panel>}
      right={<Panel title="Schedule">
        <div className="segmented"><button className={view === 'daily' ? 'selected' : ''} onClick={() => setView('daily')}>Daily</button><button className={view === 'weekly' ? 'selected' : ''} onClick={() => setView('weekly')}>Weekly</button></div>
        {[...appointments, ...events].map((item) => <ListRow key={item.id} title={item.title} meta={`${item.date} · ${item.time} · reminder ${item.reminderBefore || 'app'}`} />)}
      </Panel>}
    />
  );
}

function Hisab({ entries, addRecord, notify }) {
  const [form, setForm] = useState({ type: 'expense', category: 'Food', amount: 0, note: '' });
  const income = sum(entries.filter((entry) => entry.type === 'income'));
  const expense = sum(entries.filter((entry) => entry.type === 'expense'));
  const categories = groupExpense(entries);
  function submit() {
    if (!form.category.trim()) {
      notify('error', 'Please enter an income or expense category.');
      return;
    }
    if (!Number.isFinite(form.amount) || form.amount <= 0) {
      notify('error', 'Please enter an amount greater than 0.');
      return;
    }
    addRecord('ledger', { ...form, category: form.category.trim() }, 'Hisab-kitab entry added to today\'s summary.');
    setForm({ ...form, amount: 0, note: '' });
  }
  return (
    <TwoColumn
      left={<Panel title="Daily Entry"><FormGrid>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>income</option><option>expense</option></select>
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" />
        <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
        <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Note" />
        <button className="primary" onClick={submit}><Plus size={16} /> Add Entry</button>
        <div className="export-row"><button className="secondary" onClick={() => notify('success', 'Excel export placeholder ready for backend implementation.')}>Export Excel</button><button className="secondary" onClick={() => notify('success', 'PDF export placeholder ready for backend implementation.')}>Export PDF</button></div>
      </FormGrid></Panel>}
      right={<Panel title="Cash Summary">
        <div className="mini-metrics"><span>Cash in<strong>₹{income}</strong></span><span>Cash out<strong>₹{expense}</strong></span><span>Balance<strong>₹{income - expense}</strong></span></div>
        {Object.entries(categories).map(([category, amount]) => <ListRow key={category} title={category} meta={`Expense ₹${amount}`} />)}
        <ListRow title="Weekly total" meta={`₹${income - expense} net this week`} />
        <ListRow title="Monthly total" meta={`₹${(income - expense) * 4} projected net`} />
      </Panel>}
    />
  );
}

function Chat({ userData, addRecord, notify }) {
  const examples = ['Remind me tomorrow at 10 AM', 'Draft an email for payment follow-up', "Show today's expenses", 'What meetings do I have today?', 'Find my uploaded Aadhaar card', "Create today's task list"];
  const [messages, setMessages] = useState([{ from: 'nancy', text: 'Hi, I am Nancy. Ask me about your reminders, tasks, documents, meetings, email drafts, or hisab-kitab.' }]);
  const [text, setText] = useState('');
  function send(value = text) {
    if (!value.trim()) {
      notify('error', 'Please type a command or choose an example.');
      return;
    }
    setMessages((items) => [...items, { from: 'user', text: value }, { from: 'nancy', text: mockAiResponse(value, userData, addRecord) }]);
    setText('');
  }
  return (
    <Panel title="AI Chat Assistant">
      <div className="chips">{examples.map((item) => <button key={item} onClick={() => send(item)}>{item}</button>)}</div>
      <div className="chat-window">{messages.map((message, index) => <div key={index} className={`bubble ${message.from}`}>{message.text}</div>)}</div>
      <div className="chat-input"><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Ask Nancy..." /><button className="primary" onClick={() => send()}>Send</button></div>
    </Panel>
  );
}

function AdminPanel({ data }) {
  return (
    <div className="page-grid">
      <Metric title="Users" value={data.users.length} detail="Mock user management" icon={Users} />
      <Metric title="Paid Plans" value={data.users.filter((user) => user.plan !== 'Free').length} detail="Premium and Business" icon={CreditCard} />
      <Metric title="Support Tickets" value={data.supportTickets.length} detail="Open and resolved queue" icon={Mail} />
      <Metric title="Storage Control" value={`${Math.round(data.users.reduce((total, user) => total + user.storage.usedMb, 0))} MB`} detail="Across all accounts" icon={FileText} />
      <Panel title="Subscription Plan Management" wide>{data.users.map((user) => <ListRow key={user.id} title={user.name} meta={`${user.plan} · ${user.paymentStatus} · limit ${user.storage.limitMb} MB`} />)}</Panel>
      <Panel title="Usage Reports">{data.usageReports.map((report) => <ListRow key={report.id} title={report.label} meta={report.value} />)}</Panel>
      <Panel title="Support Tickets">{data.supportTickets.map((ticket) => <ListRow key={ticket.id} title={ticket.subject} meta={`${ticket.status} · ${ticket.userId}`} />)}</Panel>
      <Panel title="Architecture Roadmap">{securityRoadmap.map((item) => <ListRow key={item} title={item} meta="Placeholder ready for backend implementation" />)}</Panel>
    </div>
  );
}

function Toast({ notice, onClose }) {
  return (
    <div className={`toast ${notice.type}`}>
      <div>
        <strong>{notice.type === 'error' ? 'Action needed' : 'Done'}</strong>
        <span>{notice.message}</span>
      </div>
      <button onClick={onClose} title="Dismiss"><X size={16} /></button>
    </div>
  );
}

function GuideStep({ title, text }) {
  return (
    <div className="guide-step">
      <Rocket size={18} />
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function Panel({ title, children, wide }) {
  return <section className={`panel ${wide ? 'wide' : ''}`}><h2>{title}</h2>{children}</section>;
}

function Metric({ title, value, detail, icon: Icon }) {
  return <section className="metric"><Icon size={20} /><span>{title}</span><strong>{value}</strong><small>{detail}</small></section>;
}

function ListRow({ title, meta }) {
  return <div className="list-row"><CheckCircle2 size={17} /><div><strong>{title}</strong><small>{meta}</small></div></div>;
}

function TwoColumn({ left, right }) {
  return <div className="two-column"><div>{left}</div><div>{right}</div></div>;
}

function FormGrid({ children }) {
  return <div className="form-grid">{children}</div>;
}

function pageTitle(active) {
  return ({ hisab: 'Daily Hisab-kitab', email: 'Email Assistant', chat: 'AI Chat Assistant', admin: 'Admin Panel' }[active] || active[0].toUpperCase() + active.slice(1));
}

function getInitialSection() {
  if (typeof window === 'undefined') return 'dashboard';
  const requested = window.location.hash.replace('#', '') || 'dashboard';
  return nav.some((item) => item.id === requested) ? requested : 'dashboard';
}

function selectUserData(data, userId) {
  return {
    reminders: data.reminders.filter((item) => item.userId === userId),
    tasks: data.tasks.filter((item) => item.userId === userId),
    documents: data.documents.filter((item) => item.userId === userId),
    appointments: data.appointments.filter((item) => item.userId === userId),
    calendarEvents: data.calendarEvents.filter((item) => item.userId === userId),
    ledger: data.ledger.filter((item) => item.userId === userId)
  };
}

function mockAiResponse(input, userData, addRecord) {
  const text = input.toLowerCase();
  if (text.includes('remind')) {
    addRecord('reminders', { text: input, date: today(1), time: '10:00', repeat: 'none', channel: 'app' }, 'AI command created a reminder.');
    return 'Reminder created for tomorrow at 10:00 AM in the app channel.';
  }
  if (text.includes('email') || text.includes('draft')) return 'Open Email Assistant and choose Follow-up. I can draft a professional payment follow-up with recipient and invoice details.';
  if (text.includes('expense') || text.includes('hisab')) return `Today's cash out is ₹${sum(userData.ledger.filter((entry) => entry.type === 'expense'))}. Top categories: ${Object.keys(groupExpense(userData.ledger)).join(', ')}.`;
  if (text.includes('meeting') || text.includes('appointment')) return userData.appointments.map((item) => `${item.title} at ${item.time}`).join('\n') || 'No meetings found today.';
  if (text.includes('aadhaar') || text.includes('document')) return userData.documents.find((doc) => doc.name.toLowerCase().includes('aadhaar')) ? 'Found Aadhaar card in Identity documents.' : 'No Aadhaar document found in your uploaded files.';
  if (text.includes('task')) return `Today's task list: ${userData.tasks.filter((task) => task.status !== 'completed').map((task) => task.title).join(', ')}.`;
  return 'I can help with reminders, email drafts, expenses, meetings, document search, and task planning. This MVP uses rule-based responses, with a real AI API slot ready for later.';
}

async function copyDraft(draft, notify) {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard is not available in this browser.');
    await navigator.clipboard.writeText(draft);
    notify('success', 'Email draft copied to clipboard.');
  } catch (error) {
    notify('error', error.message || 'Unable to copy this draft.');
  }
}

function sum(items) {
  return items.reduce((total, item) => total + Number(item.amount || 0), 0);
}

function groupExpense(entries) {
  return entries.filter((entry) => entry.type === 'expense').reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + Number(entry.amount);
    return acc;
  }, {});
}

function today(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

createRoot(document.getElementById('root')).render(<App />);
