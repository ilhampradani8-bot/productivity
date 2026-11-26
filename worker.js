/**
 * Aura Executive Desk - Cloudflare Worker Backend
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

    // API Routes
    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(url, request, env);
      } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 500);
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

  // 1. Sync All Data (Full Bundle)
  if (path === "/api/sync") {
    if (method === "GET") {
      const { results: tasks } = await db.prepare("SELECT * FROM tasks ORDER BY time_start ASC").all();
      const { results: settings } = await db.prepare("SELECT * FROM settings").all();
      const settingsMap = {};
      (settings || []).forEach(s => {
        try {
          settingsMap[s.key] = JSON.parse(s.value);
        } catch {
          settingsMap[s.key] = s.value;
        }
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
      const dailyTasks = body.dailyTasks || [];
      const notifications = body.notifications || {};
      const fiveYearPlan = body.fiveYearPlan || [];

      // Batch upsert tasks
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

        // D1 batch execution
        await db.batch(statements);
      }

      // Upsert notifications setting
      await db.prepare(
        "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('notifications', ?, datetime('now'))"
      ).bind(JSON.stringify(notifications)).run();

      // Upsert fiveYearPlan setting
      if (fiveYearPlan.length > 0) {
        await db.prepare(
          "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('fiveYearPlan', ?, datetime('now'))"
        ).bind(JSON.stringify(fiveYearPlan)).run();
      }

      return jsonResponse({ success: true, syncedTasks: dailyTasks.length });
    }
  }

  // 2. Tasks CRUD
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

  // 3. Queue WhatsApp Notification for UTM Dispatch
  if (path === "/api/send-wa" && method === "POST") {
    const body = await request.json();
    const phone = body.phone || body.target || "6288971071138";
    const message = body.message || body.text || "";
    const type = body.type || "Notifikasi Agenda";

    if (!message) {
      return jsonResponse({ success: false, error: "Pesan tidak boleh kosong" }, 400);
    }

    const notifId = "wa-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);

    // Simpan ke antrean Cloudflare D1
    await db.prepare(`
      INSERT INTO notification_queue (id, phone, message, type, status, created_at)
      VALUES (?, ?, ?, ?, 'pending', datetime('now'))
    `).bind(notifId, phone, message, type).run();

    // Catat ke activity_logs
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

  // 4. Polling Antrean Notifikasi (Khusus Worker UTM)
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
