/**
 * Sekretaris Pribadi - Sistem Produktivitas & Roadmap 5 Tahun
 * Core Engine & State Controller
 * Dibuat khusus untuk Ilham Pradani
 */

// Initial Seed Data jika LocalStorage kosong
const DEFAULT_SYSTEM_DATA = {
  profile: {
    name: "Ilham Pradani",
    role: "Founder & Tech Architect",
    secretaryName: "Aura (Sekertaris Eksekutif)",
    themeMode: "dark"
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
            { id: "s105", title: "Integrasi telemetri sinyal ke bot WhatsApp mijdigital", done: true, priority: "high", note: "Notifikasi real-time terhubung" },
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
            { id: "s109", title: "Peluncuran dashboard Sekretaris Pribadi productivity.ilhampradani.me", done: true, priority: "high", note: "Aplikasi live & terintegrasi Cloudflare Pages" },
            { id: "s110", title: "Audit komprehensif performa sistem & database", done: false, priority: "high", note: "Penyelarasan log & resource monitoring" },
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
            { id: "s201", title: "Rilis platform API terkelola untuk klien eksternal", done: false, priority: "high", note: "Sistem billing & rate-limiting otomatis" },
            { id: "s202", title: "Peningkatan pipeline retraining otomatis model AI mingguan", done: true, priority: "high", note: "Automated backtest verification" },
            { id: "s203", title: "Perekrutan & delegasi teknis operasional harian", done: false, priority: "medium", note: "Standar SOP operasional" }
          ]
        },
        {
          id: "y2-q2",
          quarter: "Q2 2027",
          focus: "Skalabilitas Multi-Tenant Cloud & Mobile Apps",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s204", title: "Rilis aplikasi mobile native untuk dashboard eksekutif", done: false, priority: "medium", note: "Notifikasi push langsung ke perangkat" },
            { id: "s205", title: "Optimasi latensi inferensi AI sub-10 milidetik", done: false, priority: "high", note: "Quantization & C++ accelerated runtime" }
          ]
        },
        {
          id: "y2-q3",
          quarter: "Q3 2027",
          focus: "Penetrasi Pasar B2B & Kemitraan Strategis",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s206", title: "Ekspansi jaringan korporat dan vendor resmi", done: false, priority: "medium", note: "Kolaborasi institusi" }
          ]
        },
        {
          id: "y2-q4",
          quarter: "Q4 2027",
          focus: "Review Kapabilitas Finansial & Persiapan Diversifikasi",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s207", title: "Audit laba bersih & alokasi aset reinvestasi jangka panjang", done: false, priority: "high", note: "Stabilitas cashflow mandiri" }
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
          quarter: "Q1-Q2 2028",
          focus: "Pengembangan Solusi AI Enterprise Khusus",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s301", title: "Peluncuran suite automasi proses bisnis cerdas", done: false, priority: "high", note: "Target segmen manufaktur & ritel" },
            { id: "s302", title: "Paten & sertifikasi kepatuhan data ISO/IEC", done: false, priority: "medium", note: "Standar keamanan data tingkat tinggi" }
          ]
        },
        {
          id: "y3-q2",
          quarter: "Q3-Q4 2028",
          focus: "Ekspansi Regional & Pembentukan Holding Digital",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s303", title: "Strukturisasi holding dan unit bisnis otonom", done: false, priority: "high", note: "Manajemen delegasi penuh" }
          ]
        }
      ]
    },
    {
      id: "y4-2029",
      year: 2029,
      title: "Tahun 4: Skala Regional & Kepemimpinan Pasar",
      theme: "Pengaruh Regional & Kemapanan Sistem",
      targetRevenue: "Portofolio Multi-Sektor Berkelanjutan",
      overallProgress: 0,
      quarters: [
        {
          id: "y4-q1",
          quarter: "Semester 1 2029",
          focus: "Ekspansi Pasar Asia Tenggara & Infrastruktur Terdistribusi Global",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s401", title: "Deployment node edge global multi-region", done: false, priority: "high", note: "Konektivitas sub-5ms Asia Tenggara" },
            { id: "s402", title: "Investasi pada talenta riset kecerdasan buatan terapan", done: false, priority: "medium", note: "Laboratorium R&D mandiri" }
          ]
        },
        {
          id: "y4-q2",
          quarter: "Semester 2 2029",
          focus: "Konsolidasi Nilai Valuasi & Filantropi Pendidikan",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s403", title: "Program beasiswa & inkubator talenta digital muda", done: false, priority: "medium", note: "Kontribusi sosial berkelanjutan" }
          ]
        }
      ]
    },
    {
      id: "y5-2030",
      year: 2030,
      title: "Tahun 5: Kebebasan Finansial Penuh, Warisan Ekosistem & Legacy",
      theme: "Keberlanjutan & Kebebasan Waktu Eksekutif",
      targetRevenue: "Aset Mandiri Berkelanjutan & Self-Running Organisasi",
      overallProgress: 0,
      quarters: [
        {
          id: "y5-q1",
          quarter: "Sepanjang 2030",
          focus: "Otonomi Penuh Sistem, Suksesi & Fokus Inovasi Masa Depan",
          status: "pending",
          progress: 0,
          steps: [
            { id: "s501", title: "Sistem operasional berjalan 100% tanpa campur tangan harian", done: false, priority: "high", note: "Sistem otonom mandiri" },
            { id: "s502", title: "Fokus pada riset terobosan sains, teknologi frontier & keluarga", done: false, priority: "high", note: "Pencapaian visi kehidupan seimbang" }
          ]
        }
      ]
    }
  ],
  monthlyPlan: {
    year: 2026,
    month: 11, // November (1-12)
    monthName: "November 2026",
    theme: "Sprint Penguatan Ekosistem & Efisiensi Sistem",
    milestones: [
      { id: "m1", title: "Peluncuran & Deployment Sistem Produktivitas Eksekutif", targetDate: "2026-11-26", done: true, priority: "high" },
      { id: "m2", title: "Audit Stabilitas Tunnel Cloudflare & Serverless Logger Edge", targetDate: "2026-11-28", done: true, priority: "high" },
      { id: "m3", title: "Uji Evaluasi Metrik AI Trade & Konsistensi Sinyal", targetDate: "2026-11-29", done: false, priority: "medium" },
      { id: "m4", title: "Review Finansial Akhir Bulan & Perencanaan Alokasi Q1 2027", targetDate: "2026-11-30", done: false, priority: "high" }
    ]
  },
  weeklyPlan: {
    weekTitle: "Minggu 48 (23 - 29 November 2026)",
    sprintGoal: "Menyelesaikan otomasi sistem jadwal terpadu, verifikasi konektivitas Cloudflare, dan evaluasi hasil training model",
    days: [
      { code: "mon", label: "Senin", date: "2026-11-23", focus: "Perencanaan Sprint Mingguan & Review Task UTM" },
      { code: "tue", label: "Selasa", date: "2026-11-24", focus: "Konfigurasi Cloudflare Tunnel vps-utm & Port Ingress" },
      { code: "wed", label: "Rabu", date: "2026-11-25", focus: "Eksekusi Sistem Jadwal Produktivitas Eksekutif" },
      { code: "thu", label: "Kamis", date: "2026-11-26", focus: "Integrasi Domain productivity.ilhampradani.me & Testing" },
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
      title: "Rancang & Bangun Arsitektur Web Sekretaris Produktivitas",
      category: "development",
      priority: "high",
      status: "done",
      note: "Engine harian, mingguan, bulanan & roadmap 5 tahun",
      linked5Y: "Y1 - Q4"
    },
    {
      id: "t-4",
      date: "2026-11-25",
      time: "14:30",
      title: "Konfigurasi Cloudflare Pages & Domain productivity.ilhampradani.me",
      category: "devops",
      priority: "high",
      status: "in_progress",
      note: "Deploy produksi & verifikasi SSL HTTPS global",
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
      note: "Update status checklist & persiapan esok hari",
      linked5Y: "Habit"
    }
  ]
};

// Global App State
class SecretaryApp {
  constructor() {
    this.storageKey = "sekretaris_produktivitas_data_v1";
    this.data = this.loadData();
    this.activeTab = "daily"; // 'daily', 'weekly', 'monthly', 'roadmap', 'analytics'
    this.selectedDate = this.getTodayDateString();
    this.selectedCategory = "all";
    this.selectedPriority = "all";
    this.searchQuery = "";
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
      console.warn("Gagal membaca LocalStorage, menggunakan seed data bawaan", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SYSTEM_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      this.updateSecretaryBriefing();
    } catch (e) {
      console.error("Gagal menyimpan data ke LocalStorage", e);
    }
  }

  init() {
    this.bindEvents();
    this.setupKeyboardShortcuts();
    this.startClock();
    this.render();
  }

  startClock() {
    const clockEl = document.getElementById("executive-clock");
    const dateEl = document.getElementById("executive-date");
    const update = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      if (clockEl) clockEl.textContent = `${timeStr} WIB`;
      if (dateEl) dateEl.textContent = dateStr;
    };
    update();
    setInterval(update, 1000);
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll(".tab-btn").forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add("bg-indigo-600", "text-white", "shadow-lg");
        btn.classList.remove("text-slate-400", "hover:text-white");
      } else {
        btn.classList.remove("bg-indigo-600", "text-white", "shadow-lg");
        btn.classList.add("text-slate-400", "hover:text-white");
      }
    });

    document.querySelectorAll(".view-panel").forEach(panel => {
      panel.classList.add("hidden");
    });
    const activePanel = document.getElementById(`panel-${tabName}`);
    if (activePanel) {
      activePanel.classList.remove("hidden");
    }

    this.render();
  }

  getSecretaryAnalysis() {
    const today = this.selectedDate;
    const tasksToday = this.data.dailyTasks.filter(t => t.date === today);
    const total = tasksToday.length;
    const done = tasksToday.filter(t => t.status === "done").length;
    const pendingHigh = tasksToday.filter(t => t.status !== "done" && t.priority === "high").length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    // Menghitung status rencana 5 tahun
    let total5YSteps = 0;
    let done5YSteps = 0;
    this.data.fiveYearPlan.forEach(y => {
      y.quarters.forEach(q => {
        q.steps.forEach(s => {
          total5YSteps++;
          if (s.done) done5YSteps++;
        });
      });
    });
    const pct5Y = total5YSteps > 0 ? Math.round((done5YSteps / total5YSteps) * 100) : 0;

    const hour = new Date().getHours();
    let greeting = "Selamat Malam";
    if (hour >= 4 && hour < 11) greeting = "Selamat Pagi";
    else if (hour >= 11 && hour < 15) greeting = "Selamat Siang";
    else if (hour >= 15 && hour < 18) greeting = "Selamat Sore";

    let message = "";
    if (total === 0) {
      message = `Hari ini belum ada agenda terdaftar. Ini saat yang tepat untuk merencanakan target harian Anda.`;
    } else if (pct === 100) {
      message = `Luar biasa Pak Ilham! Seluruh ${total} agenda hari ini telah berhasil diselesaikan dengan sempurna.`;
    } else if (pendingHigh > 0) {
      message = `Ada ${pendingHigh} agenda prioritas tinggi yang memerlukan atensi utama Anda. Progress harian saat ini ${pct}%.`;
    } else {
      message = `Progress berjalan mulus (${pct}% selesai). Tetap jaga momentum dan ritme kerja terukur.`;
    }

    return {
      greeting,
      total,
      done,
      pending: total - done,
      pendingHigh,
      pct,
      pct5Y,
      message,
      executiveName: this.data.profile.name
    };
  }

  updateSecretaryBriefing() {
    const analysis = this.getSecretaryAnalysis();
    const greetEl = document.getElementById("briefing-greeting");
    const msgEl = document.getElementById("briefing-message");
    const statPctEl = document.getElementById("briefing-stat-pct");
    const statPendingHighEl = document.getElementById("briefing-stat-high");
    const stat5YEl = document.getElementById("briefing-stat-5y");

    if (greetEl) greetEl.textContent = `${analysis.greeting}, ${analysis.executiveName}!`;
    if (msgEl) msgEl.textContent = analysis.message;
    if (statPctEl) statPctEl.textContent = `${analysis.pct}%`;
    if (statPendingHighEl) statPendingHighEl.textContent = `${analysis.pendingHigh}`;
    if (stat5YEl) stat5YEl.textContent = `${analysis.pct5Y}%`;
  }

  speakBriefing() {
    if (!this.speechSynth) {
      alert("Fitur pembacaan suara tidak didukung pada browser ini.");
      return;
    }

    if (this.isSpeaking) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
      this.updateVoiceButtonState(false);
      return;
    }

    const analysis = this.getSecretaryAnalysis();
    const tasksToday = this.data.dailyTasks.filter(t => t.date === this.selectedDate);
    let taskSummary = "";
    if (tasksToday.length > 0) {
      const topTasks = tasksToday.filter(t => t.status !== "done").slice(0, 3).map(t => `${t.time ? 'pukul ' + t.time : ''}: ${t.title}`).join(". ");
      if (topTasks) {
        taskSummary = `Agenda yang perlu Anda selesaikan selanjutnya antara lain: ${topTasks}.`;
      }
    }

    const fullText = `${analysis.greeting} Pak ${analysis.executiveName}. Saya Aura, sekertaris pribadi Anda. ${analysis.message}. Target rencana jangka panjang 5 tahun Anda saat ini tercapai ${analysis.pct5Y} persen. ${taskSummary} Tetap semangat dan fokus mengeksekusi rencana hari ini!`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "id-ID";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Cari suara bahasa Indonesia jika ada
    const voices = this.speechSynth.getVoices();
    const idVoice = voices.find(v => v.lang.includes("id") || v.lang.includes("ID"));
    if (idVoice) utterance.voice = idVoice;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateVoiceButtonState(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateVoiceButtonState(false);
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.updateVoiceButtonState(false);
    };

    this.speechSynth.speak(utterance);
  }

  updateVoiceButtonState(speaking) {
    const btn = document.getElementById("btn-voice-briefing");
    if (!btn) return;
    if (speaking) {
      btn.innerHTML = `
        <span class="relative flex h-3 w-3 mr-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </span>
        Hentikan Suara
      `;
      btn.classList.add("bg-rose-600/30", "border-rose-500", "text-rose-200");
    } else {
      btn.innerHTML = `
        <svg class="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        Dengarkan Suara Sekertaris
      `;
      btn.classList.remove("bg-rose-600/30", "border-rose-500", "text-rose-200");
    }
  }

  render() {
    this.updateSecretaryBriefing();
    if (this.activeTab === "daily") {
      this.renderDailyView();
    } else if (this.activeTab === "weekly") {
      this.renderWeeklyView();
    } else if (this.activeTab === "monthly") {
      this.renderMonthlyView();
    } else if (this.activeTab === "roadmap") {
      this.renderRoadmapView();
    } else if (this.activeTab === "analytics") {
      this.renderAnalyticsView();
    }
  }

  // ===================== DAILY VIEW =====================
  renderDailyView() {
    const listContainer = document.getElementById("daily-task-list");
    if (!listContainer) return;

    let tasks = this.data.dailyTasks.filter(t => t.date === this.selectedDate);

    // Apply filters
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

    // Sort: high priority first, then time
    tasks.sort((a, b) => {
      const pOrder = { high: 1, medium: 2, low: 3 };
      const diffP = (pOrder[a.priority] || 2) - (pOrder[b.priority] || 2);
      if (diffP !== 0) return diffP;
      return (a.time || "99:99").localeCompare(b.time || "99:99");
    });

    if (tasks.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-12 px-4 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <svg class="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p class="text-slate-400 font-medium">Tidak ada agenda pada filter ini.</p>
          <p class="text-xs text-slate-500 mt-1">Gunakan formulir tambah cepat di atas untuk menambahkan tugas baru.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = tasks.map(task => {
      const isDone = task.status === "done";
      const priorityClass = task.priority === "high" 
        ? "bg-rose-500/15 text-rose-300 border-rose-500/30" 
        : task.priority === "medium" 
          ? "bg-amber-500/15 text-amber-300 border-amber-500/30" 
          : "bg-slate-700/50 text-slate-300 border-slate-600/30";

      const categoryBadge = this.getCategoryBadge(task.category);

      return `
        <div class="group flex items-start justify-between gap-3 p-4 rounded-xl border transition-all duration-150 ${
          isDone 
            ? "bg-slate-950/60 border-slate-800/60 opacity-60" 
            : "bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700 shadow-sm"
        }">
          <div class="flex items-start gap-3 flex-1 min-w-0">
            <button onclick="app.toggleTaskStatus('${task.id}')" class="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
              isDone 
                ? "bg-emerald-600 border-emerald-500 text-white" 
                : "border-slate-700 hover:border-indigo-500 bg-slate-800/80 text-transparent"
            }">
              <svg class="w-4 h-4 fill-current stroke-current" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                ${task.time ? `<span class="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">${task.time} WIB</span>` : ''}
                <span class="text-xs px-2 py-0.5 rounded border ${priorityClass} uppercase tracking-wider font-semibold text-[10px]">
                  ${task.priority}
                </span>
                ${categoryBadge}
                ${task.linked5Y ? `<span class="text-[10px] px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800/40 font-mono">🎯 5Y: ${task.linked5Y}</span>` : ''}
              </div>
              <p class="text-sm md:text-base font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-100'} break-words">
                ${this.escapeHtml(task.title)}
              </p>
              ${task.note ? `<p class="text-xs text-slate-400 mt-1 break-words">${this.escapeHtml(task.note)}</p>` : ''}
            </div>
          </div>
          <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100 flex-shrink-0">
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

  getCategoryBadge(category) {
    const cats = {
      routine: { label: "Rutin Eksekutif", bg: "bg-blue-950/60 text-blue-300 border-blue-800/40" },
      workstation: { label: "Infrastruktur UTM", bg: "bg-cyan-950/60 text-cyan-300 border-cyan-800/40" },
      development: { label: "Coding & AI", bg: "bg-emerald-950/60 text-emerald-300 border-emerald-800/40" },
      devops: { label: "DevOps & Cloud", bg: "bg-indigo-950/60 text-indigo-300 border-indigo-800/40" },
      learning: { label: "Belajar & Riset", bg: "bg-violet-950/60 text-violet-300 border-violet-800/40" },
      business: { label: "Bisnis & Revenue", bg: "bg-amber-950/60 text-amber-300 border-amber-800/40" },
      health: { label: "Kesehatan Fisik", bg: "bg-teal-950/60 text-teal-300 border-teal-800/40" }
    };
    const c = cats[category] || { label: category || "Umum", bg: "bg-slate-800 text-slate-300 border-slate-700" };
    return `<span class="text-[10px] px-2 py-0.5 rounded border ${c.bg}">${c.label}</span>`;
  }

  // ===================== WEEKLY VIEW =====================
  renderWeeklyView() {
    const container = document.getElementById("weekly-grid");
    const weekTitleEl = document.getElementById("weekly-title");
    const sprintGoalEl = document.getElementById("weekly-sprint-goal");

    if (weekTitleEl) weekTitleEl.textContent = this.data.weeklyPlan.weekTitle;
    if (sprintGoalEl) sprintGoalEl.textContent = this.data.weeklyPlan.sprintGoal;
    if (!container) return;

    container.innerHTML = this.data.weeklyPlan.days.map(day => {
      const isSelected = day.date === this.selectedDate;
      const dayTasks = this.data.dailyTasks.filter(t => t.date === day.date);
      const total = dayTasks.length;
      const done = dayTasks.filter(t => t.status === "done").length;

      return `
        <div class="rounded-xl border p-4 transition-all ${
          isSelected 
            ? "bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500" 
            : "bg-slate-900/60 hover:bg-slate-900/90 border-slate-800"
        }">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-indigo-400' : 'text-slate-400'}">${day.label}</span>
              <p class="text-sm font-bold text-slate-100">${day.date.split("-").slice(1).join("/")}</p>
            </div>
            <button onclick="app.selectDateAndJump('${day.date}')" class="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors">
              Buka Hari Ini
            </button>
          </div>

          <div class="mb-3">
            <span class="text-[11px] font-medium text-slate-400 block mb-1">Fokus Hari:</span>
            <p class="text-xs text-indigo-300 font-medium line-clamp-2 bg-indigo-950/40 p-1.5 rounded border border-indigo-900/40">
              ${this.escapeHtml(day.focus)}
            </p>
          </div>

          <div class="space-y-1.5 min-h-[90px]">
            ${dayTasks.slice(0, 4).map(t => `
              <div class="flex items-center gap-1.5 text-xs p-1 rounded ${t.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'}">
                <span class="w-1.5 h-1.5 rounded-full ${t.priority === 'high' ? 'bg-rose-500' : 'bg-slate-500'}"></span>
                <span class="truncate">${this.escapeHtml(t.title)}</span>
              </div>
            `).join("")}
            ${total > 4 ? `<p class="text-[10px] text-slate-500 pt-1">+ ${total - 4} agenda lainnya...</p>` : ''}
            ${total === 0 ? `<p class="text-xs text-slate-600 italic py-2">Belum ada agenda</p>` : ''}
          </div>

          <div class="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Selesai: ${done}/${total}</span>
            <span class="font-mono text-indigo-400 font-semibold">${total > 0 ? Math.round((done / total) * 100) : 0}%</span>
          </div>
        </div>
      `;
    }).join("");
  }

  selectDateAndJump(dateStr) {
    this.selectedDate = dateStr;
    const dateInput = document.getElementById("date-selector");
    if (dateInput) dateInput.value = dateStr;
    this.switchTab("daily");
  }

  // ===================== MONTHLY VIEW =====================
  renderMonthlyView() {
    const monthTitleEl = document.getElementById("monthly-title");
    const monthThemeEl = document.getElementById("monthly-theme");
    const milestoneContainer = document.getElementById("monthly-milestones-list");

    if (monthTitleEl) monthTitleEl.textContent = this.data.monthlyPlan.monthName;
    if (monthThemeEl) monthThemeEl.textContent = this.data.monthlyPlan.theme;

    if (!milestoneContainer) return;

    milestoneContainer.innerHTML = this.data.monthlyPlan.milestones.map(m => {
      return `
        <div class="flex items-start justify-between gap-3 p-4 rounded-xl border ${
          m.done ? "bg-slate-950/60 border-slate-800/60 opacity-65" : "bg-slate-900 border-slate-800"
        }">
          <div class="flex items-start gap-3 flex-1 min-w-0">
            <button onclick="app.toggleMonthlyMilestone('${m.id}')" class="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
              m.done ? "bg-emerald-600 border-emerald-500 text-white" : "border-slate-700 hover:border-indigo-500 bg-slate-800 text-transparent"
            }">
              <svg class="w-4 h-4 fill-current stroke-current" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Target: ${m.targetDate}</span>
                <span class="text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                  m.priority === 'high' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300'
                }">${m.priority}</span>
              </div>
              <p class="text-sm md:text-base font-semibold ${m.done ? 'line-through text-slate-400' : 'text-slate-100'}">
                ${this.escapeHtml(m.title)}
              </p>
            </div>
          </div>
          <button onclick="app.pushMilestoneToDaily('${m.id}')" title="Kirim ke Agenda Hari Ini" class="text-xs px-2.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-800/60 transition-colors flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Jadikan Tugas
          </button>
        </div>
      `;
    }).join("");
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
    alert(`Berhasil menambahkan "${item.title}" ke Agenda Harian (${this.selectedDate})!`);
    this.render();
  }

  // ===================== ROADMAP 5 TAHUN =====================
  renderRoadmapView() {
    const container = document.getElementById("roadmap-container");
    if (!container) return;

    container.innerHTML = this.data.fiveYearPlan.map(yearPlan => {
      // Hitung progress tahunan dinamis
      let totalSteps = 0;
      let doneSteps = 0;
      yearPlan.quarters.forEach(q => {
        q.steps.forEach(s => {
          totalSteps++;
          if (s.done) doneSteps++;
        });
      });
      const calcProgress = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : yearPlan.overallProgress;

      return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 shadow-md">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div class="flex items-center gap-3">
                <span class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-mono">
                  ${yearPlan.year}
                </span>
                <span class="text-xs px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-semibold uppercase">
                  ${yearPlan.theme}
                </span>
              </div>
              <h3 class="text-lg font-bold text-slate-100 mt-1">${this.escapeHtml(yearPlan.title)}</h3>
              <p class="text-xs text-slate-400 mt-0.5">🎯 Target Finansial / Capaian: <span class="text-emerald-400 font-semibold">${yearPlan.targetRevenue}</span></p>
            </div>
            <div class="flex items-center gap-3 min-w-[200px]">
              <div class="flex-1">
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Capaian Tahun</span>
                  <span class="font-bold text-indigo-300 font-mono">${calcProgress}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div class="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2.5 rounded-full transition-all duration-300" style="width: ${calcProgress}%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Kuartal / Breakdown Rinci -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            ${yearPlan.quarters.map(q => {
              let qTotal = q.steps.length;
              let qDone = q.steps.filter(s => s.done).length;
              let qPct = qTotal > 0 ? Math.round((qDone / qTotal) * 100) : 0;

              return `
                <div class="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-cyan-400 font-mono">${q.quarter}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded font-mono ${
                      qPct === 100 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                    }">${qPct}% Selesai</span>
                  </div>
                  <h4 class="text-xs font-semibold text-slate-200 mb-3">${this.escapeHtml(q.focus)}</h4>

                  <!-- Langkah kerja terperinci -->
                  <div class="space-y-2">
                    ${q.steps.map(step => `
                      <div class="group flex items-start justify-between gap-2 text-xs p-2 rounded bg-slate-900/90 border border-slate-800/80 hover:border-slate-700">
                        <div class="flex items-start gap-2 flex-1 min-w-0">
                          <button onclick="app.toggle5YStep('${yearPlan.id}', '${q.id}', '${step.id}')" class="mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center ${
                            step.done ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-600 bg-slate-800 text-transparent'
                          }">
                            <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </button>
                          <div class="flex-1 min-w-0">
                            <p class="${step.done ? 'line-through text-slate-500' : 'text-slate-200 font-medium'} break-words">
                              ${this.escapeHtml(step.title)}
                            </p>
                            ${step.note ? `<p class="text-[10px] text-slate-400 mt-0.5">${this.escapeHtml(step.note)}</p>` : ''}
                          </div>
                        </div>
                        <button onclick="app.push5YStepToDaily('${yearPlan.year}', '${q.quarter}', '${step.id}')" title="Jadikan Agenda Harian" class="opacity-0 group-hover:opacity-100 p-1 text-indigo-400 hover:text-white hover:bg-indigo-600 rounded transition-all">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  toggle5YStep(yearId, quarterId, stepId) {
    const yearPlan = this.data.fiveYearPlan.find(y => y.id === yearId);
    if (!yearPlan) return;
    const quarter = yearPlan.quarters.find(q => q.id === quarterId);
    if (!quarter) return;
    const step = quarter.steps.find(s => s.id === stepId);
    if (!step) return;

    step.done = !step.done;
    this.saveData();
    this.render();
  }

  push5YStepToDaily(year, quarter, stepId) {
    let targetStep = null;
    this.data.fiveYearPlan.forEach(y => {
      y.quarters.forEach(q => {
        q.steps.forEach(s => {
          if (s.id === stepId) targetStep = s;
        });
      });
    });

    if (!targetStep) return;

    this.data.dailyTasks.unshift({
      id: "t-" + Date.now(),
      date: this.selectedDate,
      time: "08:30",
      title: `[5Y ${year} ${quarter}] ${targetStep.title}`,
      category: "development",
      priority: targetStep.priority || "high",
      status: "todo",
      note: targetStep.note || "Eksekusi dari roadmap 5 tahun",
      linked5Y: `${year} ${quarter}`
    });

    this.saveData();
    alert(`Langkah 5 Tahun "${targetStep.title}" berhasil ditambahkan ke Agenda Harian (${this.selectedDate})!`);
    this.render();
  }

  // ===================== ANALYTICS VIEW =====================
  renderAnalyticsView() {
    const totalDaily = this.data.dailyTasks.length;
    const doneDaily = this.data.dailyTasks.filter(t => t.status === "done").length;
    const scorePct = totalDaily > 0 ? Math.round((doneDaily / totalDaily) * 100) : 0;

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
    const score5Y = total5Y > 0 ? Math.round((done5Y / total5Y) * 100) : 0;

    const elDaily = document.getElementById("analytics-daily-score");
    const el5Y = document.getElementById("analytics-5y-score");
    const elSummary = document.getElementById("analytics-secretary-opinion");

    if (elDaily) elDaily.textContent = `${scorePct}%`;
    if (el5Y) el5Y.textContent = `${score5Y}%`;

    if (elSummary) {
      let opinion = "";
      if (scorePct >= 80) {
        opinion = "Efisiensi eksekusi harian Anda berada pada level 'Executive Mastery'. Anda menyelesaikan sebagian besar prioritas utama tepat waktu.";
      } else if (scorePct >= 50) {
        opinion = "Performa cukup stabil, namun beberapa agenda prioritas menengah tertunda. Direkomendasikan membatasi maksimal 3 target utama per hari.";
      } else {
        opinion = "Tingkat penyelesaian tugas memerlukan penyesuaian fokus. Cobalah menggunakan teknik time-blocking 25 menit (Pomodoro).";
      }
      elSummary.textContent = opinion;
    }
  }

  // ===================== TASK ACTIONS =====================
  addTask(title, time, priority, category, note) {
    if (!title.trim()) return;

    const newTask = {
      id: "t-" + Date.now(),
      date: this.selectedDate,
      time: time || "",
      title: title.trim(),
      category: category || "routine",
      priority: priority || "high",
      status: "todo",
      note: note ? note.trim() : "",
      linked5Y: ""
    };

    this.data.dailyTasks.unshift(newTask);
    this.saveData();
    this.render();
  }

  toggleTaskStatus(id) {
    const task = this.data.dailyTasks.find(t => t.id === id);
    if (task) {
      task.status = task.status === "done" ? "todo" : "done";
      this.saveData();
      this.render();
    }
  }

  deleteTask(id) {
    if (confirm("Hapus agenda ini dari jadwal?")) {
      this.data.dailyTasks = this.data.dailyTasks.filter(t => t.id !== id);
      this.saveData();
      this.render();
    }
  }

  // ===================== BACKUP & RESTORE =====================
  exportJSON() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sekretaris_Produktivitas_${this.selectedDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed && (parsed.dailyTasks || parsed.fiveYearPlan)) {
          this.data = { ...DEFAULT_SYSTEM_DATA, ...parsed };
          this.saveData();
          this.render();
          alert("Data produktivitas berhasil dipulihkan!");
        } else {
          alert("Format file JSON tidak valid.");
        }
      } catch (err) {
        alert("Gagal membaca file: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  resetToDefault() {
    if (confirm("Kembalikan data ke template awal? Semua data kustom akan direset.")) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_SYSTEM_DATA));
      this.saveData();
      this.render();
      alert("Sistem berhasil direset ke konfigurasi awal.");
    }
  }

  // ===================== EVENT BINDING =====================
  bindEvents() {
    // Tab switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    // Date selector
    const dateInput = document.getElementById("date-selector");
    if (dateInput) {
      dateInput.value = this.selectedDate;
      dateInput.addEventListener("change", (e) => {
        this.selectedDate = e.target.value;
        this.render();
      });
    }

    // Quick Date navigation
    const prevDayBtn = document.getElementById("btn-prev-day");
    const nextDayBtn = document.getElementById("btn-next-day");
    const todayBtn = document.getElementById("btn-today");

    if (prevDayBtn) {
      prevDayBtn.addEventListener("click", () => {
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate() - 1);
        this.selectedDate = d.toISOString().split("T")[0];
        if (dateInput) dateInput.value = this.selectedDate;
        this.render();
      });
    }

    if (nextDayBtn) {
      nextDayBtn.addEventListener("click", () => {
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate() + 1);
        this.selectedDate = d.toISOString().split("T")[0];
        if (dateInput) dateInput.value = this.selectedDate;
        this.render();
      });
    }

    if (todayBtn) {
      todayBtn.addEventListener("click", () => {
        this.selectedDate = this.getTodayDateString();
        if (dateInput) dateInput.value = this.selectedDate;
        this.render();
      });
    }

    // Filters
    const catFilter = document.getElementById("filter-category");
    const priFilter = document.getElementById("filter-priority");
    const searchInput = document.getElementById("search-task");

    if (catFilter) {
      catFilter.addEventListener("change", (e) => {
        this.selectedCategory = e.target.value;
        this.renderDailyView();
      });
    }

    if (priFilter) {
      priFilter.addEventListener("change", (e) => {
        this.selectedPriority = e.target.value;
        this.renderDailyView();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderDailyView();
      });
    }

    // Add task form
    const addForm = document.getElementById("quick-add-form");
    if (addForm) {
      addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("input-task-title").value;
        const time = document.getElementById("input-task-time").value;
        const priority = document.getElementById("input-task-priority").value;
        const category = document.getElementById("input-task-category").value;
        const note = document.getElementById("input-task-note") ? document.getElementById("input-task-note").value : "";

        this.addTask(title, time, priority, category, note);
        addForm.reset();
        document.getElementById("input-task-title").focus();
      });
    }

    // Voice briefing button
    const voiceBtn = document.getElementById("btn-voice-briefing");
    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        this.speakBriefing();
      });
    }

    // Export / Import
    const btnExport = document.getElementById("btn-export-json");
    if (btnExport) {
      btnExport.addEventListener("click", () => this.exportJSON());
    }

    const fileImport = document.getElementById("file-import-json");
    if (fileImport) {
      fileImport.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          this.importJSON(e.target.files[0]);
        }
      });
    }

    const btnReset = document.getElementById("btn-reset-data");
    if (btnReset) {
      btnReset.addEventListener("click", () => this.resetToDefault());
    }
  }

  setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      // Ignore if user is inside an input/textarea
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        return;
      }

      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        const input = document.getElementById("input-task-title");
        if (input) input.focus();
      } else if (e.key === "t" || e.key === "T") {
        this.switchTab("daily");
      } else if (e.key === "w" || e.key === "W") {
        this.switchTab("weekly");
      } else if (e.key === "m" || e.key === "M") {
        this.switchTab("monthly");
      } else if (e.key === "5") {
        this.switchTab("roadmap");
      } else if (e.key === "/") {
        e.preventDefault();
        const searchInput = document.getElementById("search-task");
        if (searchInput) searchInput.focus();
      }
    });
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

// Inisialisasi saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  window.app = new SecretaryApp();

  // Daftarkan Service Worker untuk offline PWA jika didukung
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration error:', err);
    });
  }
});
