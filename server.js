/**
 * Aura Executive Desk - Host Gateway & Queue Dispatcher
 * Runs on Port 3080 (WSL2 / UTM Workstation)
 * - Directly bridges to Baileys WhatsApp Bot on UTM (Port 3055)
 * - Continuously polls Cloudflare D1 for queued notifications
 * - Serves Executive Dashboard & Public Meeting Booking Portal
 * - 0% touch to Baileys auth files; perfectly isolated
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Load local environment variables from .env if present
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        let val = trimmed.substring(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    }
  }
} catch (e) {}

const PORT = process.env.PORT || 3080;
const PUBLIC_DIR = __dirname;
const WA_BOT_API = process.env.WA_BOT_API || 'http://127.0.0.1:3055';
const TARGET_PHONE = process.env.TARGET_PHONE || '6288971071138';

// Cloudflare D1 Configuration (via Environment)
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'cd95efc74562ac2f0c0d9759d06d7d89';
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const D1_DATABASE_ID = process.env.D1_DATABASE_ID || 'b578aca0-067d-4e7f-a5a4-d5ca02b009c5';
const D1_QUERY_ENDPOINT = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function timeToMins(t) {
  if (!t || !t.includes(":")) return 0;
  const [h, m] = t.split(":");
  return parseInt(h, 10) * 60 + parseInt(m, 10);
}

function minsToTime(m) {
  const h = String(Math.floor(m / 60)).padStart(2, "0");
  const min = String(m % 60).padStart(2, "0");
  return `${h}:${min}`;
}

async function queryD1(sql) {
  try {
    const res = await fetch(D1_QUERY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sql }),
      signal: AbortSignal.timeout(6000)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('D1 Query Error:', err.message);
    return null;
  }
}

async function sendWhatsAppMessage(target, text) {
  try {
    const res = await fetch(`${WA_BOT_API}/send-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: target || TARGET_PHONE, text }),
      signal: AbortSignal.timeout(8000)
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Background Worker: Polling antrean notifikasi dari Cloudflare D1
async function pollD1NotificationQueue() {
  try {
    const data = await queryD1("SELECT * FROM notification_queue WHERE status = 'pending' ORDER BY created_at ASC LIMIT 5;");
    if (data && data.success && data.result && data.result[0] && data.result[0].results) {
      const items = data.result[0].results;
      for (const item of items) {
        console.log(`[D1 Queue] Memproses pesan ID ${item.id} ke ${item.phone}...`);
        const sendResult = await sendWhatsAppMessage(item.phone || TARGET_PHONE, item.message);
        if (sendResult && sendResult.success) {
          console.log(`[D1 Queue] Berhasil terkirim via Baileys UTM: ${item.id}`);
          const escapedId = item.id.replace(/'/g, "''");
          await queryD1(`UPDATE notification_queue SET status = 'sent', sent_at = datetime('now') WHERE id = '${escapedId}';`);
        } else {
          console.error(`[D1 Queue] Gagal mengirim ${item.id}:`, sendResult.error || 'Unknown error');
        }
      }
    }
  } catch (err) {
    // Suppress polling connection errors
  }
}

// Jalankan polling setiap 6 detik
setInterval(pollD1NotificationQueue, 6000);

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // API: Status WhatsApp Bot
  if (pathname === '/api/wa-status' && req.method === 'GET') {
    try {
      const response = await fetch(`${WA_BOT_API}/status`, { signal: AbortSignal.timeout(3000) });
      const data = await response.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ online: true, botData: data, defaultTarget: TARGET_PHONE }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ online: false, error: e.message, defaultTarget: TARGET_PHONE }));
    }
  }

  // API: Kirim Pesan ke WhatsApp via Bot Lokal Langsung
  if (pathname === '/api/send-wa' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const phone = parsed.phone || parsed.target || TARGET_PHONE;
        const message = parsed.message || parsed.text;

        if (!message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Pesan wajib diisi' }));
        }

        const botData = await sendWhatsAppMessage(phone, message);
        res.writeHead(botData.success ? 200 : 500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(botData));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Gagal menghubungi server WhatsApp: ' + err.message }));
      }
    });
    return;
  }

  // API PUBLIC: Ketersediaan Waktu Kosong Real-Time
  if (pathname === '/api/public/available-slots' && req.method === 'GET') {
    const date = parsedUrl.searchParams.get("date") || new Date().toISOString().split("T")[0];
    const d1Data = await queryD1("SELECT time_start, time_end, title, recurrence, status, target_date FROM tasks WHERE status != 'cancelled';");
    const results = d1Data?.result?.[0]?.results || [];

    const occupiedIntervals = [];
    results.forEach(r => {
      let applies = false;
      if (!r.recurrence || r.recurrence === "none") {
        if (r.target_date === date) applies = true;
      } else if (r.recurrence === "daily") {
        applies = true;
      } else if (r.recurrence === "weekdays") {
        const parts = date.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        if (dow >= 1 && dow <= 5) applies = true;
      } else {
        applies = true;
      }

      if (applies && r.time_start && r.time_end) {
        const s = timeToMins(r.time_start);
        const e = timeToMins(r.time_end);
        if (e > s) occupiedIntervals.push({ start: s, end: e, title: r.title });
      }
    });

    occupiedIntervals.sort((a, b) => a.start - b.start);

    const mergedBusy = [];
    occupiedIntervals.forEach(curr => {
      if (mergedBusy.length === 0) {
        mergedBusy.push({ ...curr });
      } else {
        const last = mergedBusy[mergedBusy.length - 1];
        if (curr.start <= last.end) {
          last.end = Math.max(last.end, curr.end);
        } else {
          mergedBusy.push({ ...curr });
        }
      }
    });

    const workStart = 480; // 08:00
    const workEnd = 1260;  // 21:00
    const slots = [];
    let pointer = workStart;

    mergedBusy.forEach(busy => {
      if (busy.end <= workStart || busy.start >= workEnd) return;

      const effectiveStart = Math.max(workStart, busy.start);
      const effectiveEnd = Math.min(workEnd, busy.end);

      if (effectiveStart > pointer) {
        const diff = effectiveStart - pointer;
        if (diff >= 45) {
          slots.push({
            start: minsToTime(pointer),
            end: minsToTime(effectiveStart),
            duration: `${Math.floor(diff / 60)} jam ${diff % 60 ? diff % 60 + ' mnt' : ''}`.trim(),
            available: true
          });
        }
      }

      slots.push({
        start: minsToTime(effectiveStart),
        end: minsToTime(effectiveEnd),
        duration: "Terisi",
        available: false
      });

      pointer = Math.max(pointer, effectiveEnd);
    });

    if (pointer < workEnd) {
      const diff = workEnd - pointer;
      if (diff >= 45) {
        slots.push({
          start: minsToTime(pointer),
          end: minsToTime(workEnd),
          duration: `${Math.floor(diff / 60)} jam ${diff % 60 ? diff % 60 + ' mnt' : ''}`.trim(),
          available: true
        });
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, date, slots }));
  }

  // API PUBLIC: Submit Meeting Request
  if (pathname === '/api/public/submit-meeting' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const p = JSON.parse(body || '{}');
        const id = "meet-" + Date.now();
        const name = (p.name || p.client_name || "Tamu").replace(/'/g, "''");
        const org = (p.org || p.client_org || "-").replace(/'/g, "''");
        const phone = (p.phone || p.client_phone || "").replace(/'/g, "''");
        const category = (p.category || "Konsultasi Umum").replace(/'/g, "''");
        const date = (p.date || p.meeting_date || "").replace(/'/g, "''");
        const start = (p.start || p.start_time || "").replace(/'/g, "''");
        const end = (p.end || p.end_time || "").replace(/'/g, "''");
        const mode = (p.mode || "virtual").replace(/'/g, "''");
        const notes = (p.notes || "").replace(/'/g, "''");

        // Simpan ke Cloudflare D1
        const sql = `INSERT INTO meeting_requests (id, client_name, client_org, client_phone, category, meeting_date, start_time, end_time, mode, notes, status, created_at, updated_at) VALUES ('${id}', '${name}', '${org}', '${phone}', '${category}', '${date}', '${start}', '${end}', '${mode}', '${notes}', 'pending', datetime('now'), datetime('now'));`;
        await queryD1(sql);

        // Kirim WhatsApp Langsung ke Pak Ilham
        const waMsg = 
`Halo Pak Ilham, mohon izin menyampaikan ada permohonan pertemuan baru masuk melalui meet.ilhampradani.me 🙏

👤 *Pemohon:* ${p.name} ${p.org ? `(${p.org})` : ''}
📱 *WhatsApp Pemohon:* ${p.phone}
🏷️ *Kategori:* ${p.category}
📅 *Rencana Jadwal:* ${p.date} (${p.start} - ${p.end} WIB)
🌐 *Moda:* ${p.mode === 'virtual' ? 'Online / Google Meet' : 'Tatap Muka Langsung'}
${p.notes ? `📝 *Pokok Masalah:* "${p.notes}"\n` : ''}
Permohonan telah dicatat di database dan menunggu konfirmasi Bapak di dashboard.

Salam hormat,
*Aura Desk*`;

        await sendWhatsAppMessage(TARGET_PHONE, waMsg);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: true, requestId: id }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API ADMIN: Meeting Requests List
  if (pathname === '/api/meeting-requests' && req.method === 'GET') {
    const d1Data = await queryD1("SELECT * FROM meeting_requests ORDER BY created_at DESC LIMIT 50;");
    const results = d1Data?.result?.[0]?.results || [];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, requests: results }));
  }

  // API ADMIN: Approve / Decline Meeting Request
  if (pathname.startsWith('/api/meeting-requests/') && pathname.endsWith('/action') && req.method === 'POST') {
    const parts = pathname.split('/');
    const id = parts[3];
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const p = JSON.parse(body || '{}');
        const action = p.action; // 'approve' or 'decline'
        const reason = p.reason || '';

        const d1Data = await queryD1(`SELECT * FROM meeting_requests WHERE id = '${id.replace(/'/g, "''")}';`);
        const reqData = d1Data?.result?.[0]?.results?.[0];
        if (!reqData) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Permohonan tidak ditemukan' }));
        }

        if (action === 'approve') {
          // 1. Update status
          await queryD1(`UPDATE meeting_requests SET status = 'approved', updated_at = datetime('now') WHERE id = '${id}';`);

          // 2. Tambahkan ke tabel tasks
          const taskId = "t-" + Date.now();
          const taskTitle = `[Pertemuan] ${reqData.client_name} - ${reqData.category}`.replace(/'/g, "''");
          const noteText = `Moda: ${reqData.mode}. Klien: ${reqData.client_name} (${reqData.client_phone}). Catatan: ${reqData.notes || '-'}`.replace(/'/g, "''");
          await queryD1(`INSERT INTO tasks (id, title, time_start, time_end, target_date, recurrence, status, note, updated_at) VALUES ('${taskId}', '${taskTitle}', '${reqData.start_time}', '${reqData.end_time}', '${reqData.meeting_date}', 'none', 'todo', '${noteText}', datetime('now'));`);

          // 3. Kirim WhatsApp ke Klien jika ada nomor
          if (reqData.client_phone) {
            const clientMsg = 
`Halo Bpk/Ibu ${reqData.client_name}, salam hangat 🙏

Permohonan pertemuan Anda dengan Ilham Pradani, S.H. telah *DISETUJUI* dan terjadwal secara resmi:

📌 *Topik:* ${reqData.category}
📅 *Tanggal:* ${reqData.meeting_date}
⏰ *Waktu:* ${reqData.start_time} - ${reqData.end_time} WIB
🌐 *Moda:* ${reqData.mode === 'virtual' ? 'Online / Google Meet' : 'Tatap Muka Langsung'}

Tautan sesi virtual / detail pertemuan akan kami sampaikan menjelang jadwal acara. Terima kasih.

Salam hormat,
*Aura Executive Desk*`;
            await sendWhatsAppMessage(reqData.client_phone, clientMsg);
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, status: 'approved' }));
        } else {
          await queryD1(`UPDATE meeting_requests SET status = 'declined', updated_at = datetime('now') WHERE id = '${id}';`);
          
          if (reqData.client_phone) {
            const declineMsg = 
`Halo Bpk/Ibu ${reqData.client_name}, salam hangat 🙏

Mohon maaf, permohonan pertemuan untuk tanggal ${reqData.meeting_date} pukul ${reqData.start_time} - ${reqData.end_time} WIB saat ini belum dapat dipenuhi karena ${reason || 'jadwal padat'}.

Silakan mengajukan kembali pilihan waktu lain melalui portal meet.ilhampradani.me. Terima kasih atas pengertiannya.

Salam hormat,
*Aura Executive Desk*`;
            await sendWhatsAppMessage(reqData.client_phone, declineMsg);
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, status: 'declined' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API: Sync dengan Cloudflare D1
  if (pathname === '/api/sync' && req.method === 'GET') {
    const d1Data = await queryD1("SELECT * FROM tasks ORDER BY time_start ASC; SELECT * FROM settings;");
    if (d1Data && d1Data.success && d1Data.result) {
      const tasks = d1Data.result[0]?.results || [];
      const settings = d1Data.result[1]?.results || [];
      const settingsMap = {};
      settings.forEach(s => {
        try { settingsMap[s.key] = JSON.parse(s.value); } catch { settingsMap[s.key] = s.value; }
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        tasks: tasks.map(t => {
          try { return t.raw_json ? JSON.parse(t.raw_json) : t; } catch { return t; }
        }),
        settings: settingsMap
      }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: false, error: 'D1 sync offline' }));
  }

  // Static File Serving & Subdomain / Path Routing
  const host = (req.headers.host || '').toLowerCase();
  let reqPath = pathname;
  if (host.startsWith('meet.') || host.startsWith('jadwal.')) {
    if (reqPath === '/' || reqPath === '') reqPath = '/meet.html';
  } else {
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  }
  if (reqPath === '/meet' || reqPath === '/public' || reqPath === '/jadwal') reqPath = '/meet.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (errHtml, content) => {
        if (errHtml) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Aura Executive Desk] Gateway aktif di http://0.0.0.0:${PORT}`);
  console.log(`[Target WhatsApp] ${TARGET_PHONE}`);
  console.log(`[Cloudflare D1 Queue Poller] Terhubung ke ${D1_DATABASE_ID}`);
  console.log(`[Public Meeting Portal] Tersedia di /meet dan /public`);
});
