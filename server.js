/**
 * Executive Productivity Web Server & WhatsApp Notification Gateway
 * Runs on Port 3080 (WSL2 / UTM Workstation)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3080;
const PUBLIC_DIR = __dirname;
const WA_BOT_API = 'http://127.0.0.1:3055';

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
      return res.end(JSON.stringify({ online: true, botData: data }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ online: false, error: e.message }));
    }
  }

  // API: Kirim Pesan ke WhatsApp via Bot Lokal
  if (req.url === '/api/send-wa' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const phone = parsed.phone || parsed.target;
        const message = parsed.message || parsed.text;

        if (!phone || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Nomor WhatsApp dan pesan wajib diisi' }));
        }

        const botRes = await fetch(`${WA_BOT_API}/send-message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target: phone, text: message }),
          signal: AbortSignal.timeout(8000)
        });

        const botData = await botRes.json();
        res.writeHead(botRes.status, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(botData));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Gagal menghubungi server WhatsApp bot: ' + err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback ke index.html untuk SPA
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
  console.log(`🚀 [Productivity Fullwidth Server] Aktif di http://0.0.0.0:${PORT}`);
  console.log(`🔗 Terhubung ke WhatsApp Gateway di ${WA_BOT_API}`);
});
