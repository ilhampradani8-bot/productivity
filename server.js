/**
 * Aura Executive Desk - Host Gateway & Queue Dispatcher
 * Runs on Port 3080 (WSL2 / UTM Workstation)
 * - Directly bridges to Baileys WhatsApp Bot on UTM (Port 3055)
 * - Continuously polls Cloudflare D1 for queued notifications
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

  // API: Status WhatsApp Bot
  if (req.url === '/api/wa-status' && req.method === 'GET') {
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
  if (req.url === '/api/send-wa' && req.method === 'POST') {
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

  // API: Sync dengan Cloudflare D1
  if (req.url === '/api/sync' && req.method === 'GET') {
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

  // Static File Serving
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

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
});
