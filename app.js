/**
 * Executive Productivity & Notification Rules System
 * Google-Style Minimalist Architecture - Classic White Edition v2
 * Features:
 * - Smart Title Autocomplete & Recommendations
 * - Mandatory Missed Task Reason & Evaluation Popup Modal
 * - WhatsApp Missed Task Notification Alert ("Anda melewatkan tugas!")
 * - Tab Riwayat & Evaluasi Kendala (with 1-click "Jadwalkan Lagi Hari Ini")
 * - Chronological Auto-Sorting for Daily View
 * - Prominent High-Contrast Time Pillar on Task Cards
 * - 100% SVG Icons (Zero Unicode Emojis in UI)
 * - Clickable 24-Hour Time Map (Direct Set Start/End Time Snapped to 15m)
 * - Anti-Collision / Anti-Overlap validation ("Waktu Kosong")
 * - Interactive Radial Analog Clock Picker with smooth drag and Siang/Malam switch
 * - Mobile-first responsive optimization
 */

const ICONS = {
  sun: `<svg class="w-3.5 h-3.5 text-amber-500 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
  moon: `<svg class="w-3.5 h-3.5 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
  clock: `<svg class="w-3.5 h-3.5 text-slate-500 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  calendar: `<svg class="w-3.5 h-3.5 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  repeat: `<svg class="w-3 h-3 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
  checkCircle: `<svg class="w-4 h-4 text-emerald-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  alertTriangle: `<svg class="w-3.5 h-3.5 text-rose-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  save: `<svg class="w-4 h-4 text-white inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>`,
  edit: `<svg class="w-4 h-4 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`,
  trash: `<svg class="w-4 h-4 text-slate-400 hover:text-rose-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`,
  wa: `<svg class="w-4 h-4 fill-current text-emerald-600 inline-block flex-shrink-0" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>`,
  plus: `<svg class="w-3.5 h-3.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>`
};

const DEFAULT_SYSTEM_DATA = {
  profile: {
    name: "Ilham Pradani",
    role: "Founder & Tech Architect",
    secretaryName: "Aura Executive Desk"
  },
  notifications: {
    enabled: true,
    targetPhone: "6288971071138",
    morningBriefing: {
      enabled: true,
      time: "07:00"
    },
    eveningRecap: {
      enabled: true,
      time: "21:00"
    },
    missedTaskAlert: {
      enabled: true
    },
    logs: [
      { id: "log-1", time: "2026-11-27 00:00:00", type: "Notifikasi Aura Desk", status: "Siap", phone: "6288971071138" }
    ]
  },
  fiveYearPlan: [
    {
      id: "y1-2026",
      year: 2026,
      title: "Tahun 1: Konsolidasi Infrastruktur, AI Telemetri & Skalabilitas",
      theme: "Infrastruktur & Ekosistem Mandiri",
      overallProgress: 75,
      quarters: [
        {
          id: "y1-q1",
          quarter: "Q1 2026",
          focus: "Migrasi & Stabilisasi Host UTM & Serverless Edge",
          status: "completed",
          progress: 100,
          steps: [
            { id: "s101", title: "Setup Workstation UTM 64GB RAM & Cloudflare Tunnel", done: true, note: "Tunnel vps-utm & SSH passwordless aktif" },
            { id: "s102", title: "Migrasi logger Telegram ke Serverless Cloudflare Edge", done: true, note: "Edge D1 persistence 100% online" }
          ]
        },
        {
          id: "y1-q2",
          quarter: "Q2 2026",
          focus: "Pengembangan AI Trade & Engine Model Pembelajaran",
          status: "completed",
          progress: 100,
          steps: [
            { id: "s104", title: "Riset arsitektur ensemble ML (LightGBM + XGBoost + CatBoost)", done: true, note: "Pengujian baseline selesai" },
            { id: "s105", title: "Integrasi telemetri sinyal ke bot WhatsApp", done: true, note: "Notifikasi real-time terhubung" }
          ]
        },
        {
          id: "y1-q3",
          quarter: "Q3 2026",
          focus: "Ekosistem Web & Platform SirkelHub & MallDigital",
          status: "completed",
          progress: 100,
          steps: [
            { id: "s107", title: "Arsitektur UI solid & integrasi DOKU Production API", done: true, note: "Payment gateway live" },
            { id: "s108", title: "Pemisahan peran WhatsApp Bot Toko Reimal vs Asisten CPNS", done: true, note: "Group Shield isolasi 100% aktif" }
          ]
        },
        {
          id: "y1-q4",
          quarter: "Q4 2026",
          focus: "Eksekusi Sistem Produktivitas Eksekutif & Review Tahunan",
          status: "in_progress",
          progress: 85,
          steps: [
            { id: "s109", title: "Peluncuran dashboard Sekretaris Pribadi productivity.ilhampradani.me", done: true, note: "Aplikasi live & terintegrasi Cloudflare Tunnel" },
            { id: "s110", title: "Integrasi gateway notifikasi WhatsApp 24/7", done: true, note: "Panggilan pesan bot langsung" }
          ]
        }
      ]
    },
    {
      id: "y2-2027",
      year: 2027,
      title: "Tahun 2: Ekspansi Komersial & Otomasi AI Skala Menengah",
      theme: "Komersialisasi & Efisiensi Operasional",
      overallProgress: 15,
      quarters: [
        {
          id: "y2-q1",
          quarter: "Q1 2027",
          focus: "Otomasi Penjualan & Sistem Pelanggan SaaS",
          status: "pending",
          progress: 25,
          steps: [
            { id: "s201", title: "Rilis platform API terkelola untuk klien eksternal", done: false, note: "Sistem billing otomatis" }
          ]
        }
      ]
    },
    {
      id: "y3-2028",
      year: 2028,
      title: "Tahun 3: Diversifikasi Ekosistem & Pematangan Produk Korporat",
      theme: "Otonomi & Standar Industri",
      overallProgress: 0,
      quarters: [
        {
          id: "y3-q1",
          quarter: "Sepanjang 2028",
          focus: "Solusi AI Enterprise & Pembentukan Holding Unit Digital",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s301", title: "Peluncuran suite automasi proses bisnis cerdas", done: false, note: "Segmen korporat" }
          ]
        }
      ]
    },
    {
      id: "y4-2029",
      year: 2029,
      title: "Tahun 4: Skala Regional & Kepemimpinan Pasar",
      theme: "Pengaruh Regional & Ekosistem Terdistribusi",
      overallProgress: 0,
      quarters: [
        {
          id: "y4-q1",
          quarter: "Sepanjang 2029",
          focus: "Deployment Node Edge Global",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s401", title: "Deployment node edge global sub-5ms", done: false, note: "Jaringan regional" }
          ]
        }
      ]
    },
    {
      id: "y5-2030",
      year: 2030,
      title: "Tahun 5: Kebebasan Finansial Penuh, Warisan Ekosistem & Legacy",
      theme: "Keberlanjutan & Kebebasan Waktu Eksekutif",
      overallProgress: 0,
      quarters: [
        {
          id: "y5-q1",
          quarter: "Sepanjang 2030",
          focus: "Operasional Berjalan 100% Otonom & Fokus Riset Masa Depan",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s501", title: "Operasional mandiri tanpa intervensi harian", done: false, note: "Sistem otonom mandiri" }
          ]
        }
      ]
    }
  ],
  monthlyPlan: {
    year: 2026,
    monthName: "November 2026",
    theme: "Sprint Penguatan Ekosistem & Efisiensi Sistem",
    milestones: [
      { id: "m1", title: "Deployment Sistem Produktivitas Eksekutif Full-Width & Gateway WA", targetDate: "2026-11-26", done: true },
      { id: "m2", title: "Audit Stabilitas Tunnel Cloudflare & Serverless Logger Edge", targetDate: "2026-11-28", done: true },
      { id: "m3", title: "Uji Evaluasi Metrik AI Trade & Konsistensi Sinyal", targetDate: "2026-11-29", done: false },
      { id: "m4", title: "Review Finansial Akhir Bulan & Alokasi Q1 2027", targetDate: "2026-11-30", done: false }
    ]
  },
  dailyTasks: [
    {
      id: "t-1",
      date: "2026-11-26",
      timeStart: "07:30",
      timeEnd: "08:30",
      hasSecondSession: false,
      session2Start: "",
      session2End: "",
      title: "Executive Morning Routine & Review Agenda Harian",
      note: "Briefing mandiri & penetapan fokus non-negotiables",
      recurrence: "daily",
      validityType: "3_years",
      validUntil: "2029-11-26",
      status: "done",
      completedDates: ["2026-11-26"],
      deletedDates: []
    },
    {
      id: "t-2",
      date: "2026-11-26",
      timeStart: "09:00",
      timeEnd: "10:30",
      hasSecondSession: false,
      session2Start: "",
      session2End: "",
      title: "Pemeriksaan Telemetri Workstation UTM & Health Check Proxy",
      note: "Verifikasi kestabilan usque proxy & memory footprint",
      recurrence: "daily",
      validityType: "3_years",
      validUntil: "2029-11-26",
      status: "done",
      completedDates: ["2026-11-26"],
      deletedDates: []
    },
    {
      id: "t-3",
      date: "2026-11-26",
      timeStart: "11:00",
      timeEnd: "12:30",
      hasSecondSession: true,
      session2Start: "20:00",
      session2End: "21:30",
      title: "Rancang & Bangun Arsitektur Web Produktivitas Bebas Bentrok",
      note: "Form Google-style, pemilih jam bulat putar siang & malam, anti-tabrakan 24 jam",
      recurrence: "none",
      validityType: "until_completed",
      validUntil: "",
      status: "done",
      completedDates: ["2026-11-26"],
      deletedDates: []
    },
    {
      id: "t-4",
      date: "2026-11-26",
      timeStart: "14:00",
      timeEnd: "15:30",
      hasSecondSession: false,
      session2Start: "",
      session2End: "",
      title: "Integrasi Gateway Notifikasi WhatsApp Port Ingress 3080",
      note: "Hubungkan API bot WhatsApp port 3055 ke dashboard",
      recurrence: "none",
      validityType: "until_completed",
      validUntil: "",
      status: "done",
      completedDates: ["2026-11-26"],
      deletedDates: []
    },
    {
      id: "t-5",
      date: "2026-11-26",
      timeStart: "16:30",
      timeEnd: "17:30",
      hasSecondSession: false,
      session2Start: "",
      session2End: "",
      title: "Sesi Pembelajaran Mandiri & Review Materi Teknis",
      note: "Baca modul materi strategis 60 menit",
      recurrence: "daily",
      validityType: "1_year",
      validUntil: "2027-11-26",
      status: "todo",
      completedDates: [],
      deletedDates: []
    }
  ]
};

class ProductivityApp {
  constructor() {
    this.storageKey = "sekretaris_produktivitas_fw_v6";
    this.data = this.loadData();
    this.activeTab = "daily";
    this.selectedDate = this.getTodayDateString();
    this.searchQuery = "";
    this.historyFilter = "all";
    this.historySearch = "";
    this.waBotOnline = false;
    this.isSpeaking = false;
    this.speechSynth = window.speechSynthesis || null;

    // Clock Picker State
    this.clockTargetInputId = null;
    this.clockHour = 9;
    this.clockMinute = 0;
    this.clockUnit = "hour";
    this.clockPeriod = "day";
    this.isClockDragging = false;
    this.editingTaskId = null;
    this.taskScheduleMode = "once";

    // Missed Task Reason Evaluation State
    this.evaluatingTaskId = null;
    this.evaluatingDate = null;

    // Task Cancellation Modal State
    this.cancellingTaskId = null;
    this.cancellingDate = null;

    // Meeting Requests State
    this.meetingRequests = [];
    this.meetingFilter = "all";

    this.init();
  }

  getTodayDateString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.dailyTasks) {
          parsed.dailyTasks = parsed.dailyTasks.map(t => {
            if (!t.timeStart && t.time) {
              t.timeStart = t.time;
              const mins = this.timeToMinutes(t.time) + 60;
              t.timeEnd = this.minutesToTime(mins > 1439 ? 1439 : mins);
            }
            if (t.hasSecondSession === undefined) t.hasSecondSession = false;
            if (!t.recurrence) t.recurrence = "none";
            if (!t.validityType) t.validityType = "until_completed";
            if (!t.completedDates) t.completedDates = t.status === "done" ? [t.date] : [];
            if (!t.deletedDates) t.deletedDates = [];
            return t;
          });
          if (!parsed.notifications.missedTaskAlert) {
            parsed.notifications.missedTaskAlert = { enabled: true };
          }
          return { ...DEFAULT_SYSTEM_DATA, ...parsed };
        }
      }
    } catch (e) {
      console.warn("Gagal memuat localStorage, gunakan default:", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SYSTEM_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      this.debounceCloudPush();
    } catch (e) {
      console.error("Gagal menyimpan ke localStorage:", e);
    }
  }

  debounceCloudPush() {
    if (this._cloudPushTimer) clearTimeout(this._cloudPushTimer);
    this._cloudPushTimer = setTimeout(() => {
      this.pushToCloud();
    }, 1200);
  }

  async pushToCloud() {
    const badge = document.getElementById("cloud-sync-text");
    try {
      if (badge) badge.textContent = "Menyimpan...";
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dailyTasks: this.data.dailyTasks,
          notifications: this.data.notifications,
          fiveYearPlan: this.data.fiveYearPlan
        })
      });
      if (res.ok) {
        if (badge) badge.textContent = "Tersinkron Cloud";
      } else {
        if (badge) badge.textContent = "Tersimpan Lokal";
      }
    } catch (e) {
      if (badge) badge.textContent = "Tersimpan Lokal";
    }
  }

  async syncWithCloud() {
    const badge = document.getElementById("cloud-sync-text");
    try {
      if (badge) badge.textContent = "Sinkronisasi...";
      const res = await fetch("/api/sync");
      if (!res.ok) throw new Error("Cloud sync offline");
      const json = await res.json();
      if (json && json.success && json.tasks && json.tasks.length > 0) {
        const localMap = new Map((this.data.dailyTasks || []).map(t => [t.id, t]));
        for (const ct of json.tasks) {
          if (!localMap.has(ct.id)) {
            this.data.dailyTasks.push(ct);
          } else {
            const lt = localMap.get(ct.id);
            if (ct.updated_at && (!lt.updated_at || ct.updated_at > lt.updated_at)) {
              Object.assign(lt, ct);
            }
          }
        }
        if (json.settings && json.settings.notifications) {
          this.data.notifications = { ...this.data.notifications, ...json.settings.notifications };
        }
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        this.render();
      }
      if (badge) badge.textContent = "Tersinkron Cloud";
    } catch (e) {
      if (badge) badge.textContent = "Tersimpan Lokal";
    }
  }

  init() {
    this.checkDashboardAuth();
    this.startClock();
    this.bindEvents();
    this.bindClockEvents();
    this.bindAutocompleteEvents();
    this.initTaskDate();
    this.initValidityPreset();
    this.setTaskScheduleMode("once");
    this.render();
    this.checkTimeCollision();
    this.checkMissedTasksAndAlert();
    this.syncWithCloud();
    this.fetchMeetingRequests();
  }

  // ===================== DASHBOARD SECURITY & PIN LOCK =====================
  checkDashboardAuth() {
    const isAuth = sessionStorage.getItem("aura_desk_auth") === "true";
    const modal = document.getElementById("modal-dashboard-lock");
    if (!modal) return;
    if (isAuth) {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    } else {
      modal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
      const pinInput = document.getElementById("input-dashboard-pin");
      if (pinInput) setTimeout(() => pinInput.focus(), 150);
    }
  }

  submitDashboardAuth(e) {
    if (e) e.preventDefault();
    const pinInput = document.getElementById("input-dashboard-pin");
    const errEl = document.getElementById("dashboard-lock-error");
    if (!pinInput) return;
    const val = pinInput.value.trim();
    if (val === "Dani22334455") {
      sessionStorage.setItem("aura_desk_auth", "true");
      const modal = document.getElementById("modal-dashboard-lock");
      if (modal) modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
      if (errEl) errEl.classList.add("hidden");
      pinInput.value = "";
      this.showToast("Akses Diterima! Selamat datang di Aura Executive Desk.", "success");
    } else {
      if (errEl) {
        errEl.textContent = "Kode akses salah! Akses ditolak.";
        errEl.classList.remove("hidden");
      }
      pinInput.classList.add("border-rose-500");
      setTimeout(() => pinInput.classList.remove("border-rose-500"), 1200);
    }
  }

  togglePinVisibility() {
    const pinInput = document.getElementById("input-dashboard-pin");
    if (!pinInput) return;
    if (pinInput.type === "password") {
      pinInput.type = "text";
    } else {
      pinInput.type = "password";
    }
  }

  lockDashboard() {
    sessionStorage.removeItem("aura_desk_auth");
    this.checkDashboardAuth();
    this.showToast("Dashboard terkunci.", "info");
  }

  // ===================== ADD TASK POPUP MODAL =====================
  openAddTaskModal(presetDate = null) {
    const modal = document.getElementById("modal-add-task");
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    if (!this.editingTaskId) {
      this.setTaskScheduleMode("once");
    }
    if (presetDate) {
      const input = document.getElementById("task-target-date");
      if (input) {
        input.value = presetDate;
        this.onTaskDateChange();
      }
    }
    const titleInput = document.getElementById("task-title");
    if (titleInput) setTimeout(() => titleInput.focus(), 150);
    this.checkTimeCollision();
  }

  closeAddTaskModal() {
    const modal = document.getElementById("modal-add-task");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    if (this.editingTaskId) {
      this.cancelEdit();
    }
  }

  // ===================== TOAST NOTIFICATION =====================
  showToast(msg, type = "info") {
    let container = document.getElementById("aura-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "aura-toast-container";
      container.className = "fixed bottom-5 right-5 z-[110] flex flex-col gap-2 max-w-sm pointer-events-none";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    const bgClass = type === "success" 
      ? "bg-slate-900 text-white border-l-4 border-emerald-500" 
      : type === "error" 
      ? "bg-rose-900 text-white border-l-4 border-rose-500" 
      : "bg-slate-900 text-white border-l-4 border-indigo-500";
    toast.className = `p-3.5 rounded-xl shadow-xl text-xs font-medium pointer-events-auto flex items-center justify-between gap-3 transform translate-y-2 opacity-0 transition-all duration-300 ${bgClass}`;
    toast.innerHTML = `<span>${this.escapeHtml(msg)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    }, 10);
    setTimeout(() => {
      toast.classList.add("translate-y-2", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ===================== MEETING & CONSULTATION REQUESTS =====================
  async fetchMeetingRequests() {
    try {
      const res = await fetch("/api/meeting-requests");
      if (!res.ok) throw new Error("Gagal mengambil data permohonan");
      const json = await res.json();
      if (json && json.success) {
        this.meetingRequests = json.requests || [];
        this.updateMeetingBadge();
        if (this.activeTab === "meetings") {
          this.renderMeetingsView();
        }
      }
    } catch (e) {
      console.warn("Gagal fetch permohonan meeting:", e);
    }
  }

  updateMeetingBadge() {
    const pendingCount = this.meetingRequests.filter(m => m.status === "pending").length;
    const navBadge = document.getElementById("nav-meetings-count");
    const viewBadge = document.getElementById("meetings-pending-count-badge");
    
    if (navBadge) {
      if (pendingCount > 0) {
        navBadge.textContent = pendingCount;
        navBadge.classList.remove("hidden");
      } else {
        navBadge.classList.add("hidden");
      }
    }
    if (viewBadge) {
      viewBadge.textContent = `${pendingCount} Menunggu`;
      if (pendingCount > 0) {
        viewBadge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 font-mono";
      } else {
        viewBadge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 font-mono";
      }
    }
  }

  filterMeetings(filter) {
    this.meetingFilter = filter;
    document.querySelectorAll(".meeting-filter-btn").forEach(btn => {
      if (btn.dataset.meetingFilter === filter) {
        btn.className = "meeting-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white cursor-pointer shadow-sm";
      } else {
        btn.className = "meeting-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer";
      }
    });
    this.renderMeetingsView();
  }

  renderMeetingsView() {
    const container = document.getElementById("meetings-list-container");
    if (!container) return;

    let items = [...this.meetingRequests];
    if (this.meetingFilter !== "all") {
      items = items.filter(m => m.status === this.meetingFilter);
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
          <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <p class="text-sm font-bold text-slate-700">Tidak Ada Permohonan ${this.meetingFilter === "pending" ? "Menunggu" : this.meetingFilter === "approved" ? "Disetujui" : this.meetingFilter === "declined" ? "Ditolak" : ""}</p>
          <p class="text-xs text-slate-500 mt-1">Permohonan yang diajukan oleh publik via meet.ilhampradani.me akan muncul di sini.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(m => {
      const isPending = m.status === "pending";
      const isApproved = m.status === "approved";
      const isDeclined = m.status === "declined";

      let statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-amber-100 text-amber-800 border border-amber-200">Menunggu Persetujuan</span>`;
      if (isApproved) {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">${ICONS.checkCircle} Disetujui & Masuk Jadwal</span>`;
      } else if (isDeclined) {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-rose-100 text-rose-800 border border-rose-200">Ditolak</span>`;
      }

      const cleanPhone = m.client_phone.replace(/\D/g, "");

      return `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 transition-all hover:border-slate-300">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm sm:text-base font-bold text-slate-900">${this.escapeHtml(m.client_name)}</h3>
                ${m.client_org ? `<span class="text-xs text-slate-500 font-medium">(${this.escapeHtml(m.client_org)})</span>` : ""}
              </div>
              <div class="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <a href="https://wa.me/${cleanPhone}" target="_blank" class="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 font-mono">
                  ${ICONS.wa}
                  <span>${this.escapeHtml(m.client_phone)}</span>
                </a>
                <span>•</span>
                <span class="text-indigo-700 font-medium">${this.escapeHtml(m.category || "Konsultasi")}</span>
              </div>
            </div>
            <div>
              ${statusBadge}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono">
            <div>
              <span class="text-slate-400 block text-[10px]">Tanggal:</span>
              <span class="font-bold text-slate-800">${m.meeting_date}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Waktu:</span>
              <span class="font-bold text-indigo-700">${m.start_time} - ${m.end_time} WIB</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Metode Pertemuan:</span>
              <span class="font-bold text-slate-800">${this.escapeHtml(m.mode || "Online")}</span>
            </div>
          </div>

          ${m.notes ? `
            <div class="text-xs text-slate-700 bg-amber-50/50 border border-amber-100 rounded-xl p-3">
              <span class="font-bold text-amber-900 block text-[11px] mb-0.5">Catatan / Kebutuhan:</span>
              <p class="leading-relaxed whitespace-pre-line">${this.escapeHtml(m.notes)}</p>
            </div>
          ` : ""}

          ${isPending ? `
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onclick="window.app.actionMeeting('${m.id}', 'decline')" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer">
                Tolak Permohonan
              </button>
              <button onclick="window.app.actionMeeting('${m.id}', 'approve')" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Setujui & Jadwalkan</span>
              </button>
            </div>
          ` : ""}
        </div>
      `;
    }).join("");
  }

  async actionMeeting(id, action) {
    let reason = "";
    if (action === "decline") {
      reason = prompt("Masukkan alasan penolakan permohonan:", "Jadwal pada jam tersebut berhalangan.");
      if (reason === null) return;
    }

    try {
      this.showToast(action === "approve" ? "Memproses persetujuan..." : "Menolak permohonan...", "info");
      const res = await fetch(`/api/meeting-requests/${id}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal memproses permohonan");
      }

      this.showToast(
        action === "approve" 
          ? "Permohonan disetujui! Agenda otomatis dibuat dan konfirmasi WA terkirim." 
          : "Permohonan telah ditolak.", 
        "success"
      );

      await this.fetchMeetingRequests();
      await this.syncWithCloud();
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  initTaskDate() {
    const input = document.getElementById("task-target-date");
    if (input) {
      input.value = this.selectedDate || this.getTodayDateString();
      this.onTaskDateChange();
    }
  }

  setTaskDatePreset(preset) {
    this.setTaskScheduleMode("once");
    const now = new Date();
    let d = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (preset === "today") {
      // today
    } else if (preset === "tomorrow") {
      d.setDate(d.getDate() + 1);
    } else if (preset === "next_monday") {
      const day = d.getDay();
      const diff = (8 - day) % 7 || 7;
      d.setDate(d.getDate() + diff);
    } else if (preset === "next_week") {
      d.setDate(d.getDate() + 7);
    }

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dayStr = String(d.getDate()).padStart(2, "0");
    const dateStr = `${y}-${m}-${dayStr}`;

    const input = document.getElementById("task-target-date");
    if (input) {
      input.value = dateStr;
      this.onTaskDateChange();
    }
  }

  onTaskDateChange() {
    const input = document.getElementById("task-target-date");
    if (!input || !input.value) return;
    const dateStr = input.value;
    const parts = dateStr.split("-");
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const dayName = days[d.getDay()];
    const labelText = `${dayName}, ${d.getDate()} ${months[d.getMonth()]}`;

    const badge = document.getElementById("task-date-day-label");
    if (badge) badge.textContent = labelText;

    const weeklyOpt = document.getElementById("task-recurrence-weekly-label");
    if (weeklyOpt) weeklyOpt.textContent = `Setiap ${dayName} (Mingguan)`;

    const colLabel = document.getElementById("collision-date-label");
    if (colLabel) colLabel.textContent = `Peta Waktu 24 Jam (${dayName}, ${dateStr}):`;

    this.handleValidityPresetChange();
    this.checkTimeCollision();
  }

  startClock() {
    const update = () => {
      const now = new Date();
      const clockEl = document.getElementById("header-clock");
      const dateEl = document.getElementById("header-date");
      if (clockEl) clockEl.textContent = now.toLocaleTimeString("id-ID") + " WIB";
      if (dateEl) {
        const opts = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
        dateEl.textContent = now.toLocaleDateString("id-ID", opts);
      }
    };
    update();
    setInterval(update, 1000);
  }

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll(".tab-pill").forEach(el => {
      if (el.dataset.tab === tab) {
        el.classList.remove("text-slate-600", "bg-transparent");
        el.classList.add("bg-indigo-600", "text-white", "shadow-sm");
      } else {
        el.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
        el.classList.add("text-slate-600");
      }
    });

    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    const target = document.getElementById(`view-${tab}`);
    if (target) {
      target.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    this.render();
    if (tab === "daily") {
      this.checkTimeCollision();
    }
  }

  // ===================== TIME & SCHEDULE CALCULATIONS =====================
  timeToMinutes(timeStr) {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) return 0;
    const parts = timeStr.split(":");
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return Math.min(1439, Math.max(0, h * 60 + m));
  }

  minutesToTime(minutes) {
    const total = Math.max(0, Math.min(1439, minutes));
    const h = String(Math.floor(total / 60)).padStart(2, "0");
    const m = String(total % 60).padStart(2, "0");
    return `${h}:${m}`;
  }

  formatDuration(startStr, endStr) {
    if (!startStr || !endStr) return "";
    const s = this.timeToMinutes(startStr);
    const e = this.timeToMinutes(endStr);
    const diff = e - s;
    if (diff <= 0) return "";
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (h > 0 && m > 0) return `${h} jam ${m} mnt`;
    if (h > 0) return `${h} jam`;
    return `${m} menit`;
  }

  // ===================== CLICKABLE 24-HOUR TIMELINE =====================
  onTimelineClick(e) {
    const bar = document.getElementById("timeline-24h-bar");
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const x = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const rawMins = ratio * 1440;
    
    let snappedStart = Math.round(rawMins / 15) * 15;
    if (snappedStart >= 1440) snappedStart = 1425;
    
    let snappedEnd = Math.min(1439, snappedStart + 60);
    if (snappedEnd <= snappedStart) snappedEnd = 1439;

    const s1StartEl = document.getElementById("task-start-time");
    const s1EndEl = document.getElementById("task-end-time");
    const toggleS2 = document.getElementById("toggle-session2");
    const s2StartEl = document.getElementById("task-session2-start");
    const s2EndEl = document.getElementById("task-session2-end");

    const hasS2 = toggleS2 && toggleS2.checked;
    const s1End = s1EndEl ? this.timeToMinutes(s1EndEl.value) : 600;

    if (hasS2 && snappedStart >= s1End && s2StartEl && s2EndEl) {
      s2StartEl.value = this.minutesToTime(snappedStart);
      s2EndEl.value = this.minutesToTime(snappedEnd);
    } else if (s1StartEl && s1EndEl) {
      s1StartEl.value = this.minutesToTime(snappedStart);
      s1EndEl.value = this.minutesToTime(snappedEnd);
    }

    this.checkTimeCollision();
  }

  // ===================== TITLE AUTOCOMPLETE RECOMMENDATIONS =====================
  bindAutocompleteEvents() {
    const input = document.getElementById("task-title");
    const dropdown = document.getElementById("title-autocomplete-dropdown");
    if (!input || !dropdown) return;

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 1) {
        dropdown.classList.add("hidden");
        return;
      }

      // Kumpulkan rekomendasi dari agenda lama, 5Y steps, dan milestones
      const pool = [];
      const seen = new Set();

      this.data.dailyTasks.forEach(t => {
        if (!seen.has(t.title.toLowerCase())) {
          seen.add(t.title.toLowerCase());
          pool.push({
            title: t.title,
            timeStart: t.timeStart,
            timeEnd: t.timeEnd,
            note: t.note,
            recurrence: t.recurrence,
            source: "Agenda Sebelumnya"
          });
        }
      });

      this.data.fiveYearPlan.forEach(y => {
        y.quarters.forEach(qtr => {
          qtr.steps.forEach(s => {
            if (!seen.has(s.title.toLowerCase())) {
              seen.add(s.title.toLowerCase());
              pool.push({
                title: s.title,
                timeStart: "08:30",
                timeEnd: "10:00",
                note: s.note,
                recurrence: "none",
                source: "Roadmap 5Y"
              });
            }
          });
        });
      });

      this.data.monthlyPlan.milestones.forEach(m => {
        if (!seen.has(m.title.toLowerCase())) {
          seen.add(m.title.toLowerCase());
          pool.push({
            title: m.title,
            timeStart: "09:00",
            timeEnd: "10:30",
            note: `Milestone bulanan: ${m.targetDate}`,
            recurrence: "none",
            source: "Milestone Bulanan"
          });
        }
      });

      const matches = pool.filter(item => item.title.toLowerCase().includes(q)).slice(0, 5);

      if (matches.length === 0) {
        dropdown.classList.add("hidden");
        return;
      }

      dropdown.innerHTML = matches.map(item => `
        <div class="autocomplete-item" onclick="window.app.applyRecommendation('${encodeURIComponent(JSON.stringify(item))}')">
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-900 truncate">${this.escapeHtml(item.title)}</p>
            <p class="text-[10px] text-slate-500 truncate">${item.note ? this.escapeHtml(item.note) : item.source}</p>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0 text-[10px] font-mono">
            <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
              ${item.timeStart} - ${item.timeEnd}
            </span>
          </div>
        </div>
      `).join("");

      dropdown.classList.remove("hidden");
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }

  applyRecommendation(encodedItem) {
    try {
      const item = JSON.parse(decodeURIComponent(encodedItem));
      const titleInput = document.getElementById("task-title");
      const s1Start = document.getElementById("task-start-time");
      const s1End = document.getElementById("task-end-time");
      const noteInput = document.getElementById("task-note");
      const recSelect = document.getElementById("task-recurrence");
      const dropdown = document.getElementById("title-autocomplete-dropdown");

      if (titleInput) titleInput.value = item.title;
      if (s1Start && item.timeStart) s1Start.value = item.timeStart;
      if (s1End && item.timeEnd) s1End.value = item.timeEnd;
      if (noteInput && item.note) noteInput.value = item.note;
      if (item.recurrence && item.recurrence !== "none") {
        this.setTaskScheduleMode("recurring");
        if (recSelect) recSelect.value = item.recurrence;
      } else {
        this.setTaskScheduleMode("once");
        if (recSelect) recSelect.value = "none";
      }

      if (dropdown) dropdown.classList.add("hidden");
      this.checkTimeCollision();
    } catch (e) {
      console.error("Gagal menerapkan rekomendasi:", e);
    }
  }

  // ===================== MISSED TASK DETECTION & POPUP MODAL =====================
  isTaskMissed(task, dateStr) {
    if (task.isDone || task.isCancelled) return false;
    const today = this.getTodayDateString();

    if (dateStr < today) {
      return true;
    }
    if (dateStr === today) {
      const now = new Date();
      const currentMins = now.getHours() * 60 + now.getMinutes();
      const taskEndMins = this.timeToMinutes(task.timeEnd || task.timeStart || "23:59");
      return currentMins > (taskEndMins + 15);
    }
    return false;
  }

  getMissedTasksWithoutReason(dateStr) {
    const tasks = this.getTasksForDate(dateStr);
    return tasks.filter(t => this.isTaskMissed(t, dateStr) && !t.missedReason);
  }

  openMissedReasonModal(taskId, dateStr) {
    const task = this.data.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    this.evaluatingTaskId = taskId;
    this.evaluatingDate = dateStr;

    const modal = document.getElementById("modal-missed-reason");
    const titleEl = document.getElementById("missed-modal-title");
    const dateEl = document.getElementById("missed-modal-date");
    const timeEl = document.getElementById("missed-modal-time");
    const textarea = document.getElementById("missed-modal-reason-input");

    if (titleEl) titleEl.textContent = task.title;
    if (dateEl) dateEl.textContent = `Tanggal: ${dateStr}`;
    if (timeEl) timeEl.textContent = `${task.timeStart} - ${task.timeEnd || 'Selesai'} WIB`;
    if (textarea) textarea.value = task.missedReason || "";

    if (modal) modal.classList.remove("hidden");
  }

  closeMissedReasonModal() {
    const modal = document.getElementById("modal-missed-reason");
    if (modal) modal.classList.add("hidden");
    this.evaluatingTaskId = null;
    this.evaluatingDate = null;
  }

  setMissedQuickReason(reasonText) {
    const textarea = document.getElementById("missed-modal-reason-input");
    if (textarea) {
      if (textarea.value.trim()) {
        textarea.value = `${textarea.value.trim()}. ${reasonText}`;
      } else {
        textarea.value = reasonText;
      }
    }
  }

  saveMissedReason() {
    const textarea = document.getElementById("missed-modal-reason-input");
    const reason = textarea ? textarea.value.trim() : "";
    if (!reason) {
      alert("Alasan atau kendala wajib diisi!");
      return;
    }

    const task = this.data.dailyTasks.find(t => t.id === this.evaluatingTaskId);
    if (task) {
      task.missedReason = reason;
      task.missedReasonLoggedAt = new Date().toISOString();
      this.saveData();
      this.render();
      alert("Evaluasi kendala berhasil disimpan!");
    }

    this.closeMissedReasonModal();
  }

  saveMissedReasonAndReschedule() {
    const textarea = document.getElementById("missed-modal-reason-input");
    const reason = textarea ? textarea.value.trim() : "";
    if (!reason) {
      alert("Mohon isi alasan/kendala sebelum menjadwalkan ulang!");
      return;
    }

    const task = this.data.dailyTasks.find(t => t.id === this.evaluatingTaskId);
    if (!task) return;

    task.missedReason = `${reason} (Dijadwalkan ulang ke besok)`;
    task.missedReasonLoggedAt = new Date().toISOString();

    // Hitung tanggal besok
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const tomorrowStr = d.toISOString().split("T")[0];

    // Tambah task clone ke besok
    this.data.dailyTasks.unshift({
      id: "t-" + Date.now(),
      date: tomorrowStr,
      timeStart: task.timeStart,
      timeEnd: task.timeEnd,
      hasSecondSession: task.hasSecondSession,
      session2Start: task.session2Start,
      session2End: task.session2End,
      title: task.title,
      note: `Jadwal ulang dari ${this.evaluatingDate}: ${reason}`,
      recurrence: "none",
      validityType: "until_completed",
      validUntil: "",
      status: "todo",
      completedDates: [],
      deletedDates: []
    });

    this.saveData();
    this.render();
    this.closeMissedReasonModal();
    alert(`Agenda "${task.title}" berhasil dievaluasi dan dijadwalkan ulang ke besok (${tomorrowStr})!`);
  }

  openFirstUnaddressedMissedTask() {
    const unaddressed = this.getMissedTasksWithoutReason(this.selectedDate);
    if (unaddressed.length > 0) {
      this.openMissedReasonModal(unaddressed[0].id, this.selectedDate);
    }
  }

  // ===================== CANCEL TASK MODAL & REASON HANDLING =====================
  openCancelTaskModal(taskId, dateStr) {
    const task = this.data.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    this.cancellingTaskId = taskId;
    this.cancellingDate = dateStr;

    const modal = document.getElementById("modal-cancel-task");
    const titleEl = document.getElementById("cancel-modal-title");
    const dateEl = document.getElementById("cancel-modal-date");
    const timeEl = document.getElementById("cancel-modal-time");
    const textarea = document.getElementById("cancel-task-reason-input");

    if (titleEl) titleEl.textContent = task.title;
    if (dateEl) dateEl.textContent = `Tanggal: ${dateStr}`;
    if (timeEl) timeEl.textContent = task.timeStart ? `${task.timeStart} - ${task.timeEnd || 'Selesai'} WIB` : "Hari Ini";
    if (textarea) {
      const existing = (task.cancellationReasons && task.cancellationReasons[dateStr]) || task.cancelReason || "";
      textarea.value = existing;
    }

    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  }

  closeCancelTaskModal() {
    const modal = document.getElementById("modal-cancel-task");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
    this.cancellingTaskId = null;
    this.cancellingDate = null;
  }

  selectCancelReasonPreset(preset) {
    const textarea = document.getElementById("cancel-task-reason-input");
    if (textarea) {
      if (textarea.value.trim()) {
        textarea.value = `${textarea.value.trim()}. ${preset}`;
      } else {
        textarea.value = preset;
      }
    }
  }

  confirmCancelTask() {
    if (!this.cancellingTaskId) return;
    const task = this.data.dailyTasks.find(t => t.id === this.cancellingTaskId);
    if (!task) return;

    const textarea = document.getElementById("cancel-task-reason-input");
    const reason = textarea && textarea.value.trim() ? textarea.value.trim() : "Dibatalkan oleh pengguna";

    if (task.recurrence && task.recurrence !== "none") {
      if (!task.cancelledDates) task.cancelledDates = [];
      if (!task.cancelledDates.includes(this.cancellingDate)) {
        task.cancelledDates.push(this.cancellingDate);
      }
      if (!task.cancellationReasons) task.cancellationReasons = {};
      task.cancellationReasons[this.cancellingDate] = reason;
    } else {
      task.status = "cancelled";
      task.cancelReason = reason;
      if (!task.cancellationReasons) task.cancellationReasons = {};
      task.cancellationReasons[this.cancellingDate] = reason;
    }

    this.saveData();
    this.render();
    this.closeCancelTaskModal();
    alert(`Agenda "${task.title}" telah ditandai batal dengan alasan: "${reason}".`);
  }

  restoreCancelledTask(taskId, dateStr) {
    const task = this.data.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.recurrence && task.recurrence !== "none") {
      if (task.cancelledDates) {
        task.cancelledDates = task.cancelledDates.filter(d => d !== dateStr);
      }
      if (task.cancellationReasons) {
        delete task.cancellationReasons[dateStr];
      }
    } else {
      task.status = "todo";
      delete task.cancelReason;
    }

    this.saveData();
    this.render();
    alert(`Agenda "${task.title}" berhasil diaktifkan kembali!`);
  }

  // ===================== WA MISSED TASK ALERT TRIGGER =====================
  async checkMissedTasksAndAlert() {
    if (!this.data.notifications.missedTaskAlert || !this.data.notifications.missedTaskAlert.enabled) return;

    const today = this.getTodayDateString();
    const tasks = this.getTasksForDate(today);

    for (const t of tasks) {
      if (this.isTaskMissed(t, today) && !t.missedAlertSent) {
        t.missedAlertSent = true;
        this.saveData();
        const phone = this.data.notifications.targetPhone || "6288971071138";
        const message = 
`Halo Pak ${this.data.profile.name}, mohon izin menginfokan ya Pak 🙏

Jadwal Bapak *"${t.title}"* yang dialokasikan pukul *${t.timeStart} - ${t.timeEnd} WIB* sepertinya sudah berakhir.

Silakan dicek dan dicoret ya Pak jadwalnya di dashboard apabila pekerjaannya sudah selesai sebelum rekap jam 12.00 nanti.

Apabila agenda ini berhalangan atau batal, Bapak bisa langsung klik tombol "Batal" dan cantumkan kendalanya di https://productivity.ilhampradani.me ya Pak.

Semoga hari Bapak selalu produktif!
*Aura Desk*`;

        await this.dispatchWAMessage(phone, message, `Pengingat: ${t.title}`);
        break; // Batasi 1 alert per turn agar tidak spam
      }
    }
  }

  async sendTestMissedTaskWA() {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const message = 
`Halo Pak ${this.data.profile.name}, mohon izin menginfokan ya Pak 🙏

Jadwal Bapak *"Uji Coba Pengingat Agenda"* yang dialokasikan pukul *09:00 - 10:30 WIB* sepertinya sudah berakhir.

Silakan dicek dan dicoret ya Pak jadwalnya di dashboard apabila pekerjaannya sudah selesai sebelum rekap jam 12.00 nanti.

Apabila agenda ini berhalangan atau batal, Bapak bisa langsung klik tombol "Batal" dan cantumkan kendalanya di https://productivity.ilhampradani.me ya Pak.

Semoga hari Bapak selalu lancar!
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Tes Pengingat Coret Jadwal");
  }

  // Mengambil seluruh agenda yang berlaku untuk tanggal tertentu
  getTasksForDate(targetDate) {
    return this.data.dailyTasks.filter(task => {
      if (task.deletedDates && task.deletedDates.includes(targetDate)) return false;

      if (!task.recurrence || task.recurrence === "none") {
        return task.date === targetDate;
      }
      if (task.recurrence === "daily") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        return true;
      }
      if (task.recurrence === "weekdays") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow >= 1 && dow <= 5;
      }
      if (task.recurrence === "weekly_day") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const p1 = targetDate.split("-");
        const p2 = task.date.split("-");
        const dow1 = new Date(parseInt(p1[0], 10), parseInt(p1[1], 10) - 1, parseInt(p1[2], 10)).getDay();
        const dow2 = new Date(parseInt(p2[0], 10), parseInt(p2[1], 10) - 1, parseInt(p2[2], 10)).getDay();
        return dow1 === dow2;
      }
      if (task.recurrence === "yearly") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        return targetDate.slice(5) === task.date.slice(5);
      }
      return false;
    }).map(task => {
      let isDone = task.status === "done";
      let isCancelled = task.status === "cancelled";
      if (task.recurrence && task.recurrence !== "none") {
        isDone = task.completedDates && task.completedDates.includes(targetDate);
        isCancelled = task.cancelledDates && task.cancelledDates.includes(targetDate);
      }
      const cancelReason = (task.cancellationReasons && task.cancellationReasons[targetDate]) || task.cancelReason || "";
      return { ...task, isDone, isCancelled, cancelReason };
    });
  }

  getOccupiedIntervals(targetDate, excludeTaskId = null) {
    const tasks = this.getTasksForDate(targetDate).filter(t => t.id !== excludeTaskId && !t.isCancelled);
    const intervals = [];

    tasks.forEach(t => {
      if (t.timeStart && t.timeEnd) {
        const s = this.timeToMinutes(t.timeStart);
        const e = this.timeToMinutes(t.timeEnd);
        if (e > s) {
          intervals.push({ start: s, end: e, title: t.title, taskId: t.id, session: 1 });
        }
      }
      if (t.hasSecondSession && t.session2Start && t.session2End) {
        const s2 = this.timeToMinutes(t.session2Start);
        const e2 = this.timeToMinutes(t.session2End);
        if (e2 > s2) {
          intervals.push({ start: s2, end: e2, title: `${t.title} (Sesi Malam)`, taskId: t.id, session: 2 });
        }
      }
    });

    intervals.sort((a, b) => a.start - b.start);
    return intervals;
  }

  checkTimeCollision() {
    const s1StartEl = document.getElementById("task-start-time");
    const s1EndEl = document.getElementById("task-end-time");
    const toggleS2 = document.getElementById("toggle-session2");
    const s2StartEl = document.getElementById("task-session2-start");
    const s2EndEl = document.getElementById("task-session2-end");
    const badgeEl = document.getElementById("collision-status-badge");
    const warnBox = document.getElementById("collision-warning-box");
    const warnText = document.getElementById("collision-warning-text");
    const submitBtn = document.getElementById("btn-save-task");
    const barEl = document.getElementById("timeline-24h-bar");

    if (!s1StartEl || !s1EndEl || !barEl) return;

    const s1Start = this.timeToMinutes(s1StartEl.value);
    const s1End = this.timeToMinutes(s1EndEl.value);
    const hasS2 = toggleS2 && toggleS2.checked;
    const s2Start = hasS2 ? this.timeToMinutes(s2StartEl.value) : null;
    const s2End = hasS2 ? this.timeToMinutes(s2EndEl.value) : null;

    const targetDateInput = document.getElementById("task-target-date");
    const targetDate = (targetDateInput && targetDateInput.value) || this.selectedDate;
    const occupied = this.getOccupiedIntervals(targetDate, this.editingTaskId);
    let conflict = null;

    if (s1End <= s1Start) {
      conflict = { msg: "Jam selesai Sesi 1 harus lebih besar dari jam mulai!" };
    }

    if (!conflict) {
      for (const occ of occupied) {
        if (s1Start < occ.end && s1End > occ.start) {
          conflict = { 
            msg: `Bertabrakan dengan agenda "${occ.title}" (${this.minutesToTime(occ.start)} - ${this.minutesToTime(occ.end)})` 
          };
          break;
        }
      }
    }

    if (!conflict && hasS2) {
      if (s2End <= s2Start) {
        conflict = { msg: "Jam selesai Sesi Malam harus lebih besar dari jam mulai!" };
      } else if (s2Start < s1End && s2End > s1Start) {
        conflict = { msg: "Sesi Malam bertabrakan dengan Sesi 1 agenda ini sendiri!" };
      } else {
        for (const occ of occupied) {
          if (s2Start < occ.end && s2End > occ.start) {
            conflict = { 
              msg: `Sesi Malam bertabrakan dengan agenda "${occ.title}" (${this.minutesToTime(occ.start)} - ${this.minutesToTime(occ.end)})` 
            };
            break;
          }
        }
      }
    }

    if (conflict) {
      if (badgeEl) {
        badgeEl.innerHTML = `${ICONS.alertTriangle} <span>Ada Bentrok Waktu!</span>`;
        badgeEl.className = "font-bold text-rose-700 flex items-center gap-1.5 flex-shrink-0";
      }
      if (warnBox && warnText) {
        warnBox.classList.remove("hidden");
        warnText.textContent = conflict.msg;
      }
      if (submitBtn) submitBtn.disabled = true;
    } else {
      if (badgeEl) {
        badgeEl.innerHTML = `${ICONS.checkCircle} <span>Slot Aman</span>`;
        badgeEl.className = "font-bold text-emerald-700 flex items-center gap-1.5 flex-shrink-0";
      }
      if (warnBox) warnBox.classList.add("hidden");
      if (submitBtn) submitBtn.disabled = false;
    }

    let html = "";
    occupied.forEach(occ => {
      const left = (occ.start / 1440) * 100;
      const width = Math.max(1, ((occ.end - occ.start) / 1440) * 100);
      html += `
        <div class="timeline-slot-occupied" style="left: ${left.toFixed(2)}%; width: ${width.toFixed(2)}%;" title="${this.escapeHtml(occ.title)} (${this.minutesToTime(occ.start)} - ${this.minutesToTime(occ.end)})"></div>
      `;
    });

    if (s1End > s1Start) {
      const left = (s1Start / 1440) * 100;
      const width = Math.max(1, ((s1End - s1Start) / 1440) * 100);
      const isConf = conflict !== null;
      html += `
        <div class="timeline-slot-current ${isConf ? 'conflict' : 'valid'}" style="left: ${left.toFixed(2)}%; width: ${width.toFixed(2)}%;" title="Sesi 1: ${this.minutesToTime(s1Start)} - ${this.minutesToTime(s1End)}"></div>
      `;
    }

    if (hasS2 && s2End > s2Start) {
      const left = (s2Start / 1440) * 100;
      const width = Math.max(1, ((s2End - s2Start) / 1440) * 100);
      const isConf = conflict !== null;
      html += `
        <div class="timeline-slot-current ${isConf ? 'conflict' : 'valid'}" style="left: ${left.toFixed(2)}%; width: ${width.toFixed(2)}%;" title="Sesi Malam: ${this.minutesToTime(s2Start)} - ${this.minutesToTime(s2End)}"></div>
      `;
    }

    barEl.innerHTML = html;
  }

  pickNextFreeSlot(requestedDurationMinutes = 60) {
    const targetDateInput = document.getElementById("task-target-date");
    const targetDate = (targetDateInput && targetDateInput.value) || this.selectedDate;
    const occupied = this.getOccupiedIntervals(targetDate, this.editingTaskId);
    let pointer = 480;
    let foundStart = null;

    while (pointer + requestedDurationMinutes <= 1380) {
      let isFree = true;
      for (const occ of occupied) {
        if (pointer < occ.end && (pointer + requestedDurationMinutes) > occ.start) {
          isFree = false;
          pointer = occ.end;
          break;
        }
      }
      if (isFree) {
        foundStart = pointer;
        break;
      }
    }

    if (foundStart === null) {
      pointer = 360;
      while (pointer + requestedDurationMinutes <= 1440) {
        let isFree = true;
        for (const occ of occupied) {
          if (pointer < occ.end && (pointer + requestedDurationMinutes) > occ.start) {
            isFree = false;
            pointer = occ.end;
            break;
          }
        }
        if (isFree) {
          foundStart = pointer;
          break;
        }
      }
    }

    if (foundStart !== null) {
      const sEl = document.getElementById("task-start-time");
      const eEl = document.getElementById("task-end-time");
      if (sEl && eEl) {
        sEl.value = this.minutesToTime(foundStart);
        eEl.value = this.minutesToTime(foundStart + requestedDurationMinutes);
        this.checkTimeCollision();
      }
    } else {
      alert("Jadwal hari ini sudah padat dalam 24 jam. Silakan kurangi durasi atau pilih tanggal lain.");
    }
  }

  // ===================== ANALOG CLOCK PICKER ENGINE =====================
  openClockPicker(targetInputId) {
    this.clockTargetInputId = targetInputId;
    const input = document.getElementById(targetInputId);
    let initialTime = "09:00";
    if (input && input.value && input.value.includes(":")) {
      initialTime = input.value;
    }

    const [hStr, mStr] = initialTime.split(":");
    let h24 = parseInt(hStr, 10) || 0;
    this.clockMinute = parseInt(mStr, 10) || 0;

    if (h24 >= 12) {
      this.clockPeriod = "day";
      this.clockHour = h24 === 12 ? 12 : h24 - 12;
    } else {
      this.clockPeriod = "night";
      this.clockHour = h24 === 0 ? 12 : h24;
    }

    this.clockUnit = "hour";
    this.renderClockPlate();
    this.updateClockUI();

    const modal = document.getElementById("modal-clock-picker");
    if (modal) modal.classList.remove("hidden");
  }

  closeClockPicker() {
    const modal = document.getElementById("modal-clock-picker");
    if (modal) modal.classList.add("hidden");
    this.clockTargetInputId = null;
  }

  setClockUnit(unit) {
    this.clockUnit = unit;
    this.renderClockPlate();
    this.updateClockUI();
  }

  setClockPeriod(period) {
    this.clockPeriod = period;
    this.updateClockUI();
  }

  renderClockPlate() {
    const container = document.getElementById("clock-numbers-container");
    if (!container) return;

    const radius = 80;
    const centerX = 120;
    const centerY = 120;
    let html = "";

    if (this.clockUnit === "hour") {
      for (let i = 1; i <= 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const isActive = this.clockHour === i;
        html += `
          <div class="clock-dial-number ${isActive ? 'active' : ''}" style="left: ${x.toFixed(1)}px; top: ${y.toFixed(1)}px;">
            ${i}
          </div>
        `;
      }
    } else {
      for (let i = 0; i < 60; i += 5) {
        const angle = (i * 6 - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const isActive = Math.round(this.clockMinute / 5) * 5 === i;
        html += `
          <div class="clock-dial-number ${isActive ? 'active' : ''}" style="left: ${x.toFixed(1)}px; top: ${y.toFixed(1)}px;">
            ${String(i).padStart(2, "0")}
          </div>
        `;
      }
    }

    container.innerHTML = html;
  }

  updateClockUI() {
    const btnHour = document.getElementById("clock-btn-mode-hour");
    const btnMin = document.getElementById("clock-btn-mode-minute");
    const btnDay = document.getElementById("clock-btn-day");
    const btnNight = document.getElementById("clock-btn-night");
    const handLine = document.getElementById("clock-hand-line");
    const handPointer = document.getElementById("clock-hand-pointer");

    let h24 = this.clockHour;
    if (this.clockPeriod === "day") {
      h24 = this.clockHour === 12 ? 12 : this.clockHour + 12;
    } else {
      h24 = this.clockHour === 12 ? 0 : this.clockHour;
    }

    if (btnHour) {
      btnHour.textContent = String(h24).padStart(2, "0");
      if (this.clockUnit === "hour") {
        btnHour.className = "text-3xl font-black font-mono text-indigo-700 bg-white border border-indigo-200 shadow-sm rounded-xl px-3 py-1 cursor-pointer transition-all";
      } else {
        btnHour.className = "text-3xl font-black font-mono text-slate-400 hover:text-slate-800 rounded-xl px-3 py-1 cursor-pointer transition-all";
      }
    }

    if (btnMin) {
      btnMin.textContent = String(this.clockMinute).padStart(2, "0");
      if (this.clockUnit === "minute") {
        btnMin.className = "text-3xl font-black font-mono text-indigo-700 bg-white border border-indigo-200 shadow-sm rounded-xl px-3 py-1 cursor-pointer transition-all";
      } else {
        btnMin.className = "text-3xl font-black font-mono text-slate-400 hover:text-slate-800 rounded-xl px-3 py-1 cursor-pointer transition-all";
      }
    }

    if (btnDay && btnNight) {
      if (this.clockPeriod === "day") {
        btnDay.className = "px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 border border-amber-300 font-bold cursor-pointer flex items-center gap-1 shadow-sm";
        btnNight.className = "px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer flex items-center gap-1";
      } else {
        btnNight.className = "px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-300 font-bold cursor-pointer flex items-center gap-1 shadow-sm";
        btnDay.className = "px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer flex items-center gap-1";
      }
    }

    let angle = 0;
    if (this.clockUnit === "hour") {
      angle = (this.clockHour % 12) * 30;
      if (handPointer) handPointer.textContent = this.clockHour;
    } else {
      angle = this.clockMinute * 6;
      if (handPointer) handPointer.textContent = String(this.clockMinute).padStart(2, "0");
    }

    if (handLine) {
      handLine.style.transform = `rotate(${angle}deg)`;
    }
  }

  onClockPointerDown(e) {
    this.isClockDragging = true;
    this.handleClockPointerEvent(e);
  }

  handleClockPointerEvent(e) {
    const plate = document.getElementById("analog-clock-plate");
    if (!plate) return;

    const rect = plate.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    let degrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;

    if (this.clockUnit === "hour") {
      let hour = Math.round(degrees / 30);
      if (hour === 0) hour = 12;
      this.clockHour = hour;
    } else {
      let minute = Math.round(degrees / 6) % 60;
      this.clockMinute = minute;
    }

    this.renderClockPlate();
    this.updateClockUI();
  }

  clockAddMinutes(delta) {
    let h24 = this.clockHour;
    if (this.clockPeriod === "day") {
      h24 = this.clockHour === 12 ? 12 : this.clockHour + 12;
    } else {
      h24 = this.clockHour === 12 ? 0 : this.clockHour;
    }

    let totalMins = h24 * 60 + this.clockMinute + delta;
    if (totalMins < 0) totalMins += 1440;
    totalMins = totalMins % 1440;

    const newH24 = Math.floor(totalMins / 60);
    this.clockMinute = totalMins % 60;

    if (newH24 >= 12) {
      this.clockPeriod = "day";
      this.clockHour = newH24 === 12 ? 12 : newH24 - 12;
    } else {
      this.clockPeriod = "night";
      this.clockHour = newH24 === 0 ? 12 : newH24;
    }

    this.renderClockPlate();
    this.updateClockUI();
  }

  applyClockPicker() {
    if (!this.clockTargetInputId) {
      this.closeClockPicker();
      return;
    }

    let h24 = this.clockHour;
    if (this.clockPeriod === "day") {
      h24 = this.clockHour === 12 ? 12 : this.clockHour + 12;
    } else {
      h24 = this.clockHour === 12 ? 0 : this.clockHour;
    }

    const timeStr = `${String(h24).padStart(2, "0")}:${String(this.clockMinute).padStart(2, "0")}`;
    const input = document.getElementById(this.clockTargetInputId);
    if (input) {
      input.value = timeStr;
      this.checkTimeCollision();
    }

    this.closeClockPicker();
  }

  bindClockEvents() {
    window.addEventListener("pointermove", (e) => {
      if (this.isClockDragging) {
        this.handleClockPointerEvent(e);
      }
    });

    window.addEventListener("pointerup", () => {
      if (this.isClockDragging) {
        this.isClockDragging = false;
        if (this.clockUnit === "hour") {
          setTimeout(() => {
            this.setClockUnit("minute");
          }, 200);
        }
      }
    });
  }

  // ===================== FORM HANDLERS & RECURRENCE =====================
  toggleSession2UI() {
    const toggle = document.getElementById("toggle-session2");
    const container = document.getElementById("session2-container");
    if (!toggle || !container) return;

    if (toggle.checked) {
      container.classList.remove("hidden");
      container.classList.add("grid");
    } else {
      container.classList.add("hidden");
      container.classList.remove("grid");
    }
    this.checkTimeCollision();
  }

  setTaskScheduleMode(mode = "once") {
    this.taskScheduleMode = mode;
    const btnOnce = document.getElementById("btn-mode-once");
    const btnRecurring = document.getElementById("btn-mode-recurring");
    const dateTitle = document.getElementById("section-date-title");
    const bannerOnce = document.getElementById("banner-once-mode");
    const recurrenceSection = document.getElementById("container-recurrence-section");
    const quickPresets = document.getElementById("container-quick-date-presets");
    const recSelect = document.getElementById("task-recurrence");

    if (mode === "once") {
      if (btnOnce) {
        btnOnce.className = "flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 bg-indigo-600 text-white shadow-sm cursor-pointer";
      }
      if (btnRecurring) {
        btnRecurring.className = "flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900 bg-transparent cursor-pointer";
      }
      if (dateTitle) {
        dateTitle.textContent = "TANGGAL PELAKSANAAN (SEKALI SAJA)";
      }
      if (quickPresets) {
        quickPresets.classList.remove("hidden");
      }
      if (bannerOnce) {
        bannerOnce.classList.remove("hidden");
      }
      if (recurrenceSection) {
        recurrenceSection.classList.add("hidden");
      }
      if (recSelect) {
        recSelect.value = "none";
      }
    } else {
      // mode recurring: hide quick presets Hari Ini, Besok, Senin Depan, Minggu Depan
      if (btnOnce) {
        btnOnce.className = "flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900 bg-transparent cursor-pointer";
      }
      if (btnRecurring) {
        btnRecurring.className = "flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 bg-indigo-600 text-white shadow-sm cursor-pointer";
      }
      if (dateTitle) {
        dateTitle.textContent = "TANGGAL MULAI BERLAKU (BERULANG)";
      }
      if (quickPresets) {
        quickPresets.classList.add("hidden");
      }
      if (bannerOnce) {
        bannerOnce.classList.add("hidden");
      }
      if (recurrenceSection) {
        recurrenceSection.classList.remove("hidden");
      }
      if (recSelect) {
        if (!recSelect.value || recSelect.value === "none") {
          recSelect.value = "daily";
        }
      }
      this.handleValidityPresetChange();
    }
  }

  handleRecurrenceChange() {
    const recSelect = document.getElementById("task-recurrence");
    if (recSelect) {
      if (recSelect.value === "none") {
        this.setTaskScheduleMode("once");
      } else {
        if (this.taskScheduleMode !== "recurring") {
          this.setTaskScheduleMode("recurring");
        }
      }
    }
    this.handleValidityPresetChange();
  }

  initValidityPreset() {
    const presetEl = document.getElementById("task-validity-preset");
    if (presetEl) {
      presetEl.value = "3_years";
      this.handleValidityPresetChange();
    }
  }

  handleValidityPresetChange() {
    const preset = document.getElementById("task-validity-preset") ? document.getElementById("task-validity-preset").value : "3_years";
    const customRow = document.getElementById("custom-end-date-row");
    const untilInput = document.getElementById("task-valid-until");

    if (preset === "custom_date") {
      if (customRow) customRow.classList.remove("hidden");
      return;
    }

    if (customRow) customRow.classList.add("hidden");
    if (!untilInput) return;

    const base = new Date(this.selectedDate || this.getTodayDateString());
    if (preset === "1_month") {
      base.setMonth(base.getMonth() + 1);
      untilInput.value = base.toISOString().split("T")[0];
    } else if (preset === "1_year") {
      base.setFullYear(base.getFullYear() + 1);
      untilInput.value = base.toISOString().split("T")[0];
    } else if (preset === "3_years") {
      base.setFullYear(base.getFullYear() + 3);
      untilInput.value = base.toISOString().split("T")[0];
    } else {
      untilInput.value = "";
    }
  }

  // ===================== METRICS & SIDEBAR =====================
  getMetrics() {
    const tasks = this.getTasksForDate(this.selectedDate);
    const activeTasks = tasks.filter(t => !t.isCancelled);
    const total = activeTasks.length;
    const done = activeTasks.filter(t => t.isDone).length;
    const cancelled = tasks.filter(t => t.isCancelled).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    let total5Y = 0;
    let done5Y = 0;
    this.data.fiveYearPlan.forEach(y => {
      y.quarters.forEach(q => {
        q.steps.forEach(s => {
          total5Y++;
          if (s.done) done5Y++;
        });
      });
    });
    const pct5Y = total5Y > 0 ? Math.round((done5Y / total5Y) * 100) : 0;

    return { total, done, cancelled, pct, pct5Y };
  }

  updateSidebarBriefing() {
    const m = this.getMetrics();
    const pctEl = document.getElementById("stat-daily-pct");
    const totalEl = document.getElementById("stat-daily-total");
    const pct5YEl = document.getElementById("stat-5y-pct");
    const greetEl = document.getElementById("sidebar-greeting");
    const descEl = document.getElementById("sidebar-desc");

    if (pctEl) pctEl.textContent = `${m.pct}%`;
    if (totalEl) totalEl.textContent = `${m.total}`;
    if (pct5YEl) pct5YEl.textContent = `${m.pct5Y}%`;

    const hour = new Date().getHours();
    let greet = "Selamat Malam";
    if (hour >= 4 && hour < 11) greet = "Selamat Pagi";
    else if (hour >= 11 && hour < 15) greet = "Selamat Siang";
    else if (hour >= 15 && hour < 18) greet = "Selamat Sore";

    if (greetEl) greetEl.textContent = `${greet}, Pak ${this.data.profile.name}!`;
    if (descEl) {
      if (m.total === 0) {
        descEl.textContent = "Belum ada agenda pada tanggal ini. Slot 24 jam masih kosong dan siap diisi.";
      } else if (m.pct === 100) {
        descEl.textContent = `Seluruh ${m.total} agenda hari ini selesai sempurna tanpa bentrok. Kerja luar biasa!`;
      } else {
        descEl.textContent = `Progress harian: ${m.done} dari ${m.total} agenda terselesaikan (${m.pct}%).`;
      }
    }

    // Update Missed Tasks in Sidebar
    const unaddressed = this.getMissedTasksWithoutReason(this.selectedDate);
    const badge = document.getElementById("sidebar-missed-count-badge");
    const missedDesc = document.getElementById("sidebar-missed-desc");
    if (badge) {
      if (unaddressed.length > 0) {
        badge.textContent = `${unaddressed.length} Perlu Diisi`;
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 animate-pulse";
      } else {
        badge.textContent = `0 Terlewat`;
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700";
      }
    }
    if (missedDesc) {
      if (unaddressed.length > 0) {
        missedDesc.textContent = `${unaddressed.length} agenda belum dicoret/terselesaikan dan wajib dicatat kendalanya.`;
      } else {
        missedDesc.textContent = "Semua agenda terlaksana dengan baik atau kendala sudah tercatat.";
      }
    }
  }

  render() {
    this.updateSidebarBriefing();
    if (this.activeTab === "daily") this.renderDailyView();
    else if (this.activeTab === "meetings") this.renderMeetingsView();
    else if (this.activeTab === "monthly") this.renderMonthlyView();
    else if (this.activeTab === "roadmap") this.renderRoadmapView();
    else if (this.activeTab === "history") this.renderHistoryView();
    else if (this.activeTab === "notifications") this.renderNotificationsView();
  }

  // ===================== DAILY VIEW =====================
  renderDailyView() {
    const list = document.getElementById("daily-task-container");
    if (!list) return;

    let tasks = this.getTasksForDate(this.selectedDate);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || (t.note && t.note.toLowerCase().includes(q)));
    }

    // STRICT CHRONOLOGICAL AUTO-SORTING (Waktu Mulai Ascending)
    tasks.sort((a, b) => {
      const mA = this.timeToMinutes(a.timeStart || "23:59");
      const mB = this.timeToMinutes(b.timeStart || "23:59");
      if (mA !== mB) return mA - mB;
      const eA = this.timeToMinutes(a.timeEnd || "23:59");
      const eB = this.timeToMinutes(b.timeEnd || "23:59");
      return eA - eB;
    });

    // Check Missed Tasks without Reason for Banner
    const unaddressedMissed = this.getMissedTasksWithoutReason(this.selectedDate);
    const alertBanner = document.getElementById("missed-tasks-alert-banner");
    const bannerText = document.getElementById("missed-tasks-banner-text");
    if (alertBanner && bannerText) {
      if (unaddressedMissed.length > 0) {
        alertBanner.classList.remove("hidden");
        bannerText.textContent = `Terdapat ${unaddressedMissed.length} agenda yang terlewat belum dievaluasi kendalanya!`;
      } else {
        alertBanner.classList.add("hidden");
      }
    }

    if (tasks.length === 0) {
      list.innerHTML = `
        <div class="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
          <p class="text-sm font-medium text-slate-600">Tidak ada agenda pada tanggal ini.</p>
          <p class="text-xs text-slate-500 mt-1">Gunakan form Google-style atau klik peta bar 24 jam di atas untuk menjadwalkan agenda bebas bentrok.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = tasks.map(task => {
      const isDone = task.isDone;
      const isMissed = this.isTaskMissed(task, this.selectedDate);
      const dur1 = this.formatDuration(task.timeStart, task.timeEnd);
      const dur2 = task.hasSecondSession ? this.formatDuration(task.session2Start, task.session2End) : "";

      let recurrenceBadge = "";
      if (task.recurrence === "daily") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">${ICONS.repeat} <span>Tiap Hari</span></span>`;
      } else if (task.recurrence === "weekdays") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">${ICONS.repeat} <span>Senin - Jumat</span></span>`;
      } else if (task.recurrence === "weekly_day") {
        const parts = (task.date || this.selectedDate).split("-");
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Setiap ${days[d.getDay()]}</span></span>`;
      } else if (task.recurrence === "yearly") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200">${ICONS.repeat} <span>Tiap Tahun</span></span>`;
      }

      // Cancellation badge
      let cancelBadgeHtml = "";
      if (task.isCancelled) {
        cancelBadgeHtml = `
          <span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
            <svg class="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            <span class="truncate max-w-[200px]">Batal: ${this.escapeHtml(task.cancelReason || 'Dibatalkan')}</span>
          </span>
        `;
      }

      // Missed Task Badge or Reason
      let missedBadgeHtml = "";
      if (isMissed) {
        if (task.missedReason) {
          missedBadgeHtml = `
            <button type="button" onclick="window.app.openMissedReasonModal('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300 text-[11px] font-medium cursor-pointer" title="Klik untuk edit evaluasi kendala">
              ${ICONS.alertTriangle}
              <span class="truncate max-w-[220px]">Kendala: ${this.escapeHtml(task.missedReason)}</span>
            </button>
          `;
        } else {
          missedBadgeHtml = `
            <button type="button" onclick="window.app.openMissedReasonModal('${task.id}', '${this.selectedDate}')" class="badge-missed-alert animate-pulse cursor-pointer">
              ${ICONS.alertTriangle}
              <span>Wajib Isi Kendala</span>
            </button>
          `;
        }
      }

      return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border transition-all ${
          task.isCancelled
            ? "bg-rose-50/20 border-rose-200/60 opacity-75"
            : isDone 
              ? "bg-slate-50/70 border-slate-200 opacity-60" 
              : "bg-white hover:bg-slate-50/50 border-slate-200 shadow-sm"
        }">
          <div class="flex items-start sm:items-center gap-3 flex-1 min-w-0">
            ${task.isCancelled ? `
              <div class="w-5 h-5 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 flex-shrink-0 mt-1 sm:mt-0" title="Agenda ini dibatalkan">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </div>
            ` : `
              <!-- Checkbox -->
              <input type="checkbox" ${isDone ? 'checked' : ''} onchange="window.app.toggleTask('${task.id}', '${this.selectedDate}')" class="custom-checkbox flex-shrink-0 mt-1 sm:mt-0">
            `}
            
            <!-- PROMINENT TIME PILLAR -->
            <div class="task-time-pillar flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 min-w-[130px] shadow-sm">
              <div class="flex items-center gap-1.5 text-xs font-bold font-mono text-slate-900">
                ${ICONS.sun}
                <span>${task.timeStart || '09:00'} - ${task.timeEnd || 'Selesai'}</span>
              </div>
              ${dur1 ? `<span class="text-[10px] font-mono font-medium text-slate-500 mt-0.5">${dur1}</span>` : ''}
              
              ${task.hasSecondSession && task.session2Start ? `
                <div class="flex items-center gap-1.5 text-xs font-bold font-mono text-indigo-700 mt-1.5 pt-1.5 border-t border-slate-200 w-full justify-center">
                  ${ICONS.moon}
                  <span>${task.session2Start} - ${task.session2End || 'Selesai'}</span>
                </div>
                ${dur2 ? `<span class="text-[9px] font-mono text-indigo-500">${dur2}</span>` : ''}
              ` : ''}
            </div>

            <!-- Task Detail & Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                ${recurrenceBadge}
                ${cancelBadgeHtml}
                ${missedBadgeHtml}
              </div>

              <h4 class="text-sm font-bold ${task.isCancelled ? 'line-through text-slate-400' : isDone ? 'line-through text-slate-400' : 'text-slate-900'} break-words">
                ${this.escapeHtml(task.title)}
              </h4>
              
              ${task.note ? `<p class="text-xs text-slate-600 mt-0.5 break-words leading-relaxed">${this.escapeHtml(task.note)}</p>` : ''}
            </div>
          </div>

          <!-- Actions: Tombol Selesai, Batal, & Utilitas -->
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0 self-end sm:self-center">
            
            <!-- TOMBOL SELESAI -->
            ${task.isCancelled ? '' : isDone ? `
              <button onclick="window.app.toggleTask('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold transition-all cursor-pointer shadow-sm" title="Klik untuk membatalkan status selesai">
                <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                <span>Selesai ✓</span>
              </button>
            ` : `
              <button onclick="window.app.toggleTask('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                <span>Selesai</span>
              </button>
            `}

            <!-- TOMBOL BATAL -->
            ${task.isCancelled ? `
              <button onclick="window.app.restoreCancelledTask('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-300 transition-all cursor-pointer" title="Aktifkan kembali agenda ini">
                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Pulihkan</span>
              </button>
            ` : `
              <button onclick="window.app.openCancelTaskModal('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all cursor-pointer" title="Batalkan agenda ini">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                <span>Batal</span>
              </button>
            `}

            <!-- Mini Utilitas: Edit, WA, Hapus -->
            <div class="flex items-center gap-0.5 border-l border-slate-200 pl-1.5">
              <button onclick="window.app.editTask('${task.id}')" title="Edit Agenda Ini" class="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer">
                ${ICONS.edit}
              </button>
              <button onclick="window.app.sendTaskToWA('${task.id}')" title="Kirim Pengingat Tugas ini ke WhatsApp" class="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer">
                ${ICONS.wa}
              </button>
              <button onclick="window.app.deleteTask('${task.id}', '${this.selectedDate}')" title="Hapus Tugas" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                ${ICONS.trash}
              </button>
            </div>

          </div>
        </div>
      `;
    }).join("");
  }

  // ===================== VIEW TAB RIWAYAT & EVALUASI KENDALA (NEW!) =====================
  setHistoryFilter(filter) {
    this.historyFilter = filter;
    ["all", "frequent", "missed", "done"].forEach(f => {
      const btn = document.getElementById(`btn-hist-${f}`);
      if (btn) {
        if (f === filter) {
          btn.className = "px-3 py-1 rounded-lg bg-indigo-600 text-white font-medium cursor-pointer shadow-sm";
        } else {
          btn.className = "px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer border border-slate-200";
        }
      }
    });
    this.renderHistoryView();
  }

  onHistorySearch(e) {
    this.historySearch = e.target.value.toLowerCase();
    this.renderHistoryView();
  }

  renderHistoryView() {
    const list = document.getElementById("history-list-container");
    if (!list) return;

    let items = [...this.data.dailyTasks];

    // Filter items based on historyFilter
    if (this.historyFilter === "frequent") {
      const counts = {};
      items.forEach(t => {
        counts[t.title] = (counts[t.title] || 0) + 1;
      });
      items = items.filter(t => counts[t.title] >= 2 || t.recurrence !== 'none');
    } else if (this.historyFilter === "missed") {
      items = items.filter(t => t.missedReason || this.isTaskMissed(t, t.date));
    } else if (this.historyFilter === "done") {
      items = items.filter(t => t.status === "done" || (t.completedDates && t.completedDates.length > 0));
    }

    if (this.historySearch.trim()) {
      const q = this.historySearch;
      items = items.filter(t => 
        t.title.toLowerCase().includes(q) || 
        (t.note && t.note.toLowerCase().includes(q)) ||
        (t.missedReason && t.missedReason.toLowerCase().includes(q))
      );
    }

    // Sort by date descending
    items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    if (items.length === 0) {
      list.innerHTML = `
        <div class="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
          <p class="text-sm font-medium text-slate-600">Tidak ada riwayat agenda yang cocok dengan filter.</p>
          <p class="text-xs text-slate-500 mt-1">Seluruh agenda yang dibuat akan otomatis tersimpan dalam riwayat ini.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = items.map(t => {
      const isDone = t.status === "done";
      const isMissed = !isDone && (t.missedReason || this.isTaskMissed(t, t.date));

      return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div class="flex-1 min-w-0 space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md font-semibold">
                ${t.date} • ${t.timeStart} - ${t.timeEnd}
              </span>
              ${isDone ? `
                <span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                  ${ICONS.checkCircle} Selesai
                </span>
              ` : ''}
              ${isMissed ? `
                <span class="text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                  ${ICONS.alertTriangle} Terlewat / Ada Kendala
                </span>
              ` : ''}
            </div>

            <h4 class="text-sm font-bold text-slate-900 break-words">${this.escapeHtml(t.title)}</h4>
            ${t.note ? `<p class="text-xs text-slate-600 break-words">${this.escapeHtml(t.note)}</p>` : ''}
            
            ${t.missedReason ? `
              <div class="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs mt-1">
                <span class="font-bold">Kendala yang Tercatat:</span> ${this.escapeHtml(t.missedReason)}
              </div>
            ` : ''}
          </div>

          <!-- Quick Action: Jadwalkan Lagi Hari Ini -->
          <div class="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
            ${isMissed && !t.missedReason ? `
              <button onclick="window.app.openMissedReasonModal('${t.id}', '${t.date}')" class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold cursor-pointer">
                Isi Kendala
              </button>
            ` : ''}
            <button onclick="window.app.duplicateTaskToToday('${t.id}')" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-1">
              ${ICONS.plus}
              <span>Jadwalkan Lagi Hari Ini</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  duplicateTaskToToday(taskId) {
    const orig = this.data.dailyTasks.find(t => t.id === taskId);
    if (!orig) return;

    const today = this.getTodayDateString();
    const newTask = {
      id: "t-" + Date.now(),
      date: today,
      timeStart: orig.timeStart || "09:00",
      timeEnd: orig.timeEnd || "10:00",
      hasSecondSession: orig.hasSecondSession,
      session2Start: orig.session2Start,
      session2End: orig.session2End,
      title: orig.title,
      note: orig.note,
      recurrence: orig.recurrence || "none",
      validityType: orig.validityType || "until_completed",
      validUntil: orig.validUntil || "",
      status: "todo",
      completedDates: [],
      deletedDates: []
    };

    this.data.dailyTasks.unshift(newTask);
    this.selectedDate = today;
    const dateInput = document.getElementById("date-input");
    if (dateInput) dateInput.value = today;

    this.saveData();
    this.switchTab("daily");
    alert(`Agenda "${orig.title}" berhasil dijadwalkan kembali untuk Hari Ini!`);
  }

  // ===================== CRUD ACTIONS =====================
  addTask(formData) {
    if (!formData.title || !formData.title.trim()) {
      alert("Judul agenda wajib diisi!");
      return;
    }

    const targetDate = formData.date || this.selectedDate;

    if (this.editingTaskId) {
      const task = this.data.dailyTasks.find(t => t.id === this.editingTaskId);
      if (task) {
        task.date = targetDate;
        task.title = formData.title.trim();
        task.timeStart = formData.timeStart || "09:00";
        task.timeEnd = formData.timeEnd || "10:00";
        task.hasSecondSession = !!formData.hasSecondSession;
        task.session2Start = formData.hasSecondSession ? formData.session2Start : "";
        task.session2End = formData.hasSecondSession ? formData.session2End : "";
        task.recurrence = formData.recurrence || "none";
        task.validityType = formData.validityType || "until_completed";
        task.validUntil = formData.validUntil || "";
        task.note = formData.note ? formData.note.trim() : "";
      }
      this.editingTaskId = null;
      const submitTextEl = document.getElementById("btn-save-task-text");
      const cancelBtn = document.getElementById("btn-cancel-edit");
      if (submitTextEl) submitTextEl.textContent = "+ Simpan ke Jadwal";
      if (cancelBtn) cancelBtn.classList.add("hidden");
    } else {
      const newTask = {
        id: "t-" + Date.now(),
        date: targetDate,
        timeStart: formData.timeStart || "09:00",
        timeEnd: formData.timeEnd || "10:00",
        hasSecondSession: !!formData.hasSecondSession,
        session2Start: formData.hasSecondSession ? formData.session2Start : "",
        session2End: formData.hasSecondSession ? formData.session2End : "",
        title: formData.title.trim(),
        note: formData.note ? formData.note.trim() : "",
        recurrence: formData.recurrence || "none",
        validityType: formData.validityType || "until_completed",
        validUntil: formData.validUntil || "",
        status: "todo",
        completedDates: [],
        deletedDates: []
      };
      this.data.dailyTasks.unshift(newTask);

      if (targetDate !== this.selectedDate) {
        this.selectedDate = targetDate;
        const dateInput = document.getElementById("date-input");
        if (dateInput) dateInput.value = targetDate;
      }
    }

    this.saveData();
    this.render();
    this.checkTimeCollision();
    this.closeAddTaskModal();
    this.showToast("Agenda berhasil disimpan!", "success");
  }

  editTask(id) {
    const task = this.data.dailyTasks.find(t => t.id === id);
    if (!task) return;

    this.editingTaskId = id;

    const targetDateEl = document.getElementById("task-target-date");
    if (targetDateEl) {
      targetDateEl.value = task.date;
      this.onTaskDateChange();
    }

    const titleEl = document.getElementById("task-title");
    const s1StartEl = document.getElementById("task-start-time");
    const s1EndEl = document.getElementById("task-end-time");
    const toggleS2 = document.getElementById("toggle-session2");
    const s2StartEl = document.getElementById("task-session2-start");
    const s2EndEl = document.getElementById("task-session2-end");
    const recEl = document.getElementById("task-recurrence");
    const presetEl = document.getElementById("task-validity-preset");
    const untilEl = document.getElementById("task-valid-until");
    const noteEl = document.getElementById("task-note");
    const submitTextEl = document.getElementById("btn-save-task-text");
    const cancelBtn = document.getElementById("btn-cancel-edit");

    if (titleEl) titleEl.value = task.title;
    if (s1StartEl) s1StartEl.value = task.timeStart || "09:00";
    if (s1EndEl) s1EndEl.value = task.timeEnd || "10:00";

    if (toggleS2) {
      toggleS2.checked = !!task.hasSecondSession;
      this.toggleSession2UI();
    }
    if (s2StartEl) s2StartEl.value = task.session2Start || "19:30";
    if (s2EndEl) s2EndEl.value = task.session2End || "20:30";

    if (task.recurrence && task.recurrence !== "none") {
      this.setTaskScheduleMode("recurring");
      if (recEl) recEl.value = task.recurrence;
      if (presetEl) presetEl.value = task.validityType || "until_completed";
      if (untilEl) untilEl.value = task.validUntil || "";
    } else {
      this.setTaskScheduleMode("once");
      if (recEl) recEl.value = "none";
      if (presetEl) presetEl.value = "until_completed";
      if (untilEl) untilEl.value = "";
    }
    if (noteEl) noteEl.value = task.note || "";

    if (submitTextEl) {
      submitTextEl.innerHTML = `${ICONS.save} <span>Simpan Perubahan Agenda</span>`;
    }
    if (cancelBtn) cancelBtn.classList.remove("hidden");

    this.checkTimeCollision();
    this.openAddTaskModal();
  }

  cancelEdit() {
    this.editingTaskId = null;
    const form = document.getElementById("google-add-form");
    if (form) form.reset();
    const submitTextEl = document.getElementById("btn-save-task-text");
    const cancelBtn = document.getElementById("btn-cancel-edit");
    if (submitTextEl) submitTextEl.textContent = "+ Simpan ke Jadwal";
    if (cancelBtn) cancelBtn.classList.add("hidden");
    
    const targetDateEl = document.getElementById("task-target-date");
    if (targetDateEl) {
      targetDateEl.value = this.selectedDate;
      this.onTaskDateChange();
    }

    this.setTaskScheduleMode("once");
    this.toggleSession2UI();
    this.initValidityPreset();
    this.checkTimeCollision();
    this.closeAddTaskModal();
  }

  toggleTask(id, targetDate) {
    const t = this.data.dailyTasks.find(item => item.id === id);
    if (!t) return;

    if (!t.recurrence || t.recurrence === "none") {
      t.status = t.status === "done" ? "todo" : "done";
    } else {
      if (!t.completedDates) t.completedDates = [];
      const idx = t.completedDates.indexOf(targetDate);
      if (idx > -1) {
        t.completedDates.splice(idx, 1);
      } else {
        t.completedDates.push(targetDate);
      }
    }

    this.saveData();
    this.render();
  }

  deleteTask(id, targetDate) {
    const task = this.data.dailyTasks.find(item => item.id === id);
    if (!task) return;

    if (task.recurrence && task.recurrence !== "none") {
      const choice = confirm(`Agenda "${task.title}" berulang.\n\nKlik OK untuk Hapus Hanya Hari Ini (${targetDate}).\nKlik CANCEL untuk opsi hapus permanen.`);
      if (choice) {
        if (!task.deletedDates) task.deletedDates = [];
        if (!task.deletedDates.includes(targetDate)) task.deletedDates.push(targetDate);
        this.saveData();
        this.render();
        this.checkTimeCollision();
      } else {
        const delAll = confirm(`Hapus SELURUH rangkaian perulangan agenda "${task.title}" secara permanen?`);
        if (delAll) {
          this.data.dailyTasks = this.data.dailyTasks.filter(item => item.id !== id);
          this.saveData();
          this.render();
          this.checkTimeCollision();
        }
      }
    } else {
      if (confirm(`Hapus agenda "${task.title}"?`)) {
        this.data.dailyTasks = this.data.dailyTasks.filter(item => item.id !== id);
        this.saveData();
        this.render();
        this.checkTimeCollision();
      }
    }
  }

  // ===================== MONTHLY & ROADMAP VIEWS =====================
  renderMonthlyView() {
    const list = document.getElementById("monthly-list-container");
    if (!list) return;

    list.innerHTML = this.data.monthlyPlan.milestones.map(m => `
      <div class="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <input type="checkbox" ${m.done ? 'checked' : ''} onchange="window.app.toggleMonthlyMilestone('${m.id}')" class="custom-checkbox">
          <div>
            <span class="text-[11px] font-mono text-indigo-600 font-semibold block">${m.targetDate}</span>
            <p class="text-sm font-semibold ${m.done ? 'line-through text-slate-400' : 'text-slate-900'}">${this.escapeHtml(m.title)}</p>
          </div>
        </div>
        <button onclick="window.app.pushMilestoneToDaily('${m.id}')" class="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 border border-slate-200 transition-colors cursor-pointer">
          + Jadwal Harian
        </button>
      </div>
    `).join("");
  }

  toggleMonthlyMilestone(id) {
    const m = this.data.monthlyPlan.milestones.find(x => x.id === id);
    if (m) {
      m.done = !m.done;
      this.saveData();
      this.render();
    }
  }

  pushMilestoneToDaily(id) {
    const item = this.data.monthlyPlan.milestones.find(x => x.id === id);
    if (!item) return;

    this.data.dailyTasks.unshift({
      id: "t-" + Date.now(),
      date: this.selectedDate,
      timeStart: "09:00",
      timeEnd: "10:30",
      hasSecondSession: false,
      session2Start: "",
      session2End: "",
      title: `[Target Bulanan] ${item.title}`,
      note: `Ditautkan dari milestone bulanan (${item.targetDate})`,
      recurrence: "none",
      validityType: "until_completed",
      validUntil: "",
      status: "todo",
      completedDates: [],
      deletedDates: []
    });

    this.saveData();
    alert(`Milestone "${item.title}" berhasil ditambahkan ke Agenda Harian!`);
    this.render();
  }

  renderRoadmapView() {
    const container = document.getElementById("roadmap-5y-container");
    if (!container) return;

    container.innerHTML = this.data.fiveYearPlan.map(year => {
      let total = 0;
      let done = 0;
      year.quarters.forEach(q => {
        q.steps.forEach(s => {
          total++;
          if (s.done) done++;
        });
      });
      const pct = total > 0 ? Math.round((done / total) * 100) : year.overallProgress;

      return `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-5 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-black text-indigo-600 font-mono">${year.year}</span>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">${year.theme}</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 mt-1">${this.escapeHtml(year.title)}</h3>
            </div>
            <div class="min-w-[180px]">
              <div class="flex justify-between text-xs text-slate-500 mb-1 font-mono">
                <span>Capaian</span>
                <span class="text-indigo-700 font-bold">${pct}%</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-gradient-to-r from-indigo-600 to-emerald-500 h-2 rounded-full" style="width: ${pct}%"></div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            ${year.quarters.map(q => `
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5">
                <div class="flex justify-between items-center mb-1.5">
                  <span class="text-xs font-bold text-indigo-700 font-mono">${q.quarter}</span>
                  <span class="text-[10px] text-slate-500 font-mono">${q.steps.filter(s => s.done).length}/${q.steps.length} Selesai</span>
                </div>
                <h4 class="text-xs font-semibold text-slate-800 mb-2.5">${this.escapeHtml(q.focus)}</h4>
                
                <div class="space-y-1.5">
                  ${q.steps.map(step => `
                    <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-slate-200 text-xs shadow-sm">
                      <div class="flex items-center gap-2 flex-1 min-w-0">
                        <input type="checkbox" ${step.done ? 'checked' : ''} onchange="window.app.toggle5YStep('${year.id}', '${q.id}', '${step.id}')" class="custom-checkbox flex-shrink-0">
                        <span class="${step.done ? 'line-through text-slate-400' : 'text-slate-800'} truncate">${this.escapeHtml(step.title)}</span>
                      </div>
                      <button onclick="window.app.push5YStepToDaily('${year.year}', '${q.quarter}', '${step.id}')" title="Jadikan Agenda Harian" class="text-indigo-600 hover:text-white p-1 rounded hover:bg-indigo-600 transition-colors cursor-pointer text-[11px] font-medium">
                        + Hari Ini
                      </button>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  toggle5YStep(yearId, quarterId, stepId) {
    const y = this.data.fiveYearPlan.find(item => item.id === yearId);
    if (!y) return;
    const q = y.quarters.find(item => item.id === quarterId);
    if (!q) return;
    const s = q.steps.find(item => item.id === stepId);
    if (!s) return;

    s.done = !s.done;
    this.saveData();
    this.render();
  }

  push5YStepToDaily(year, quarter, stepId) {
    let target = null;
    this.data.fiveYearPlan.forEach(y => {
      y.quarters.forEach(q => {
        q.steps.forEach(s => {
          if (s.id === stepId) target = s;
        });
      });
    });

    if (!target) return;

    this.data.dailyTasks.unshift({
      id: "t-" + Date.now(),
      date: this.selectedDate,
      timeStart: "08:30",
      timeEnd: "10:00",
      hasSecondSession: false,
      session2Start: "",
      session2End: "",
      title: `[5Y ${year} ${quarter}] ${target.title}`,
      note: target.note || "Eksekusi dari roadmap 5 tahun",
      recurrence: "none",
      validityType: "until_completed",
      validUntil: "",
      status: "todo",
      completedDates: [],
      deletedDates: []
    });

    this.saveData();
    alert(`Langkah 5 Tahun "${target.title}" berhasil ditambahkan ke Agenda Harian!`);
    this.render();
  }

  // ===================== NOTIFICATIONS DEDICATED VIEW =====================
  renderNotificationsView() {
    const notif = this.data.notifications || DEFAULT_SYSTEM_DATA.notifications;
    const phoneEl = document.getElementById("notif-target-phone");
    const morningTimeEl = document.getElementById("notif-morning-time");
    const morningCheckEl = document.getElementById("notif-morning-enabled");
    const eveningTimeEl = document.getElementById("notif-evening-time");
    const eveningCheckEl = document.getElementById("notif-evening-enabled");
    const missedCheckEl = document.getElementById("notif-missed-enabled");
    const logListEl = document.getElementById("notif-log-container");

    if (phoneEl) phoneEl.value = notif.targetPhone || "6288971071138";
    if (morningTimeEl) morningTimeEl.value = notif.morningBriefing.time || "07:00";
    if (morningCheckEl) morningCheckEl.checked = !!notif.morningBriefing.enabled;
    if (eveningTimeEl) eveningTimeEl.value = notif.eveningRecap.time || "21:00";
    if (eveningCheckEl) eveningCheckEl.checked = !!notif.eveningRecap.enabled;
    if (missedCheckEl) missedCheckEl.checked = notif.missedTaskAlert ? !!notif.missedTaskAlert.enabled : true;

    if (logListEl) {
      const logs = notif.logs || [];
      if (logs.length === 0) {
        logListEl.innerHTML = `<p class="text-xs text-slate-500 italic">Belum ada riwayat notifikasi.</p>`;
      } else {
        logListEl.innerHTML = logs.map(l => `
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono shadow-sm">
            <div>
              <span class="text-slate-800 font-semibold">[${l.type}]</span>
              <span class="text-slate-500 text-[11px] block">${l.time} • ke ${l.phone}</span>
            </div>
            <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">${l.status}</span>
          </div>
        `).join("");
      }
    }
  }

  saveNotificationSettings() {
    const notif = this.data.notifications;
    const phoneEl = document.getElementById("notif-target-phone");
    const morningTimeEl = document.getElementById("notif-morning-time");
    const morningCheckEl = document.getElementById("notif-morning-enabled");
    const eveningTimeEl = document.getElementById("notif-evening-time");
    const eveningCheckEl = document.getElementById("notif-evening-enabled");
    const missedCheckEl = document.getElementById("notif-missed-enabled");

    if (phoneEl) notif.targetPhone = phoneEl.value.replace(/[^0-9]/g, '');
    if (morningTimeEl) notif.morningBriefing.time = morningTimeEl.value;
    if (morningCheckEl) notif.morningBriefing.enabled = morningCheckEl.checked;
    if (eveningTimeEl) notif.eveningRecap.time = eveningTimeEl.value;
    if (eveningCheckEl) notif.eveningRecap.enabled = eveningCheckEl.checked;
    if (!notif.missedTaskAlert) notif.missedTaskAlert = {};
    if (missedCheckEl) notif.missedTaskAlert.enabled = missedCheckEl.checked;

    this.saveData();
    alert("Seluruh aturan notifikasi WhatsApp berhasil disimpan!");
  }

  async sendTestNotification() {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const nowStr = new Date().toLocaleTimeString("id-ID");
    const message = 
`Halo Pak ${this.data.profile.name}, salam hangat! 👋

Notifikasi asisten pribadi Bapak berhasil terhubung lancar pada pukul ${nowStr} WIB.
Mulai saat ini, pengingat jadwal kerja, briefing pagi, dan rekap malam akan kami sampaikan langsung ke nomor WhatsApp ini ya Pak.

Asisten siap membantu Bapak menjaga produktivitas setiap hari.

Salam hormat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Tes Notifikasi");
  }

  async sendDailyBriefingToWA() {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const tasks = this.getTasksForDate(this.selectedDate);
    const m = this.getMetrics();

    let taskLines = "";
    if (tasks.length === 0) {
      taskLines = "_Belum ada agenda yang tercatat untuk hari ini Pak._\n";
    } else {
      taskLines = tasks.map((t, idx) => {
        const status = t.isCancelled ? "[BATAL]" : t.isDone ? "[SELESAI]" : "[TODO]";
        const time1 = t.timeStart ? `(${t.timeStart} - ${t.timeEnd}) ` : "";
        const time2 = t.hasSecondSession && t.session2Start ? ` & (${t.session2Start} - ${t.session2End})` : "";
        const note = t.note ? ` - _${t.note}_` : "";
        return `${idx + 1}. ${status} ${time1}${t.title}${time2}${note}`;
      }).join("\n");
    }

    const message = 
`Selamat pagi Pak ${this.data.profile.name}, semoga hari ini menyenangkan dan penuh berkah! ✨

Berikut rangkuman jadwal agenda kerja Bapak untuk hari ini (${this.selectedDate}):

${taskLines}

Alhamdulillah seluruh waktu sudah teralokasi rapi dan bebas bentrok Pak (${m.total} agenda).
Asisten siap mendampingi dan mengingatkan setiap sesi kerja Bapak. Tetap semangat ya Pak Ilham!

Salam hormat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Briefing Pagi");
  }

  async sendEveningRecapToWA() {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const tasks = this.getTasksForDate(this.selectedDate);
    const m = this.getMetrics();

    const pendingTasks = tasks.filter(t => !t.isDone && !t.isCancelled);
    let pendingLines = "";
    if (pendingTasks.length > 0) {
      pendingLines = "\n*Agenda yang belum sempat dicoret:*\n" + pendingTasks.map((t, idx) => `• ${t.timeStart ? `[${t.timeStart}] ` : ''}${t.title}`).join("\n") + "\n";
    }

    const message = 
`Selamat malam Pak ${this.data.profile.name}, mohon izin menyampaikan rekap jadwal hari ini ya Pak 🙏

Dari total ${m.total} agenda yang direncanakan:
✅ Berhasil diselesaikan: *${m.done} agenda* (${m.pct}%)
${m.cancelled > 0 ? `🚫 Dibatalkan: *${m.cancelled} agenda*\n` : ''}${m.total - m.done > 0 ? `⏳ Belum dicoret: *${m.total - m.done} agenda*` : `🌟 Luar biasa Pak, seluruh agenda hari ini tuntas terselesaikan 100%!`}
${pendingLines}
${m.total - m.done > 0 ? `Bagi agenda yang sudah terlaksana, jangan lupa dicek dan dicoret sebelum jam 12.00 malam ya Pak agar rekap harian Bapak tercatat sempurna.\n` : ''}
Selamat beristirahat dengan tenang Pak Ilham, sampai jumpa di jadwal esok hari!

Salam hormat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Rekap Malam");
  }

  async sendTaskToWA(taskId) {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const task = this.data.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    const time1 = task.timeStart ? `${task.timeStart} - ${task.timeEnd} WIB` : 'Hari Ini';
    const time2 = task.hasSecondSession && task.session2Start ? ` dan sesi malam (${task.session2Start} - ${task.session2End} WIB)` : '';

    const message = 
`Halo Pak ${this.data.profile.name}, mohon izin mengingatkan jadwal ya Pak 🙏

📌 Agenda: *${task.title}*
⏰ Waktu: *${time1}*${time2}
${task.note ? `📝 Catatan dari Bapak: "${task.note}"\n` : ''}
Jangan sampai terlewat ya Pak. Semoga urusan dan kegiatannya berjalan lancar!
Jika sudah selesai nanti, silakan dicoret di dashboard web ya Pak.

Salam hangat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, `Pengingat: ${task.title}`);
  }

  async dispatchWAMessage(phone, message, label) {
    const targetPhone = phone || this.data.notifications?.targetPhone || "6288971071138";
    try {
      const res = await fetch("/api/send-wa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: targetPhone, message, type: label })
      });
      const data = await res.json();

      if (data.success) {
        const now = new Date();
        const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${now.toLocaleTimeString('id-ID')}`;
        this.data.notifications.logs.unshift({
          id: "log-" + Date.now(),
          time: timeStr,
          type: label,
          status: "Terkirim",
          phone: targetPhone
        });
        if (this.data.notifications.logs.length > 20) this.data.notifications.logs.pop();
        this.saveData();

        alert(`${label} berhasil dikirim ke WhatsApp (${targetPhone})!`);
        if (this.activeTab === "notifications") this.renderNotificationsView();
      } else {
        throw new Error(data.error || "Gagal mengirim notifikasi");
      }
    } catch (err) {
      console.warn("Direct bot failed, fallback to Web WhatsApp:", err);
      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
      alert(`Pesan notifikasi dibuka langsung via WhatsApp.`);
    }
  }

  // ===================== SPEECH & BACKUP =====================
  speakBriefing() {
    if (!this.speechSynth) {
      alert("Browser tidak mendukung Speech Synthesis");
      return;
    }

    if (this.isSpeaking) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
      return;
    }

    const m = this.getMetrics();
    const tasks = this.getTasksForDate(this.selectedDate);
    const top = tasks.filter(t => !t.isDone).slice(0, 3).map(t => t.title).join(". ");

    const text = `Halo Pak ${this.data.profile.name}. Hari ini terdapat ${m.total} agenda kerja yang tersusun rapi tanpa bentrok. Capaian roadmap lima tahun Anda berada pada ${m.pct5Y} persen. ${top ? 'Agenda berikutnya: ' + top : 'Semua agenda tuntas!'}`;

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "id-ID";
    utt.onend = () => { this.isSpeaking = false; };
    utt.onerror = () => { this.isSpeaking = false; };
    this.isSpeaking = true;
    this.speechSynth.speak(utt);
  }

  exportJSON() {
    const str = JSON.stringify(this.data, null, 2);
    const blob = new Blob([str], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Produktivitas_${this.selectedDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.dailyTasks || parsed.fiveYearPlan) {
          this.data = { ...DEFAULT_SYSTEM_DATA, ...parsed };
          this.saveData();
          this.render();
          this.checkTimeCollision();
          alert("Data berhasil dipulihkan!");
        }
      } catch (err) {
        alert("Gagal membaca file JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  // ===================== EVENT BINDINGS =====================
  bindEvents() {
    document.addEventListener("click", (e) => {
      const pill = e.target.closest(".tab-pill");
      if (pill && pill.dataset.tab) {
        e.preventDefault();
        this.switchTab(pill.dataset.tab);
      }
    });

    const dateInput = document.getElementById("date-input");
    if (dateInput) {
      dateInput.value = this.selectedDate;
      dateInput.addEventListener("change", (e) => {
        this.selectedDate = e.target.value;
        this.handleValidityPresetChange();
        this.render();
        this.checkTimeCollision();
      });
    }

    const btnToday = document.getElementById("btn-nav-today");
    const btnPrev = document.getElementById("btn-nav-prev");
    const btnNext = document.getElementById("btn-nav-next");

    if (btnToday) {
      btnToday.addEventListener("click", () => {
        this.selectedDate = this.getTodayDateString();
        if (dateInput) dateInput.value = this.selectedDate;
        this.handleValidityPresetChange();
        this.render();
        this.checkTimeCollision();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate() - 1);
        this.selectedDate = d.toISOString().split("T")[0];
        if (dateInput) dateInput.value = this.selectedDate;
        this.handleValidityPresetChange();
        this.render();
        this.checkTimeCollision();
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate() + 1);
        this.selectedDate = d.toISOString().split("T")[0];
        if (dateInput) dateInput.value = this.selectedDate;
        this.handleValidityPresetChange();
        this.render();
        this.checkTimeCollision();
      });
    }

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderDailyView();
      });
    }

    ["task-start-time", "task-end-time", "task-session2-start", "task-session2-end"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => this.checkTimeCollision());
        el.addEventListener("change", () => this.checkTimeCollision());
      }
    });

    const googleForm = document.getElementById("google-add-form");
    if (googleForm) {
      googleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const date = document.getElementById("task-target-date") ? document.getElementById("task-target-date").value : this.selectedDate;
        const title = document.getElementById("task-title") ? document.getElementById("task-title").value : "";
        const timeStart = document.getElementById("task-start-time") ? document.getElementById("task-start-time").value : "09:00";
        const timeEnd = document.getElementById("task-end-time") ? document.getElementById("task-end-time").value : "10:00";
        const toggleS2 = document.getElementById("toggle-session2");
        const hasSecondSession = toggleS2 ? toggleS2.checked : false;
        const session2Start = document.getElementById("task-session2-start") ? document.getElementById("task-session2-start").value : "";
        const session2End = document.getElementById("task-session2-end") ? document.getElementById("task-session2-end").value : "";
        const isOnce = this.taskScheduleMode === "once";
        const recurrence = isOnce ? "none" : (document.getElementById("task-recurrence") ? document.getElementById("task-recurrence").value : "none");
        const validityPreset = isOnce ? "until_completed" : (document.getElementById("task-validity-preset") ? document.getElementById("task-validity-preset").value : "until_completed");
        const validUntil = isOnce ? "" : (document.getElementById("task-valid-until") ? document.getElementById("task-valid-until").value : "");
        const note = document.getElementById("task-note") ? document.getElementById("task-note").value : "";

        this.addTask({
          date,
          title,
          timeStart,
          timeEnd,
          hasSecondSession,
          session2Start,
          session2End,
          recurrence,
          validityType: validityPreset,
          validUntil,
          note
        });

        if (document.getElementById("task-title")) document.getElementById("task-title").value = "";
        if (document.getElementById("task-note")) document.getElementById("task-note").value = "";
        
        this.pickNextFreeSlot(60);
      });
    }

    const btnVoice = document.getElementById("btn-voice-briefing");
    if (btnVoice) {
      btnVoice.addEventListener("click", () => this.speakBriefing());
    }

    const btnExport = document.getElementById("btn-export-backup");
    if (btnExport) btnExport.addEventListener("click", () => this.exportJSON());

    const fileImport = document.getElementById("file-import-backup");
    if (fileImport) {
      fileImport.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.importJSON(e.target.files[0]);
      });
    }
  }

  escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

window.app = new ProductivityApp();
