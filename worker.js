/**
 * Aura Executive Desk & Public Meeting Portal - Cloudflare Worker Backend
 * Powered by Cloudflare Workers & Cloudflare D1
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json; charset=utf-8"
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: CORS_HEADERS
  });
}

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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS
      });
    }

    // Direct SEO Routes (robots.txt & sitemap.xml)
    if (url.pathname === "/robots.txt") {
      const robots = `User-agent: *\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nSitemap: https://meet.ilhampradani.me/sitemap.xml\nSitemap: https://productivity.ilhampradani.me/sitemap.xml\n`;
      return new Response(robots, {
        headers: { "Content-Type": "text/plain; charset=UTF-8", "Cache-Control": "public, max-age=86400" }
      });
    }

    if (url.pathname === "/sitemap.xml") {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://meet.ilhampradani.me/</loc>
    <lastmod>2026-11-27T02:00:00+08:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://productivity.ilhampradani.me/</loc>
    <lastmod>2026-11-27T02:00:00+08:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
      return new Response(sitemap, {
        headers: { "Content-Type": "application/xml; charset=UTF-8", "Cache-Control": "public, max-age=86400" }
      });
    }

    // API Routes
    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(url, request, env);
      } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 500);
      }
    }

    // Routing for Public Subdomain (meet.* or jadwal.* or /meet)
    const isPublicSubdomain = url.hostname.startsWith("meet.") || url.hostname.startsWith("jadwal.") || url.pathname === "/meet" || url.pathname === "/public";
    if (isPublicSubdomain && (url.pathname === "/" || url.pathname === "/meet" || url.pathname === "/public")) {
      if (env.ASSETS) {
        const meetReq = new Request(new URL("/meet.html", request.url), request);
        return await env.ASSETS.fetch(meetReq);
      }
    }

    // Serve Static Assets via Cloudflare Worker Assets
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("Aura Executive Desk - Static Assets Binding Missing", { status: 404 });
  }
};

async function handleApi(url, request, env) {
  const db = env.DB;
  if (!db) {
    return jsonResponse({ success: false, error: "D1 Database binding 'DB' not configured" }, 500);
  }

  const path = url.pathname;
  const method = request.method;

  // Health check
  if (path === "/api/health" && method === "GET") {
    return jsonResponse({
      status: "ok",
      service: "aura-desk-edge",
      database: "Cloudflare D1",
      region: "APAC",
      timestamp: new Date().toISOString()
    });
  }

  // 1. PUBLIC: Real-time Available Empty Time Slots
  if (path === "/api/public/available-slots" && method === "GET") {
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];

    // Ambil seluruh tugas untuk tanggal ini
    const { results } = await db.prepare(
      "SELECT time_start, time_end, title, recurrence, status, raw_json FROM tasks WHERE status != 'cancelled'"
    ).all();

    const occupiedIntervals = [];

    (results || []).forEach(r => {
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

    // Merge overlapping busy intervals
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

    // Compute Free Slots during working hours (08:00 - 21:00 / 480 to 1260 mins)
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
        if (diff >= 45) { // Minimal slot 45 menit
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

    return jsonResponse({ success: true, date, slots });
  }

  // 2. PUBLIC: Submit Meeting / Consultation Request
  if (path === "/api/public/submit-meeting" && method === "POST") {
    const body = await request.json();
    const id = "meet-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);

    const name = body.name || body.client_name || "Tamu";
    const org = body.org || body.client_org || "-";
    const phone = body.phone || body.client_phone || "";
    const category = body.category || "Konsultasi Umum";
    const date = body.date || body.meeting_date || "";
    const start = body.start || body.start_time || "";
    const end = body.end || body.end_time || "";
    const mode = body.mode || "virtual";
    const notes = body.notes || "";

    if (!phone || !date || !start || !end) {
      return jsonResponse({ success: false, error: "Nomor WhatsApp, tanggal, dan rentang jam wajib diisi." }, 400);
    }

    // 1. Simpan ke tabel meeting_requests di D1
    await db.prepare(`
      INSERT INTO meeting_requests (
        id, client_name, client_org, client_phone, category, meeting_date, 
        start_time, end_time, mode, notes, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))
    `).bind(id, name, org, phone, category, date, start, end, mode, notes).run();

    // 2. Kirim Notifikasi WhatsApp Instan ke Pak Ilham (6288971071138)
    const waText = 
`Halo Pak Ilham, mohon izin menyampaikan ada permohonan pertemuan baru masuk melalui meet.ilhampradani.me 🙏

👤 *Pemohon:* ${name} ${org !== '-' ? `(${org})` : ''}
📱 *WhatsApp Pemohon:* ${phone}
🏷️ *Kategori:* ${category}
📅 *Rencana Jadwal:* ${date} (${start} - ${end} WIB)
🌐 *Moda:* ${mode === 'virtual' ? 'Online / Google Meet' : 'Tatap Muka Langsung'}
${notes ? `📝 *Pokok Masalah:* "${notes}"\n` : ''}
Permohonan telah dicatat di database dan menunggu konfirmasi Bapak di dashboard.

Salam hormat,
*Aura Desk*`;

    const notifId = "notif-" + Date.now();
    await db.prepare(`
      INSERT INTO notification_queue (id, phone, message, type, status, created_at)
      VALUES (?, '6288971071138', ?, 'Pengajuan Pertemuan', 'pending', datetime('now'))
    `).bind(notifId, waText).run();

    return jsonResponse({ success: true, requestId: id });
  }

  // 3. ADMIN: Get Meeting Requests
  if (path === "/api/meeting-requests" && method === "GET") {
    const { results } = await db.prepare("SELECT * FROM meeting_requests ORDER BY created_at DESC LIMIT 50").all();
    return jsonResponse({ success: true, requests: results || [] });
  }

  // 4. ADMIN: Approve / Decline Meeting Request
  if (path.startsWith("/api/meeting-requests/") && path.endsWith("/action") && method === "POST") {
    const parts = path.split("/");
    const id = parts[3];
    const body = await request.json();
    const action = body.action; // 'approve' or 'decline'

    const reqData = await db.prepare("SELECT * FROM meeting_requests WHERE id = ?").bind(id).first();
    if (!reqData) {
      return jsonResponse({ success: false, error: "Permohonan tidak ditemukan" }, 404);
    }

    if (action === "approve") {
      // 1. Update status
      await db.prepare("UPDATE meeting_requests SET status = 'approved', updated_at = datetime('now') WHERE id = ?").bind(id).run();

      // 2. Tambahkan ke tabel tasks
      const taskId = "t-" + Date.now();
      const taskTitle = `[Pertemuan] ${reqData.client_name} - ${reqData.category}`;
      await db.prepare(`
        INSERT INTO tasks (
          id, title, time_start, time_end, target_date, recurrence, 
          status, note, updated_at
        ) VALUES (?, ?, ?, ?, ?, 'none', 'todo', ?, datetime('now'))
      `).bind(taskId, taskTitle, reqData.start_time, reqData.end_time, reqData.meeting_date, `Moda: ${reqData.mode}. Klien: ${reqData.client_name} (${reqData.client_phone}). Catatan: ${reqData.notes}`).run();

      // 3. Kirim WhatsApp ke Klien
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

      await db.prepare(`
        INSERT INTO notification_queue (id, phone, message, type, status, created_at)
        VALUES (?, ?, ?, 'Konfirmasi Klien', 'pending', datetime('now'))
      `).bind("client-wa-" + Date.now(), reqData.client_phone, clientMsg).run();

      return jsonResponse({ success: true, status: "approved" });
    } else {
      await db.prepare("UPDATE meeting_requests SET status = 'declined', updated_at = datetime('now') WHERE id = ?").bind(id).run();
      return jsonResponse({ success: true, status: "declined" });
    }
  }

  // 5. Sync All Data (Full Bundle)
  if (path === "/api/sync") {
    if (method === "GET") {
      const { results: tasks } = await db.prepare("SELECT * FROM tasks ORDER BY time_start ASC").all();
      const { results: settings } = await db.prepare("SELECT * FROM settings").all();
      const settingsMap = {};
      (settings || []).forEach(s => {
        try { settingsMap[s.key] = JSON.parse(s.value); } catch { settingsMap[s.key] = s.value; }
      });

      return jsonResponse({
        success: true,
        tasks: (tasks || []).map(t => {
          if (t.raw_json) {
            try { return JSON.parse(t.raw_json); } catch {}
          }
          return t;
        }),
        settings: settingsMap
      });
    }

    if (method === "POST") {
      const body = await request.json();

      // Handle single task action (e.g. from Android App or Quick API)
      if (body.action === 'markDone' || body.action === 'completeTask') {
        const taskId = body.taskId || body.id;
        const now = new Date();
        const dateStr = body.date || now.toISOString().split("T")[0];

        const taskRow = await db.prepare("SELECT * FROM tasks WHERE id = ?").bind(taskId).first();
        if (taskRow) {
          let compDates = [];
          try { compDates = JSON.parse(taskRow.completed_dates || "[]"); } catch {}
          if (!compDates.includes(dateStr)) compDates.push(dateStr);
          
          let raw = {};
          try { raw = JSON.parse(taskRow.raw_json || "{}"); } catch {}
          raw.status = "done";
          raw.completedDates = compDates;
          raw.updated_at = now.toISOString();

          await db.prepare(`
            UPDATE tasks SET status = 'done', completed_dates = ?, raw_json = ?, updated_at = datetime('now') WHERE id = ?
          `).bind(JSON.stringify(compDates), JSON.stringify(raw), taskId).run();

          return jsonResponse({ success: true, taskId, status: "done", date: dateStr });
        }
      }

      const dailyTasks = body.dailyTasks || [];
      const notifications = body.notifications || {};
      const fiveYearPlan = body.fiveYearPlan || [];

      if (dailyTasks.length > 0) {
        const statements = dailyTasks.map(t => {
          return db.prepare(`
            INSERT OR REPLACE INTO tasks (
              id, title, time_start, time_end, target_date, recurrence, 
              duration_years, validity_type, status, completed_dates, 
              deleted_dates, missed_reasons, note, has_second_session, 
              session2_start, session2_end, raw_json, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
          `).bind(
            t.id,
            t.title || "Agenda",
            t.timeStart || "",
            t.timeEnd || "",
            t.date || "",
            t.recurrence || "none",
            t.durationYears || 1,
            t.validityType || "until_completed",
            t.status || "pending",
            JSON.stringify(t.completedDates || []),
            JSON.stringify(t.deletedDates || []),
            JSON.stringify(t.missedReasons || {}),
            t.note || "",
            t.hasSecondSession ? 1 : 0,
            t.session2Start || "",
            t.session2End || "",
            JSON.stringify(t)
          );
        });

        await db.batch(statements);
      }

      await db.prepare(
        "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('notifications', ?, datetime('now'))"
      ).bind(JSON.stringify(notifications)).run();

      if (fiveYearPlan.length > 0) {
        await db.prepare(
          "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('fiveYearPlan', ?, datetime('now'))"
        ).bind(JSON.stringify(fiveYearPlan)).run();
      }

      return jsonResponse({ success: true, syncedTasks: dailyTasks.length });
    }
  }

  // 6. Tasks CRUD
  if (path === "/api/tasks") {
    if (method === "GET") {
      const { results } = await db.prepare("SELECT * FROM tasks ORDER BY time_start ASC").all();
      return jsonResponse({
        success: true,
        tasks: (results || []).map(r => {
          try { return r.raw_json ? JSON.parse(r.raw_json) : r; } catch { return r; }
        })
      });
    }

    if (method === "POST") {
      const t = await request.json();
      if (!t.id) t.id = "t-" + Date.now();

      await db.prepare(`
        INSERT OR REPLACE INTO tasks (
          id, title, time_start, time_end, target_date, recurrence, 
          duration_years, validity_type, status, completed_dates, 
          deleted_dates, missed_reasons, note, has_second_session, 
          session2_start, session2_end, raw_json, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        t.id,
        t.title || "Agenda",
        t.timeStart || "",
        t.timeEnd || "",
        t.date || "",
        t.recurrence || "none",
        t.durationYears || 1,
        t.validityType || "until_completed",
        t.status || "pending",
        JSON.stringify(t.completedDates || []),
        JSON.stringify(t.deletedDates || []),
        JSON.stringify(t.missedReasons || {}),
        t.note || "",
        t.hasSecondSession ? 1 : 0,
        t.session2Start || "",
        t.session2End || "",
        JSON.stringify(t)
      ).run();

      return jsonResponse({ success: true, task: t });
    }
  }

  // Delete Task
  if (path.startsWith("/api/tasks/") && method === "DELETE") {
    const id = path.replace("/api/tasks/", "");
    await db.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();
    return jsonResponse({ success: true, deletedId: id });
  }

  // 7. Queue WhatsApp Notification
  if (path === "/api/send-wa" && method === "POST") {
    const body = await request.json();
    const phone = body.phone || body.target || "6288971071138";
    const message = body.message || body.text || "";
    const type = body.type || "Notifikasi Agenda";

    if (!message) {
      return jsonResponse({ success: false, error: "Pesan tidak boleh kosong" }, 400);
    }

    const notifId = "wa-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);

    await db.prepare(`
      INSERT INTO notification_queue (id, phone, message, type, status, created_at)
      VALUES (?, ?, ?, ?, 'pending', datetime('now'))
    `).bind(notifId, phone, message, type).run();

    await db.prepare(`
      INSERT INTO activity_logs (id, time, type, status, phone, details)
      VALUES (?, datetime('now'), ?, 'Antre Cloud', ?, ?)
    `).bind("act-" + Date.now(), type, phone, message.substring(0, 80)).run();

    return jsonResponse({
      success: true,
      queued: true,
      notifId,
      phone,
      message: "Notifikasi berhasil masuk antrean Cloudflare D1 untuk dikirim via UTM"
    });
  }

  // 8. Polling Antrean Notifikasi (Khusus Host UTM)
  if (path === "/api/notifications/pending" && method === "GET") {
    const { results } = await db.prepare(
      "SELECT * FROM notification_queue WHERE status = 'pending' ORDER BY created_at ASC LIMIT 10"
    ).all();
    return jsonResponse({ success: true, pending: results || [] });
  }

  if (path.startsWith("/api/notifications/") && path.endsWith("/sent") && method === "POST") {
    const id = path.split("/")[3];
    await db.prepare(
      "UPDATE notification_queue SET status = 'sent', sent_at = datetime('now') WHERE id = ?"
    ).bind(id).run();
    return jsonResponse({ success: true, updated: id });
  }

  return jsonResponse({ success: false, error: "Endpoint tidak ditemukan: " + path }, 404);
}
