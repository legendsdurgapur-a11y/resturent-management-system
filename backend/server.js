/**
 * BistroFlow Restaurant Backend API
 * Stack: Node.js + Express + SQLite (via better-sqlite3)
 * Port : 3001
 *
 * Endpoints:
 *   GET    /api/tables
 *   PUT    /api/tables/:id/status
 *   GET    /api/reservations
 *   POST   /api/reservations
 *   PATCH  /api/reservations/:id/seat
 *   PATCH  /api/reservations/:id/cancel
 *   PATCH  /api/reservations/:id/complete
 *   POST   /api/reset
 */

const express = require('express');
const cors    = require('cors');
const Database = require('better-sqlite3');
const path    = require('path');

// ── App Setup ────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Database ─────────────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'bistroflow.db'));
db.pragma('journal_mode = WAL');

// ── Schema ────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS tables (
    id           TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    capacity     INTEGER NOT NULL,
    shape        TEXT NOT NULL,
    section      TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'Available',
    currentGuest TEXT,
    seatedAt     TEXT,
    minSpend     INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id         TEXT PRIMARY KEY,
    guestName  TEXT NOT NULL,
    phone      TEXT NOT NULL,
    email      TEXT NOT NULL DEFAULT 'guest@example.com',
    partySize  INTEGER NOT NULL,
    date       TEXT NOT NULL,
    timeSlot   TEXT NOT NULL,
    tableId    TEXT NOT NULL,
    section    TEXT NOT NULL,
    status     TEXT NOT NULL DEFAULT 'Confirmed',
    notes      TEXT DEFAULT ''
  );
`);

// ── Seed Data ─────────────────────────────────────────────────────────────────
const SEED_TABLES = [
  { id: 'T-01', name: 'Table 1',          capacity: 2, shape: 'round',     section: 'Indoor Dining', status: 'Occupied',  currentGuest: 'Alexander Smith',     seatedAt: '18:15', minSpend: 0 },
  { id: 'T-02', name: 'Table 2',          capacity: 4, shape: 'rectangle', section: 'Indoor Dining', status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'T-03', name: 'Table 3',          capacity: 4, shape: 'rectangle', section: 'Indoor Dining', status: 'Reserved',  currentGuest: 'Sophia Martinez',     seatedAt: null,    minSpend: 0 },
  { id: 'T-04', name: 'Table 4',          capacity: 6, shape: 'rectangle', section: 'Indoor Dining', status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'T-05', name: 'Table 5',          capacity: 2, shape: 'round',     section: 'Indoor Dining', status: 'Occupied',  currentGuest: 'Liam & Olivia Johnson',seatedAt: '18:40', minSpend: 0 },
  { id: 'T-06', name: 'Table 6 (Grand)',  capacity: 8, shape: 'rectangle', section: 'Indoor Dining', status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'P-01', name: 'Patio 1',          capacity: 2, shape: 'round',     section: 'Garden Patio',  status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'P-02', name: 'Patio 2',          capacity: 4, shape: 'rectangle', section: 'Garden Patio',  status: 'Reserved',  currentGuest: 'David Miller',        seatedAt: null,    minSpend: 0 },
  { id: 'P-03', name: 'Patio 3',          capacity: 4, shape: 'rectangle', section: 'Garden Patio',  status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'P-04', name: 'Patio 4',          capacity: 6, shape: 'rectangle', section: 'Garden Patio',  status: 'Occupied',  currentGuest: 'Chen Family',         seatedAt: '19:00', minSpend: 0 },
  { id: 'B-01', name: 'Bar Seat 1',       capacity: 2, shape: 'round',     section: 'Bar Lounge',    status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'B-02', name: 'Bar Seat 2',       capacity: 2, shape: 'round',     section: 'Bar Lounge',    status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'V-01', name: 'VIP Booth 1',      capacity: 6, shape: 'rectangle', section: 'VIP Booths',    status: 'Available', currentGuest: null,                  seatedAt: null,    minSpend: 0 },
  { id: 'V-02', name: 'VIP Booth 2',      capacity: 8, shape: 'rectangle', section: 'VIP Booths',    status: 'Reserved',  currentGuest: 'Dr. Raj Patel',       seatedAt: null,    minSpend: 0 },
];

const SEED_RESERVATIONS = [
  { id: 'RES-101', guestName: 'Alexander Smith',     phone: '+1 555-0192', email: 'alex.smith@example.com',  partySize: 2, date: new Date().toISOString().split('T')[0], timeSlot: '06:00 PM', tableId: 'T-01', section: 'Indoor Dining', status: 'Seated',    notes: '' },
  { id: 'RES-102', guestName: 'Sophia Martinez',     phone: '+1 555-0248', email: 's.martinez@example.com',  partySize: 4, date: new Date().toISOString().split('T')[0], timeSlot: '07:00 PM', tableId: 'T-03', section: 'Indoor Dining', status: 'Confirmed', notes: 'Allergic to shellfish' },
  { id: 'RES-103', guestName: 'David Miller',        phone: '+1 555-0371', email: 'd.miller@example.com',    partySize: 4, date: new Date().toISOString().split('T')[0], timeSlot: '07:30 PM', tableId: 'P-02', section: 'Garden Patio',  status: 'Confirmed', notes: 'Birthday celebration' },
  { id: 'RES-104', guestName: 'Liam Johnson',        phone: '+1 555-0419', email: 'l.johnson@example.com',   partySize: 2, date: new Date().toISOString().split('T')[0], timeSlot: '06:30 PM', tableId: 'T-05', section: 'Indoor Dining', status: 'Seated',    notes: '' },
  { id: 'RES-105', guestName: 'Dr. Raj Patel',       phone: '+91 9876-0000',email: 'raj.patel@example.com',  partySize: 5, date: new Date().toISOString().split('T')[0], timeSlot: '08:00 PM', tableId: 'V-02', section: 'VIP Booths',    status: 'Confirmed', notes: 'VIP — bring complimentary wine' },
  { id: 'RES-106', guestName: 'Eleanor Vance',       phone: '+1 555-0657', email: 'e.vance@example.com',     partySize: 3, date: new Date().toISOString().split('T')[0], timeSlot: '08:30 PM', tableId: 'T-04', section: 'Indoor Dining', status: 'Confirmed', notes: '' },
];

function seedIfEmpty() {
  const tableCount = db.prepare('SELECT COUNT(*) as c FROM tables').get().c;
  if (tableCount === 0) {
    const insertTable = db.prepare(
      'INSERT OR IGNORE INTO tables VALUES (@id,@name,@capacity,@shape,@section,@status,@currentGuest,@seatedAt,@minSpend)'
    );
    for (const t of SEED_TABLES) insertTable.run(t);
  }

  const resCount = db.prepare('SELECT COUNT(*) as c FROM reservations').get().c;
  if (resCount === 0) {
    const insertRes = db.prepare(
      'INSERT OR IGNORE INTO reservations VALUES (@id,@guestName,@phone,@email,@partySize,@date,@timeSlot,@tableId,@section,@status,@notes)'
    );
    for (const r of SEED_RESERVATIONS) insertRes.run(r);
  }
}
seedIfEmpty();

// ── Helper ─────────────────────────────────────────────────────────────────────
function parseTable(row) {
  if (!row) return null;
  return { ...row, minSpend: row.minSpend || 0 };
}

// ── ROUTES: Tables ─────────────────────────────────────────────────────────────
// GET /api/tables
app.get('/api/tables', (req, res) => {
  const rows = db.prepare('SELECT * FROM tables ORDER BY id').all();
  res.json(rows.map(parseTable));
});

// PUT /api/tables/:id/status
app.put('/api/tables/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, currentGuest, seatedAt } = req.body;

  if (!['Available', 'Reserved', 'Occupied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const stmt = db.prepare(
    `UPDATE tables SET status=@status, currentGuest=@currentGuest, seatedAt=@seatedAt WHERE id=@id`
  );
  const info = stmt.run({
    id,
    status,
    currentGuest: status === 'Available' ? null : (currentGuest || null),
    seatedAt: status === 'Occupied' ? (seatedAt || 'Just now') : (status === 'Available' ? null : null),
  });

  if (info.changes === 0) return res.status(404).json({ error: 'Table not found' });
  const updated = db.prepare('SELECT * FROM tables WHERE id=?').get(id);
  res.json(parseTable(updated));
});

// ── ROUTES: Reservations ───────────────────────────────────────────────────────
// GET /api/reservations
app.get('/api/reservations', (req, res) => {
  const rows = db.prepare('SELECT * FROM reservations ORDER BY id DESC').all();
  res.json(rows);
});

// POST /api/reservations
app.post('/api/reservations', (req, res) => {
  const { id, guestName, phone, email, partySize, date, timeSlot, tableId, section, status, notes } = req.body;

  if (!guestName || !phone || !tableId) {
    return res.status(400).json({ error: 'guestName, phone, and tableId are required' });
  }

  const newId = id || `RES-${Date.now().toString().slice(-4)}`;

  db.prepare(
    'INSERT INTO reservations (id,guestName,phone,email,partySize,date,timeSlot,tableId,section,status,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  ).run(newId, guestName, phone, email || 'guest@example.com', partySize || 2, date, timeSlot, tableId, section, status || 'Confirmed', notes || '');

  // Mark table as Reserved
  db.prepare("UPDATE tables SET status='Reserved', currentGuest=? WHERE id=?").run(guestName, tableId);

  const inserted = db.prepare('SELECT * FROM reservations WHERE id=?').get(newId);
  const updatedTable = db.prepare('SELECT * FROM tables WHERE id=?').get(tableId);
  res.status(201).json({ reservation: inserted, table: parseTable(updatedTable) });
});

// PATCH /api/reservations/:id/seat
app.patch('/api/reservations/:id/seat', (req, res) => {
  const { id } = req.params;
  const { tableId, guestName } = req.body;

  db.prepare("UPDATE reservations SET status='Seated' WHERE id=?").run(id);

  if (tableId) {
    db.prepare("UPDATE tables SET status='Occupied', currentGuest=?, seatedAt='Just now' WHERE id=?")
      .run(guestName || 'Guest', tableId);
  }

  const reservation = db.prepare('SELECT * FROM reservations WHERE id=?').get(id);
  const table = tableId ? db.prepare('SELECT * FROM tables WHERE id=?').get(tableId) : null;
  res.json({ reservation, table: parseTable(table) });
});

// PATCH /api/reservations/:id/cancel
app.patch('/api/reservations/:id/cancel', (req, res) => {
  const { id } = req.params;
  const { tableId } = req.body;

  db.prepare("UPDATE reservations SET status='Cancelled' WHERE id=?").run(id);

  if (tableId) {
    db.prepare("UPDATE tables SET status='Available', currentGuest=NULL, seatedAt=NULL WHERE id=?").run(tableId);
  }

  const reservation = db.prepare('SELECT * FROM reservations WHERE id=?').get(id);
  const table = tableId ? db.prepare('SELECT * FROM tables WHERE id=?').get(tableId) : null;
  res.json({ reservation, table: parseTable(table) });
});

// PATCH /api/reservations/:id/complete
app.patch('/api/reservations/:id/complete', (req, res) => {
  const { id } = req.params;
  const { tableId } = req.body;

  db.prepare("UPDATE reservations SET status='Completed' WHERE id=?").run(id);

  if (tableId) {
    db.prepare("UPDATE tables SET status='Available', currentGuest=NULL, seatedAt=NULL WHERE id=?").run(tableId);
  }

  const reservation = db.prepare('SELECT * FROM reservations WHERE id=?').get(id);
  const table = tableId ? db.prepare('SELECT * FROM tables WHERE id=?').get(tableId) : null;
  res.json({ reservation, table: parseTable(table) });
});

// POST /api/reset  — Reset DB to seed data (demo use only)
app.post('/api/reset', (req, res) => {
  db.prepare('DELETE FROM reservations').run();
  db.prepare('DELETE FROM tables').run();

  const insertTable = db.prepare(
    'INSERT INTO tables VALUES (@id,@name,@capacity,@shape,@section,@status,@currentGuest,@seatedAt,@minSpend)'
  );
  for (const t of SEED_TABLES) insertTable.run(t);

  const insertRes = db.prepare(
    'INSERT INTO reservations VALUES (@id,@guestName,@phone,@email,@partySize,@date,@timeSlot,@tableId,@section,@status,@notes)'
  );
  for (const r of SEED_RESERVATIONS) insertRes.run(r);

  res.json({ message: 'Database reset to seed data.' });
});

// ── Health Check ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'BistroFlow Backend', timestamp: new Date().toISOString() });
});

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🍽️  BistroFlow Backend running at http://localhost:${PORT}`);
  console.log(`   ✅ SQLite DB : bistroflow.db`);
  console.log(`   ✅ API Base  : http://localhost:${PORT}/api`);
  console.log(`   Routes:`);
  console.log(`     GET    /api/tables`);
  console.log(`     PUT    /api/tables/:id/status`);
  console.log(`     GET    /api/reservations`);
  console.log(`     POST   /api/reservations`);
  console.log(`     PATCH  /api/reservations/:id/seat`);
  console.log(`     PATCH  /api/reservations/:id/cancel`);
  console.log(`     PATCH  /api/reservations/:id/complete`);
  console.log(`     POST   /api/reset\n`);
});

