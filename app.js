/**
 * Executive Productivity & WhatsApp Notification Center
 * Full-Width & Minimalist Engine
 * Client-Side Controller
 */

const DEFAULT_SYSTEM_DATA = {
  profile: {
    name: "Ilham Pradani",
    role: "Founder & Tech Architect",
    secretaryName: "Aura Executive Desk",
    targetPhone: "6289691905347" // Nomor WhatsApp default
  },
  fiveYearPlan: [
    {
      id: "y1-2026",
      year: 2026,
      title: "Tahun 1: Konsolidasi Infrastruktur, AI Telemetri & Skalabilitas",
      theme: "Infrastruktur & Ekosistem Mandiri",
      targetRevenue: "Stabilisasi & Bootstrap Sistem",
      overallProgress: 68,
      quarters: [
        {
          id: "y1-q1",
          quarter: "Q1 2026",
          focus: "Migrasi & Stabilisasi Host UTM & Serverless Edge",
          status: "completed",
          progress: 100,
          steps: [
            { id: "s101", title: "Setup Workstation UTM 64GB RAM & Cloudflare Tunnel", done: true, priority: "high", note: "Tunnel vps-utm & SSH passwordless aktif" },
            { id: "s102", title: "Migrasi logger Telegram ke Serverless Cloudflare Edge", done: true, priority: "high", note: "Edge D1 persistence 100% online" },
            { id: "s103", title: "Pembersihan daemon VPS & sinkronisasi dual-push Git", done: true, priority: "medium", note: "Repositori terpusat di UTM" }
          ]
        },
        {
          id: "y1-q2",
          quarter: "Q2 2026",
          focus: "Pengembangan AI Trade & Engine Model Pembelajaran",
          status: "completed",
          progress: 100,
          steps: [
            { id: "s104", title: "Riset arsitektur ensemble ML (LightGBM + XGBoost + CatBoost)", done: true, priority: "high", note: "Pengujian baseline selesai" },
            { id: "s105", title: "Integrasi telemetri sinyal ke bot WhatsApp", done: true, priority: "high", note: "Notifikasi real-time terhubung" },
            { id: "s106", title: "Protokol keamanan disk NVMe (SSD Preservation)", done: true, priority: "medium", note: "Ramdisk & native execution dikonfigurasi" }
          ]
        },
        {
          id: "y1-q3",
          quarter: "Q3 2026",
          focus: "Ekosistem Web & Platform SirkelHub & MallDigital",
          status: "completed",
          progress: 100,
          steps: [
            { id: "s107", title: "Arsitektur UI solid & integrasi DOKU Production API", done: true, priority: "high", note: "Payment gateway live" },
            { id: "s108", title: "Pemisahan peran WhatsApp Bot Toko Reimal vs Asisten CPNS", done: true, priority: "high", note: "Group Shield isolasi 100% aktif" }
          ]
        },
        {
          id: "y1-q4",
          quarter: "Q4 2026",
          focus: "Eksekusi Sistem Produktivitas Eksekutif & Review Tahunan",
          status: "in_progress",
          progress: 75,
          steps: [
            { id: "s109", title: "Peluncuran dashboard Sekretaris Pribadi productivity.ilhampradani.me", done: true, priority: "high", note: "Aplikasi live & terintegrasi Cloudflare Tunnel" },
            { id: "s110", title: "Integrasi gateway notifikasi WhatsApp 24/7", done: true, priority: "high", note: "Panggilan pesan bot langsung" },
            { id: "s111", title: "Finalisasi rencana strategis tahun 2027", done: false, priority: "medium", note: "Penyusunan target kuartal 2027" }
          ]
        }
      ]
    },
    {
      id: "y2-2027",
      year: 2027,
      title: "Tahun 2: Ekspansi Komersial & Otomasi AI Skala Menengah",
      theme: "Komersialisasi & Efisiensi Operasional",
      targetRevenue: "Pertumbuhan Revenue 3x Lipat",
      overallProgress: 15,
      quarters: [
        {
          id: "y2-q1",
          quarter: "Q1 2027",
          focus: "Otomasi Penjualan & Sistem Pelanggan SaaS",
          status: "pending",
          progress: 25,
          steps: [
            { id: "s201", title: "Rilis platform API terkelola untuk klien eksternal", done: false, priority: "high", note: "Sistem billing otomatis" },
            { id: "s202", title: "Retraining otomatis model AI mingguan", done: true, priority: "high", note: "Backtest verification" }
          ]
        },
        {
          id: "y2-q2",
          quarter: "Q2 2027",
          focus: "Skalabilitas Multi-Tenant Cloud & Mobile Apps",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s203", title: "Rilis aplikasi mobile dashboard eksekutif", done: false, priority: "medium", note: "Notifikasi push langsung" }
          ]
        }
      ]
    },
    {
      id: "y3-2028",
      year: 2028,
      title: "Tahun 3: Diversifikasi Ekosistem & Pematangan Produk Korporat",
      theme: "Otonomi & Standar Industri",
      targetRevenue: "Kemandirian Modal Penuh",
      overallProgress: 0,
      quarters: [
        {
          id: "y3-q1",
          quarter: "Sepanjang 2028",
          focus: "Solusi AI Enterprise & Pembentukan Holding Unit Digital",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s301", title: "Peluncuran suite automasi proses bisnis cerdas", done: false, priority: "high", note: "Segmen korporat" }
          ]
        }
      ]
    },
    {
      id: "y4-2029",
      year: 2029,
      title: "Tahun 4: Skala Regional & Kepemimpinan Pasar",
      theme: "Pengaruh Regional & Ekosistem Terdistribusi",
      targetRevenue: "Portofolio Multi-Sektor",
      overallProgress: 0,
      quarters: [
        {
          id: "y4-q1",
          quarter: "Sepanjang 2029",
          focus: "Deployment Node Edge Global & Laboratorium Riset Mandiri",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s401", title: "Deployment node edge global multi-region sub-5ms", done: false, priority: "high", note: "Jaringan regional" }
          ]
        }
      ]
    },
    {
      id: "y5-2030",
      year: 2030,
      title: "Tahun 5: Kebebasan Finansial Penuh, Warisan Ekosistem & Legacy",
      theme: "Keberlanjutan & Kebebasan Waktu Eksekutif",
      targetRevenue: "Aset Mandiri Berkelanjutan",
      overallProgress: 0,
      quarters: [
        {
          id: "y5-q1",
          quarter: "Sepanjang 2030",
          focus: "Sistem Operasional Berjalan 100% Otonom & Fokus Riset Masa Depan",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s501", title: "Operasional mandiri tanpa intervensi harian", done: false, priority: "high", note: "Sistem otonom mandiri" }
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
      { id: "m1", title: "Deployment Sistem Produktivitas Eksekutif Full-Width & Gateway WA", targetDate: "2026-11-26", done: true, priority: "high" },
      { id: "m2", title: "Audit Stabilitas Tunnel Cloudflare & Serverless Logger Edge", targetDate: "2026-11-28", done: true, priority: "high" },
      { id: "m3", title: "Uji Evaluasi Metrik AI Trade & Konsistensi Sinyal", targetDate: "2026-11-29", done: false, priority: "medium" },
      { id: "m4", title: "Review Finansial Akhir Bulan & Alokasi Q1 2027", targetDate: "2026-11-30", done: false, priority: "high" }
    ]
  },
  weeklyPlan: {
    weekTitle: "Minggu 48 (23 - 29 November 2026)",
    sprintGoal: "Menyelesaikan otomasi sistem jadwal terpadu, verifikasi gateway WhatsApp, dan evaluasi hasil training model",
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
      date: "2026-11-25",
      time: "07:30",
      title: "Executive Morning Routine & Review Agenda Harian",
      category: "routine",
      priority: "high",
      status: "done",
      note: "Briefing mandiri & penetapan fokus non-negotiables",
      linked5Y: "Y1 - Q4"
    },
    {
      id: "t-2",
      date: "2026-11-25",
      time: "09:00",
      title: "Pemeriksaan Telemetri Workstation UTM & Health Check Proxy",
      category: "workstation",
      priority: "high",
      status: "done",
      note: "Verifikasi kestabilan usque proxy & memory footprint",
      linked5Y: "Y1 - Q1"
    },
    {
      id: "t-3",
      date: "2026-11-25",
      time: "11:00",
      title: "Rancang & Bangun Arsitektur Web Produktivitas Full-Width",
      category: "development",
      priority: "high",
      status: "done",
      note: "Desain minimalis fluid & integrasi notifikasi WA",
      linked5Y: "Y1 - Q4"
    },
    {
      id: "t-4",
      date: "2026-11-25",
      time: "14:30",
      title: "Konfigurasi Gateway WhatsApp Notification & Port Ingress 3080",
      category: "devops",
      priority: "high",
      status: "done",
      note: "Hubungkan API bot WhatsApp port 3055 ke dashboard",
      linked5Y: "Y1 - Q4"
    },
    {
      id: "t-5",
      date: "2026-11-25",
      time: "17:00",
      title: "Sesi Pembelajaran Mandiri & Review Materi Teknis",
      category: "learning",
      priority: "medium",
      status: "todo",
      note: "Baca modul materi strategis 45 menit",
      linked5Y: "Self-Improvement"
    },
    {
      id: "t-6",
      date: "2026-11-25",
      time: "20:30",
      title: "Refleksi Malam & Rekap Capaian Hari Ini",
      category: "routine",
      priority: "medium",
      status: "todo",
      note: "Update status checklist & kirim ringkasan ke WA",
      linked5Y: "Habit"
    }
  ]
};

class ProductivityApp {
  constructor() {
    this.storageKey = "sekretaris_produktivitas_fw_v2";
    this.data = this.loadData();
    this.activeTab = "daily"; // 'daily', 'weekly', 'monthly', 'roadmap', 'analytics'
    this.selectedDate = this.getTodayDateString();
    this.selectedCategory = "all";
    this.selectedPriority = "all";
    this.searchQuery = "";
    this.waBotOnline = false;
    this.isSpeaking = false;
    this.speechSynth = window.speechSynthesis || null;

    this.init();
  }

  getTodayDateString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_SYSTEM_DATA, ...parsed };
      }
    } catch (e) {
      console.warn("Using default data", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SYSTEM_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      this.updateSidebarBriefing();
    } catch (e) {
      console.error("Gagal simpan data", e);
    }
  }

  init() {
    this.bindEvents();
    this.startClock();
    this.checkWABotStatus();
    this.render();

    // Cek status WA bot secara berkala
    setInterval(() => this.checkWABotStatus(), 15000);
  }

  startClock() {
    const clockEl = document.getElementById("header-clock");
    const dateEl = document.getElementById("header-date");
    const update = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const dateStr = now.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      if (clockEl) clockEl.textContent = `${timeStr} WIB`;
      if (dateEl) dateEl.textContent = dateStr;
    };
    update();
    setInterval(update, 1000);
  }

  async checkWABotStatus() {
    const badgeEl = document.getElementById("wa-bot-badge");
    const badgeTextEl = document.getElementById("wa-bot-badge-text");
    try {
      const res = await fetch("/api/wa-status", { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      this.waBotOnline = data.online && data.botData?.status === "Terhubung";
      
      if (this.waBotOnline) {
        if (badgeEl) {
          badgeEl.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-xs font-mono";
        }
        if (badgeTextEl) badgeTextEl.textContent = "WA Bot Aktif (6289691905347)";
      } else {
        if (badgeEl) {
          badgeEl.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-800/80 text-amber-300 text-xs font-mono";
        }
        if (badgeTextEl) badgeTextEl.textContent = "WA Mode Web Direct";
      }
    } catch (e) {
      this.waBotOnline = false;
      if (badgeEl) {
        badgeEl.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono";
      }
      if (badgeTextEl) badgeTextEl.textContent = "WA Mode Web Direct";
    }
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll(".tab-pill").forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add("bg-indigo-600", "text-white");
        btn.classList.remove("text-slate-400", "hover:text-slate-200");
      } else {
        btn.classList.remove("bg-indigo-600", "text-white");
        btn.classList.add("text-slate-400", "hover:text-slate-200");
      }
    });

    document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));
    const activeSec = document.getElementById(`view-${tabName}`);
    if (activeSec) activeSec.classList.remove("hidden");

    this.render();
  }

  getMetrics() {
    const today = this.selectedDate;
    const tasks = this.data.dailyTasks.filter(t => t.date === today);
    const total = tasks.length;
    const done = tasks.filter(t => t.status === "done").length;
    const high = tasks.filter(t => t.status !== "done" && t.priority === "high").length;
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

    return { total, done, high, pct, pct5Y };
  }

  updateSidebarBriefing() {
    const m = this.getMetrics();
    const pctEl = document.getElementById("stat-daily-pct");
    const highEl = document.getElementById("stat-daily-high");
    const pct5YEl = document.getElementById("stat-5y-pct");
    const greetEl = document.getElementById("sidebar-greeting");
    const descEl = document.getElementById("sidebar-desc");

    if (pctEl) pctEl.textContent = `${m.pct}%`;
    if (highEl) highEl.textContent = `${m.high}`;
    if (pct5YEl) pct5YEl.textContent = `${m.pct5Y}%`;

    const hour = new Date().getHours();
    let greet = "Selamat Malam";
    if (hour >= 4 && hour < 11) greet = "Selamat Pagi";
    else if (hour >= 11 && hour < 15) greet = "Selamat Siang";
    else if (hour >= 15 && hour < 18) greet = "Selamat Sore";

    if (greetEl) greetEl.textContent = `${greet}, Pak ${this.data.profile.name}!`;
    if (descEl) {
      if (m.total === 0) {
        descEl.textContent = "Belum ada agenda tercatat untuk tanggal ini. Mulai dengan menambah tugas baru.";
      } else if (m.high > 0) {
        descEl.textContent = `Ada ${m.high} tugas prioritas tinggi yang memerlukan atensi utama Anda hari ini.`;
      } else if (m.pct === 100) {
        descEl.textContent = `Semua ${m.total} agenda hari ini telah selesai sempurna. Kerja bagus!`;
      } else {
        descEl.textContent = `Progress harian berjalan lancar (${m.pct}% selesai).`;
      }
    }
  }

  render() {
    this.updateSidebarBriefing();
    if (this.activeTab === "daily") this.renderDailyView();
    else if (this.activeTab === "weekly") this.renderWeeklyView();
    else if (this.activeTab === "monthly") this.renderMonthlyView();
    else if (this.activeTab === "roadmap") this.renderRoadmapView();
    else if (this.activeTab === "analytics") this.renderAnalyticsView();
  }

  // ===================== DAILY VIEW =====================
  renderDailyView() {
    const list = document.getElementById("daily-task-container");
    if (!list) return;

    let tasks = this.data.dailyTasks.filter(t => t.date === this.selectedDate);

    if (this.selectedCategory !== "all") {
      tasks = tasks.filter(t => t.category === this.selectedCategory);
    }
    if (this.selectedPriority !== "all") {
      tasks = tasks.filter(t => t.priority === this.selectedPriority);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || (t.note && t.note.toLowerCase().includes(q)));
    }

    // Sort: priority high first, then time
    tasks.sort((a, b) => {
      const p = { high: 1, medium: 2, low: 3 };
      const diff = (p[a.priority] || 2) - (p[b.priority] || 2);
      if (diff !== 0) return diff;
      return (a.time || "99:99").localeCompare(b.time || "99:99");
    });

    if (tasks.length === 0) {
      list.innerHTML = `
        <div class="p-8 text-center bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
          <p class="text-sm text-slate-400">Tidak ada agenda pada tanggal ini.</p>
          <p class="text-xs text-slate-600 mt-1">Gunakan form di atas untuk menambah agenda cepat.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = tasks.map(task => {
      const isDone = task.status === "done";
      const priorityLabel = task.priority === "high" ? "TINGGI" : task.priority === "medium" ? "SEDANG" : "RENDAH";
      const priorityColor = task.priority === "high" 
        ? "text-rose-400 bg-rose-950/50 border-rose-800/40" 
        : task.priority === "medium" 
          ? "text-amber-400 bg-amber-950/50 border-amber-800/40" 
          : "text-slate-400 bg-slate-800/50 border-slate-700/40";

      return `
        <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
          isDone ? "bg-slate-950/40 border-slate-900 opacity-60" : "bg-slate-900/70 hover:bg-slate-900 border-slate-800/80"
        }">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="app.toggleTask('${task.id}')" class="custom-checkbox flex-shrink-0">
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                ${task.time ? `<span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-semibold">${task.time}</span>` : ''}
                <span class="text-[10px] font-bold px-2 py-0.5 rounded border ${priorityColor} font-mono">${priorityLabel}</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">${this.getCategoryLabel(task.category)}</span>
                ${task.linked5Y ? `<span class="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 font-mono">🎯 5Y: ${task.linked5Y}</span>` : ''}
              </div>
              <p class="text-sm font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-100'} break-words">
                ${this.escapeHtml(task.title)}
              </p>
              ${task.note ? `<p class="text-xs text-slate-400 mt-0.5 break-words">${this.escapeHtml(task.note)}</p>` : ''}
            </div>
          </div>

          <!-- Action buttons: Kirim WA & Hapus -->
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button onclick="app.sendTaskToWA('${task.id}')" title="Kirim Pengingat Tugas ini ke WhatsApp" class="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-800/80 text-xs font-medium flex items-center gap-1 transition-colors">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
              </svg>
              <span class="hidden sm:inline">Kirim</span> WA
            </button>
            <button onclick="app.deleteTask('${task.id}')" title="Hapus Tugas" class="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  getCategoryLabel(c) {
    const map = {
      routine: "Rutin",
      workstation: "UTM Hub",
      development: "Coding & AI",
      devops: "DevOps",
      business: "Bisnis",
      learning: "Belajar",
      health: "Kesehatan"
    };
    return map[c] || c || "Umum";
  }

  // ===================== WEEKLY VIEW =====================
  renderWeeklyView() {
    const grid = document.getElementById("weekly-grid-container");
    if (!grid) return;

    grid.innerHTML = this.data.weeklyPlan.days.map(day => {
      const isSelected = day.date === this.selectedDate;
      const tasks = this.data.dailyTasks.filter(t => t.date === day.date);
      const total = tasks.length;
      const done = tasks.filter(t => t.status === "done").length;

      return `
        <div class="rounded-xl border p-4 transition-all ${
          isSelected ? "bg-slate-900 border-indigo-500 ring-1 ring-indigo-500" : "bg-slate-900/60 border-slate-800"
        }">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">${day.label}</span>
              <p class="text-sm font-bold text-white">${day.date.split("-").slice(1).join("/")}</p>
            </div>
            <button onclick="app.selectDateAndJump('${day.date}')" class="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors">
              Pilih
            </button>
          </div>
          <p class="text-xs text-indigo-300 font-medium mb-3 p-1.5 rounded bg-indigo-950/30 border border-indigo-900/40 line-clamp-2">
            ${this.escapeHtml(day.focus)}
          </p>
          <div class="space-y-1.5 min-h-[75px]">
            ${tasks.slice(0, 3).map(t => `
              <div class="text-xs truncate ${t.status === 'done' ? 'line-through text-slate-500' : 'text-slate-300'}">
                • ${t.time ? `[${t.time}] ` : ''}${this.escapeHtml(t.title)}
              </div>
            `).join("")}
            ${total > 3 ? `<p class="text-[10px] text-slate-500">+${total - 3} lainnya</p>` : ''}
            ${total === 0 ? `<p class="text-xs text-slate-600 italic">Kosong</p>` : ''}
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400 font-mono">
            <span>${done}/${total} Selesai</span>
            <span>${total > 0 ? Math.round((done / total) * 100) : 0}%</span>
          </div>
        </div>
      `;
    }).join("");
  }

  selectDateAndJump(dateStr) {
    this.selectedDate = dateStr;
    const input = document.getElementById("date-input");
    if (input) input.value = dateStr;
    this.switchTab("daily");
  }

  // ===================== MONTHLY VIEW =====================
  renderMonthlyView() {
    const list = document.getElementById("monthly-list-container");
    if (!list) return;

    list.innerHTML = this.data.monthlyPlan.milestones.map(m => `
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl border ${
        m.done ? 'bg-slate-950/40 border-slate-900 opacity-60' : 'bg-slate-900/70 border-slate-800'
      }">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <input type="checkbox" ${m.done ? 'checked' : ''} onchange="app.toggleMonthlyMilestone('${m.id}')" class="custom-checkbox flex-shrink-0">
          <div>
            <span class="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">Target: ${m.targetDate}</span>
            <p class="text-sm font-semibold text-slate-100 mt-1 ${m.done ? 'line-through text-slate-500' : ''}">${this.escapeHtml(m.title)}</p>
          </div>
        </div>
        <button onclick="app.pushMilestoneToDaily('${m.id}')" class="px-2.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-800/80 text-xs font-medium transition-colors">
          Jadikan Tugas
        </button>
      </div>
    `).join("");
  }

  toggleMonthlyMilestone(id) {
    const item = this.data.monthlyPlan.milestones.find(m => m.id === id);
    if (item) {
      item.done = !item.done;
      this.saveData();
      this.render();
    }
  }

  pushMilestoneToDaily(id) {
    const item = this.data.monthlyPlan.milestones.find(m => m.id === id);
    if (!item) return;

    this.data.dailyTasks.unshift({
      id: "t-" + Date.now(),
      date: this.selectedDate,
      time: "09:00",
      title: `[Target Bulanan] ${item.title}`,
      category: "business",
      priority: item.priority || "high",
      status: "todo",
      note: `Ditautkan dari milestone bulanan (${item.targetDate})`,
      linked5Y: "Milestone Bulanan"
    });

    this.saveData();
    alert(`Milestone "${item.title}" berhasil ditambahkan ke Agenda Harian!`);
    this.render();
  }

  // ===================== ROADMAP 5 TAHUN =====================
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
        <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-5">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-black text-indigo-400 font-mono">${year.year}</span>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-medium">${year.theme}</span>
              </div>
              <h3 class="text-base font-bold text-white mt-1">${this.escapeHtml(year.title)}</h3>
            </div>
            <div class="min-w-[180px]">
              <div class="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                <span>Capaian</span>
                <span class="text-indigo-300 font-bold">${pct}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-2">
                <div class="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full" style="width: ${pct}%"></div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            ${year.quarters.map(q => `
              <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div class="flex justify-between items-center mb-1.5">
                  <span class="text-xs font-bold text-cyan-400 font-mono">${q.quarter}</span>
                  <span class="text-[10px] text-slate-400 font-mono">${q.steps.filter(s => s.done).length}/${q.steps.length} Selesai</span>
                </div>
                <h4 class="text-xs font-semibold text-slate-200 mb-2.5">${this.escapeHtml(q.focus)}</h4>
                
                <div class="space-y-1.5">
                  ${q.steps.map(step => `
                    <div class="flex items-center justify-between gap-2 p-1.5 rounded bg-slate-900 border border-slate-800 text-xs">
                      <div class="flex items-center gap-2 flex-1 min-w-0">
                        <input type="checkbox" ${step.done ? 'checked' : ''} onchange="app.toggle5YStep('${year.id}', '${q.id}', '${step.id}')" class="custom-checkbox flex-shrink-0">
                        <span class="${step.done ? 'line-through text-slate-500' : 'text-slate-300'} truncate">${this.escapeHtml(step.title)}</span>
                      </div>
                      <button onclick="app.push5YStepToDaily('${year.year}', '${q.quarter}', '${step.id}')" title="Jadikan Agenda Harian" class="text-indigo-400 hover:text-white p-1 rounded hover:bg-indigo-600 transition-colors">
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
      time: "08:30",
      title: `[5Y ${year} ${quarter}] ${target.title}`,
      category: "development",
      priority: target.priority || "high",
      status: "todo",
      note: target.note || "Eksekusi dari roadmap 5 tahun",
      linked5Y: `${year} ${quarter}`
    });

    this.saveData();
    alert(`Langkah 5 Tahun "${target.title}" berhasil ditambahkan ke Agenda Harian!`);
    this.render();
  }

  // ===================== WHATSAPP NOTIFICATION ENGINE =====================
  getTargetPhone() {
    const phoneInput = document.getElementById("input-target-phone");
    if (phoneInput && phoneInput.value.trim()) {
      let clean = phoneInput.value.replace(/[^0-9]/g, '');
      if (clean.startsWith('0')) clean = '62' + clean.slice(1);
      this.data.profile.targetPhone = clean;
      this.saveData();
      return clean;
    }
    return this.data.profile.targetPhone || "6289691905347";
  }

  async sendDailyBriefingToWA() {
    const phone = this.getTargetPhone();
    const tasks = this.data.dailyTasks.filter(t => t.date === this.selectedDate);
    const m = this.getMetrics();

    let taskLines = "";
    if (tasks.length === 0) {
      taskLines = "_Belum ada agenda tercatat._\n";
    } else {
      taskLines = tasks.map((t, idx) => {
        const status = t.status === "done" ? "✅" : "⏳";
        const time = t.time ? `[${t.time}] ` : "";
        const pri = t.priority === "high" ? " *[TINGGI]*" : "";
        return `${status} ${idx + 1}. ${time}${t.title}${pri}`;
      }).join("\n");
    }

    const message = 
`📋 *BRIEFING PRODUKTIVITAS EKSEKUTIF*
👤 *Untuk:* Pak ${this.data.profile.name}
📅 *Tanggal:* ${this.selectedDate}

⚡ *RINGKASAN STATUS:*
• Total Tugas: ${m.total}
• Selesai: ${m.done} (${m.pct}%)
• Prioritas Kritis: ${m.high}
• Progress Roadmap 5 Tahun: ${m.pct5Y}%

📌 *DAFTAR AGENDA KERJA:*
${taskLines}

🎯 *FOKUS STRATEGIS 5Y:*
Infrastruktur & Automasi Ekosistem Mandiri

💡 _"Tetap fokus eksekusi target prioritas tinggi dan jaga momentum!"_
🤖 *Aura Executive Secretary*`;

    await this.dispatchWAMessage(phone, message, "Briefing Harian");
  }

  async sendTaskToWA(taskId) {
    const phone = this.getTargetPhone();
    const task = this.data.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    const message = 
`🔔 *PENGINGAT AGENDA EKSEKUTIF*
📌 *Tugas:* ${task.title}
⏰ *Waktu:* ${task.time ? task.time + ' WIB' : 'Hari Ini'}
🏷️ *Prioritas:* ${task.priority.toUpperCase()} | *Kategori:* ${this.getCategoryLabel(task.category)}
${task.note ? `📝 *Catatan:* ${task.note}\n` : ''}${task.linked5Y ? `🎯 *Roadmap 5Y:* ${task.linked5Y}\n` : ''}
🤖 *Aura Executive Desk*`;

    await this.dispatchWAMessage(phone, message, `Pengingat: ${task.title}`);
  }

  async dispatchWAMessage(phone, message, label) {
    const btn = document.getElementById("btn-send-wa-briefing");
    if (btn) btn.disabled = true;

    try {
      // 1. Coba kirim via Local Bot API (port 3055)
      const res = await fetch("/api/send-wa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, message })
      });
      const data = await res.json();

      if (data.success) {
        alert(`✅ ${label} berhasil dikirim ke WhatsApp (${phone}) via Bot Server!`);
      } else {
        throw new Error(data.error || "Gagal mengirim via bot");
      }
    } catch (err) {
      console.warn("Fallback to Web WhatsApp:", err);
      // 2. Fallback: Buka WhatsApp Web / Apps langsung dengan teks prefilled
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
      alert(`⚠️ Bot lokal offline/terkendala. Pesan dibuka langsung via WhatsApp Web!`);
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  // ===================== CRUD ACTIONS =====================
  addTask(title, time, priority, category, note) {
    if (!title.trim()) return;

    this.data.dailyTasks.unshift({
      id: "t-" + Date.now(),
      date: this.selectedDate,
      time: time || "",
      title: title.trim(),
      category: category || "routine",
      priority: priority || "high",
      status: "todo",
      note: note ? note.trim() : "",
      linked5Y: ""
    });

    this.saveData();
    this.render();
  }

  toggleTask(id) {
    const t = this.data.dailyTasks.find(item => item.id === id);
    if (t) {
      t.status = t.status === "done" ? "todo" : "done";
      this.saveData();
      this.render();
    }
  }

  deleteTask(id) {
    if (confirm("Hapus agenda ini?")) {
      this.data.dailyTasks = this.data.dailyTasks.filter(item => item.id !== id);
      this.saveData();
      this.render();
    }
  }

  // Voice speech synthesis
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
    const tasks = this.data.dailyTasks.filter(t => t.date === this.selectedDate);
    const top = tasks.filter(t => t.status !== "done").slice(0, 3).map(t => t.title).join(". ");

    const text = `Halo Pak ${this.data.profile.name}. Hari ini terdapat ${m.total} agenda, dengan ${m.high} tugas prioritas utama. Capaian roadmap lima tahun Anda berada pada ${m.pct5Y} persen. ${top ? 'Fokus berikutnya: ' + top : ''}`;

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "id-ID";
    utt.onend = () => { this.isSpeaking = false; };
    utt.onerror = () => { this.isSpeaking = false; };
    this.isSpeaking = true;
    this.speechSynth.speak(utt);
  }

  // Export & Import
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
          alert("Data berhasil dipulihkan!");
        }
      } catch (err) {
        alert("Gagal membaca file JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  bindEvents() {
    // Tab pill clicks
    document.querySelectorAll(".tab-pill").forEach(pill => {
      pill.addEventListener("click", () => this.switchTab(pill.dataset.tab));
    });

    // Date selector
    const dateInput = document.getElementById("date-input");
    if (dateInput) {
      dateInput.value = this.selectedDate;
      dateInput.addEventListener("change", (e) => {
        this.selectedDate = e.target.value;
        this.render();
      });
    }

    // Quick Date navigation
    const btnToday = document.getElementById("btn-nav-today");
    const btnPrev = document.getElementById("btn-nav-prev");
    const btnNext = document.getElementById("btn-nav-next");

    if (btnToday) {
      btnToday.addEventListener("click", () => {
        this.selectedDate = this.getTodayDateString();
        if (dateInput) dateInput.value = this.selectedDate;
        this.render();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate() - 1);
        this.selectedDate = d.toISOString().split("T")[0];
        if (dateInput) dateInput.value = this.selectedDate;
        this.render();
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate() + 1);
        this.selectedDate = d.toISOString().split("T")[0];
        if (dateInput) dateInput.value = this.selectedDate;
        this.render();
      });
    }

    // Filters
    const priFilter = document.getElementById("filter-priority");
    const catFilter = document.getElementById("filter-category");
    const searchInput = document.getElementById("search-input");

    if (priFilter) priFilter.addEventListener("change", (e) => {
      this.selectedPriority = e.target.value;
      this.renderDailyView();
    });

    if (catFilter) catFilter.addEventListener("change", (e) => {
      this.selectedCategory = e.target.value;
      this.renderDailyView();
    });

    if (searchInput) searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value;
      this.renderDailyView();
    });

    // Quick add task form
    const form = document.getElementById("quick-add-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("task-title").value;
        const time = document.getElementById("task-time").value;
        const pri = document.getElementById("task-priority").value;
        const cat = document.getElementById("task-category").value;
        const note = document.getElementById("task-note") ? document.getElementById("task-note").value : "";

        this.addTask(title, time, pri, cat, note);
        form.reset();
        document.getElementById("task-title").focus();
      });
    }

    // WhatsApp Notification Events
    const btnSendWABriefing = document.getElementById("btn-send-wa-briefing");
    if (btnSendWABriefing) {
      btnSendWABriefing.addEventListener("click", () => this.sendDailyBriefingToWA());
    }

    const phoneInput = document.getElementById("input-target-phone");
    if (phoneInput) {
      phoneInput.value = this.data.profile.targetPhone || "6289691905347";
      phoneInput.addEventListener("change", (e) => {
        this.data.profile.targetPhone = e.target.value.replace(/[^0-9]/g, '');
        this.saveData();
      });
    }

    // Voice button
    const btnVoice = document.getElementById("btn-voice-briefing");
    if (btnVoice) {
      btnVoice.addEventListener("click", () => this.speakBriefing());
    }

    // Backup & Restore
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

document.addEventListener("DOMContentLoaded", () => {
  window.app = new ProductivityApp();
});
