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

const LABEL_COLORS = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", hex: "#4f46e5" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", hex: "#9333ea" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", hex: "#059669" },
  amber: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-300", hex: "#d97706" },
  sky: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200", hex: "#0284c7" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", hex: "#e11d48" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", hex: "#0891b2" },
  slate: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300", hex: "#475569" }
};

const DEFAULT_LABELS = [
  { id: "lbl-1", name: "Eksekutif & Prioritas", color: "indigo" },
  { id: "lbl-2", name: "Ujian & Studi", color: "emerald" },
  { id: "lbl-3", name: "Sistem & Dev", color: "sky" },
  { id: "lbl-4", name: "Finansial & Bisnis", color: "amber" },
  { id: "lbl-5", name: "Istirahat & Pribadi", color: "purple" }
];

const DEFAULT_SYSTEM_DATA = {
  profile: {
    name: "Ilham Pradani, S.H.",
    role: "Founder & Tech Architect",
    secretaryName: "Aura Executive Desk"
  },
  labels: DEFAULT_LABELS,
  customDailyOrder: {},
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
  alarmSettings: {
    ringOnStart: true,
    ringBeforeMinutes: 0,
    ringOnEnd: true,
    ringOnWakeup: true
  },
  fiveYearPlan: [
    {
      id: "y-2026",
      year: 2026,
      title: "",
      quarters: [
        { id: "q-2026", quarter: "2026", focus: "", steps: [] }
      ]
    },
    {
      id: "y-2027",
      year: 2027,
      title: "",
      quarters: [
        { id: "q-2027", quarter: "2027", focus: "", steps: [] }
      ]
    },
    {
      id: "y-2028",
      year: 2028,
      title: "",
      quarters: [
        { id: "q-2028", quarter: "2028", focus: "", steps: [] }
      ]
    },
    {
      id: "y-2029",
      year: 2029,
      title: "",
      quarters: [
        { id: "q-2029", quarter: "2029", focus: "", steps: [] }
      ]
    },
    {
      id: "y-2030",
      year: 2030,
      title: "",
      quarters: [
        { id: "q-2030", quarter: "2030", focus: "", steps: [] }
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
      timeStart: "05:00",
      timeEnd: "06:00",
      hasSecondSession: false,
      session2Start: "",
      session2End: "",
      title: "Executive Morning Routine, (Sholat, Olahraga, Prepare)",
      note: "prepare mental",
      recurrence: "daily",
      validityType: "until_completed",
      validUntil: "",
      status: "done",
      completedDates: ["2026-11-26", "2026-11-27"],
      alertSentDates: ["2026-11-26", "2026-11-27"],
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

    // Monthly Roadmap State
    const nowTime = new Date();
    this.monthlyViewYear = nowTime.getFullYear();
    this.monthlyViewMonth = nowTime.getMonth();

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
          if (!parsed.notifications) parsed.notifications = {};
          if (!parsed.notifications.morningBriefing) parsed.notifications.morningBriefing = { enabled: true, time: "07:00" };
          if (!parsed.notifications.eveningRecap) parsed.notifications.eveningRecap = { enabled: true, time: "21:00" };
          if (!parsed.notifications.missedTaskAlert) parsed.notifications.missedTaskAlert = { enabled: false };
          if (!parsed.alarmSettings) {
            parsed.alarmSettings = {
              ringOnStart: true,
              ringBeforeMinutes: 0,
              ringOnEnd: true,
              ringOnWakeup: true
            };
          }
          if (!parsed.labels || !Array.isArray(parsed.labels) || parsed.labels.length === 0) {
            parsed.labels = [...DEFAULT_LABELS];
          }
          if (!parsed.customDailyOrder || typeof parsed.customDailyOrder !== "object") {
            parsed.customDailyOrder = {};
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
          fiveYearPlan: this.data.fiveYearPlan,
          alarmSettings: this.data.alarmSettings,
          labels: this.data.labels,
          customDailyOrder: this.data.customDailyOrder
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
      if (json && json.success) {
        if (json.tasks && Array.isArray(json.tasks) && json.tasks.length > 0) {
          const localMap = new Map((this.data.dailyTasks || []).map(t => [t.id, t]));
          for (const ct of json.tasks) {
            if (!localMap.has(ct.id)) {
              this.data.dailyTasks.push(ct);
            } else {
              const lt = localMap.get(ct.id);
              // Union merge completedDates: Sekali dicoret di device manapun, tetap tercatat selesai!
              if (ct.completedDates && Array.isArray(ct.completedDates)) {
                lt.completedDates = Array.from(new Set([...(lt.completedDates || []), ...ct.completedDates]));
              }
              if (ct.deletedDates && Array.isArray(ct.deletedDates)) {
                lt.deletedDates = Array.from(new Set([...(lt.deletedDates || []), ...ct.deletedDates]));
              }
              if (ct.alertSentDates && Array.isArray(ct.alertSentDates)) {
                lt.alertSentDates = Array.from(new Set([...(lt.alertSentDates || []), ...ct.alertSentDates]));
              }
              // Update properti jika cloud lebih baru atau local belum punya timestamp
              if (!lt.updated_at || (ct.updated_at && ct.updated_at >= lt.updated_at)) {
                Object.assign(lt, ct);
              }
            }
          }
        }
        if (json.settings && json.settings.notifications) {
          this.data.notifications = { ...this.data.notifications, ...json.settings.notifications };
        }
        if (json.settings && json.settings.alarm) {
          this.data.alarmSettings = { ...this.data.alarmSettings, ...json.settings.alarm };
        }
        if (json.settings && json.settings.labels && Array.isArray(json.settings.labels) && json.settings.labels.length > 0) {
          this.data.labels = json.settings.labels;
        }
        if (json.settings && json.settings.customDailyOrder && typeof json.settings.customDailyOrder === "object") {
          this.data.customDailyOrder = { ...(this.data.customDailyOrder || {}), ...json.settings.customDailyOrder };
        }
        if (json.fiveYearPlan && Array.isArray(json.fiveYearPlan) && json.fiveYearPlan.length > 0) {
          this.data.fiveYearPlan = json.fiveYearPlan;
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
    // Sinkronisasi cloud dahulu sebelum mengecek missed alert agar status coret ter-update
    this.syncWithCloud().then(() => {
      this.checkMissedTasksAndAlert();
    });
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
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    if (!this.editingTaskId) {
      this.setTaskScheduleMode("once");
      this.renderLabelDropdowns();
    }
    const input = document.getElementById("task-target-date");
    if (input) {
      if (presetDate) {
        input.value = presetDate;
      } else if (!this.editingTaskId || !input.value) {
        input.value = this.selectedDate || this.getTodayDateString();
      }
      this.onTaskDateChange();
    }
    const titleInput = document.getElementById("task-title");
    if (titleInput) setTimeout(() => titleInput.focus(), 150);
    this.renderTimelineRulers();
    this.setTimelineZoom(this.timelineZoomMode || "fit");
    this.checkTimeCollision();
  }

  closeAddTaskModal() {
    const modal = document.getElementById("modal-add-task");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    if (this.editingTaskId) {
      this.cancelEdit();
    }
  }

  presetSleepSchedule() {
    const targetDate = this.selectedDate || this.getTodayDateString();
    const dyn = this.calculateDynamicSleep(targetDate);

    this.openAddTaskModal();
    this.setTaskScheduleMode("recurring");
    const titleEl = document.getElementById("task-title");
    const startEl = document.getElementById("task-start-time");
    const endEl = document.getElementById("task-end-time");
    const recEl = document.getElementById("task-recurrence");
    const noteEl = document.getElementById("task-note");
    const toggleS2 = document.getElementById("toggle-session2");

    const startStr = this.minutesToTime(dyn.startMins);
    const endStr = this.minutesToTime(dyn.endMins);

    if (titleEl) titleEl.value = "Waktu Istirahat & Tidur Eksekutif";
    if (startEl) startEl.value = startStr;
    if (endEl) endEl.value = endStr;
    if (recEl) recEl.value = "daily";
    if (noteEl) noteEl.value = `Alokasi istirahat & pemulihan energi fisik/kognitif (${dyn.durationHours} Jam, fleksibel dapat ditimpa agenda kerja).`;
    this.renderLabelDropdowns("Istirahat & Pribadi");
    const labelSel = document.getElementById("task-label-select");
    if (labelSel) labelSel.value = "Istirahat & Pribadi";
    if (toggleS2 && toggleS2.checked) {
      toggleS2.checked = false;
      this.toggleSession2UI();
    }
    this.checkTimeCollision();
    this.showToast(`Waktu Tidur (${startStr} - ${endStr} WIB, ${dyn.durationHours} Jam) disesuaikan otomatis dari tugas terakhir!`, "success");
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
    const drawerBadge = document.getElementById("drawer-meetings-count");
    const viewBadge = document.getElementById("meetings-pending-count-badge");
    
    if (navBadge) {
      if (pendingCount > 0) {
        navBadge.textContent = pendingCount;
        navBadge.classList.remove("hidden");
      } else {
        navBadge.classList.add("hidden");
      }
    }
    if (drawerBadge) {
      if (pendingCount > 0) {
        drawerBadge.textContent = pendingCount;
        drawerBadge.classList.remove("hidden");
      } else {
        drawerBadge.classList.add("hidden");
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

  formatIndonesianDateWithDay(dateStr) {
    if (!dateStr) return { dayName: "", fullText: "", shortText: "" };
    const parts = dateStr.split("-");
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayName = days[d.getDay()] || "";
    const monthName = months[d.getMonth()] || "";
    return {
      dayName,
      fullText: `${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}`,
      shortText: `${dayName}, ${d.getDate()} ${monthName.slice(0, 3)} ${d.getFullYear()}`
    };
  }

  // ===================== INDONESIAN CUSTOM DATE PICKER =====================
  openCustomDatePicker(targetId = "task-target-date") {
    this.datePickerTargetId = targetId;
    const targetInput = document.getElementById(targetId);
    let initialDate = targetInput && targetInput.value ? targetInput.value : (this.selectedDate || this.getTodayDateString());
    
    const parts = initialDate.split("-");
    this.datePickerYear = parseInt(parts[0], 10) || new Date().getFullYear();
    this.datePickerMonth = (parseInt(parts[1], 10) - 1);
    if (isNaN(this.datePickerMonth) || this.datePickerMonth < 0 || this.datePickerMonth > 11) {
      this.datePickerMonth = new Date().getMonth();
    }
    this.datePickerSelected = initialDate;

    this.renderCustomDatePicker();

    const modal = document.getElementById("modal-date-picker");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  }

  closeCustomDatePicker() {
    const modal = document.getElementById("modal-date-picker");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  }

  prevDatePickerMonth() {
    this.datePickerMonth--;
    if (this.datePickerMonth < 0) {
      this.datePickerMonth = 11;
      this.datePickerYear--;
    }
    this.renderCustomDatePicker();
  }

  nextDatePickerMonth() {
    this.datePickerMonth++;
    if (this.datePickerMonth > 11) {
      this.datePickerMonth = 0;
      this.datePickerYear++;
    }
    this.renderCustomDatePicker();
  }

  setDatePickerPreset(preset) {
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

    this.datePickerYear = d.getFullYear();
    this.datePickerMonth = d.getMonth();
    this.datePickerSelected = dateStr;
    this.renderCustomDatePicker();
    this.applyCustomDatePicker();
  }

  selectDatePickerDate(year, month, day) {
    const mStr = String(month + 1).padStart(2, "0");
    const dStr = String(day).padStart(2, "0");
    this.datePickerSelected = `${year}-${mStr}-${dStr}`;
    this.renderCustomDatePicker();
  }

  applyCustomDatePicker() {
    if (!this.datePickerSelected) return;
    const targetId = this.datePickerTargetId || "task-target-date";
    const targetInput = document.getElementById(targetId);
    if (targetInput) {
      targetInput.value = this.datePickerSelected;
      if (targetId === "task-target-date") {
        this.onTaskDateChange();
      } else if (targetId === "task-valid-until") {
        const displayEl = document.getElementById("task-valid-until-display");
        if (displayEl) {
          const info = this.formatIndonesianDateWithDay(this.datePickerSelected);
          displayEl.textContent = info.fullText;
        }
      } else if (targetId === "date-input") {
        this.selectedDate = this.datePickerSelected;
        this.updateHeaderDateDisplay();
        this.handleValidityPresetChange();
        this.render();
        this.checkTimeCollision();
      }
    }
    this.closeCustomDatePicker();
  }

  renderCustomDatePicker() {
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const monthYearEl = document.getElementById("date-picker-month-year");
    if (monthYearEl) {
      monthYearEl.textContent = `${months[this.datePickerMonth]} ${this.datePickerYear}`;
    }

    const selectedInfoEl = document.getElementById("date-picker-selected-display");
    if (selectedInfoEl && this.datePickerSelected) {
      const info = this.formatIndonesianDateWithDay(this.datePickerSelected);
      selectedInfoEl.textContent = info.fullText;
    }

    const gridEl = document.getElementById("date-picker-grid");
    if (!gridEl) return;

    const firstDayIndex = new Date(this.datePickerYear, this.datePickerMonth, 1).getDay();
    const totalDays = new Date(this.datePickerYear, this.datePickerMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.datePickerYear, this.datePickerMonth, 0).getDate();
    const todayStr = this.getTodayDateString();

    let cellsHtml = "";

    // Padding previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      cellsHtml += `<div class="date-picker-day-cell empty">${dayNum}</div>`;
    }

    // Days in current month
    for (let day = 1; day <= totalDays; day++) {
      const mStr = String(this.datePickerMonth + 1).padStart(2, "0");
      const dStr = String(day).padStart(2, "0");
      const currentIso = `${this.datePickerYear}-${mStr}-${dStr}`;

      const isSelected = this.datePickerSelected === currentIso;
      const isToday = todayStr === currentIso;

      let cellClass = "date-picker-day-cell";
      if (isSelected) cellClass += " selected";
      else if (isToday) cellClass += " today";

      cellsHtml += `
        <button type="button" 
                onclick="window.app.selectDatePickerDate(${this.datePickerYear}, ${this.datePickerMonth}, ${day})"
                ondblclick="window.app.selectDatePickerDate(${this.datePickerYear}, ${this.datePickerMonth}, ${day}); window.app.applyCustomDatePicker();"
                class="${cellClass}"
                title="${currentIso}${isToday ? ' (Hari Ini)' : ''}">
          ${day}
        </button>
      `;
    }

    // Trailing padding to make full weeks
    const totalCellsSoFar = firstDayIndex + totalDays;
    const remainingCells = (7 - (totalCellsSoFar % 7)) % 7;
    for (let day = 1; day <= remainingCells; day++) {
      cellsHtml += `<div class="date-picker-day-cell empty">${day}</div>`;
    }

    gridEl.innerHTML = cellsHtml;
  }

  updateHeaderDateDisplay() {
    const el = document.getElementById("header-date-day-display");
    const dateInput = document.getElementById("date-input");
    if (dateInput && dateInput.value !== this.selectedDate) {
      dateInput.value = this.selectedDate;
    }
    if (el && this.selectedDate) {
      const info = this.formatIndonesianDateWithDay(this.selectedDate);
      el.textContent = info.fullText || this.selectedDate;
    }
  }

  onTaskDateChange() {
    const input = document.getElementById("task-target-date");
    if (!input || !input.value) return;
    const dateStr = input.value;
    const info = this.formatIndonesianDateWithDay(dateStr);

    const displayEl = document.getElementById("task-target-date-display");
    if (displayEl) displayEl.textContent = info.fullText;

    const badge = document.getElementById("task-date-day-label");
    if (badge) badge.textContent = info.dayName || "Hari Ini";

    const weeklyOpt = document.getElementById("task-recurrence-weekly-label");
    if (weeklyOpt) weeklyOpt.textContent = `Setiap ${info.dayName} (Mengikuti Tanggal Mulai)`;

    const colLabel = document.getElementById("collision-date-label");
    if (colLabel) colLabel.textContent = `Peta Waktu 24 Jam (${info.dayName}, ${dateStr}):`;

    this.handleValidityPresetChange();
    this.checkTimeCollision();
  }

  startClock() {
    const update = () => {
      const now = new Date();
      const clockEl = document.getElementById("header-clock");
      const dateEl = document.getElementById("header-date");
      const drawerClockEl = document.getElementById("drawer-live-clock");
      const clockStr = now.toLocaleTimeString("id-ID") + " WIB";
      if (clockEl) clockEl.textContent = clockStr;
      if (drawerClockEl) drawerClockEl.textContent = clockStr;
      if (dateEl) {
        const opts = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
        dateEl.textContent = now.toLocaleDateString("id-ID", opts);
      }
    };
    update();
    setInterval(update, 1000);
  }

  toggleMobileNav(forceClose = false) {
    const drawer = document.getElementById("mobile-nav-drawer");
    const iconOpen = document.getElementById("hamburger-icon-open");
    const iconClose = document.getElementById("hamburger-icon-close");
    if (!drawer) return;

    if (forceClose || !drawer.classList.contains("hidden")) {
      drawer.classList.add("hidden");
      if (iconOpen) iconOpen.classList.remove("hidden");
      if (iconClose) iconClose.classList.add("hidden");
    } else {
      drawer.classList.remove("hidden");
      if (iconOpen) iconOpen.classList.add("hidden");
      if (iconClose) iconClose.classList.remove("hidden");
    }
  }

  switchTabFromDrawer(tab) {
    this.switchTab(tab);
    this.toggleMobileNav(true);
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

    // Update Drawer Tab Highlight
    document.querySelectorAll("[data-drawer-tab]").forEach(el => {
      if (el.dataset.drawerTab === tab) {
        el.className = "drawer-pill flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 transition-all cursor-pointer text-left";
      } else {
        el.className = "drawer-pill flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer text-left";
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

  // ===================== PRECISION 24-HOUR TIMELINE & ZOOM =====================
  formatHourAmPm(h) {
    if (h === 0 || h === 24) return "12 AM";
    if (h === 12) return "12 PM";
    if (h < 12) return `${h} AM`;
    return `${h - 12} PM`;
  }

  renderTimelineRulers() {
    const rulerTop = document.getElementById("timeline-ruler-top");
    const rulerBottom = document.getElementById("timeline-ruler-bottom");
    if (!rulerTop || !rulerBottom) return;

    let topHtml = "";
    let bottomHtml = "";

    for (let h = 0; h <= 24; h++) {
      const leftPct = (h / 24) * 100;
      const amPm = this.formatHourAmPm(h);
      const isMajor = h % 3 === 0 || h === 12 || h === 0 || h === 24;
      const h24 = String(h === 24 ? 24 : h).padStart(2, "0") + ":00";

      // Top Tick & AM/PM Label
      topHtml += `
        <div class="timeline-ruler-tick" style="left: ${leftPct.toFixed(2)}%;">
          <span class="block ${isMajor ? 'text-indigo-700 font-bold' : 'text-slate-600 font-medium'} text-[9px] leading-tight">${amPm}</span>
          <div class="w-[1px] h-1.5 ${isMajor ? 'bg-indigo-400' : 'bg-slate-300'} mx-auto mt-0.5"></div>
        </div>
      `;

      // Bottom Tick & 24h Label
      bottomHtml += `
        <div class="timeline-ruler-tick" style="left: ${leftPct.toFixed(2)}%;">
          <div class="w-[1px] h-1.5 ${isMajor ? 'bg-indigo-300' : 'bg-slate-200'} mx-auto mb-0.5"></div>
          <span class="block text-[8px] text-slate-400 font-mono leading-tight">${h24}</span>
        </div>
      `;
    }

    rulerTop.innerHTML = topHtml;
    rulerBottom.innerHTML = bottomHtml;
  }

  setTimelineZoom(mode) {
    this.timelineZoomMode = mode;
    const canvas = document.getElementById("timeline-canvas");
    const bar = document.getElementById("timeline-24h-bar");
    const btnFit = document.getElementById("btn-zoom-fit");
    const btn2x = document.getElementById("btn-zoom-2x");
    const btn3x = document.getElementById("btn-zoom-3x");

    if (!canvas || !bar) return;

    [btnFit, btn2x, btn3x].forEach(b => {
      if (b) {
        b.classList.remove("bg-indigo-600", "text-white");
        b.classList.add("bg-white", "text-slate-700");
      }
    });

    if (mode === "2x") {
      canvas.style.width = "1440px";
      bar.style.height = "48px";
      if (btn2x) {
        btn2x.classList.remove("bg-white", "text-slate-700");
        btn2x.classList.add("bg-indigo-600", "text-white");
      }
      setTimeout(() => this.scrollToCurrentTaskTime(), 50);
    } else if (mode === "3x") {
      canvas.style.width = "2160px";
      bar.style.height = "56px";
      if (btn3x) {
        btn3x.classList.remove("bg-white", "text-slate-700");
        btn3x.classList.add("bg-indigo-600", "text-white");
      }
      setTimeout(() => this.scrollToCurrentTaskTime(), 50);
    } else {
      // mode === "fit"
      canvas.style.width = "100%";
      bar.style.height = "38px";
      if (btnFit) {
        btnFit.classList.remove("bg-white", "text-slate-700");
        btnFit.classList.add("bg-indigo-600", "text-white");
      }
    }

    this.renderTimelineRulers();
    this.checkTimeCollision();
  }

  scrollToCurrentTaskTime() {
    const s1StartEl = document.getElementById("task-start-time");
    const viewport = document.getElementById("timeline-scroll-viewport");
    const canvas = document.getElementById("timeline-canvas");
    if (!s1StartEl || !viewport || !canvas) return;

    const startMins = this.timeToMinutes(s1StartEl.value || "09:00");
    const ratio = startMins / 1440;
    const targetScroll = (ratio * canvas.offsetWidth) - (viewport.offsetWidth / 3);
    viewport.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
  }

  // ===================== TIMELINE CARD EXPAND & VISUAL SCHEDULING =====================
  toggleTimelineCardExpand() {
    const card = document.getElementById("timeline-card-container");
    const btn = document.getElementById("btn-toggle-expand-card");
    if (!card) return;

    card.classList.toggle("is-expanded");
    const isExp = card.classList.contains("is-expanded");
    
    if (btn) {
      if (isExp) {
        btn.innerHTML = `<svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg><span>Kecilkan Peta</span>`;
        btn.classList.add("bg-indigo-50", "text-indigo-800", "border-indigo-300");
      } else {
        btn.innerHTML = `<svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span>Perbesar Peta</span>`;
        btn.classList.remove("bg-indigo-50", "text-indigo-800", "border-indigo-300");
      }
    }

    if (isExp) {
      this.scrollToCurrentTaskTime();
    }
  }

  setTaskDurationMinutes(durationMins) {
    const s1StartEl = document.getElementById("task-start-time");
    const s1EndEl = document.getElementById("task-end-time");
    if (!s1StartEl || !s1EndEl) return;

    const startMins = this.timeToMinutes(s1StartEl.value || "09:00");
    let endMins = startMins + durationMins;
    if (endMins >= 1440) {
      endMins = 1439;
    }

    s1EndEl.value = this.minutesToTime(endMins);
    this.checkTimeCollision();
  }

  setTaskStartTimePreset(timeStr) {
    const s1StartEl = document.getElementById("task-start-time");
    const s1EndEl = document.getElementById("task-end-time");
    if (!s1StartEl || !s1EndEl) return;

    const oldStart = this.timeToMinutes(s1StartEl.value || "09:00");
    const oldEnd = this.timeToMinutes(s1EndEl.value || "10:30");
    const currentDuration = oldEnd > oldStart ? (oldEnd - oldStart) : 60;

    const newStart = this.timeToMinutes(timeStr);
    let newEnd = newStart + currentDuration;
    if (newEnd >= 1440) newEnd = 1439;

    s1StartEl.value = timeStr;
    s1EndEl.value = this.minutesToTime(newEnd);
    this.checkTimeCollision();
    this.scrollToCurrentTaskTime();
  }

  onTimelineMouseMove(e) {
    const bar = document.getElementById("timeline-24h-bar");
    const cursor = document.getElementById("timeline-cursor-line");
    const clockTip = document.getElementById("timeline-hover-clock");
    const textTip = document.getElementById("timeline-hover-tip");
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const x = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const rawMins = ratio * 1440;
    
    let snapped = Math.round(rawMins / 15) * 15;
    if (snapped >= 1440) snapped = 1425;

    const snappedLeft = (snapped / 1440) * 100;
    if (cursor) {
      cursor.classList.remove("hidden");
      cursor.style.left = `${snappedLeft.toFixed(2)}%`;
    }

    const h = Math.floor(snapped / 60);
    const m = snapped % 60;
    const amPmStr = this.formatHourAmPm(h);
    const time24 = this.minutesToTime(snapped);
    const displayHour = (h % 12) === 0 ? 12 : (h % 12);
    const labelAmPm = `${displayHour}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;

    if (clockTip) {
      clockTip.textContent = `${labelAmPm} (${time24} WIB)`;
    }
    if (textTip) {
      textTip.textContent = `Klik untuk set jam mulai ke ${labelAmPm} (${time24} WIB)`;
    }
  }

  onTimelineMouseLeave() {
    const cursor = document.getElementById("timeline-cursor-line");
    const clockTip = document.getElementById("timeline-hover-clock");
    const textTip = document.getElementById("timeline-hover-tip");
    if (cursor) cursor.classList.add("hidden");
    if (clockTip) clockTip.textContent = "--:--";
    if (textTip) textTip.textContent = "Arahkan kursor atau klik pada peta waktu untuk isi jam instan";
  }

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

    const s1StartEl = document.getElementById("task-start-time");
    const s1EndEl = document.getElementById("task-end-time");
    const toggleS2 = document.getElementById("toggle-session2");
    const s2StartEl = document.getElementById("task-session2-start");
    const s2EndEl = document.getElementById("task-session2-end");

    const hasS2 = toggleS2 && toggleS2.checked;
    const s1OldStart = s1StartEl ? this.timeToMinutes(s1StartEl.value || "09:00") : 540;
    const s1OldEnd = s1EndEl ? this.timeToMinutes(s1EndEl.value || "10:30") : 630;
    const currentDuration = s1OldEnd > s1OldStart ? (s1OldEnd - s1OldStart) : 60;

    let snappedEnd = Math.min(1439, snappedStart + currentDuration);
    if (snappedEnd <= snappedStart) snappedEnd = Math.min(1439, snappedStart + 60);

    if (hasS2 && snappedStart >= s1OldEnd && s2StartEl && s2EndEl) {
      const s2OldStart = this.timeToMinutes(s2StartEl.value || "19:30");
      const s2OldEnd = this.timeToMinutes(s2EndEl.value || "20:30");
      const s2Dur = s2OldEnd > s2OldStart ? (s2OldEnd - s2OldStart) : 60;
      let s2EndVal = Math.min(1439, snappedStart + s2Dur);
      if (s2EndVal <= snappedStart) s2EndVal = Math.min(1439, snappedStart + 60);
      s2StartEl.value = this.minutesToTime(snappedStart);
      s2EndEl.value = this.minutesToTime(s2EndVal);
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
  isSleepTask(task) {
    if (!task) return false;
    if (task.category === "istirahat" || task.isSleep === true) return true;
    const title = (task.title || "").toLowerCase();
    return /\b(tidur|istirahat|sleep|rest|pemulihan|recharge)\b/i.test(title);
  }

  isTaskMissed(task, dateStr) {
    if (task.isDone || task.isCancelled || this.isSleepTask(task)) return false;
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
    if (!this.data.notifications || !this.data.notifications.missedTaskAlert) return;
    if (this.data.notifications.missedTaskAlert.enabled === false) return;

    const today = this.getTodayDateString();
    const tasks = this.getTasksForDate(today);
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    for (const t of tasks) {
      // Dapatkan referensi objek asli di dailyTasks agar mutasi alertSentDates tersimpan persisten
      const orig = this.data.dailyTasks.find(x => x.id === t.id);
      if (!orig) continue;
      if (!orig.alertSentDates) orig.alertSentDates = [];

      // Jika sudah dicoret (selesai), dibatalkan, atau agenda tidur, jangan kirim alert
      const isCompleted = t.isDone || orig.status === "done" || (orig.completedDates && orig.completedDates.includes(today));
      if (isCompleted || t.isCancelled || this.isSleepTask(t)) continue;
      if (orig.alertSentDates.includes(today)) continue;

      if (this.isTaskMissed(t, today)) {
        const taskEndMins = this.timeToMinutes(t.timeEnd || t.timeStart || "23:59");
        // Batasi toleransi 120 menit: jika lewat lebih dari 2 jam lalu, jangan spam WA mendadak
        if (currentMins > taskEndMins + 120) {
          orig.alertSentDates.push(today);
          this.saveData();
          continue;
        }

        orig.alertSentDates.push(today);
        orig.missedAlertSent = true;
        this.saveData();
        this.pushToCloud();

        const phone = this.data.notifications.targetPhone || "6288971071138";
        const message = 
`Halo Pak ${this.data.profile.name}, mohon izin menginfokan ya Pak.

Jadwal Bapak *"${t.title}"* yang dialokasikan pukul *${t.timeStart} - ${t.timeEnd} WIB* sepertinya sudah berakhir.

Silakan dicek dan dicoret ya Pak jadwalnya di dashboard apabila pekerjaannya sudah selesai sebelum rekap jam 12.00 nanti.

Apabila agenda ini berhalangan atau batal, Bapak bisa langsung klik tombol "Batal" dan cantumkan kendalanya di https://productivity.ilhampradani.me ya Pak.

Semoga hari Bapak selalu produktif!
*Aura Desk*`;

        await this.dispatchWAMessage(phone, message, `Pengingat: ${t.title}`, true);
        break; // Batasi 1 alert per turn agar tidak spam
      }
    }
  }

  async sendTestMissedTaskWA() {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const message = 
`Halo Pak ${this.data.profile.name}, mohon izin menginfokan ya Pak.

Jadwal Bapak *"Uji Coba Pengingat Agenda"* yang dialokasikan pukul *09:00 - 10:30 WIB* sepertinya sudah berakhir.

Silakan dicek dan dicoret ya Pak jadwalnya di dashboard apabila pekerjaannya sudah selesai sebelum rekap jam 12.00 nanti.

Apabila agenda ini berhalangan atau batal, Bapak bisa langsung klik tombol "Batal" dan cantumkan kendalanya di https://productivity.ilhampradani.me ya Pak.

Semoga hari Bapak selalu lancar!
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Tes Pengingat Coret Jadwal", false);
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
      if (task.recurrence === "weekends") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 0 || dow === 6;
      }
      if (task.recurrence === "weekly_sunday") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 0;
      }
      if (task.recurrence === "weekly_monday") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 1;
      }
      if (task.recurrence === "weekly_tuesday") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 2;
      }
      if (task.recurrence === "weekly_wednesday") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 3;
      }
      if (task.recurrence === "weekly_thursday") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 4;
      }
      if (task.recurrence === "weekly_friday") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 5;
      }
      if (task.recurrence === "weekly_saturday") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow === 6;
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

  getNextDateString(dateStr) {
    const parts = dateStr.split("-");
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dt = new Date(y, m, d);
    dt.setDate(dt.getDate() + 1);
    const ny = dt.getFullYear();
    const nm = String(dt.getMonth() + 1).padStart(2, "0");
    const nd = String(dt.getDate()).padStart(2, "0");
    return `${ny}-${nm}-${nd}`;
  }

  // ===================== DYNAMIC AUTO-SLEEP RECOVERY ENGINE =====================
  calculateDynamicSleep(targetDate) {
    const todayTasks = this.getTasksForDate(targetDate).filter(t => !t.isCancelled && !this.isSleepTask(t));
    const nextDate = this.getNextDateString(targetDate);
    const nextDayTasks = this.getTasksForDate(nextDate).filter(t => !t.isCancelled && !this.isSleepTask(t));

    // 1. Cari batas selesai agenda paling terakhir pada hari berjalan
    let maxEnd = null;
    let lastTaskTitle = "";

    todayTasks.forEach(t => {
      if (t.timeStart) {
        const s1 = this.timeToMinutes(t.timeStart);
        const e1 = this.timeToMinutes(t.timeEnd || t.timeStart);
        const effEnd1 = (e1 < s1) ? (1440 + e1) : e1;
        if (maxEnd === null || effEnd1 > maxEnd) {
          maxEnd = effEnd1;
          lastTaskTitle = t.title;
        }
      }
      if (t.hasSecondSession && t.session2Start) {
        const s2 = this.timeToMinutes(t.session2Start);
        const e2 = this.timeToMinutes(t.session2End || t.session2Start);
        const effEnd2 = (e2 < s2) ? (1440 + e2) : e2;
        if (maxEnd === null || effEnd2 > maxEnd) {
          maxEnd = effEnd2;
          lastTaskTitle = `${t.title} (Sesi 2)`;
        }
      }
    });

    // 2. Cari jam mulai agenda paling awal esok hari (nextMorningStart)
    let earliestMorning = null;
    let nextMorningTitle = "";

    nextDayTasks.forEach(t => {
      if (t.timeStart) {
        const s = this.timeToMinutes(t.timeStart);
        // Agenda pagi/subuh (antara 03:00 hingga 12:00)
        if (s >= 180 && s <= 720) {
          if (earliestMorning === null || s < earliestMorning) {
            earliestMorning = s;
            nextMorningTitle = t.title;
          }
        }
      }
    });

    // Default bangun esok hari adalah pukul 05:00 (300 menit) jika belum ada agenda esok pagi
    const sleepEnd = earliestMorning !== null ? earliestMorning : 300;
    if (!nextMorningTitle) {
      nextMorningTitle = "Agenda Pagi Esok (05:00)";
    }

    // 3. Standar Waktu Tidur Produktif Eksekutif: 6 Jam (360 menit)
    // Jam tidur ideal dihitung mundur 6 jam dari jam bangun esok pagi:
    // Misal: Bangun 05:00 (300 menit) -> Jam tidur ideal: 23:00 WIB (1380 menit)
    let idealSleepStart = sleepEnd - 360;
    if (idealSleepStart < 0) {
      idealSleepStart += 1440;
    }

    let sleepStart = idealSleepStart;
    let isOvernight = (sleepStart > sleepEnd);
    let isOverridden = false;
    let isCut = false;
    let cutMinutes = 0;
    let cutDesc = "";
    let eveningRelaxMinutes = 0;
    let eveningRelaxHours = 0;

    // 4. Evaluasi lembur malam & waktu santai:
    // Jika tugas terakhir selesai lewat jam tidur ideal (misal lembur lewat jam 23:00),
    // maka jam tidur bergeser menyesuaikan selesainya lembur, dan waktu tidur terpotong.
    // Jika tugas terakhir selesai sore/malam awal (misal 17:30, 18:00, atau 19:30),
    // jam tidur TETAP dimulai jam 23:00, dan waktu 19:30 - 23:00 dihitung sebagai waktu santai/pribadi.
    if (maxEnd !== null) {
      if (maxEnd >= 1440) {
        // Lembur selesai dini hari (misal 01:00)
        const earlyEnd = maxEnd - 1440;
        if (earlyEnd < sleepEnd) {
          sleepStart = earlyEnd;
          isOvernight = false;
          isOverridden = true;
          isCut = true;
        }
      } else if (maxEnd > idealSleepStart) {
        // Lembur selesai antara jam 23:00 dan 24:00
        sleepStart = maxEnd;
        isOvernight = true;
        isOverridden = true;
        isCut = true;
      } else if (maxEnd < idealSleepStart) {
        eveningRelaxMinutes = idealSleepStart - maxEnd;
        eveningRelaxHours = parseFloat((eveningRelaxMinutes / 60).toFixed(1));
        if (String(eveningRelaxHours).endsWith(".0")) {
          eveningRelaxHours = parseInt(eveningRelaxHours, 10);
        }
      }
    }

    // 5. Hitung durasi tidur aktual
    let durationMinutes = 0;
    if (isOvernight) {
      durationMinutes = (1440 - sleepStart) + sleepEnd;
    } else {
      durationMinutes = Math.max(0, sleepEnd - sleepStart);
    }

    if (durationMinutes < 360) {
      isCut = true;
      cutMinutes = 360 - durationMinutes;
      const cutHrs = (cutMinutes / 60).toFixed(1);
      cutDesc = cutMinutes < 60 ? `${cutMinutes} Menit` : `${cutHrs.endsWith('.0') ? parseInt(cutHrs, 10) : cutHrs} Jam (${cutMinutes} m)`;
    }

    const durationHours = parseFloat((durationMinutes / 60).toFixed(1));
    const cleanHours = String(durationHours).endsWith(".0") ? parseInt(durationHours, 10) : durationHours;

    let overrideReason = "";
    if (isCut) {
      overrideReason = `Waktu tidur terpotong ${cutDesc} (tersisa ${cleanHours} Jam) karena lembur agenda "${lastTaskTitle}" selesai pukul ${this.minutesToTime(maxEnd < 1440 ? maxEnd : maxEnd - 1440)} WIB menjelang agenda pagi "${nextMorningTitle}" (${this.minutesToTime(sleepEnd)} WIB).`;
    } else {
      const eveningNote = eveningRelaxMinutes > 0
        ? ` Waktu santai malam: ${this.minutesToTime(maxEnd)} - ${this.minutesToTime(sleepStart)} WIB (${eveningRelaxHours} Jam).`
        : "";
      overrideReason = `Alokasi tidur standar 6.0 Jam (${this.minutesToTime(sleepStart)} - ${this.minutesToTime(sleepEnd)} WIB).${eveningNote} Fleksibel dapat ditimpa jika ada jadwal tambahan.`;
    }

    return {
      startMins: sleepStart,
      endMins: sleepEnd,
      todayDawnEnd: 300,
      durationHours: cleanHours,
      durationMinutes,
      isOvernight,
      isOverridden,
      isCut,
      cutMinutes,
      cutDesc,
      eveningRelaxMinutes,
      eveningRelaxHours,
      maxEnd,
      overrideReason,
      lastTaskTitle,
      nextMorningTitle
    };
  }

  getOccupiedIntervals(targetDate, excludeTaskId = null) {
    const tasks = this.getTasksForDate(targetDate).filter(t => t.id !== excludeTaskId && !t.isCancelled);
    const intervals = [];
    let hasExplicitSleep = false;

    tasks.forEach(t => {
      const isSleep = this.isSleepTask(t);
      if (isSleep) hasExplicitSleep = true;

      if (t.timeStart && t.timeEnd) {
        const s = this.timeToMinutes(t.timeStart);
        const e = this.timeToMinutes(t.timeEnd);
        if (e > s) {
          intervals.push({ start: s, end: e, title: t.title, taskId: t.id, session: 1, isSleep });
        } else if (e < s) {
          // Jadwal lintas tengah malam (misal 23:00 - 04:30 atau tidur 23:00 - 05:00)
          intervals.push({ start: s, end: 1440, title: `${t.title} (Malam)`, taskId: t.id, session: 1, isSleep });
          intervals.push({ start: 0, end: e, title: `${t.title} (Subuh)`, taskId: t.id, session: 1, isSleep });
        }
      }
      if (t.hasSecondSession && t.session2Start && t.session2End) {
        const s2 = this.timeToMinutes(t.session2Start);
        const e2 = this.timeToMinutes(t.session2End);
        if (e2 > s2) {
          intervals.push({ start: s2, end: e2, title: `${t.title} (Sesi Malam)`, taskId: t.id, session: 2, isSleep: false });
        }
      }
    });

    // Masukkan jadwal tidur otomatis pada bar waktu jika belum ada jadwal tidur manual
    if (!hasExplicitSleep) {
      const dyn = this.calculateDynamicSleep(targetDate);
      if (dyn && dyn.durationMinutes > 0) {
        if (dyn.isOvernight) {
          intervals.push({
            start: dyn.startMins,
            end: 1440,
            title: `Waktu Istirahat & Tidur Otomatis (${dyn.durationHours} Jam)`,
            taskId: "auto-sleep-night",
            session: 1,
            isSleep: true,
            isDynamicSleep: true
          });
          const dawnEnd = dyn.todayDawnEnd !== undefined ? dyn.todayDawnEnd : dyn.endMins;
          if (dawnEnd > 0) {
            intervals.push({
              start: 0,
              end: dawnEnd,
              title: `Waktu Istirahat & Tidur Otomatis (${dyn.durationHours} Jam)`,
              taskId: "auto-sleep-dawn",
              session: 1,
              isSleep: true,
              isDynamicSleep: true
            });
          }
        } else {
          intervals.push({
            start: dyn.startMins,
            end: dyn.endMins,
            title: `Waktu Istirahat & Tidur Otomatis (${dyn.durationHours} Jam)`,
            taskId: "auto-sleep",
            session: 1,
            isSleep: true,
            isDynamicSleep: true
          });
        }
      }
    }

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

    const taskTitleVal = (document.getElementById("task-title") ? document.getElementById("task-title").value : "").toLowerCase();
    const isCurrentSleep = /\b(tidur|istirahat|sleep|rest|pemulihan|recharge)\b/i.test(taskTitleVal);

    const targetDateInput = document.getElementById("task-target-date");
    const targetDate = (targetDateInput && targetDateInput.value) || this.selectedDate;
    const occupied = this.getOccupiedIntervals(targetDate, this.editingTaskId);
    let conflict = null;
    let isSleepOverride = false;
    const isOvernightAgenda = s1End < s1Start;

    if (s1End === s1Start) {
      conflict = { msg: "Jam mulai dan jam selesai Sesi 1 tidak boleh sama persis!" };
    }

    if (!conflict) {
      if (s1End > s1Start) {
        for (const occ of occupied) {
          if (s1Start < occ.end && s1End > occ.start) {
            if (occ.isSleep) {
              // Boleh ditimpa! Agenda kerja diizinkan menimpa alokasi waktu tidur
              isSleepOverride = true;
            } else {
              conflict = { 
                msg: `Bertabrakan dengan agenda "${occ.title}" (${this.minutesToTime(occ.start)} - ${this.minutesToTime(occ.end)})` 
              };
              break;
            }
          }
        }
      } else if (isOvernightAgenda) {
        // Cek bentrok untuk agenda lintas tengah malam (malam s1Start..1440 dan subuh 0..s1End)
        for (const occ of occupied) {
          if ((s1Start < occ.end && 1440 > occ.start) || (0 < occ.end && s1End > occ.start)) {
            if (occ.isSleep) {
              isSleepOverride = true;
            } else {
              conflict = { 
                msg: `Bertabrakan dengan agenda "${occ.title}" (${this.minutesToTime(occ.start)} - ${this.minutesToTime(occ.end)})` 
              };
              break;
            }
          }
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
            if (occ.isSleep) {
              isSleepOverride = true;
            } else {
              conflict = { 
                msg: `Sesi Malam bertabrakan dengan agenda "${occ.title}" (${this.minutesToTime(occ.start)} - ${this.minutesToTime(occ.end)})` 
              };
              break;
            }
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
        if (isSleepOverride) {
          badgeEl.innerHTML = `<svg class="w-3.5 h-3.5 text-purple-600 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg> <span class="text-purple-700">Slot Aman (Menimpa Waktu Istirahat)</span>`;
          badgeEl.className = "font-bold text-purple-700 flex items-center gap-1.5 flex-shrink-0";
        } else {
          const sleepNotice = isOvernightAgenda ? " (Lintas Malam)" : "";
          badgeEl.innerHTML = `${ICONS.checkCircle} <span>Slot Aman${sleepNotice}</span>`;
          badgeEl.className = "font-bold text-emerald-700 flex items-center gap-1.5 flex-shrink-0";
        }
      }
      if (warnBox) warnBox.classList.add("hidden");
      if (submitBtn) submitBtn.disabled = false;
    }

    // Update Timeline Selected Time & Duration Badge
    const timeBadgeEl = document.getElementById("timeline-selected-time-badge");
    const durBadgeEl = document.getElementById("timeline-selected-duration-badge");
    let durMins = 0;
    if (s1End > s1Start) {
      durMins = s1End - s1Start;
    } else if (isOvernightAgenda) {
      durMins = (1440 - s1Start) + s1End;
    }

    if (timeBadgeEl) {
      timeBadgeEl.textContent = `${s1StartEl.value} - ${s1EndEl.value} WIB`;
    }
    if (durBadgeEl) {
      const durHours = Math.floor(durMins / 60);
      const durRemMins = durMins % 60;
      let durText = "";
      if (durHours > 0 && durRemMins > 0) durText = `(${durHours} Jam ${durRemMins} Menit)`;
      else if (durHours > 0) durText = `(${durHours} Jam)`;
      else durText = `(${durRemMins} Menit)`;
      durBadgeEl.textContent = durText;
    }

    // Highlight matching duration pill
    const pills = document.querySelectorAll(".duration-pill");
    pills.forEach(p => {
      const pMins = parseInt(p.getAttribute("data-mins"), 10);
      if (pMins === durMins) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });

    let gridHtml = "";
    // 1. Grid Garis Vertikal Tiap Jam (1 sampai 23)
    for (let h = 1; h < 24; h++) {
      const leftPct = (h / 24) * 100;
      gridHtml += `<div class="timeline-hour-line" style="left: ${leftPct.toFixed(2)}%;"></div>`;
    }
    // 2. Grid Setengah Jam (:30)
    for (let h = 0; h < 24; h++) {
      const leftPct = ((h + 0.5) / 24) * 100;
      gridHtml += `<div class="timeline-half-hour-line" style="left: ${leftPct.toFixed(2)}%;"></div>`;
    }
    // 3. Garis Penunjuk Waktu Sekarang (WIB)
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const nowLeft = (nowMins / 1440) * 100;
    gridHtml += `<div class="timeline-now-line" style="left: ${nowLeft.toFixed(2)}%;" title="Waktu Sekarang: ${this.minutesToTime(nowMins)} WIB"></div>`;
    // 4. Garis Interaktif Kursor
    gridHtml += `<div id="timeline-cursor-line" class="timeline-cursor-line hidden"></div>`;

    let html = "";
    occupied.forEach(occ => {
      const left = (occ.start / 1440) * 100;
      const width = Math.max(0.8, ((occ.end - occ.start) / 1440) * 100);
      const sleepClass = occ.isSleep ? " sleep" : "";
      const prefix = occ.isSleep ? "[Tidur] " : "";
      html += `
        <div class="timeline-slot-occupied${sleepClass}" style="left: ${left.toFixed(2)}%; width: ${width.toFixed(2)}%;" title="${prefix}${this.escapeHtml(occ.title)} (${this.minutesToTime(occ.start)} - ${this.minutesToTime(occ.end)})">
          <span class="timeline-slot-title">${this.escapeHtml(occ.title)}</span>
        </div>
      `;
    });

    if (s1End > s1Start) {
      const left = (s1Start / 1440) * 100;
      const width = Math.max(1, ((s1End - s1Start) / 1440) * 100);
      const isConf = conflict !== null;
      html += `
        <div class="timeline-slot-current ${isConf ? 'conflict' : 'valid'}" style="left: ${left.toFixed(2)}%; width: ${width.toFixed(2)}%;" title="Sesi 1: ${this.minutesToTime(s1Start)} - ${this.minutesToTime(s1End)}"></div>
      `;
    } else if (isOvernightAgenda && s1Start > 0) {
      // Overnight preview (baik kerja malam maupun tidur lintas hari)
      const left1 = (s1Start / 1440) * 100;
      const width1 = Math.max(1, ((1440 - s1Start) / 1440) * 100);
      const left2 = 0;
      const width2 = Math.max(1, (s1End / 1440) * 100);
      const isConf = conflict !== null;
      html += `
        <div class="timeline-slot-current ${isConf ? 'conflict' : 'valid'}" style="left: ${left1.toFixed(2)}%; width: ${width1.toFixed(2)}%;" title="Agenda (Malam): ${this.minutesToTime(s1Start)} - 24:00"></div>
        <div class="timeline-slot-current ${isConf ? 'conflict' : 'valid'}" style="left: ${left2.toFixed(2)}%; width: ${width2.toFixed(2)}%;" title="Agenda (Subuh): 00:00 - ${this.minutesToTime(s1End)}"></div>
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

    barEl.innerHTML = gridHtml + html;
    this.renderTimelineRulers();
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

  updateSidebarSleepCard() {
    const card = document.getElementById("sidebar-sleep-card");
    if (!card) return;
    const dyn = this.calculateDynamicSleep(this.selectedDate);
    if (!dyn) {
      card.classList.add("hidden");
      return;
    }
    card.classList.remove("hidden");

    const sStr = this.minutesToTime(dyn.startMins);
    const eStr = this.minutesToTime(dyn.endMins);
    const lastEndStr = dyn.maxEnd !== null ? this.minutesToTime(dyn.maxEnd < 1440 ? dyn.maxEnd : dyn.maxEnd - 1440) : null;

    let statusBadge = dyn.isCut
      ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 font-mono shadow-2xs">Terpotong ${dyn.cutDesc}</span>`
      : `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono shadow-2xs">6.0 Jam Penuh</span>`;

    let breakdownHtml = "";
    if (dyn.isCut) {
      breakdownHtml = `
        <div class="space-y-1.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
          <div class="flex items-center justify-between">
            <span class="text-amber-700 font-medium">Status Pemulihan:</span>
            <span class="font-bold text-amber-900">Terpotong ${dyn.cutDesc}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-amber-700 font-medium">Penyebab Lembur:</span>
            <span class="font-semibold truncate max-w-[170px]" title="${dyn.lastTaskTitle}">"${dyn.lastTaskTitle || 'Agenda Malam'}" (${lastEndStr} WIB)</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-amber-700 font-medium">Bangun Esok:</span>
            <span class="font-semibold">${eStr} WIB (${dyn.nextMorningTitle})</span>
          </div>
        </div>
      `;
    } else {
      let eveningRow = "";
      if (dyn.eveningRelaxMinutes > 0 && lastEndStr) {
        eveningRow = `
          <div class="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span class="text-slate-500">Waktu Santai / Pribadi:</span>
            <span class="font-semibold text-indigo-700">${lastEndStr} - ${sStr} WIB (${dyn.eveningRelaxHours} Jam)</span>
          </div>
        `;
      }
      breakdownHtml = `
        <div class="space-y-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
          ${eveningRow}
          <div class="flex items-center justify-between ${dyn.eveningRelaxMinutes > 0 ? 'pt-0.5' : ''}">
            <span class="text-slate-500">Waktu Tidur Ideal:</span>
            <span class="font-semibold text-emerald-700">${sStr} - ${eStr} WIB (6.0 Jam)</span>
          </div>
          <div class="flex items-center justify-between text-slate-500">
            <span>Agenda Pagi Esok:</span>
            <span class="font-medium text-slate-700 truncate max-w-[170px]" title="${dyn.nextMorningTitle}">${dyn.nextMorningTitle}</span>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          </div>
          <div>
            <span class="font-bold text-slate-800 text-xs tracking-tight">Waktu Tidur & Pemulihan</span>
            <p class="text-[10px] text-slate-400 font-mono">Otomatisasi Jadwal Tidur</p>
          </div>
        </div>
        ${statusBadge}
      </div>

      <div class="bg-gradient-to-r from-indigo-50/50 via-purple-50/40 to-slate-50 p-2.5 rounded-xl border border-indigo-100/80 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-slate-500 block">Jadwal Tidur Terjadwal</span>
          <span class="font-mono font-bold text-slate-800 text-sm">${sStr} - ${eStr} WIB</span>
        </div>
        <div class="text-right">
          <span class="text-[10px] text-slate-500 block">Total Durasi</span>
          <span class="font-mono font-bold ${dyn.isCut ? 'text-amber-700' : 'text-emerald-700'} text-sm">${dyn.durationHours} Jam</span>
        </div>
      </div>

      ${breakdownHtml}

      <div class="pt-1 flex items-center justify-between gap-2">
        <p class="text-[10px] text-slate-400 italic leading-tight">Fleksibel & otomatis menyesuaikan lembur</p>
        <button type="button" onclick="window.app.presetSleepSchedule()" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold border border-slate-200 cursor-pointer transition-colors shadow-2xs whitespace-nowrap">
          Jadwalkan
        </button>
      </div>
    `;
  }

  render() {
    this.updateSidebarBriefing();
    this.updateSidebarSleepCard();
    if (this.activeTab === "daily") this.renderDailyView();
    else if (this.activeTab === "meetings") this.renderMeetingsView();
    else if (this.activeTab === "monthly") this.renderMonthlyView();
    else if (this.activeTab === "roadmap") this.renderRoadmapView();
    else if (this.activeTab === "history") this.renderHistoryView();
    else if (this.activeTab === "notifications") this.renderNotificationsView();
    else if (this.activeTab === "settings") this.renderSettingsView();
  }

  // ===================== PENGATURAN LABEL & CRUD TABEL =====================
  renderSettingsView() {
    const tableBody = document.getElementById("labels-table-body");
    const countBadge = document.getElementById("settings-labels-count-badge");
    const countText = document.getElementById("table-labels-count-text");
    const colorPickerGrid = document.getElementById("label-color-picker-grid");

    if (!this.data.labels || !Array.isArray(this.data.labels) || this.data.labels.length === 0) {
      this.data.labels = [...DEFAULT_LABELS];
    }

    if (countBadge) countBadge.textContent = `${this.data.labels.length} Label Aktif`;
    if (countText) countText.textContent = `${this.data.labels.length} Label Terdaftar`;

    // Render Color Picker Grid jika belum ada isi
    if (colorPickerGrid && colorPickerGrid.children.length === 0) {
      let colorHtml = "";
      Object.keys(LABEL_COLORS).forEach((cKey, idx) => {
        const c = LABEL_COLORS[cKey];
        const isChecked = idx === 0 ? "checked" : "";
        colorHtml += `
          <label class="cursor-pointer flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <input type="radio" name="label-color-choice" value="${cKey}" ${isChecked} onchange="window.app.updateLabelPreview()" class="text-indigo-600 focus:ring-indigo-500">
            <span class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: ${c.hex}"></span>
            <span class="text-[10px] font-mono capitalize text-slate-700 truncate">${cKey}</span>
          </label>
        `;
      });
      colorPickerGrid.innerHTML = colorHtml;
      
      const nameInput = document.getElementById("label-form-name");
      if (nameInput) {
        nameInput.addEventListener("input", () => this.updateLabelPreview());
      }
    }

    this.updateLabelPreview();

    // Render Tabel CRUD Label
    if (tableBody) {
      if (this.data.labels.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="4" class="py-8 text-center text-slate-400 font-mono text-xs">
              Belum ada label. Silakan tambahkan label baru melalui formulir di samping.
            </td>
          </tr>
        `;
        return;
      }

      let rowsHtml = "";
      this.data.labels.forEach((lbl) => {
        const colorScheme = LABEL_COLORS[lbl.color] || LABEL_COLORS.slate;
        const usageCount = this.data.dailyTasks.filter(t => t.label === lbl.name || t.label === lbl.id).length;

        rowsHtml += `
          <tr class="hover:bg-slate-50 transition-colors">
            <td class="py-3 px-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: ${colorScheme.hex}"></span>
                <span>${this.escapeHtml(lbl.name)}</span>
              </span>
            </td>
            <td class="py-3 px-3 font-semibold text-slate-800">
              ${this.escapeHtml(lbl.name)}
            </td>
            <td class="py-3 px-3">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${usageCount > 0 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-500'} font-mono">
                ${usageCount} Agenda
              </span>
            </td>
            <td class="py-3 px-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button type="button" onclick="window.app.editLabel('${lbl.id}')" class="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-medium cursor-pointer transition-colors shadow-2xs">
                  Ubah
                </button>
                <button type="button" onclick="window.app.deleteLabel('${lbl.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-medium cursor-pointer transition-colors shadow-2xs">
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        `;
      });
      tableBody.innerHTML = rowsHtml;
    }
  }

  updateLabelPreview() {
    const previewBadge = document.getElementById("label-preview-badge");
    const nameInput = document.getElementById("label-form-name");
    const selectedRadio = document.querySelector('input[name="label-color-choice"]:checked');
    if (!previewBadge) return;

    const name = (nameInput && nameInput.value.trim()) || "Pratinjau Label";
    const colorKey = (selectedRadio && selectedRadio.value) || "indigo";
    const colorScheme = LABEL_COLORS[colorKey] || LABEL_COLORS.slate;

    previewBadge.className = `px-3 py-1 rounded-full text-xs font-semibold ${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} inline-flex items-center gap-1.5`;
    previewBadge.innerHTML = `
      <span class="w-2 h-2 rounded-full" style="background-color: ${colorScheme.hex}"></span>
      <span>${this.escapeHtml(name)}</span>
    `;
  }

  saveLabelForm(e) {
    if (e) e.preventDefault();
    const idInput = document.getElementById("label-form-id");
    const nameInput = document.getElementById("label-form-name");
    const selectedRadio = document.querySelector('input[name="label-color-choice"]:checked');
    
    if (!nameInput || !nameInput.value.trim()) {
      alert("Nama label tidak boleh kosong!");
      return;
    }

    const trimmed = nameInput.value.trim();
    const chosenColor = (selectedRadio && selectedRadio.value) || "indigo";
    const targetId = idInput ? idInput.value : "";

    if (!this.data.labels) this.data.labels = [...DEFAULT_LABELS];

    if (targetId) {
      // Mode Edit Label Eksisting
      const existing = this.data.labels.find(l => l.id === targetId);
      if (existing) {
        const oldName = existing.name;
        existing.name = trimmed;
        existing.color = chosenColor;

        // Perbarui semua agenda yang menggunakan nama lama
        if (oldName !== trimmed) {
          this.data.dailyTasks.forEach(t => {
            if (t.label === oldName || t.label === targetId) {
              t.label = trimmed;
            }
          });
        }
        this.showToast(`Label "${trimmed}" berhasil diperbarui!`, "success");
      }
    } else {
      // Mode Tambah Label Baru
      const duplicate = this.data.labels.find(l => l.name.toLowerCase() === trimmed.toLowerCase());
      if (duplicate) {
        alert(`Label dengan nama "${trimmed}" sudah ada!`);
        return;
      }
      this.data.labels.push({
        id: "lbl-" + Date.now(),
        name: trimmed,
        color: chosenColor
      });
      this.showToast(`Label baru "${trimmed}" berhasil ditambahkan!`, "success");
    }

    this.saveData();
    this.pushToCloud();
    this.cancelEditLabel();
    this.renderSettingsView();
    this.renderLabelDropdowns();
  }

  editLabel(id) {
    if (!this.data.labels) return;
    const lbl = this.data.labels.find(l => l.id === id);
    if (!lbl) return;

    const idInput = document.getElementById("label-form-id");
    const nameInput = document.getElementById("label-form-name");
    const titleEl = document.getElementById("form-label-title");
    const btnCancel = document.getElementById("btn-cancel-edit-label");
    const btnSubmitText = document.getElementById("btn-submit-label-text");

    if (idInput) idInput.value = lbl.id;
    if (nameInput) {
      nameInput.value = lbl.name;
      nameInput.focus();
    }
    if (titleEl) {
      titleEl.innerHTML = `
        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        <span>UBAH LABEL: ${this.escapeHtml(lbl.name)}</span>
      `;
    }
    if (btnCancel) btnCancel.classList.remove("hidden");
    if (btnSubmitText) btnSubmitText.textContent = "Simpan Perubahan Label";

    // Pilih radio warna yang sesuai
    const radio = document.querySelector(`input[name="label-color-choice"][value="${lbl.color}"]`);
    if (radio) radio.checked = true;

    this.updateLabelPreview();
  }

  cancelEditLabel() {
    const idInput = document.getElementById("label-form-id");
    const nameInput = document.getElementById("label-form-name");
    const titleEl = document.getElementById("form-label-title");
    const btnCancel = document.getElementById("btn-cancel-edit-label");
    const btnSubmitText = document.getElementById("btn-submit-label-text");

    if (idInput) idInput.value = "";
    if (nameInput) nameInput.value = "";
    if (titleEl) {
      titleEl.innerHTML = `
        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        <span>TAMBAH LABEL BARU</span>
      `;
    }
    if (btnCancel) btnCancel.classList.add("hidden");
    if (btnSubmitText) btnSubmitText.textContent = "Simpan Label";

    this.updateLabelPreview();
  }

  deleteLabel(id) {
    if (!this.data.labels) return;
    const lbl = this.data.labels.find(l => l.id === id);
    if (!lbl) return;

    const usedTasks = this.data.dailyTasks.filter(t => t.label === lbl.name || t.label === lbl.id);
    let confirmMsg = `Hapus label "${lbl.name}"?`;
    if (usedTasks.length > 0) {
      confirmMsg += `\n\nCatatan: Ada ${usedTasks.length} agenda yang menggunakan label ini. Agenda tersebut akan dialihkan menjadi tanpa label.`;
    }

    if (!confirm(confirmMsg)) return;

    // Hapus referensi label pada agenda
    usedTasks.forEach(t => {
      t.label = "";
    });

    this.data.labels = this.data.labels.filter(l => l.id !== id);
    this.saveData();
    this.pushToCloud();
    this.cancelEditLabel();
    this.renderSettingsView();
    this.renderLabelDropdowns();
    this.showToast(`Label "${lbl.name}" berhasil dihapus.`, "info");
  }

  resetLabelsToDefault() {
    if (!confirm("Apakah Anda yakin ingin memulihkan 5 label default standar sistem?")) return;
    this.data.labels = [...DEFAULT_LABELS];
    this.saveData();
    this.pushToCloud();
    this.cancelEditLabel();
    this.renderSettingsView();
    this.renderLabelDropdowns();
    this.showToast("Daftar label berhasil dipulihkan ke standar bawaan!", "success");
  }

  // ===================== LABEL & REORDER SYSTEM =====================
  getLabelInfo(labelKey) {
    if (!labelKey) return null;
    const labels = this.data.labels || DEFAULT_LABELS;
    const found = labels.find(l => l.name === labelKey || l.id === labelKey);
    if (found) {
      const colorScheme = LABEL_COLORS[found.color] || LABEL_COLORS.slate;
      return { ...found, ...colorScheme };
    }
    return {
      id: "custom-" + labelKey,
      name: labelKey,
      color: "slate",
      ...LABEL_COLORS.slate
    };
  }

  renderLabelDropdowns(selectedName = "") {
    const sel = document.getElementById("task-label-select");
    if (!sel) return;
    const labels = this.data.labels || DEFAULT_LABELS;
    let optionsHtml = `<option value="">-- Tanpa Label Khusus --</option>`;
    labels.forEach(l => {
      const isSelected = selectedName && (selectedName === l.name || selectedName === l.id);
      optionsHtml += `<option value="${this.escapeHtml(l.name)}" ${isSelected ? 'selected' : ''}>[${this.escapeHtml(l.name)}]</option>`;
    });
    if (selectedName && !labels.some(l => l.name === selectedName)) {
      optionsHtml += `<option value="${this.escapeHtml(selectedName)}" selected>[${this.escapeHtml(selectedName)}] (Kustom)</option>`;
    }
    sel.innerHTML = optionsHtml;
  }

  moveTaskPosition(taskId, delta) {
    const dateKey = this.selectedDate;
    let currentTasks = this.getTasksForDate(dateKey);
    if (currentTasks.length <= 1) return;

    const taskIds = currentTasks.map(t => t.id);
    let order = (this.data.customDailyOrder && this.data.customDailyOrder[dateKey]) ? [...this.data.customDailyOrder[dateKey]] : [];

    if (order.length === 0 || !taskIds.every(id => order.includes(id))) {
      currentTasks.sort((a, b) => {
        const mA = this.timeToMinutes(a.timeStart || "23:59");
        const mB = this.timeToMinutes(b.timeStart || "23:59");
        if (mA !== mB) return mA - mB;
        const eA = this.timeToMinutes(a.timeEnd || "23:59");
        const eB = this.timeToMinutes(b.timeEnd || "23:59");
        return eA - eB;
      });
      order = currentTasks.map(t => t.id);
    } else {
      order = order.filter(id => taskIds.includes(id));
      taskIds.forEach(id => {
        if (!order.includes(id)) order.push(id);
      });
    }

    const currentIndex = order.indexOf(taskId);
    if (currentIndex === -1) return;

    const newIndex = currentIndex + delta;
    if (newIndex < 0 || newIndex >= order.length) return;

    const temp = order[currentIndex];
    order[currentIndex] = order[newIndex];
    order[newIndex] = temp;

    if (!this.data.customDailyOrder) this.data.customDailyOrder = {};
    this.data.customDailyOrder[dateKey] = order;

    this.saveData();
    this.renderDailyView();
  }

  resetDailyOrder() {
    const dateKey = this.selectedDate;
    if (this.data.customDailyOrder && this.data.customDailyOrder[dateKey]) {
      delete this.data.customDailyOrder[dateKey];
      this.saveData();
      this.renderDailyView();
      this.showToast("Urutan agenda direset sesuai jam mulai (kronologis).", "info");
    } else {
      this.showToast("Agenda sudah berurutan berdasarkan jam mulai.", "info");
    }
  }

  onTaskDragStart(e, taskId) {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
    const el = document.getElementById(`daily-card-${taskId}`);
    if (el) el.classList.add("dragging");
  }

  onTaskDragEnd(e, taskId) {
    const el = document.getElementById(`daily-card-${taskId}`);
    if (el) el.classList.remove("dragging");
    document.querySelectorAll(".daily-task-card").forEach(c => c.classList.remove("drag-over"));
  }

  onTaskDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const card = e.currentTarget;
    if (card && !card.classList.contains("dragging")) {
      card.classList.add("drag-over");
    }
  }

  onTaskDragLeave(e) {
    const card = e.currentTarget;
    if (card) {
      card.classList.remove("drag-over");
    }
  }

  onTaskDrop(e, targetTaskId) {
    e.preventDefault();
    const sourceTaskId = e.dataTransfer.getData("text/plain");
    document.querySelectorAll(".daily-task-card").forEach(c => c.classList.remove("drag-over"));
    if (!sourceTaskId || sourceTaskId === targetTaskId) return;

    const dateKey = this.selectedDate;
    let currentTasks = this.getTasksForDate(dateKey);
    const taskIds = currentTasks.map(t => t.id);

    let order = (this.data.customDailyOrder && this.data.customDailyOrder[dateKey]) ? [...this.data.customDailyOrder[dateKey]] : [];
    if (order.length === 0 || !taskIds.every(id => order.includes(id))) {
      currentTasks.sort((a, b) => this.timeToMinutes(a.timeStart || "23:59") - this.timeToMinutes(b.timeStart || "23:59"));
      order = currentTasks.map(t => t.id);
    } else {
      order = order.filter(id => taskIds.includes(id));
      taskIds.forEach(id => { if (!order.includes(id)) order.push(id); });
    }

    const srcIndex = order.indexOf(sourceTaskId);
    const tgtIndex = order.indexOf(targetTaskId);
    if (srcIndex === -1 || tgtIndex === -1) return;

    order.splice(srcIndex, 1);
    order.splice(tgtIndex, 0, sourceTaskId);

    if (!this.data.customDailyOrder) this.data.customDailyOrder = {};
    this.data.customDailyOrder[dateKey] = order;

    this.saveData();
    this.renderDailyView();
    this.showToast("Posisi agenda berhasil dipindahkan!", "success");
  }

  // ===================== DAILY VIEW =====================
  renderDailyView() {
    this.updateHeaderDateDisplay();
    const list = document.getElementById("daily-task-container");
    if (!list) return;

    let tasks = this.getTasksForDate(this.selectedDate);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || (t.note && t.note.toLowerCase().includes(q)));
    }

    // CHECK FOR CUSTOM DAILY ORDER (NOMOR 1, 2, 3...) DENGAN FALLBACK KRONOLOGIS
    const dateKey = this.selectedDate;
    const customOrder = (this.data.customDailyOrder && this.data.customDailyOrder[dateKey]) ? this.data.customDailyOrder[dateKey] : null;

    if (customOrder && Array.isArray(customOrder) && customOrder.length > 0) {
      tasks.sort((a, b) => {
        const idxA = customOrder.indexOf(a.id);
        const idxB = customOrder.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        const mA = this.timeToMinutes(a.timeStart || "23:59");
        const mB = this.timeToMinutes(b.timeStart || "23:59");
        return mA - mB;
      });
    } else {
      // STRICT CHRONOLOGICAL AUTO-SORTING (Waktu Mulai Ascending)
      tasks.sort((a, b) => {
        const mA = this.timeToMinutes(a.timeStart || "23:59");
        const mB = this.timeToMinutes(b.timeStart || "23:59");
        if (mA !== mB) return mA - mB;
        const eA = this.timeToMinutes(a.timeEnd || "23:59");
        const eB = this.timeToMinutes(b.timeEnd || "23:59");
        return eA - eB;
      });
    }

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
        <div class="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm mb-3">
          <p class="text-sm font-medium text-slate-600">Tidak ada agenda pada tanggal ini.</p>
          <p class="text-xs text-slate-500 mt-1">Gunakan form Google-style atau klik peta bar 24 jam di atas untuk menjadwalkan agenda bebas bentrok.</p>
        </div>
      `;
      return;
    }

    const taskCardsHtml = tasks.map((task, idx) => {
      const isDone = task.isDone;
      const isMissed = this.isTaskMissed(task, this.selectedDate);
      const dur1 = this.formatDuration(task.timeStart, task.timeEnd);
      const dur2 = task.hasSecondSession ? this.formatDuration(task.session2Start, task.session2End) : "";

      let recurrenceBadge = "";
      if (task.recurrence === "daily") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">${ICONS.repeat} <span>Tiap Hari</span></span>`;
      } else if (task.recurrence === "weekdays") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">${ICONS.repeat} <span>Senin - Jumat</span></span>`;
      } else if (task.recurrence === "weekends") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">${ICONS.repeat} <span>Sabtu & Minggu</span></span>`;
      } else if (task.recurrence === "weekly_monday") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Tiap Senin</span></span>`;
      } else if (task.recurrence === "weekly_tuesday") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Tiap Selasa</span></span>`;
      } else if (task.recurrence === "weekly_wednesday") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Tiap Rabu</span></span>`;
      } else if (task.recurrence === "weekly_thursday") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Tiap Kamis</span></span>`;
      } else if (task.recurrence === "weekly_friday") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Tiap Jumat</span></span>`;
      } else if (task.recurrence === "weekly_saturday") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Tiap Sabtu</span></span>`;
      } else if (task.recurrence === "weekly_sunday") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Tiap Minggu</span></span>`;
      } else if (task.recurrence === "weekly_day") {
        const parts = (task.date || this.selectedDate).split("-");
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Setiap ${days[d.getDay()]}</span></span>`;
      } else if (task.recurrence === "yearly") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200">${ICONS.repeat} <span>Tiap Tahun</span></span>`;
      }

      // Label Badge
      let labelBadgeHtml = "";
      if (task.label) {
        const lblInfo = this.getLabelInfo(task.label);
        if (lblInfo) {
          labelBadgeHtml = `
            <span class="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md ${lblInfo.bg} ${lblInfo.text} border ${lblInfo.border} font-semibold shadow-2xs">
              <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
              <span>${this.escapeHtml(lblInfo.name)}</span>
            </span>
          `;
        }
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
        <div id="daily-card-${task.id}" 
             draggable="true" 
             ondragstart="window.app.onTaskDragStart(event, '${task.id}')"
             ondragend="window.app.onTaskDragEnd(event, '${task.id}')"
             ondragover="window.app.onTaskDragOver(event)"
             ondragleave="window.app.onTaskDragLeave(event)"
             ondrop="window.app.onTaskDrop(event, '${task.id}')"
             class="daily-task-card flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
          task.isCancelled
            ? "bg-rose-50/20 border-rose-200/60 opacity-75"
            : isDone 
              ? "bg-slate-50/70 border-slate-200 opacity-60" 
              : "bg-white hover:bg-slate-50/50 border-slate-200 shadow-sm"
        }">
          <div class="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <!-- SEQUENCE NUMBER & REORDER CONTROLS (1, 2, 3...) -->
            <div class="flex flex-col items-center justify-center gap-0.5 flex-shrink-0 mr-0.5 sm:mr-1 select-none">
              <button type="button" 
                      onclick="window.app.moveTaskPosition('${task.id}', -1)" 
                      title="Pindah ke Atas" 
                      ${idx === 0 ? 'disabled' : ''} 
                      class="p-0.5 text-slate-400 hover:text-indigo-600 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors leading-none">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
              </button>
              <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-slate-100 border border-slate-200/90 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-slate-700 shadow-2xs cursor-grab" title="Urutan #${idx + 1} (Klik panah atau drag kartu untuk geser)">
                ${idx + 1}
              </span>
              <button type="button" 
                      onclick="window.app.moveTaskPosition('${task.id}', 1)" 
                      title="Pindah ke Bawah" 
                      ${idx === tasks.length - 1 ? 'disabled' : ''} 
                      class="p-0.5 text-slate-400 hover:text-indigo-600 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors leading-none">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>

            ${task.isCancelled ? `
              <div class="w-5 h-5 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 flex-shrink-0 mt-0.5 sm:mt-0" title="Agenda ini dibatalkan">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </div>
            ` : `
              <!-- Checkbox -->
              <input type="checkbox" ${isDone ? 'checked' : ''} onchange="window.app.toggleTask('${task.id}', '${this.selectedDate}')" class="custom-checkbox flex-shrink-0 mt-0.5 sm:mt-0">
            `}
            
            <!-- PROMINENT TIME PILLAR (RESPONSIVE) -->
            <div class="task-time-pillar flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 min-w-[75px] sm:min-w-[130px] shadow-sm">
              <div class="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold font-mono text-slate-900">
                ${ICONS.sun}
                <span>${task.timeStart || '09:00'} - ${task.timeEnd || 'Selesai'}</span>
              </div>
              ${dur1 ? `<span class="text-[9px] sm:text-[10px] font-mono font-medium text-slate-500 mt-0.5">${dur1}</span>` : ''}
              
              ${task.hasSecondSession && task.session2Start ? `
                <div class="flex items-center gap-1 text-[10px] sm:text-xs font-bold font-mono text-indigo-700 mt-1 sm:mt-1.5 pt-1 sm:pt-1.5 border-t border-slate-200 w-full justify-center">
                  ${ICONS.moon}
                  <span>${task.session2Start} - ${task.session2End || 'Selesai'}</span>
                </div>
                ${dur2 ? `<span class="text-[8px] sm:text-[9px] font-mono text-indigo-500">${dur2}</span>` : ''}
              ` : ''}
            </div>

            <!-- Task Detail & Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap mb-0.5 sm:mb-1">
                ${recurrenceBadge}
                ${labelBadgeHtml}
                ${cancelBadgeHtml}
                ${missedBadgeHtml}
              </div>

              <h4 class="text-xs sm:text-sm font-bold ${task.isCancelled ? 'line-through text-slate-400' : isDone ? 'line-through text-slate-400' : 'text-slate-900'} break-words">
                ${this.escapeHtml(task.title)}
              </h4>
              
              ${task.note ? `<p class="text-[11px] sm:text-xs text-slate-600 mt-0.5 break-words leading-relaxed">${this.escapeHtml(task.note)}</p>` : ''}
            </div>
          </div>

          <!-- Actions: Tombol Selesai, Batal, & Utilitas -->
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap flex-shrink-0 self-end sm:self-center mt-1 sm:mt-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
            
            <!-- TOMBOL SELESAI -->
            ${task.isCancelled ? '' : isDone ? `
              <button onclick="window.app.toggleTask('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer shadow-sm" title="Klik untuk membatalkan status selesai">
                <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                <span>Selesai</span>
              </button>
            ` : `
              <button onclick="window.app.toggleTask('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-semibold shadow-sm transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                <span>Selesai</span>
              </button>
            `}

            <!-- TOMBOL BATAL -->
            ${task.isCancelled ? `
              <button onclick="window.app.restoreCancelledTask('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] sm:text-xs font-medium border border-slate-300 transition-all cursor-pointer" title="Aktifkan kembali agenda ini">
                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Pulihkan</span>
              </button>
            ` : `
              <button onclick="window.app.openCancelTaskModal('${task.id}', '${this.selectedDate}')" class="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer" title="Batalkan agenda ini">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                <span>Batal</span>
              </button>
            `}

            <!-- Mini Utilitas: Edit, WA, Hapus -->
            <div class="flex items-center gap-0.5 border-l border-slate-200 pl-1">
              <button onclick="window.app.editTask('${task.id}')" title="Edit Agenda Ini" class="p-1 sm:p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer">
                ${ICONS.edit}
              </button>
              <button onclick="window.app.sendTaskToWA('${task.id}')" title="Kirim Pengingat Tugas ini ke WhatsApp" class="p-1 sm:p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer">
                ${ICONS.wa}
              </button>
              <button onclick="window.app.deleteTask('${task.id}', '${this.selectedDate}')" title="Hapus Tugas" class="p-1 sm:p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                ${ICONS.trash}
              </button>
            </div>

          </div>
        </div>
      `;
    }).join("");

    list.innerHTML = taskCardsHtml;
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
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div class="flex-1 min-w-0 space-y-1">
            <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span class="text-[10px] sm:text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md font-semibold">
                ${t.date} • ${t.timeStart} - ${t.timeEnd}
              </span>
              ${isDone ? `
                <span class="text-[10px] sm:text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                  ${ICONS.checkCircle} Selesai
                </span>
              ` : ''}
              ${isMissed ? `
                <span class="text-[10px] sm:text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                  ${ICONS.alertTriangle} Terlewat / Kendala
                </span>
              ` : ''}
            </div>

            <h4 class="text-xs sm:text-sm font-bold text-slate-900 break-words">${this.escapeHtml(t.title)}</h4>
            ${t.note ? `<p class="text-[11px] sm:text-xs text-slate-600 break-words">${this.escapeHtml(t.note)}</p>` : ''}
            
            ${t.missedReason ? `
              <div class="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs mt-1">
                <span class="font-bold">Kendala:</span> ${this.escapeHtml(t.missedReason)}
              </div>
            ` : ''}
          </div>

          <!-- Quick Action: Jadwalkan Lagi Hari Ini -->
          <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 self-end sm:self-center mt-1 sm:mt-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
            ${isMissed && !t.missedReason ? `
              <button onclick="window.app.openMissedReasonModal('${t.id}', '${t.date}')" class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] sm:text-xs font-semibold cursor-pointer">
                Isi Kendala
              </button>
            ` : ''}
            <button onclick="window.app.duplicateTaskToToday('${t.id}')" class="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] sm:text-xs font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-1">
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
        task.label = formData.label ? formData.label.trim() : "";
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
        label: formData.label ? formData.label.trim() : "",
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
    this.renderLabelDropdowns(task.label || "");

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
    this.renderLabelDropdowns("");
    this.toggleSession2UI();
    this.initValidityPreset();
    this.checkTimeCollision();
    this.closeAddTaskModal();
  }

  toggleTask(id, targetDate) {
    const t = this.data.dailyTasks.find(item => item.id === id);
    if (!t) return;

    t.updated_at = new Date().toISOString();

    if (!t.recurrence || t.recurrence === "none") {
      t.status = t.status === "done" ? "todo" : "done";
    } else {
      if (!t.completedDates) t.completedDates = [];
      const idx = t.completedDates.indexOf(targetDate);
      if (idx > -1) {
        t.completedDates.splice(idx, 1);
      } else {
        t.completedDates.push(targetDate);
        t.status = "done";
      }
    }

    if (!t.alertSentDates) t.alertSentDates = [];
    if (!t.alertSentDates.includes(targetDate)) {
      t.alertSentDates.push(targetDate);
    }

    this.saveData();
    this.render();
    // Kirim sinkronisasi instan ke server & Cloudflare D1
    this.pushToCloud();
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

  // ===================== ROADMAP BULANAN & ALOKASI WAKTU 24 JAM =====================
  getDayUsageStats(dateStr) {
    const tasks = this.getTasksForDate(dateStr).filter(t => !t.isCancelled);
    let workMinutes = 0;
    let sleepMinutes = 0;

    tasks.forEach(t => {
      const isSleep = this.isSleepTask(t);
      if (t.timeStart && t.timeEnd) {
        const s = this.timeToMinutes(t.timeStart);
        const e = this.timeToMinutes(t.timeEnd);
        const dur = (e >= s) ? (e - s) : (1440 - s + e);
        if (isSleep) {
          sleepMinutes += dur;
        } else {
          workMinutes += dur;
        }
      }
      if (t.hasSecondSession && t.session2Start && t.session2End) {
        const s2 = this.timeToMinutes(t.session2Start);
        const e2 = this.timeToMinutes(t.session2End);
        const dur2 = (e2 >= s2) ? (e2 - s2) : (1440 - s2 + e2);
        workMinutes += dur2;
      }
    });

    // Baseline pemulihan & tidur: jika belum input jadwal tidur manual, hitung dinamis dari tugas terakhir sampai agenda pagi esok
    let effectiveSleepMinutes = sleepMinutes;
    let autoSleepInfo = null;
    if (sleepMinutes === 0) {
      autoSleepInfo = this.calculateDynamicSleep(dateStr);
      const dawnMins = autoSleepInfo.todayDawnEnd || 300;
      const nightMins = autoSleepInfo.isOvernight ? Math.max(0, 1440 - autoSleepInfo.startMins) : Math.max(0, autoSleepInfo.endMins - autoSleepInfo.startMins);
      effectiveSleepMinutes = Math.min(1440, Math.max(0, dawnMins + nightMins));
    }
    const totalAllocatedMinutes = Math.min(1440, workMinutes + effectiveSleepMinutes);
    const flexibleMinutes = Math.max(0, 1440 - totalAllocatedMinutes);

    const workHoursVal = (workMinutes / 60).toFixed(1);
    const sleepHoursVal = (effectiveSleepMinutes / 60).toFixed(1);
    const flexibleHoursVal = (flexibleMinutes / 60).toFixed(1);

    const cleanWorkHours = workHoursVal.endsWith(".0") ? parseInt(workHoursVal, 10) : workHoursVal;
    const cleanSleepHours = sleepHoursVal.endsWith(".0") ? parseInt(sleepHoursVal, 10) : sleepHoursVal;
    const cleanFlexibleHours = flexibleHoursVal.endsWith(".0") ? parseInt(flexibleHoursVal, 10) : flexibleHoursVal;

    const totalMinutes = workMinutes;
    const cleanHours = cleanWorkHours;
    const pct = Math.min(100, Math.round((workMinutes / 1440) * 100));

    return {
      taskCount: tasks.length,
      totalMinutes,
      cleanHours,
      workMinutes,
      workHours: cleanWorkHours,
      sleepMinutes: effectiveSleepMinutes,
      sleepHours: cleanSleepHours,
      flexibleMinutes,
      flexibleHours: cleanFlexibleHours,
      hasExplicitSleep: sleepMinutes > 0,
      ratioStr: `${cleanWorkHours}/24 Jam`,
      pct,
      tasks
    };
  }

  changeMonthlyView(delta) {
    this.monthlyViewMonth += delta;
    if (this.monthlyViewMonth < 0) {
      this.monthlyViewMonth = 11;
      this.monthlyViewYear -= 1;
    } else if (this.monthlyViewMonth > 11) {
      this.monthlyViewMonth = 0;
      this.monthlyViewYear += 1;
    }
    this.renderMonthlyView();
  }

  resetMonthlyViewToCurrent() {
    const now = new Date();
    this.monthlyViewYear = now.getFullYear();
    this.monthlyViewMonth = now.getMonth();
    this.renderMonthlyView();
  }

  goToDate(dateStr) {
    this.selectedDate = dateStr;
    const dateInput = document.getElementById("date-input");
    if (dateInput) dateInput.value = dateStr;
    this.switchTab("daily");
    this.showToast(`Beralih ke Agenda Harian: ${dateStr}`, "info");
  }

  async manualSync() {
    this.showToast("Menjalankan sinkronisasi manual...", "info");
    await this.pushToCloud();
    await this.syncWithCloud();
    this.render();
    this.showToast("Sinkronisasi manual selesai! Data tersinkron dengan Cloud & Server.", "success");
  }

  async refreshData() {
    this.showToast("Memuat ulang data...", "info");
    await this.syncWithCloud();
    this.render();
    this.showToast("Data agenda berhasil dimuat ulang!", "success");
  }

  checkAllMonthCollisions() {
    const numDays = new Date(this.monthlyViewYear, this.monthlyViewMonth + 1, 0).getDate();
    const collisions = [];

    for (let d = 1; d <= numDays; d++) {
      const dayStr = `${this.monthlyViewYear}-${String(this.monthlyViewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const intervals = [];
      const tasks = this.getTasksForDate(dayStr).filter(t => !t.isCancelled && t.timeStart && t.timeEnd);
      
      tasks.forEach(t => {
        const s = this.timeToMinutes(t.timeStart);
        const e = this.timeToMinutes(t.timeEnd);
        if (e > s) intervals.push({ start: s, end: e, title: t.title });
        if (t.hasSecondSession && t.session2Start && t.session2End) {
          const s2 = this.timeToMinutes(t.session2Start);
          const e2 = this.timeToMinutes(t.session2End);
          if (e2 > s2) intervals.push({ start: s2, end: e2, title: `${t.title} (Sesi 2)` });
        }
      });

      intervals.sort((a, b) => a.start - b.start);
      for (let i = 0; i < intervals.length - 1; i++) {
        if (intervals[i].end > intervals[i + 1].start) {
          collisions.push({
            date: dayStr,
            t1: intervals[i].title,
            t2: intervals[i + 1].title
          });
        }
      }
    }

    if (collisions.length === 0) {
      alert("SEMPURNA: Tidak ada konflik waktu di bulan ini! Seluruh alokasi agenda 24 jam bebas bentrok.");
    } else {
      const msg = collisions.map(c => `• Tanggal ${c.date}: "${c.t1}" bertabrakan dengan "${c.t2}"`).join("\n");
      alert(`DITEMUKAN ${collisions.length} KONFLIK WAKTU:\n\n${msg}\n\nSilakan sesuaikan jam di Agenda Harian.`);
    }
  }

  openUserGuideModal() {
    const m = document.getElementById("modal-user-guide");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }
  }

  closeUserGuideModal() {
    const m = document.getElementById("modal-user-guide");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }
  }

  openAuditSyncModal() {
    const m = document.getElementById("modal-audit-sync");
    const list = document.getElementById("audit-sync-log-list");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }
    if (list) {
      const logs = (this.data.notifications && this.data.notifications.logs) || [];
      if (logs.length === 0) {
        list.innerHTML = `<p class="text-slate-400 italic text-[11px] p-2 bg-slate-50 rounded-lg">Belum ada riwayat audit log tercatat.</p>`;
      } else {
        list.innerHTML = logs.map(l => `
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono flex items-center justify-between shadow-xs">
            <div>
              <span class="font-bold text-slate-800">[${this.escapeHtml(l.type)}]</span>
              <span class="text-[10px] text-slate-500 block">${l.time} • ke ${l.phone || '-'}</span>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${l.status === 'Terkirim' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">${l.status}</span>
          </div>
        `).join("");
      }
    }
  }

  closeAuditSyncModal() {
    const m = document.getElementById("modal-audit-sync");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }
  }

  exportFilteredCSV() {
    const tasks = this.data.dailyTasks || [];
    const headers = ["ID", "Tanggal", "Waktu Mulai", "Waktu Selesai", "Sesi 2 Mulai", "Sesi 2 Selesai", "Judul Agenda", "Catatan", "Frekuensi", "Status", "Batas Berlaku"];
    
    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = tasks.map(t => [
      escapeCsv(t.id),
      escapeCsv(t.date),
      escapeCsv(t.timeStart || ""),
      escapeCsv(t.timeEnd || ""),
      escapeCsv(t.session2Start || ""),
      escapeCsv(t.session2End || ""),
      escapeCsv(t.title || ""),
      escapeCsv(t.note || ""),
      escapeCsv(t.recurrence || "none"),
      escapeCsv(t.status || "todo"),
      escapeCsv(t.validUntil || "")
    ].join(","));

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Agenda_Eksekutif_${this.getTodayDateString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast(`Berhasil mengekspor ${tasks.length} agenda ke file CSV!`, "success");
  }

  triggerCSVUpload() {
    const input = document.getElementById("input-csv-upload");
    if (input) input.click();
  }

  handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          alert("File CSV kosong atau tidak memiliki baris data.");
          return;
        }

        const parseCSVLine = (line) => {
          const result = [];
          let insideQuote = false;
          let entry = "";
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"' && i + 1 < line.length && line[i + 1] === '"') {
              entry += '"';
              i++;
            } else if (char === '"') {
              insideQuote = !insideQuote;
            } else if (char === ',' && !insideQuote) {
              result.push(entry);
              entry = "";
            } else {
              entry += char;
            }
          }
          result.push(entry);
          return result;
        };

        let importedCount = 0;
        for (let i = 1; i < lines.length; i++) {
          const cols = parseCSVLine(lines[i]);
          if (cols.length >= 7) {
            const id = cols[0] || ("t-" + Date.now() + "-" + i);
            const date = cols[1] || this.getTodayDateString();
            const timeStart = cols[2] || "09:00";
            const timeEnd = cols[3] || "10:00";
            const session2Start = cols[4] || "";
            const session2End = cols[5] || "";
            const title = cols[6] || "Agenda Impor";
            const note = cols[7] || "";
            const recurrence = cols[8] || "none";
            const status = cols[9] || "todo";
            const validUntil = cols[10] || "";

            const existing = this.data.dailyTasks.find(t => t.id === id);
            if (existing) {
              Object.assign(existing, { date, timeStart, timeEnd, session2Start, session2End, title, note, recurrence, status, validUntil });
            } else {
              this.data.dailyTasks.push({
                id,
                date,
                timeStart,
                timeEnd,
                hasSecondSession: !!(session2Start && session2End),
                session2Start,
                session2End,
                title,
                note,
                recurrence,
                validityType: "until_completed",
                validUntil,
                status,
                completedDates: [],
                deletedDates: []
              });
            }
            importedCount++;
          }
        }

        this.saveData();
        this.render();
        this.showToast(`Berhasil mengimpor ${importedCount} agenda dari file CSV!`, "success");
        event.target.value = "";
      } catch (err) {
        alert("Gagal memproses file CSV: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  renderMonthlyView() {
    const container = document.getElementById("monthly-roadmap-container");
    if (!container) return;

    const y = this.monthlyViewYear;
    const m = this.monthlyViewMonth;
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const monthName = monthNames[m];
    const numDays = new Date(y, m + 1, 0).getDate();
    const todayStr = this.getTodayDateString();

    let totalMonthMinutes = 0;
    let totalMonthTasks = 0;
    let busiestDay = { day: "-", hours: 0, dateStr: "" };
    const dayStatsList = [];

    for (let d = 1; d <= numDays; d++) {
      const dayStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const stats = this.getDayUsageStats(dayStr);
      const dayOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date(y, m, d).getDay()];
      dayStatsList.push({
        d,
        dayStr,
        dayOfWeek,
        isToday: dayStr === todayStr,
        ...stats
      });

      totalMonthMinutes += stats.totalMinutes;
      totalMonthTasks += stats.taskCount;
      if (stats.totalMinutes > busiestDay.hours) {
        busiestDay = {
          day: `${dayOfWeek}, ${d} ${monthName.slice(0, 3)}`,
          hours: stats.totalMinutes,
          cleanHours: stats.cleanHours,
          dateStr: dayStr
        };
      }
    }

    const totalHoursMonth = (totalMonthMinutes / 60).toFixed(1);
    const avgHoursPerDay = (totalMonthMinutes / numDays / 60).toFixed(1);
    const avgHoursClean = avgHoursPerDay.endsWith(".0") ? parseInt(avgHoursPerDay, 10) : avgHoursPerDay;
    const maxCapacityHours = numDays * 24;
    const avgPct = Math.round((totalMonthMinutes / (numDays * 1440)) * 100);
    const allTasksCount = (this.data.dailyTasks || []).length;

    container.innerHTML = `
      <!-- 1. Header & Month Selector Navigation -->
      <div class="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm space-y-3 sm:space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </span>
              <h2 class="text-sm sm:text-lg font-black text-slate-900 font-mono tracking-tight uppercase">
                Roadmap Bulanan & Alokasi Waktu 24 Jam
              </h2>
            </div>
            <p class="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
              Distribusi beban jam kerja harian (<span class="font-mono font-semibold text-slate-700">2/24 Jam, 14/24 Jam</span>) dan rata-rata per bulan.
            </p>
          </div>

          <!-- Month Controls -->
          <div class="flex items-center gap-1 sm:gap-1.5 self-start sm:self-auto font-mono text-xs">
            <button onclick="window.app.changeMonthlyView(-1)" title="Bulan Sebelumnya" class="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <span class="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 shadow-xs whitespace-nowrap text-xs sm:text-sm">
              ${monthName} ${y}
            </span>
            <button onclick="window.app.changeMonthlyView(1)" title="Bulan Berikutnya" class="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <button onclick="window.app.resetMonthlyViewToCurrent()" class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium transition-colors cursor-pointer border border-slate-200 whitespace-nowrap text-xs">
              Bulan Ini
            </button>
          </div>
        </div>

        <!-- 2. Summary Metric Badges (Rata-rata & Alokasi Jam) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 pt-2 border-t border-slate-100">
          <div class="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Rata-Rata / Hari</span>
            <div class="flex items-baseline gap-1">
              <span class="text-base sm:text-xl font-black font-mono text-indigo-600">${avgHoursClean}</span>
              <span class="text-[10px] sm:text-xs font-bold text-slate-500 font-mono">/ 24 Jam</span>
            </div>
            <span class="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5">Rata-rata (${avgPct}%)</span>
          </div>

          <div class="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Total Jam Terpakai</span>
            <div class="flex items-baseline gap-1">
              <span class="text-base sm:text-xl font-black font-mono text-slate-800">${totalHoursMonth}</span>
              <span class="text-[10px] sm:text-xs font-bold text-slate-400 font-mono">/ ${maxCapacityHours} Jam</span>
            </div>
            <span class="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5">Kapasitas 1 bulan</span>
          </div>

          <div class="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Hari Terpadat</span>
            <span class="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">${busiestDay.hours > 0 ? busiestDay.day : 'Belum Ada'}</span>
            <span class="text-[9px] sm:text-[10px] text-indigo-600 font-mono block mt-0.5 font-semibold">${busiestDay.hours > 0 ? `${busiestDay.cleanHours}/24 Jam` : '-'}</span>
          </div>

          <div class="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Total Agenda Aktif</span>
            <div class="flex items-baseline gap-1">
              <span class="text-base sm:text-xl font-black font-mono text-emerald-600">${totalMonthTasks}</span>
              <span class="text-[10px] sm:text-xs font-bold text-slate-400 font-mono">Sesi</span>
            </div>
            <span class="text-[9px] sm:text-[10px] text-emerald-600 font-semibold block mt-0.5">Bebas bentrok</span>
          </div>
        </div>

        <!-- 3. Sync & Audit Logs Action Toolbar -->
        <div class="p-2.5 sm:p-3.5 rounded-xl bg-slate-900 text-white space-y-2 sm:space-y-2.5 shadow-sm">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span class="text-[11px] sm:text-xs font-bold font-mono tracking-wide">Sync & Audit Logs Gateway</span>
            </div>
            <button onclick="window.app.openUserGuideModal()" class="text-[10px] sm:text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer">
              <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>User Guide & Documentation</span>
            </button>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button onclick="window.app.manualSync()" class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Sync Manual</span>
            </button>

            <button onclick="window.app.checkAllMonthCollisions()" class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700">
              <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span>Cek Konflik</span>
            </button>

            <button onclick="window.app.openAuditSyncModal()" class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700">
              <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Log Error Sync</span>
            </button>

            <button onclick="window.app.refreshData()" class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Monthly Roadmap Cards Grid (Compact 2-col on mobile, up to 7-col on desktop) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-1.5 sm:gap-3">
        ${dayStatsList.map(item => {
          let ratioColor = "text-slate-400";
          let barColor = "bg-slate-300";
          if (item.cleanHours > 0 && item.cleanHours <= 4) {
            ratioColor = "text-emerald-600";
            barColor = "bg-emerald-500";
          } else if (item.cleanHours > 4 && item.cleanHours <= 8) {
            ratioColor = "text-indigo-600";
            barColor = "bg-indigo-600";
          } else if (item.cleanHours > 8 && item.cleanHours <= 12) {
            ratioColor = "text-amber-600";
            barColor = "bg-amber-500";
          } else if (item.cleanHours > 12) {
            ratioColor = "text-rose-600";
            barColor = "bg-rose-500";
          }

          let previewHtml = "";
          if (item.tasks.length === 0) {
            previewHtml = `<span class="text-slate-400 text-[10px] italic">Waktu fleksibel & pemulihan siap dikelola</span>`;
          } else {
            const topTask = item.tasks[0];
            const isTopSleep = this.isSleepTask(topTask);
            previewHtml = `
              <div class="truncate text-slate-700 text-[11px] font-medium">
                <span class="font-mono text-[10px] text-slate-500 font-semibold">[${topTask.timeStart || '00:00'}]</span> ${isTopSleep ? '<svg class="w-3 h-3 text-purple-600 inline mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>' : ''}${this.escapeHtml(topTask.title)}
              </div>
              ${item.tasks.length > 1 ? `<span class="text-[10px] text-slate-400 block">+${item.tasks.length - 1} agenda lainnya</span>` : ''}
            `;
          }

          return `
            <div onclick="window.app.goToDate('${item.dayStr}')" class="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border ${item.isToday ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-sm' : 'border-slate-200'} hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[90px] sm:min-h-[135px]">
              <div>
                <!-- Top Row: Tanggal, Nama Hari, Badge Hari Ini -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1 sm:gap-1.5">
                    <span class="text-sm sm:text-lg font-black font-mono ${item.isToday ? 'text-indigo-600' : 'text-slate-800'}">${item.d}</span>
                    <span class="text-[10px] sm:text-xs font-semibold text-slate-500">${item.dayOfWeek}</span>
                  </div>
                  ${item.isToday ? '<span class="px-1 py-0.2 rounded text-[8px] font-bold bg-indigo-600 text-white tracking-wider">HARI INI</span>' : ''}
                </div>

                <!-- Middle: Rasio Jam (2/24 Jam, 14/24 Jam) & Waktu Pemulihan -->
                <div class="my-1 sm:my-2">
                  <div class="flex items-baseline justify-between mb-0.5 sm:mb-1">
                    <span class="text-xs sm:text-sm font-black font-mono ${ratioColor}">
                      ${item.cleanHours}<span class="text-[9px] sm:text-xs font-bold text-slate-400">/24 Jam</span>
                    </span>
                    <span class="text-[9px] sm:text-[10px] font-mono text-purple-600 font-semibold flex items-center gap-1" title="Waktu Pemulihan & Tidur: ${item.sleepHours} Jam">
                      <svg class="w-3 h-3 text-purple-600 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg> ${item.sleepHours}h
                    </span>
                  </div>
                  <div class="w-full h-1 sm:h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div class="h-full ${barColor} rounded-full transition-all" style="width: ${item.pct}%"></div>
                  </div>
                </div>
              </div>

              <!-- Bottom: Preview Agenda & Link -->
              <div class="pt-1 sm:pt-2 border-t border-slate-100 space-y-0.5 sm:space-y-1">
                <div class="flex items-center justify-between text-slate-600">
                  <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider font-mono text-slate-500">
                    ${item.taskCount > 0 ? `${item.taskCount} Agenda` : 'Kosong'}
                  </span>
                  <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
                <div class="hidden sm:block">
                  ${previewHtml}
                </div>
                <div class="sm:hidden">
                  ${item.tasks.length > 0 ? `<div class="truncate text-slate-700 text-[10px] font-medium">[${item.tasks[0].timeStart || '00:00'}] ${this.escapeHtml(item.tasks[0].title)}</div>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  renderRoadmapView() {
    const container = document.getElementById("roadmap-5y-container");
    if (!container) return;

    if (!this.data.fiveYearPlan || this.data.fiveYearPlan.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm space-y-2">
          <p class="text-sm font-bold text-slate-700">Belum Ada Target Roadmap Tahunan</p>
          <p class="text-xs text-slate-500">Klik tombol "+ Tambah Tahun" di atas untuk menambahkan tahun dan target rencana kerja.</p>
          <button onclick="window.app.openAdd5YYearModal()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm hover:bg-indigo-700 cursor-pointer">
            + Tambah Tahun Baru
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.data.fiveYearPlan.map(year => {
      const quarters = year.quarters || [];
      const allSteps = [];
      quarters.forEach(q => {
        (q.steps || []).forEach(s => {
          allSteps.push({ ...s, quarterId: q.id, quarterName: q.quarter });
        });
      });

      // Target steps metrics
      const totalSteps = allSteps.length;
      const doneSteps = allSteps.filter(s => s.done).length;
      const inProgSteps = allSteps.filter(s => !s.done && !s.failed && s.status !== "cancelled").length;
      const failedSteps = allSteps.filter(s => s.failed || s.status === "cancelled" || s.status === "failed").length;

      // Check daily tasks in that year
      const yNum = parseInt(year.year, 10) || 2026;
      const yStr = String(yNum);
      const yearDailyTasks = (this.data.dailyTasks || []).filter(t => t.date && t.date.startsWith(yStr));
      const doneDailyTasks = yearDailyTasks.filter(t => t.status === "done" || (t.completedDates && t.completedDates.some(d => d.startsWith(yStr)))).length;
      const failedDailyTasks = yearDailyTasks.filter(t => t.status === "cancelled" || t.missedReason).length;

      const displayTotal = totalSteps > 0 ? totalSteps : yearDailyTasks.length;
      const displayDone = totalSteps > 0 ? doneSteps : doneDailyTasks;
      const displayFailed = totalSteps > 0 ? failedSteps : failedDailyTasks;
      const displayInProg = totalSteps > 0 ? inProgSteps : Math.max(0, yearDailyTasks.length - doneDailyTasks - failedDailyTasks);

      const pctDone = displayTotal > 0 ? Math.round((displayDone / displayTotal) * 100) : 0;
      const failedRate = displayTotal > 0 ? Math.round((displayFailed / displayTotal) * 100) : 0;
      const inProgRate = displayTotal > 0 ? Math.max(0, 100 - pctDone - failedRate) : 0;

      // Rata-rata per bulan
      const avgPerMonth = (displayDone / 12).toFixed(1);
      // Rata-rata per hari (pace beban kerja/target per hari dalam 365 hari)
      const avgPerDay = (displayTotal / 365).toFixed(2);

      // 4 Quarters breakdown (Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Okt-Des)
      const getQuarterStats = (qIndex) => {
        const qMonths = [
          ['01', '02', '03'],
          ['04', '05', '06'],
          ['07', '08', '09'],
          ['10', '11', '12']
        ][qIndex - 1];
        const qTasks = yearDailyTasks.filter(t => t.date && qMonths.includes(t.date.slice(5, 7)));
        const qSteps = allSteps.filter(s => {
          const qName = (s.quarterName || "").toUpperCase();
          return qName.includes(`Q${qIndex}`) || qName.includes(` ${qIndex}`);
        });
        const qTotal = qSteps.length > 0 ? qSteps.length : qTasks.length;
        const qDone = qSteps.length > 0 ? qSteps.filter(s => s.done).length : qTasks.filter(t => t.status === "done").length;
        const qPct = qTotal > 0 ? Math.round((qDone / qTotal) * 100) : 0;
        return { total: qTotal, done: qDone, pct: qPct };
      };

      const q1 = getQuarterStats(1);
      const q2 = getQuarterStats(2);
      const q3 = getQuarterStats(3);
      const q4 = getQuarterStats(4);

      return `
        <div class="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-3">
          <!-- Top Row: Tahun & Judul & Aksi -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
            <div class="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0 flex-wrap sm:flex-nowrap">
              <span class="text-xl sm:text-2xl font-black text-indigo-600 font-mono tracking-tight flex-shrink-0">${year.year}</span>
              <div class="flex-1 min-w-0">
                ${year.title ? `
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900 break-words">${this.escapeHtml(year.title)}</h3>
                ` : `
                  <span class="text-xs text-slate-400 italic">Target Tahunan Mandiri (klik Edit untuk mengisi fokus/tema)</span>
                `}
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${pctDone >= 80 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'} whitespace-nowrap flex-shrink-0">
                ${pctDone}% Tercapai
              </span>
            </div>

            <!-- Action Buttons for this Year -->
            <div class="flex items-center gap-1.5 flex-shrink-0 self-start sm:self-center flex-wrap pt-1 sm:pt-0">
              <button onclick="window.app.openAdd5YStepModal('${year.id}')" class="px-2.5 sm:px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>+ Target</span>
              </button>
              <button onclick="window.app.openEdit5YYearModal('${year.id}')" title="Edit Judul & Angka Tahun" class="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] sm:text-xs font-medium flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>Edit</span>
              </button>
              <button onclick="window.app.delete5YYear('${year.id}')" title="Hapus Tahun ${year.year}" class="p-1 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>

          <!-- 2. The 4 Requested Metrics Grid (Total Selesai, Rata2/Bulan, Rata2/Hari, Rata2 Gagal) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Total Selesai</span>
              <div class="flex items-baseline gap-1">
                <span class="text-base sm:text-xl font-black font-mono text-emerald-600">${displayDone}</span>
                <span class="text-[10px] sm:text-xs font-bold text-slate-400 font-mono">/ ${displayTotal}</span>
              </div>
              <span class="text-[9px] sm:text-[10px] text-emerald-600 font-semibold block mt-0.5">${pctDone}% Terlaksana</span>
            </div>

            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Rata-Rata / Bulan</span>
              <div class="flex items-baseline gap-1">
                <span class="text-base sm:text-xl font-black font-mono text-indigo-600">${avgPerMonth}</span>
                <span class="text-[10px] sm:text-xs font-bold text-slate-400 font-mono">Target/Bln</span>
              </div>
              <span class="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5">Pace 12 bulan</span>
            </div>

            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Rata-Rata / Hari</span>
              <div class="flex items-baseline gap-1">
                <span class="text-base sm:text-xl font-black font-mono text-slate-800">${avgPerDay}</span>
                <span class="text-[10px] sm:text-xs font-bold text-slate-400 font-mono">Pace/Hari</span>
              </div>
              <span class="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5">Basis 365 hari</span>
            </div>

            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block mb-0.5">Rata-Rata Gagal / Kendala</span>
              <div class="flex items-baseline gap-1">
                <span class="text-base sm:text-xl font-black font-mono ${displayFailed > 0 ? 'text-rose-600' : 'text-slate-800'}">${displayFailed}</span>
                <span class="text-[10px] sm:text-xs font-bold text-slate-400 font-mono">(${failedRate}%)</span>
              </div>
              <span class="text-[9px] sm:text-[10px] ${displayFailed > 0 ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-semibold'} block mt-0.5">
                ${displayFailed > 0 ? 'Terkendala/batal' : 'Bebas kendala'}
              </span>
            </div>
          </div>

          <!-- 3. Grafik Visual Kompak (Tri-Color Bar & 4 Quarters Breakdown) -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
            <div class="space-y-1">
              <div class="flex items-center justify-between text-[11px] font-mono">
                <span class="text-slate-700 font-bold">Grafik Status Eksekusi Tahunan:</span>
                <span class="font-bold text-indigo-700 font-mono">${pctDone}%</span>
              </div>
              <div class="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
                <div style="width: ${pctDone}%" class="bg-emerald-500 h-full transition-all" title="Selesai: ${displayDone}"></div>
                <div style="width: ${inProgRate}%" class="bg-indigo-500 h-full transition-all" title="Dalam Proses: ${displayInProg}"></div>
                <div style="width: ${failedRate}%" class="bg-rose-500 h-full transition-all" title="Kendala/Batal: ${displayFailed}"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5 flex-wrap gap-2">
                <span class="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Selesai (${displayDone})
                </span>
                <span class="inline-flex items-center gap-1 text-indigo-700 font-medium">
                  <span class="w-2 h-2 rounded-full bg-indigo-500"></span> Proses (${displayInProg})
                </span>
                <span class="inline-flex items-center gap-1 text-rose-700 font-medium">
                  <span class="w-2 h-2 rounded-full bg-rose-500"></span> Kendala (${displayFailed})
                </span>
              </div>
            </div>

            <!-- 4 Quarters Mini Performance Bars -->
            <div class="grid grid-cols-4 gap-1.5 sm:gap-2 pt-1 border-t border-slate-200">
              ${[
                { name: "Q1 (Jan-Mar)", ...q1 },
                { name: "Q2 (Apr-Jun)", ...q2 },
                { name: "Q3 (Jul-Sep)", ...q3 },
                { name: "Q4 (Okt-Des)", ...q4 }
              ].map(q => `
                <div class="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 text-center flex flex-col justify-between">
                  <span class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-600 block truncate">${q.name}</span>
                  <div class="w-full bg-slate-100 rounded-full h-1.5 sm:h-2 my-1 overflow-hidden">
                    <div class="bg-indigo-600 h-full rounded-full transition-all" style="width: ${q.pct}%"></div>
                  </div>
                  <span class="text-[10px] sm:text-[11px] font-mono font-bold text-slate-800">${q.pct}%</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  openAdd5YYearModal() {
    let nextYear = 2026;
    if (this.data.fiveYearPlan && this.data.fiveYearPlan.length > 0) {
      const maxYear = Math.max(...this.data.fiveYearPlan.map(y => parseInt(y.year, 10) || 2026));
      nextYear = maxYear + 1;
    }
    const idEl = document.getElementById("input-5y-year-id");
    const numEl = document.getElementById("input-5y-year-number");
    const titleEl = document.getElementById("input-5y-year-title-text");
    const headingEl = document.getElementById("modal-5y-year-title");

    if (idEl) idEl.value = "";
    if (numEl) numEl.value = nextYear;
    if (titleEl) titleEl.value = "";
    if (headingEl) headingEl.textContent = "TAMBAH TAHUN ROADMAP";

    const modal = document.getElementById("modal-edit-5y-year");
    if (modal) modal.classList.remove("hidden");
  }

  openEdit5YYearModal(yearId) {
    const yearObj = (this.data.fiveYearPlan || []).find(y => y.id === yearId);
    if (!yearObj) return;

    const idEl = document.getElementById("input-5y-year-id");
    const numEl = document.getElementById("input-5y-year-number");
    const titleEl = document.getElementById("input-5y-year-title-text");
    const headingEl = document.getElementById("modal-5y-year-title");

    if (idEl) idEl.value = yearObj.id;
    if (numEl) numEl.value = yearObj.year;
    if (titleEl) titleEl.value = yearObj.title || "";
    if (headingEl) headingEl.textContent = `EDIT TAHUN ${yearObj.year}`;

    const modal = document.getElementById("modal-edit-5y-year");
    if (modal) modal.classList.remove("hidden");
  }

  close5YYearModal() {
    const modal = document.getElementById("modal-edit-5y-year");
    if (modal) modal.classList.add("hidden");
  }

  submit5YYear(e) {
    if (e) e.preventDefault();
    const idEl = document.getElementById("input-5y-year-id");
    const numEl = document.getElementById("input-5y-year-number");
    const titleEl = document.getElementById("input-5y-year-title-text");

    const yearId = idEl ? idEl.value.trim() : "";
    const yearNum = numEl ? parseInt(numEl.value, 10) : 2026;
    const yearTitle = titleEl ? titleEl.value.trim() : "";

    this.data.fiveYearPlan = this.data.fiveYearPlan || [];

    if (yearId) {
      // Edit existing
      const existing = this.data.fiveYearPlan.find(y => y.id === yearId);
      if (existing) {
        existing.year = yearNum;
        existing.title = yearTitle;
      }
    } else {
      // Add new
      const newYear = {
        id: "y-" + Date.now(),
        year: yearNum,
        title: yearTitle,
        quarters: [
          {
            id: "q-" + Date.now(),
            quarter: String(yearNum),
            focus: "",
            steps: []
          }
        ]
      };
      this.data.fiveYearPlan.push(newYear);
      this.data.fiveYearPlan.sort((a, b) => (parseInt(a.year, 10) || 0) - (parseInt(b.year, 10) || 0));
    }

    this.saveData();
    this.close5YYearModal();
    this.renderRoadmapView();
  }

  delete5YYear(yearId) {
    const yearObj = (this.data.fiveYearPlan || []).find(y => y.id === yearId);
    if (!yearObj) return;

    if (!confirm(`Hapus tahun ${yearObj.year} dan seluruh targetnya?`)) return;

    this.data.fiveYearPlan = this.data.fiveYearPlan.filter(y => y.id !== yearId);
    this.saveData();
    this.renderRoadmapView();
  }

  openAdd5YStepModal(yearId) {
    const y = (this.data.fiveYearPlan || []).find(item => item.id === yearId);
    if (!y) return;

    y.quarters = y.quarters || [];
    let qId = y.quarters.length > 0 ? y.quarters[0].id : "";
    if (!qId) {
      qId = "q-" + Date.now();
      y.quarters.push({ id: qId, quarter: String(y.year), focus: "", steps: [] });
    }

    const yearIdEl = document.getElementById("input-5y-step-year-id");
    const qIdEl = document.getElementById("input-5y-step-quarter-id");
    const stepIdEl = document.getElementById("input-5y-step-id");
    const titleEl = document.getElementById("input-5y-step-title-text");
    const noteEl = document.getElementById("input-5y-step-note-text");
    const headingEl = document.getElementById("modal-5y-step-heading");

    if (yearIdEl) yearIdEl.value = yearId;
    if (qIdEl) qIdEl.value = qId;
    if (stepIdEl) stepIdEl.value = "";
    if (titleEl) titleEl.value = "";
    if (noteEl) noteEl.value = "";
    if (headingEl) headingEl.textContent = `TAMBAH TARGET TAHUN ${y.year}`;

    const modal = document.getElementById("modal-edit-5y-step");
    if (modal) modal.classList.remove("hidden");
  }

  openEdit5YStepModal(yearId, quarterId, stepId) {
    const y = (this.data.fiveYearPlan || []).find(item => item.id === yearId);
    if (!y) return;
    const q = (y.quarters || []).find(item => item.id === quarterId);
    if (!q) return;
    const s = (q.steps || []).find(item => item.id === stepId);
    if (!s) return;

    const yearIdEl = document.getElementById("input-5y-step-year-id");
    const qIdEl = document.getElementById("input-5y-step-quarter-id");
    const stepIdEl = document.getElementById("input-5y-step-id");
    const titleEl = document.getElementById("input-5y-step-title-text");
    const noteEl = document.getElementById("input-5y-step-note-text");
    const headingEl = document.getElementById("modal-5y-step-heading");

    if (yearIdEl) yearIdEl.value = yearId;
    if (qIdEl) qIdEl.value = quarterId;
    if (stepIdEl) stepIdEl.value = s.id;
    if (titleEl) titleEl.value = s.title || "";
    if (noteEl) noteEl.value = s.note || "";
    if (headingEl) headingEl.textContent = `EDIT TARGET TAHUN ${y.year}`;

    const modal = document.getElementById("modal-edit-5y-step");
    if (modal) modal.classList.remove("hidden");
  }

  close5YStepModal() {
    const modal = document.getElementById("modal-edit-5y-step");
    if (modal) modal.classList.add("hidden");
  }

  submit5YStep(e) {
    if (e) e.preventDefault();
    const yearIdEl = document.getElementById("input-5y-step-year-id");
    const qIdEl = document.getElementById("input-5y-step-quarter-id");
    const stepIdEl = document.getElementById("input-5y-step-id");
    const titleEl = document.getElementById("input-5y-step-title-text");
    const noteEl = document.getElementById("input-5y-step-note-text");

    const yearId = yearIdEl ? yearIdEl.value.trim() : "";
    const quarterId = qIdEl ? qIdEl.value.trim() : "";
    const stepId = stepIdEl ? stepIdEl.value.trim() : "";
    const title = titleEl ? titleEl.value.trim() : "";
    const note = noteEl ? noteEl.value.trim() : "";

    if (!title) return;

    const y = (this.data.fiveYearPlan || []).find(item => item.id === yearId);
    if (!y) return;
    y.quarters = y.quarters || [];
    let q = y.quarters.find(item => item.id === quarterId);
    if (!q) {
      q = { id: quarterId || ("q-" + Date.now()), quarter: String(y.year), focus: "", steps: [] };
      y.quarters.push(q);
    }
    q.steps = q.steps || [];

    if (stepId) {
      const s = q.steps.find(item => item.id === stepId);
      if (s) {
        s.title = title;
        s.note = note;
      }
    } else {
      q.steps.push({
        id: "s-" + Date.now(),
        title: title,
        note: note,
        done: false
      });
    }

    this.saveData();
    this.close5YStepModal();
    this.renderRoadmapView();
  }

  delete5YStep(yearId, quarterId, stepId) {
    const y = (this.data.fiveYearPlan || []).find(item => item.id === yearId);
    if (!y) return;
    const q = (y.quarters || []).find(item => item.id === quarterId);
    if (!q) return;

    q.steps = (q.steps || []).filter(item => item.id !== stepId);
    this.saveData();
    this.renderRoadmapView();
  }

  toggle5YStep(yearId, quarterId, stepId) {
    const y = (this.data.fiveYearPlan || []).find(item => item.id === yearId);
    if (!y) return;
    const q = (y.quarters || []).find(item => item.id === quarterId);
    if (!q) return;
    const s = (q.steps || []).find(item => item.id === stepId);
    if (!s) return;

    s.done = !s.done;
    this.saveData();
    this.renderRoadmapView();
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

    if (phoneEl) {
      phoneEl.value = notif.targetPhone || "6288971071138";
      phoneEl.onchange = () => this.autoSaveNotificationSettings(true);
    }
    if (morningTimeEl) {
      morningTimeEl.value = (notif.morningBriefing && notif.morningBriefing.time) || "07:00";
      morningTimeEl.onchange = () => this.autoSaveNotificationSettings(true);
    }
    if (morningCheckEl) {
      morningCheckEl.checked = !!(notif.morningBriefing && notif.morningBriefing.enabled);
      morningCheckEl.onchange = () => this.autoSaveNotificationSettings(true);
    }
    if (eveningTimeEl) {
      eveningTimeEl.value = (notif.eveningRecap && notif.eveningRecap.time) || "21:00";
      eveningTimeEl.onchange = () => this.autoSaveNotificationSettings(true);
    }
    if (eveningCheckEl) {
      eveningCheckEl.checked = !!(notif.eveningRecap && notif.eveningRecap.enabled);
      eveningCheckEl.onchange = () => this.autoSaveNotificationSettings(true);
    }
    if (missedCheckEl) {
      missedCheckEl.checked = !!(notif.missedTaskAlert && notif.missedTaskAlert.enabled);
      missedCheckEl.onchange = () => this.autoSaveNotificationSettings(true);
    }

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

    this.renderAlarmSettings();
  }

  renderAlarmSettings() {
    const alarm = this.data.alarmSettings || { ringOnStart: true, ringBeforeMinutes: 0, ringOnEnd: true, ringOnWakeup: true };
    const startEl = document.getElementById("alarm-ring-on-start");
    const beforeEl = document.getElementById("alarm-ring-before-minutes");
    const endEl = document.getElementById("alarm-ring-on-end");
    const wakeupEl = document.getElementById("alarm-ring-on-wakeup");

    if (startEl) {
      startEl.checked = alarm.ringOnStart !== false;
      startEl.onchange = () => this.autoSaveAlarmSettings(true);
    }
    if (beforeEl) {
      beforeEl.value = String(alarm.ringBeforeMinutes || 0);
      beforeEl.onchange = () => this.autoSaveAlarmSettings(true);
    }
    if (endEl) {
      endEl.checked = alarm.ringOnEnd !== false;
      endEl.onchange = () => this.autoSaveAlarmSettings(true);
    }
    if (wakeupEl) {
      wakeupEl.checked = alarm.ringOnWakeup !== false;
      wakeupEl.onchange = () => this.autoSaveAlarmSettings(true);
    }

    this.refreshDeviceStatus();
  }

  async refreshDeviceStatus() {
    const textEl = document.getElementById("alarm-device-status-text");
    const badgeEl = document.getElementById("alarm-device-status-badge");
    if (!textEl) return;

    try {
      const res = await fetch("/api/alarm/device-status");
      const data = await res.json();
      if (data && data.online) {
        textEl.textContent = `${data.device} • ONLINE • Baterai ${data.battery || '100%'}`;
        if (badgeEl) {
          badgeEl.className = "px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2";
        }
      } else {
        textEl.textContent = "Samsung Galaxy A10s • OFFLINE";
        if (badgeEl) {
          badgeEl.className = "px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-mono font-bold flex items-center gap-2";
        }
      }
    } catch (e) {
      textEl.textContent = "Status HP Tidak Terdeteksi";
      if (badgeEl) {
        badgeEl.className = "px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-2";
      }
    }
  }

  async autoSaveAlarmSettings(silent = true) {
    if (!this.data.alarmSettings) this.data.alarmSettings = {};
    const startEl = document.getElementById("alarm-ring-on-start");
    const beforeEl = document.getElementById("alarm-ring-before-minutes");
    const endEl = document.getElementById("alarm-ring-on-end");
    const wakeupEl = document.getElementById("alarm-ring-on-wakeup");

    this.data.alarmSettings.ringOnStart = startEl ? startEl.checked : true;
    this.data.alarmSettings.ringBeforeMinutes = beforeEl ? parseInt(beforeEl.value, 10) || 0 : 0;
    this.data.alarmSettings.ringOnEnd = endEl ? endEl.checked : true;
    this.data.alarmSettings.ringOnWakeup = wakeupEl ? wakeupEl.checked : true;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {}

    await this.pushToCloud();

    try {
      await fetch("/api/alarm/sync-phone", { method: "POST" });
    } catch (e) {}

    if (!silent) {
      this.showToast("Pengaturan Alarm Samsung A10s berhasil disimpan & disinkronkan!", "success");
    } else {
      this.showToast("Pengaturan alarm diperbarui & disinkronkan ke HP.", "info");
    }
  }

  async saveAlarmSettings() {
    await this.autoSaveAlarmSettings(false);
  }

  async testDeviceAlarm() {
    try {
      const res = await fetch("/api/alarm/trigger-test", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        this.showToast(data.message || "Sinyal tes alarm berhasil dikirim ke Samsung Galaxy A10s!", "success");
      } else {
        this.showToast("Gagal memicu alarm di HP: " + (data.error || "Perangkat tidak merespons"), "error");
      }
    } catch (e) {
      this.showToast("Error menghubungi backend alarm: " + e.message, "error");
    }
  }

  async syncPhoneAlarms() {
    try {
      // 1. Dorong dan pastikan seluruh jadwal terbaru di browser tersimpan ke Cloudflare D1
      await this.pushToCloud();

      const res = await fetch("/api/alarm/sync-phone", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        this.showToast(data.message || "Sinyal sinkronisasi berhasil dikirim ke Samsung Galaxy A10s!", "success");
        this.refreshDeviceStatus();
      } else {
        this.showToast("Gagal sinkronkan ke HP: " + (data.error || "Perangkat offline"), "error");
      }
    } catch (e) {
      this.showToast("Error sinkronisasi ke HP: " + e.message, "error");
    }
  }

  async autoSaveNotificationSettings(silent = true) {
    if (!this.data.notifications) this.data.notifications = {};
    const notif = this.data.notifications;
    const phoneEl = document.getElementById("notif-target-phone");
    const morningTimeEl = document.getElementById("notif-morning-time");
    const morningCheckEl = document.getElementById("notif-morning-enabled");
    const eveningTimeEl = document.getElementById("notif-evening-time");
    const eveningCheckEl = document.getElementById("notif-evening-enabled");
    const missedCheckEl = document.getElementById("notif-missed-enabled");

    if (!notif.morningBriefing) notif.morningBriefing = {};
    if (!notif.eveningRecap) notif.eveningRecap = {};
    if (!notif.missedTaskAlert) notif.missedTaskAlert = {};

    if (phoneEl) notif.targetPhone = phoneEl.value.replace(/[^0-9]/g, '');
    if (morningTimeEl) notif.morningBriefing.time = morningTimeEl.value;
    if (morningCheckEl) notif.morningBriefing.enabled = morningCheckEl.checked;
    if (eveningTimeEl) notif.eveningRecap.time = eveningTimeEl.value;
    if (eveningCheckEl) notif.eveningRecap.enabled = eveningCheckEl.checked;
    if (missedCheckEl) notif.missedTaskAlert.enabled = missedCheckEl.checked;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {}

    await this.pushToCloud();

    if (!silent) {
      this.showToast("Seluruh aturan notifikasi WhatsApp tersimpan & tersinkron ke database!", "success");
    } else {
      this.showToast("Pengaturan notifikasi diperbarui & tersinkron.", "info");
    }
  }

  async saveNotificationSettings() {
    await this.autoSaveNotificationSettings(false);
  }

  async sendTestNotification() {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const nowStr = new Date().toLocaleTimeString("id-ID");
    const message = 
`Halo Pak ${this.data.profile.name}, salam hangat!

Notifikasi asisten pribadi Bapak berhasil terhubung lancar pada pukul ${nowStr} WIB.
Mulai saat ini, pengingat jadwal kerja, briefing pagi, dan rekap malam akan kami sampaikan langsung ke nomor WhatsApp ini ya Pak.

Asisten siap membantu Bapak menjaga produktivitas setiap hari.

Salam hormat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Tes Notifikasi", false);
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
`Selamat pagi Pak ${this.data.profile.name}, semoga hari ini menyenangkan dan penuh berkah!

Berikut rangkuman jadwal agenda kerja Bapak untuk hari ini (${this.selectedDate}):

${taskLines}

Alhamdulillah seluruh waktu sudah teralokasi rapi dan bebas bentrok Pak (${m.total} agenda).
Asisten siap mendampingi dan mengingatkan setiap sesi kerja Bapak. Tetap semangat ya Pak Ilham!

Salam hormat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Briefing Pagi", false);
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
`Selamat malam Pak ${this.data.profile.name}, mohon izin menyampaikan rekap jadwal hari ini ya Pak.

Dari total ${m.total} agenda yang direncanakan:
[SELESAI] Berhasil diselesaikan: *${m.done} agenda* (${m.pct}%)
${m.cancelled > 0 ? `[BATAL] Dibatalkan: *${m.cancelled} agenda*\n` : ''}${m.total - m.done > 0 ? `[TODO] Belum dicoret: *${m.total - m.done} agenda*` : `Luar biasa Pak, seluruh agenda hari ini tuntas terselesaikan 100%!`}
${pendingLines}
${m.total - m.done > 0 ? `Bagi agenda yang sudah terlaksana, jangan lupa dicek dan dicoret sebelum jam 12.00 malam ya Pak agar rekap harian Bapak tercatat sempurna.\n` : ''}
Selamat beristirahat dengan tenang Pak Ilham, sampai jumpa di jadwal esok hari!

Salam hormat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, "Rekap Malam", false);
  }

  async sendTaskToWA(taskId) {
    const phone = this.data.notifications.targetPhone || "6288971071138";
    const task = this.data.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    const time1 = task.timeStart ? `${task.timeStart} - ${task.timeEnd} WIB` : 'Hari Ini';
    const time2 = task.hasSecondSession && task.session2Start ? ` dan sesi malam (${task.session2Start} - ${task.session2End} WIB)` : '';

    const message = 
`Halo Pak ${this.data.profile.name}, mohon izin mengingatkan jadwal ya Pak.

[AGENDA]: *${task.title}*
[WAKTU]: *${time1}*${time2}
${task.note ? `[CATATAN]: "${task.note}"\n` : ''}
Jangan sampai terlewat ya Pak. Semoga urusan dan kegiatannya berjalan lancar!
Jika sudah selesai nanti, silakan dicoret di dashboard web ya Pak.

Salam hangat,
*Aura Desk*`;

    await this.dispatchWAMessage(phone, message, `Pengingat: ${task.title}`, false);
  }

  async dispatchWAMessage(phone, message, label, silent = false) {
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

        if (!silent) {
          alert(`${label} berhasil dikirim ke WhatsApp (${targetPhone})!`);
        }
        if (this.activeTab === "notifications") this.renderNotificationsView();
      } else {
        throw new Error(data.error || "Gagal mengirim notifikasi");
      }
    } catch (err) {
      console.warn("Direct bot failed, fallback to Web WhatsApp:", err);
      if (!silent) {
        const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank");
        alert(`Pesan notifikasi dibuka langsung via WhatsApp.`);
      }
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
      this.updateHeaderDateDisplay();
      dateInput.addEventListener("change", (e) => {
        this.selectedDate = e.target.value;
        this.updateHeaderDateDisplay();
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
        this.updateHeaderDateDisplay();
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
        this.updateHeaderDateDisplay();
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
        this.updateHeaderDateDisplay();
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
        const labelSelect = document.getElementById("task-label-select");
        const label = labelSelect ? labelSelect.value : "";

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
          note,
          label
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
