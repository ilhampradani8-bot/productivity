/**
 * Executive Productivity & Notification Rules System
 * Google-Style Minimalist Architecture - Classic White Edition
 * Features:
 * - Chronological Auto-Sorting for Daily View
 * - Prominent High-Contrast Time Pillar on Task Cards
 * - 100% SVG Icons (Zero Unicode Emojis in UI)
 * - Clickable 24-Hour Time Map (Direct Set Start/End Time Snapped to 15m)
 * - Anti-Collision / Anti-Overlap validation ("Waktu Kosong")
 * - Interactive Radial Analog Clock Picker with smooth drag and Siang/Malam switch
 * - Support for 2 Time Sessions per day (Sesi Siang & Sesi Malam)
 * - Expiration & Recurrence rules (Daily, Weekdays, Weekly, Yearly, 1M, 1Y, 3Y, until completed)
 * - Zero Priorities, Zero Categories (Streamlined Executive Focus)
 * - WhatsApp Baileys Bot Gateway integration
 */

const ICONS = {
  sun: `<svg class="w-3.5 h-3.5 text-amber-500 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
  moon: `<svg class="w-3.5 h-3.5 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
  clock: `<svg class="w-3.5 h-3.5 text-slate-500 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  calendar: `<svg class="w-3.5 h-3.5 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  repeat: `<svg class="w-3 h-3 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
  checkCircle: `<svg class="w-4 h-4 text-emerald-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  alertTriangle: `<svg class="w-4 h-4 text-rose-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  save: `<svg class="w-4 h-4 text-white inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>`,
  edit: `<svg class="w-4 h-4 text-indigo-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`,
  trash: `<svg class="w-4 h-4 text-slate-400 hover:text-rose-600 inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`,
  wa: `<svg class="w-4 h-4 fill-current text-emerald-600 inline-block flex-shrink-0" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>`
};

const DEFAULT_SYSTEM_DATA = {
  profile: {
    name: "Ilham Pradani",
    role: "Founder & Tech Architect",
    secretaryName: "Aura Executive Desk"
  },
  notifications: {
    enabled: true,
    targetPhone: "6289691905347",
    morningBriefing: {
      enabled: true,
      time: "07:00"
    },
    eveningRecap: {
      enabled: true,
      time: "21:00"
    },
    logs: [
      { id: "log-1", time: "2026-11-26 08:00:00", type: "Gateway Connected", status: "Terkirim", phone: "6289691905347" }
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
  weeklyPlan: {
    weekTitle: "Minggu 48 (23 - 29 November 2026)",
    sprintGoal: "Menyelesaikan otomasi sistem jadwal 24 jam bebas bentrok, visual jam bulat putar, dan notifikasi WA",
    days: [
      { code: "mon", label: "Senin", date: "2026-11-23", focus: "Perencanaan Sprint Mingguan & Review Task UTM" },
      { code: "tue", label: "Selasa", date: "2026-11-24", focus: "Konfigurasi Cloudflare Tunnel vps-utm & Port Ingress" },
      { code: "wed", label: "Rabu", date: "2026-11-25", focus: "Eksekusi Sistem Jadwal Produktivitas Eksekutif & WhatsApp Gateway" },
      { code: "thu", label: "Kamis", date: "2026-11-26", focus: "Integrasi Domain productivity.ilhampradani.me & Testing WA" },
      { code: "fri", label: "Jumat", date: "2026-11-27", focus: "Audit Kode, Dokumentasi Open Source & Backup Data" },
      { code: "sat", label: "Sabtu", date: "2026-11-28", focus: "Review Mingguan, Self-Care & Olahraga Rutin" },
      { code: "sun", label: "Minggu", date: "2026-11-29", focus: "Refleksi Strategis & Penyusunan Prioritas Minggu 49" }
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
    this.storageKey = "sekretaris_produktivitas_fw_v5";
    this.data = this.loadData();
    this.activeTab = "daily";
    this.selectedDate = this.getTodayDateString();
    this.searchQuery = "";
    this.waBotOnline = false;
    this.isSpeaking = false;
    this.speechSynth = window.speechSynthesis || null;

    // Clock Picker State
    this.clockTargetInputId = null;
    this.clockHour = 9;
    this.clockMinute = 0;
    this.clockUnit = "hour"; // 'hour' or 'minute'
    this.clockPeriod = "day"; // 'day' (Siang: 12-23) or 'night' (Malam: 00-11)
    this.isClockDragging = false;
    this.editingTaskId = null;

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
    } catch (e) {
      console.error("Gagal menyimpan ke localStorage:", e);
    }
  }

  init() {
    this.startClock();
    this.bindEvents();
    this.bindClockEvents();
    this.initTaskDate();
    this.initValidityPreset();
    this.render();
    this.checkTimeCollision();
  }

  initTaskDate() {
    const input = document.getElementById("task-target-date");
    if (input) {
      input.value = this.selectedDate || this.getTodayDateString();
      this.onTaskDateChange();
    }
  }

  setTaskDatePreset(preset) {
    const now = new Date();
    let d = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (preset === "today") {
      // today
    } else if (preset === "tomorrow") {
      d.setDate(d.getDate() + 1);
    } else if (preset === "next_monday") {
      const day = d.getDay(); // 0 is Sun, 1 is Mon
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
    
    // Snap ke kelipatan 15 menit terdekat
    let snappedStart = Math.round(rawMins / 15) * 15;
    if (snappedStart >= 1440) snappedStart = 1425;
    
    // Durasi default 60 menit atau sampai batas 23:59
    let snappedEnd = Math.min(1439, snappedStart + 60);
    if (snappedEnd <= snappedStart) snappedEnd = 1439;

    const s1StartEl = document.getElementById("task-start-time");
    const s1EndEl = document.getElementById("task-end-time");
    const toggleS2 = document.getElementById("toggle-session2");
    const s2StartEl = document.getElementById("task-session2-start");
    const s2EndEl = document.getElementById("task-session2-end");

    const hasS2 = toggleS2 && toggleS2.checked;
    const s1End = s1EndEl ? this.timeToMinutes(s1EndEl.value) : 600;

    // Jika Sesi 2 dicentang dan klik dilakukan di waktu malam setelah Sesi 1, isi Sesi 2
    if (hasS2 && snappedStart >= s1End && s2StartEl && s2EndEl) {
      s2StartEl.value = this.minutesToTime(snappedStart);
      s2EndEl.value = this.minutesToTime(snappedEnd);
    } else if (s1StartEl && s1EndEl) {
      s1StartEl.value = this.minutesToTime(snappedStart);
      s1EndEl.value = this.minutesToTime(snappedEnd);
    }

    this.checkTimeCollision();
  }

  // Mengambil seluruh agenda yang berlaku untuk tanggal tertentu
  getTasksForDate(targetDate) {
    return this.data.dailyTasks.filter(task => {
      // Jika pernah dihapus untuk tanggal ini
      if (task.deletedDates && task.deletedDates.includes(targetDate)) return false;

      // Single Task
      if (!task.recurrence || task.recurrence === "none") {
        return task.date === targetDate;
      }

      // Daily Task
      if (task.recurrence === "daily") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        return true;
      }

      // Weekdays (Senin - Jumat)
      if (task.recurrence === "weekdays") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const parts = targetDate.split("-");
        const dow = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        return dow >= 1 && dow <= 5;
      }

      // Weekly on specific day
      if (task.recurrence === "weekly_day") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        const p1 = targetDate.split("-");
        const p2 = task.date.split("-");
        const dow1 = new Date(parseInt(p1[0], 10), parseInt(p1[1], 10) - 1, parseInt(p1[2], 10)).getDay();
        const dow2 = new Date(parseInt(p2[0], 10), parseInt(p2[1], 10) - 1, parseInt(p2[2], 10)).getDay();
        return dow1 === dow2;
      }

      // Yearly Task
      if (task.recurrence === "yearly") {
        if (targetDate < task.date) return false;
        if (task.validUntil && targetDate > task.validUntil) return false;
        return targetDate.slice(5) === task.date.slice(5);
      }

      return false;
    }).map(task => {
      let isDone = task.status === "done";
      if (task.recurrence && task.recurrence !== "none") {
        isDone = task.completedDates && task.completedDates.includes(targetDate);
      }
      return { ...task, isDone };
    });
  }

  // Mendapatkan slot waktu yang sudah terisi di hari ini
  getOccupiedIntervals(targetDate, excludeTaskId = null) {
    const tasks = this.getTasksForDate(targetDate).filter(t => t.id !== excludeTaskId);
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

  // Validasi tabrakan waktu 24 jam & render timeline visual
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

    // Cek durasi valid Sesi 1
    if (s1End <= s1Start) {
      conflict = { msg: "Jam selesai Sesi 1 harus lebih besar dari jam mulai!" };
    }

    // Cek tabrakan Sesi 1 dengan agenda lain
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

    // Cek Sesi 2 jika aktif
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

    // Update UI status dengan SVG
    if (conflict) {
      if (badgeEl) {
        badgeEl.innerHTML = `${ICONS.alertTriangle} <span>Ada Bentrok Waktu!</span>`;
        badgeEl.className = "font-bold text-rose-700 flex items-center gap-1.5";
      }
      if (warnBox && warnText) {
        warnBox.classList.remove("hidden");
        warnText.textContent = conflict.msg;
      }
      if (submitBtn) submitBtn.disabled = true;
    } else {
      if (badgeEl) {
        badgeEl.innerHTML = `${ICONS.checkCircle} <span>Slot Waktu Bebas & Aman (Tidak Menimpa Work)</span>`;
        badgeEl.className = "font-bold text-emerald-700 flex items-center gap-1.5";
      }
      if (warnBox) warnBox.classList.add("hidden");
      if (submitBtn) submitBtn.disabled = false;
    }

    // Render Visual Timeline Bar 24 Jam
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

  // Otomatis memilih slot waktu kosong terdekat yang mencukupi
  pickNextFreeSlot(requestedDurationMinutes = 60) {
    const targetDateInput = document.getElementById("task-target-date");
    const targetDate = (targetDateInput && targetDateInput.value) || this.selectedDate;
    const occupied = this.getOccupiedIntervals(targetDate, this.editingTaskId);
    let pointer = 480; // 08:00
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
      pointer = 360; // 06:00
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
      this.clockPeriod = "day"; // Siang
      this.clockHour = h24 === 12 ? 12 : h24 - 12;
    } else {
      this.clockPeriod = "night"; // Malam
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

    const radius = 90;
    const centerX = 125;
    const centerY = 125;
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

  handleRecurrenceChange() {
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
    const total = tasks.length;
    const done = tasks.filter(t => t.isDone).length;
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

    return { total, done, pct, pct5Y };
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
  }

  render() {
    this.updateSidebarBriefing();
    if (this.activeTab === "daily") this.renderDailyView();
    else if (this.activeTab === "weekly") this.renderWeeklyView();
    else if (this.activeTab === "monthly") this.renderMonthlyView();
    else if (this.activeTab === "roadmap") this.renderRoadmapView();
    else if (this.activeTab === "notifications") this.renderNotificationsView();
  }

  // ===================== DAILY VIEW: STRICT CHRONOLOGICAL SORTING & PROMINENT TIME PILLAR =====================
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
      const dur1 = this.formatDuration(task.timeStart, task.timeEnd);
      const dur2 = task.hasSecondSession ? this.formatDuration(task.session2Start, task.session2End) : "";

      let recurrenceBadge = "";
      if (task.recurrence === "daily") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">${ICONS.repeat} <span>Tiap Hari ${task.validUntil ? 's/d ' + task.validUntil : ''}</span></span>`;
      } else if (task.recurrence === "weekdays") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">${ICONS.repeat} <span>Senin - Jumat (Hari Kerja)</span></span>`;
      } else if (task.recurrence === "weekly_day") {
        const parts = (task.date || this.selectedDate).split("-");
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${ICONS.repeat} <span>Setiap ${days[d.getDay()]}</span></span>`;
      } else if (task.recurrence === "yearly") {
        recurrenceBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200">${ICONS.repeat} <span>Tiap Tahun</span></span>`;
      }

      return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${
          isDone ? "bg-slate-50/70 border-slate-200 opacity-60" : "bg-white hover:bg-slate-50/50 border-slate-200 shadow-sm"
        }">
          <div class="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
            <!-- Checkbox -->
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="window.app.toggleTask('${task.id}', '${this.selectedDate}')" class="custom-checkbox flex-shrink-0 mt-1 sm:mt-0">
            
            <!-- PROMINENT TIME PILLAR (BAGIAN JAM LEBIH DIPERJELAS) -->
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
              </div>

              <h4 class="text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'} break-words">
                ${this.escapeHtml(task.title)}
              </h4>
              
              ${task.note ? `<p class="text-xs text-slate-600 mt-1 break-words leading-relaxed">${this.escapeHtml(task.note)}</p>` : ''}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
            <button onclick="window.app.editTask('${task.id}')" title="Edit Agenda Ini" class="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-indigo-200">
              ${ICONS.edit}
            </button>
            <button onclick="window.app.sendTaskToWA('${task.id}')" title="Kirim Pengingat Tugas ini ke WhatsApp" class="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-emerald-200">
              ${ICONS.wa}
            </button>
            <button onclick="window.app.deleteTask('${task.id}', '${this.selectedDate}')" title="Hapus Tugas" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-200">
              ${ICONS.trash}
            </button>
          </div>
        </div>
      `;
    }).join("");
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

    if (recEl) recEl.value = task.recurrence || "none";
    if (presetEl) presetEl.value = task.validityType || "until_completed";
    if (untilEl) untilEl.value = task.validUntil || "";
    if (noteEl) noteEl.value = task.note || "";

    if (submitTextEl) {
      submitTextEl.innerHTML = `${ICONS.save} <span>Simpan Perubahan Agenda</span>`;
    }
    if (cancelBtn) cancelBtn.classList.remove("hidden");

    this.checkTimeCollision();
    window.scrollTo({ top: 100, behavior: "smooth" });
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

    this.toggleSession2UI();
    this.initValidityPreset();
    this.checkTimeCollision();
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
      const choice = confirm(`Agenda "${task.title}" berulang (${task.recurrence === 'daily' ? 'Setiap Hari' : 'Setiap Minggu/Tahun'}).\n\nKlik OK untuk Hapus Hanya Hari Ini (${targetDate}).\nKlik CANCEL untuk opsi hapus permanen.`);
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

  // ===================== WEEKLY, MONTHLY, ROADMAP VIEWS =====================
  renderWeeklyView() {
    const grid = document.getElementById("weekly-grid-container");
    if (!grid) return;

    grid.innerHTML = this.data.weeklyPlan.days.map(day => {
      const isSelected = day.date === this.selectedDate;
      const tasks = this.getTasksForDate(day.date);
      const total = tasks.length;
      const done = tasks.filter(t => t.isDone).length;

      return `
        <div class="rounded-2xl border p-4 transition-all ${
          isSelected ? "bg-indigo-50/60 border-indigo-500 ring-1 ring-indigo-500 shadow-sm" : "bg-white border-slate-200 shadow-sm"
        }">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">${day.label}</span>
              <p class="text-sm font-bold text-slate-900 font-mono">${day.date.split("-").slice(1).join("/")}</p>
            </div>
            <button onclick="window.app.selectDateAndJump('${day.date}')" class="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 transition-colors cursor-pointer border border-slate-200">
              Buka
            </button>
          </div>
          <p class="text-xs text-indigo-700 font-medium mb-3 p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 line-clamp-2">
            ${this.escapeHtml(day.focus)}
          </p>
          <div class="space-y-1.5 min-h-[75px]">
            ${tasks.slice(0, 3).map(t => `
              <div class="text-xs truncate ${t.isDone ? 'line-through text-slate-400' : 'text-slate-700'}">
                • ${t.timeStart ? `[${t.timeStart}] ` : ''}${this.escapeHtml(t.title)}
              </div>
            `).join("")}
            ${total > 3 ? `<p class="text-[10px] text-slate-400 font-mono">+${total - 3} lainnya</p>` : ''}
            ${total === 0 ? `<p class="text-xs text-slate-400 italic">Slot kosong 24 jam</p>` : ''}
          </div>
          <div class="mt-3 pt-2 border-t border-slate-200 flex justify-between text-xs text-slate-600 font-mono">
            <span>${done}/${total} Selesai</span>
            <span class="font-bold text-indigo-700">${total > 0 ? Math.round((done / total) * 100) : 0}%</span>
          </div>
        </div>
      `;
    }).join("");
  }

  selectDateAndJump(dateStr) {
    this.selectedDate = dateStr;
    const dateInput = document.getElementById("date-input");
    if (dateInput) dateInput.value = dateStr;
    this.switchTab("daily");
  }

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
        <div class="bg-white border border-slate-200 rounded-2xl p-5 mb-5 shadow-sm">
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
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
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
    const logListEl = document.getElementById("notif-log-container");

    if (phoneEl) phoneEl.value = notif.targetPhone || "6289691905347";
    if (morningTimeEl) morningTimeEl.value = notif.morningBriefing.time || "07:00";
    if (morningCheckEl) morningCheckEl.checked = !!notif.morningBriefing.enabled;
    if (eveningTimeEl) eveningTimeEl.value = notif.eveningRecap.time || "21:00";
    if (eveningCheckEl) eveningCheckEl.checked = !!notif.eveningRecap.enabled;

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

    if (phoneEl) notif.targetPhone = phoneEl.value.replace(/[^0-9]/g, '');
    if (morningTimeEl) notif.morningBriefing.time = morningTimeEl.value;
    if (morningCheckEl) notif.morningBriefing.enabled = morningCheckEl.checked;
    if (eveningTimeEl) notif.eveningRecap.time = eveningTimeEl.value;
    if (eveningCheckEl) notif.eveningRecap.enabled = eveningCheckEl.checked;

    this.saveData();
    alert("Seluruh aturan notifikasi WhatsApp berhasil disimpan!");
  }

  async sendTestNotification() {
    const phone = this.data.notifications.targetPhone || "6289691905347";
    const nowStr = new Date().toLocaleTimeString("id-ID");
    const message = 
`*[UJI COBA NOTIFIKASI SEKERTARIS]*
Halo Pak ${this.data.profile.name}, sistem notifikasi WhatsApp berhasil terhubung pada pukul ${nowStr} WIB.
Gateway bot lokal di UTM aktif dan siap mengirimkan jadwal rutin Anda.
*Aura Executive Desk*`;

    await this.dispatchWAMessage(phone, message, "Tes Notifikasi");
  }

  async sendDailyBriefingToWA() {
    const phone = this.data.notifications.targetPhone || "6289691905347";
    const tasks = this.getTasksForDate(this.selectedDate);
    const m = this.getMetrics();

    let taskLines = "";
    if (tasks.length === 0) {
      taskLines = "_Belum ada agenda tercatat._\n";
    } else {
      taskLines = tasks.map((t, idx) => {
        const status = t.isDone ? "[SELESAI]" : "[TODO]";
        const time1 = t.timeStart ? `[${t.timeStart} - ${t.timeEnd}] ` : "";
        const time2 = t.hasSecondSession && t.session2Start ? ` [Malam: ${t.session2Start} - ${t.session2End}]` : "";
        return `${status} ${idx + 1}. ${time1}${t.title}${time2}`;
      }).join("\n");
    }

    const message = 
`*BRIEFING PRODUKTIVITAS EKSEKUTIF*
*Untuk:* Pak ${this.data.profile.name}
*Tanggal:* ${this.selectedDate}

*RINGKASAN STATUS 24 JAM:*
• Total Agenda: ${m.total}
• Selesai: ${m.done} (${m.pct}%)
• Progress Roadmap 5 Tahun: ${m.pct5Y}%

*DAFTAR AGENDA KERJA (BEBAS BENTROK):*
${taskLines}

*FOKUS STRATEGIS 5Y:*
Infrastruktur & Automasi Ekosistem Mandiri

_"Waktu teralokasi bersih tanpa tabrakan. Tetap fokus dan jaga momentum!"_
*Aura Executive Secretary*`;

    await this.dispatchWAMessage(phone, message, "Briefing Harian");
  }

  async sendTaskToWA(taskId) {
    const phone = this.data.notifications.targetPhone || "6289691905347";
    const task = this.data.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    const time1 = task.timeStart ? `${task.timeStart} - ${task.timeEnd} WIB` : 'Hari Ini';
    const time2 = task.hasSecondSession && task.session2Start ? `\n*Sesi Malam:* ${task.session2Start} - ${task.session2End} WIB` : '';
    const recStr = task.recurrence === 'daily' ? `\n*Perulangan:* Setiap Hari ${task.validUntil ? '(s/d ' + task.validUntil + ')' : ''}` : '';

    const message = 
`*PENGINGAT AGENDA EKSEKUTIF*
*Tugas:* ${task.title}
*Waktu Utama:* ${time1}${time2}${recStr}
${task.note ? `*Catatan:* ${task.note}\n` : ''}
*Aura Executive Desk*`;

    await this.dispatchWAMessage(phone, message, `Pengingat: ${task.title}`);
  }

  async dispatchWAMessage(phone, message, label) {
    try {
      const res = await fetch("/api/send-wa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, message })
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
          phone
        });
        if (this.data.notifications.logs.length > 20) this.data.notifications.logs.pop();
        this.saveData();

        alert(`${label} berhasil dikirim ke WhatsApp (${phone}) via Bot Server!`);
        if (this.activeTab === "notifications") this.renderNotificationsView();
      } else {
        throw new Error(data.error || "Gagal mengirim via bot");
      }
    } catch (err) {
      console.warn("Fallback to Web WhatsApp:", err);
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
      alert(`Bot lokal offline/terkendala. Pesan dibuka langsung via WhatsApp Web.`);
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
        const recurrence = document.getElementById("task-recurrence") ? document.getElementById("task-recurrence").value : "none";
        const validityPreset = document.getElementById("task-validity-preset") ? document.getElementById("task-validity-preset").value : "until_completed";
        const validUntil = document.getElementById("task-valid-until") ? document.getElementById("task-valid-until").value : "";
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
