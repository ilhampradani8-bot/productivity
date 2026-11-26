-- Aura Executive Desk • Cloudflare D1 Database Schema
-- Database: productivity-db (ID: b578aca0-067d-4e7f-a5a4-d5ca02b009c5)

-- 1. Tabel Agenda & Tugas Eksekutif
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  time_start TEXT,
  time_end TEXT,
  target_date TEXT,
  recurrence TEXT DEFAULT 'none',
  duration_years INTEGER DEFAULT 1,
  validity_type TEXT DEFAULT 'until_completed',
  status TEXT DEFAULT 'pending',
  completed_dates TEXT,
  deleted_dates TEXT,
  missed_reasons TEXT,
  note TEXT,
  has_second_session INTEGER DEFAULT 0,
  session2_start TEXT,
  session2_end TEXT,
  raw_json TEXT,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_tasks_target_date ON tasks(target_date);
CREATE INDEX IF NOT EXISTS idx_tasks_time_start ON tasks(time_start);

-- 2. Tabel Konfigurasi & Profil Pengguna
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT
);

-- 3. Tabel Log Notifikasi & Riwayat Aktivitas
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  time TEXT,
  type TEXT,
  status TEXT,
  phone TEXT,
  details TEXT
);

-- 4. Antrean Notifikasi WhatsApp (Bridge Cloudflare Edge -> UTM Host)
CREATE TABLE IF NOT EXISTS notification_queue (
  id TEXT PRIMARY KEY,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT,
  sent_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_notif_status ON notification_queue(status);

-- 5. Tabel Permohonan Pertemuan & Konsultasi Publik (Portal meet.ilhampradani.me)
CREATE TABLE IF NOT EXISTS meeting_requests (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_org TEXT,
  client_phone TEXT NOT NULL,
  category TEXT DEFAULT 'Konsultasi Hukum',
  meeting_date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  mode TEXT DEFAULT 'Online (Google Meet / WhatsApp Call)',
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_meeting_date ON meeting_requests(meeting_date);
CREATE INDEX IF NOT EXISTS idx_meeting_status ON meeting_requests(status);

