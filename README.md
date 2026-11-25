# Executive Productivity & 5-Year Masterplan System

A lightweight, fast, client-side personal productivity suite designed with a private secretary interface for daily, weekly, monthly, and 5-year strategic planning.

## Features

- **Daily Schedule (Agenda Harian)**: Time-blocked task listing with priority levels, category tags, quick filters, and instant status toggling.
- **Weekly Overview (Jadwal 1 Minggu)**: 7-day card layout to track weekly sprint goals and day-by-day workload.
- **Monthly Planner (Jadwal 1 Bulan)**: High-level milestone and deadline tracking with 1-click conversion to daily agenda tasks.
- **5-Year Strategic Masterplan (Rencana 5 Tahun)**: Multi-year breakdown (2026-2030) categorized by quarters (Q1-Q4), actionable execution steps, and progress bars.
- **Executive Voice Briefing**: Speech synthesis integration to recite today's schedule aloud in Indonesian.
- **Data Persistence & Portability**: Stored in browser LocalStorage with 1-click JSON backup export and restore capabilities.
- **PWA & Offline Ready**: Service worker caching and web app manifest for installation on desktop and mobile devices.

## Running Locally

```bash
cd /root/productivity
npx serve -l 3080
```

## Deployment

Deployable to Cloudflare Pages:
```bash
npx wrangler pages deploy . --project-name=productivity-ilhampradani
```

## Domain Configuration

- Host: `productivity.ilhampradani.me`
- Target: `productivity-ilhampradani.pages.dev` (Cloudflare Pages CNAME)
