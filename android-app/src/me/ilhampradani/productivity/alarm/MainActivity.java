package me.ilhampradani.productivity.alarm;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.PowerManager;
import android.provider.Settings;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class MainActivity extends Activity {

    public static final String PREF_NAME = "aura_alarm_prefs";
    public static final String KEY_CACHED_TASKS = "cached_tasks";
    public static final String KEY_ALARM_SETTINGS = "alarm_settings";
    public static final String KEY_LAST_SYNC = "last_sync";
    public static final String KEY_OFFLINE_ACTIONS = "offline_actions";
    public static final String DEFAULT_SERVER_URL = "https://productivity.ilhampradani.me/api/sync";

    public static int getBatteryLevel(Context context) {
        try {
            Intent batteryIntent = context.registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
            if (batteryIntent != null) {
                int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
                int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
                if (level >= 0 && scale > 0) {
                    return (int) ((level / (float) scale) * 100);
                }
            }
        } catch (Exception ignored) {}
        return 88;
    }

    // Auto-sync interval: 25 seconds when activity is active
    private static final long AUTO_SYNC_INTERVAL_MS = 25000;

    private LinearLayout tasksContainer;
    private TextView tvStatusPill;
    private TextView tvLastSync;
    private TextView tvSummaryTotal;
    private TextView tvSummaryActive;
    private TextView tvSummaryDone;
    private Handler mainHandler;
    private boolean isSyncing = false;

    private final Runnable autoSyncRunnable = new Runnable() {
        @Override
        public void run() {
            if (isNetworkAvailable(MainActivity.this)) {
                flushOfflineQueue(MainActivity.this);
                triggerSync(false);
            } else {
                updateOfflineUI();
            }
            if (mainHandler != null) {
                mainHandler.postDelayed(this, AUTO_SYNC_INTERVAL_MS);
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mainHandler = new Handler(Looper.getMainLooper());

        // Apple Pitch Black Background
        ScrollView scrollView = new ScrollView(this);
        scrollView.setBackgroundColor(Color.parseColor("#000000")); // OLED Black
        scrollView.setFillViewport(true);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(35, 45, 35, 55);

        // 1. Top Bar: Apple iTunes / iOS Clock Header with Executive Logo
        LinearLayout headerRow = new LinearLayout(this);
        headerRow.setOrientation(LinearLayout.HORIZONTAL);
        headerRow.setGravity(Gravity.CENTER_VERTICAL);
        headerRow.setPadding(0, 0, 0, 18);

        ImageView ivLogo = new ImageView(this);
        int logoResId = getResources().getIdentifier("app_logo", "drawable", getPackageName());
        if (logoResId != 0) {
            ivLogo.setImageResource(logoResId);
        }
        LinearLayout.LayoutParams logoLp = new LinearLayout.LayoutParams(96, 96);
        logoLp.setMargins(0, 0, 20, 0);
        ivLogo.setLayoutParams(logoLp);
        headerRow.addView(ivLogo);

        LinearLayout headerTextCol = new LinearLayout(this);
        headerTextCol.setOrientation(LinearLayout.VERTICAL);

        TextView tvHeader = new TextView(this);
        tvHeader.setText("Executive Alarms");
        tvHeader.setTextColor(Color.WHITE);
        tvHeader.setTextSize(24);
        tvHeader.setTypeface(Typeface.DEFAULT_BOLD);
        headerTextCol.addView(tvHeader);

        TextView tvSub = new TextView(this);
        tvSub.setText("Aura Executive Desk • Ilham Pradani, S.H.");
        tvSub.setTextColor(Color.parseColor("#8E8E93")); // iOS secondaryLabel
        tvSub.setTextSize(12);
        tvSub.setPadding(0, 2, 0, 0);
        headerTextCol.addView(tvSub);

        headerRow.addView(headerTextCol);
        root.addView(headerRow);

        // 2. Real-time Status Pill (Apple Frosted Pill)
        tvStatusPill = new TextView(this);
        tvStatusPill.setText("● Memeriksa Koneksi Database...");
        tvStatusPill.setTextColor(Color.parseColor("#30D158")); // Apple Emerald
        tvStatusPill.setTextSize(12);
        tvStatusPill.setTypeface(Typeface.DEFAULT_BOLD);
        tvStatusPill.setGravity(Gravity.CENTER);
        tvStatusPill.setPadding(24, 14, 24, 14);

        GradientDrawable pillBg = new GradientDrawable();
        pillBg.setColor(Color.parseColor("#1C1C1E")); // iOS Secondary Surface
        pillBg.setCornerRadius(22);
        pillBg.setStroke(2, Color.parseColor("#2C2C2E"));
        tvStatusPill.setBackground(pillBg);
        root.addView(tvStatusPill);

        // 3. Apple Summary Card (Segmented Metrics)
        LinearLayout summaryCard = new LinearLayout(this);
        summaryCard.setOrientation(LinearLayout.HORIZONTAL);
        summaryCard.setPadding(20, 20, 20, 20);

        GradientDrawable sumBg = new GradientDrawable();
        sumBg.setColor(Color.parseColor("#1C1C1E"));
        sumBg.setCornerRadius(18);
        sumBg.setStroke(1, Color.parseColor("#2C2C2E"));
        summaryCard.setBackground(sumBg);

        LinearLayout.LayoutParams sumLp = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        sumLp.setMargins(0, 16, 0, 20);
        summaryCard.setLayoutParams(sumLp);

        // Col 1: Total
        LinearLayout col1 = createMetricColumn("TOTAL HARI INI", "--", "#FFFFFF");
        tvSummaryTotal = (TextView) col1.getChildAt(1);
        summaryCard.addView(col1);

        // Col 2: Active / Siaga
        LinearLayout col2 = createMetricColumn("SIAGA ALARM", "--", "#FF9F0A"); // Apple Orange
        tvSummaryActive = (TextView) col2.getChildAt(1);
        summaryCard.addView(col2);

        // Col 3: Selesai / Coret
        LinearLayout col3 = createMetricColumn("SELESAI", "--", "#30D158"); // Apple Green
        tvSummaryDone = (TextView) col3.getChildAt(1);
        summaryCard.addView(col3);

        root.addView(summaryCard);

        // 4. Action Buttons (Apple Control Style)
        LinearLayout btnRow = new LinearLayout(this);
        btnRow.setOrientation(LinearLayout.VERTICAL);
        btnRow.setPadding(0, 0, 0, 25);

        // Button A: Manual Sync Now (Apple System Blue)
        Button btnSync = new Button(this);
        btnSync.setText("↻  Sinkronkan Sekarang");
        btnSync.setTextColor(Color.WHITE);
        btnSync.setTextSize(14);
        btnSync.setTypeface(Typeface.DEFAULT_BOLD);

        GradientDrawable btnSyncBg = new GradientDrawable();
        btnSyncBg.setColor(Color.parseColor("#0A84FF")); // Apple System Blue
        btnSyncBg.setCornerRadius(16);
        btnSync.setBackground(btnSyncBg);
        btnSync.setPadding(20, 18, 20, 18);

        LinearLayout.LayoutParams p1 = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        p1.setMargins(0, 0, 0, 12);
        btnSync.setLayoutParams(p1);
        btnSync.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                triggerSync(true);
            }
        });
        btnRow.addView(btnSync);

        // Horizontal Row for Secondary Buttons
        LinearLayout subBtnRow = new LinearLayout(this);
        subBtnRow.setOrientation(LinearLayout.HORIZONTAL);

        // Button B: Test Alarm Vibration & Notification
        Button btnTest = new Button(this);
        btnTest.setText("Uji Getar Notif");
        btnTest.setTextColor(Color.WHITE);
        btnTest.setTextSize(12);
        btnTest.setTypeface(Typeface.DEFAULT_BOLD);
        GradientDrawable btnTestBg = new GradientDrawable();
        btnTestBg.setColor(Color.parseColor("#2C2C2E"));
        btnTestBg.setCornerRadius(14);
        btnTest.setBackground(btnTestBg);
        btnTest.setPadding(15, 14, 15, 14);

        LinearLayout.LayoutParams p2 = new LinearLayout.LayoutParams(
                0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f
        );
        p2.setMargins(0, 0, 8, 0);
        btnTest.setLayoutParams(p2);
        btnTest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                scheduleTestAlarm();
            }
        });
        btnTest.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                scheduleTestWakeupAlarm();
                return true;
            }
        });
        subBtnRow.addView(btnTest);

        // Button C: Battery Optimization (Samsung)
        Button btnBattery = new Button(this);
        btnBattery.setText("⚡ Izin Latar Belakang");
        btnBattery.setTextColor(Color.parseColor("#E5E5EA"));
        btnBattery.setTextSize(12);
        btnBattery.setTypeface(Typeface.DEFAULT_BOLD);
        GradientDrawable btnBatBg = new GradientDrawable();
        btnBatBg.setColor(Color.parseColor("#2C2C2E"));
        btnBatBg.setCornerRadius(14);
        btnBattery.setBackground(btnBatBg);
        btnBattery.setPadding(15, 14, 15, 14);

        LinearLayout.LayoutParams p3 = new LinearLayout.LayoutParams(
                0, LinearLayout.LayoutParams.WRAP_CONTENT, 1.2f
        );
        btnBattery.setLayoutParams(p3);
        btnBattery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                requestBatteryOptimizationExemption();
            }
        });
        subBtnRow.addView(btnBattery);

        btnRow.addView(subBtnRow);
        root.addView(btnRow);

        // 5. Section Header for Alarm List
        TextView tvListHeader = new TextView(this);
        tvListHeader.setText("AGENDA & ALARM HARI INI");
        tvListHeader.setTextColor(Color.parseColor("#8E8E93"));
        tvListHeader.setTextSize(12);
        tvListHeader.setTypeface(Typeface.DEFAULT_BOLD);
        tvListHeader.setPadding(0, 10, 0, 15);
        root.addView(tvListHeader);

        // 6. Tasks Container (Apple Card Stack)
        tasksContainer = new LinearLayout(this);
        tasksContainer.setOrientation(LinearLayout.VERTICAL);
        root.addView(tasksContainer);

        // 7. Last Sync Timestamp footer
        tvLastSync = new TextView(this);
        tvLastSync.setText("Terakhir Sinkron: Belum pernah");
        tvLastSync.setTextColor(Color.parseColor("#636366"));
        tvLastSync.setTextSize(11);
        tvLastSync.setGravity(Gravity.CENTER);
        tvLastSync.setPadding(0, 30, 0, 20);
        root.addView(tvLastSync);

        scrollView.addView(root);
        setContentView(scrollView);

        // Initial Load from Offline Cache (Instant View without waiting for internet)
        loadCachedTasksUI();

        // Start Sync
        triggerSync(false);
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadCachedTasksUI();
        if (mainHandler != null) {
            mainHandler.removeCallbacks(autoSyncRunnable);
            mainHandler.postDelayed(autoSyncRunnable, 2000);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mainHandler != null) {
            mainHandler.removeCallbacks(autoSyncRunnable);
        }
    }

    private LinearLayout createMetricColumn(String label, String value, String valueColor) {
        LinearLayout col = new LinearLayout(this);
        col.setOrientation(LinearLayout.VERTICAL);
        col.setGravity(Gravity.CENTER);
        col.setLayoutParams(new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f));

        TextView tvLbl = new TextView(this);
        tvLbl.setText(label);
        tvLbl.setTextColor(Color.parseColor("#8E8E93"));
        tvLbl.setTextSize(9);
        tvLbl.setTypeface(Typeface.DEFAULT_BOLD);
        tvLbl.setGravity(Gravity.CENTER);
        col.addView(tvLbl);

        TextView tvVal = new TextView(this);
        tvVal.setText(value);
        tvVal.setTextColor(Color.parseColor(valueColor));
        tvVal.setTextSize(17);
        tvVal.setTypeface(Typeface.DEFAULT_BOLD);
        tvVal.setGravity(Gravity.CENTER);
        tvVal.setPadding(0, 4, 0, 0);
        col.addView(tvVal);

        return col;
    }

    private static boolean isNetworkAvailable(Context ctx) {
        try {
            ConnectivityManager cm = (ConnectivityManager) ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
            if (cm == null) return false;
            NetworkInfo ni = cm.getActiveNetworkInfo();
            return ni != null && ni.isConnected();
        } catch (Exception e) {
            return false;
        }
    }

    private void updateOfflineUI() {
        tvStatusPill.setText("○ Offline Mode • Alarm Perangkat Siaga 100%");
        tvStatusPill.setTextColor(Color.parseColor("#FF9F0A")); // Apple Orange
        GradientDrawable d = new GradientDrawable();
        d.setColor(Color.parseColor("#261B0E"));
        d.setCornerRadius(22);
        d.setStroke(2, Color.parseColor("#5A3E1B"));
        tvStatusPill.setBackground(d);
    }

    private void triggerSync(final boolean isManual) {
        if (isSyncing) return;
        isSyncing = true;

        if (isManual) {
            tvStatusPill.setText("↻ Memperbarui Jadwal Database...");
            tvStatusPill.setTextColor(Color.parseColor("#0A84FF"));
        }

        syncAndScheduleAlarms(this, new SyncCallback() {
            @Override
            public void onSyncComplete(final boolean success, final int scheduledCount, final String error) {
                isSyncing = false;
                mainHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        if (success) {
                            tvStatusPill.setText("● Terhubung ke Cloudflare Edge • Realtime Sync");
                            tvStatusPill.setTextColor(Color.parseColor("#30D158"));
                            GradientDrawable d = new GradientDrawable();
                            d.setColor(Color.parseColor("#0E2616"));
                            d.setCornerRadius(22);
                            d.setStroke(2, Color.parseColor("#1B5A2D"));
                            tvStatusPill.setBackground(d);

                            SimpleDateFormat sdf = new SimpleDateFormat("dd MMM, HH:mm:ss", new Locale("id", "ID"));
                            tvLastSync.setText("Terakhir Sinkron: " + sdf.format(new Date()) + " WIB");

                            loadCachedTasksUI();
                            if (isManual) {
                                Toast.makeText(MainActivity.this, "Jadwal berhasil disinkronkan (" + scheduledCount + " alarm aktif)", Toast.LENGTH_SHORT).show();
                            }
                        } else {
                            updateOfflineUI();
                            loadCachedTasksUI();
                            if (isManual) {
                                Toast.makeText(MainActivity.this, "Mode Offline: Alarm perangkat tetap aktif 100%", Toast.LENGTH_SHORT).show();
                            }
                        }
                    }
                });
            }
        });
    }

    // ===================== OFFLINE-FIRST & REALTIME VIEW RENDERER =====================
    private void loadCachedTasksUI() {
        tasksContainer.removeAllViews();
        SharedPreferences prefs = getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String jsonStr = prefs.getString(KEY_CACHED_TASKS, null);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        final String todayDate = sdf.format(new Date());

        if (jsonStr == null || jsonStr.trim().isEmpty() || jsonStr.equals("[]")) {
            TextView emptyTv = new TextView(this);
            emptyTv.setText("Belum ada agenda untuk hari ini. Jadwal dari web akan otomatis tampil saat dibuat.");
            emptyTv.setTextColor(Color.parseColor("#8E8E93"));
            emptyTv.setTextSize(13);
            emptyTv.setPadding(0, 15, 0, 15);
            tasksContainer.addView(emptyTv);

            if (tvSummaryTotal != null) tvSummaryTotal.setText("0");
            if (tvSummaryActive != null) tvSummaryActive.setText("0");
            if (tvSummaryDone != null) tvSummaryDone.setText("0");
            return;
        }

        int countTotal = 0;
        int countActive = 0;
        int countDone = 0;

        try {
            JSONArray arr = new JSONArray(jsonStr);
            countTotal = arr.length();

            for (int i = 0; i < arr.length(); i++) {
                final JSONObject t = arr.getJSONObject(i);
                final String taskId = t.optString("id", "task_" + i);
                final String title = t.optString("title", "Agenda Eksekutif");
                final String start = t.optString("timeStart", "09:00");
                final String end = t.optString("timeEnd", "");
                final String note = t.optString("note", "");
                final String recurrence = t.optString("recurrence", "none");

                // Check completion status for today
                boolean isCompleted = false;
                boolean isRecurring = (recurrence != null && !recurrence.isEmpty() && !"none".equals(recurrence));
                if (!isRecurring) {
                    String status = t.optString("status", "");
                    if ("done".equals(status)) {
                        isCompleted = true;
                    }
                }
                JSONArray compDates = t.optJSONArray("completedDates");
                if (compDates != null) {
                    for (int c = 0; c < compDates.length(); c++) {
                        if (todayDate.equals(compDates.optString(c))) {
                            isCompleted = true;
                            break;
                        }
                    }
                }

                if (isCompleted) {
                    countDone++;
                } else {
                    countActive++;
                }

                // Apple Card Container
                LinearLayout itemCard = new LinearLayout(this);
                itemCard.setOrientation(LinearLayout.VERTICAL);
                itemCard.setPadding(24, 20, 24, 20);

                GradientDrawable itemBg = new GradientDrawable();
                itemBg.setColor(Color.parseColor("#1C1C1E")); // Apple dark surface
                itemBg.setCornerRadius(20);
                itemBg.setStroke(1, Color.parseColor(isCompleted ? "#233328" : "#2C2C2E"));
                itemCard.setBackground(itemBg);

                LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
                );
                lp.setMargins(0, 0, 0, 14);
                itemCard.setLayoutParams(lp);

                // Row 1: Digital Time + Action Toggle Pill
                LinearLayout topRow = new LinearLayout(this);
                topRow.setOrientation(LinearLayout.HORIZONTAL);
                topRow.setGravity(Gravity.CENTER_VERTICAL);

                // Time Numerals (Apple iOS Clock style)
                TextView tvTime = new TextView(this);
                tvTime.setText(start + (end.isEmpty() ? "" : " - " + end));
                tvTime.setTextColor(Color.parseColor(isCompleted ? "#636366" : "#FFFFFF"));
                tvTime.setTextSize(20);
                tvTime.setTypeface(Typeface.DEFAULT_BOLD);
                if (isCompleted) {
                    tvTime.setPaintFlags(tvTime.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
                }
                LinearLayout.LayoutParams timeParams = new LinearLayout.LayoutParams(
                        0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f
                );
                tvTime.setLayoutParams(timeParams);
                topRow.addView(tvTime);

                // Interactive Apple Action Button (Two-Way Sync)
                final Button btnToggle = new Button(this);
                btnToggle.setText(isCompleted ? "✓ Selesai" : "Tandai Selesai");
                btnToggle.setTextColor(Color.WHITE);
                btnToggle.setTextSize(11);
                btnToggle.setTypeface(Typeface.DEFAULT_BOLD);
                btnToggle.setPadding(20, 10, 20, 10);

                GradientDrawable btnTgBg = new GradientDrawable();
                if (isCompleted) {
                    btnTgBg.setColor(Color.parseColor("#1C3A27"));
                    btnTgBg.setStroke(1, Color.parseColor("#30D158"));
                } else {
                    btnTgBg.setColor(Color.parseColor("#30D158")); // Apple Emerald
                }
                btnTgBg.setCornerRadius(14);
                btnToggle.setBackground(btnTgBg);

                final boolean finalIsCompleted = isCompleted;
                btnToggle.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        toggleTaskCompletion(taskId, todayDate, !finalIsCompleted);
                    }
                });
                topRow.addView(btnToggle);
                itemCard.addView(topRow);

                // Row 2: Title Agenda
                TextView tvTitle = new TextView(this);
                tvTitle.setText(title);
                tvTitle.setTextColor(Color.parseColor(isCompleted ? "#8E8E93" : "#FFFFFF"));
                tvTitle.setTextSize(15);
                tvTitle.setTypeface(Typeface.DEFAULT_BOLD);
                tvTitle.setPadding(0, 10, 0, 4);
                if (isCompleted) {
                    tvTitle.setPaintFlags(tvTitle.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
                }
                itemCard.addView(tvTitle);

                // Row 3: Note & Recurrence Pills
                LinearLayout metaRow = new LinearLayout(this);
                metaRow.setOrientation(LinearLayout.HORIZONTAL);
                metaRow.setGravity(Gravity.CENTER_VERTICAL);
                metaRow.setPadding(0, 4, 0, 0);

                // Recurrence Tag
                TextView tvRec = new TextView(this);
                String recLabel = "Tiap Hari";
                if ("weekdays".equals(recurrence)) recLabel = "Senin - Jumat";
                else if ("weekends".equals(recurrence)) recLabel = "Sabtu & Minggu";
                else if ("weekly_monday".equals(recurrence)) recLabel = "Tiap Senin";
                else if ("weekly_tuesday".equals(recurrence)) recLabel = "Tiap Selasa";
                else if ("weekly_wednesday".equals(recurrence)) recLabel = "Tiap Rabu";
                else if ("weekly_thursday".equals(recurrence)) recLabel = "Tiap Kamis";
                else if ("weekly_friday".equals(recurrence)) recLabel = "Tiap Jumat";
                else if ("weekly_saturday".equals(recurrence)) recLabel = "Tiap Sabtu";
                else if ("weekly_sunday".equals(recurrence)) recLabel = "Tiap Minggu";
                else if ("weekly_day".equals(recurrence)) recLabel = "Mingguan";
                else if ("yearly".equals(recurrence)) recLabel = "Tiap Tahun";
                else if ("none".equals(recurrence)) recLabel = "Sekali Saja";
                tvRec.setText(recLabel);
                tvRec.setTextColor(Color.parseColor("#8E8E93"));
                tvRec.setTextSize(10);
                tvRec.setTypeface(Typeface.DEFAULT_BOLD);
                tvRec.setPadding(12, 4, 12, 4);

                GradientDrawable recBg = new GradientDrawable();
                recBg.setColor(Color.parseColor("#2C2C2E"));
                recBg.setCornerRadius(8);
                tvRec.setBackground(recBg);
                metaRow.addView(tvRec);

                // Alarm Active Indicator
                TextView tvAlarmIndicator = new TextView(this);
                tvAlarmIndicator.setText(isCompleted ? "  •  Alarm Terpenuhi" : "  •  🔔 Alarm Siaga");
                tvAlarmIndicator.setTextColor(Color.parseColor(isCompleted ? "#636366" : "#FF9F0A"));
                tvAlarmIndicator.setTextSize(11);
                tvAlarmIndicator.setTypeface(Typeface.DEFAULT_BOLD);
                metaRow.addView(tvAlarmIndicator);

                itemCard.addView(metaRow);

                if (!note.isEmpty()) {
                    TextView tvNote = new TextView(this);
                    tvNote.setText(note);
                    tvNote.setTextColor(Color.parseColor("#8E8E93"));
                    tvNote.setTextSize(12);
                    tvNote.setPadding(0, 6, 0, 0);
                    itemCard.addView(tvNote);
                }

                tasksContainer.addView(itemCard);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (tvSummaryTotal != null) tvSummaryTotal.setText(String.valueOf(countTotal));
        if (tvSummaryActive != null) tvSummaryActive.setText(String.valueOf(countActive));
        if (tvSummaryDone != null) tvSummaryDone.setText(String.valueOf(countDone));
    }

    // ===================== TWO-WAY INTERACTIVE SYNC HANDLER =====================
    private void toggleTaskCompletion(final String taskId, final String todayDate, final boolean markDone) {
        // 1. Optimistic Update in Local SharedPreferences Cache
        SharedPreferences prefs = getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String jsonStr = prefs.getString(KEY_CACHED_TASKS, "[]");
        try {
            JSONArray arr = new JSONArray(jsonStr);
            for (int i = 0; i < arr.length(); i++) {
                JSONObject t = arr.getJSONObject(i);
                if (taskId.equals(t.optString("id"))) {
                    String rec = t.optString("recurrence", "none");
                    boolean isRec = (rec != null && !rec.isEmpty() && !"none".equals(rec));
                    if (!isRec) {
                        t.put("status", markDone ? "done" : "todo");
                    } else {
                        t.put("status", "todo");
                    }
                    JSONArray comp = t.optJSONArray("completedDates");
                    if (comp == null) comp = new JSONArray();

                    JSONArray newComp = new JSONArray();
                    for (int k = 0; k < comp.length(); k++) {
                        String d = comp.optString(k);
                        if (!todayDate.equals(d)) newComp.put(d);
                    }
                    if (markDone) newComp.put(todayDate);
                    t.put("completedDates", newComp);
                    break;
                }
            }
            prefs.edit().putString(KEY_CACHED_TASKS, arr.toString()).apply();
            loadCachedTasksUI();
            NotificationHelper.updateStatusNotifications(MainActivity.this, arr);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 2. Dispatch to Cloud Database (or Queue if Offline)
        new Thread(new Runnable() {
            @Override
            public void run() {
                boolean sent = false;
                try {
                    URL url = new URL(DEFAULT_SERVER_URL);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setRequestProperty("User-Agent", "AuraDeskAlarm/2.0 (Samsung Galaxy A10s SM-A107F)");
                    conn.setRequestProperty("X-Device-Id", "Samsung-A10s");
                    conn.setRequestProperty("X-Battery-Level", getBatteryLevel(MainActivity.this) + "%");
                    conn.setDoOutput(true);
                    conn.setConnectTimeout(6000);
                    conn.setReadTimeout(6000);

                    String payload = "{\"action\":\"" + (markDone ? "markDone" : "toggleTask") + "\",\"taskId\":\"" + taskId + "\",\"date\":\"" + todayDate + "\"}";
                    OutputStream os = conn.getOutputStream();
                    os.write(payload.getBytes("UTF-8"));
                    os.close();

                    int resCode = conn.getResponseCode();
                    conn.disconnect();
                    if (resCode == 200) sent = true;
                } catch (Exception ignored) {}

                if (!sent) {
                    // Queue for offline sync
                    enqueueOfflineAction(taskId, todayDate, markDone);
                    mainHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(MainActivity.this, "Disimpan offline di HP. Otomatis disinkronkan saat online.", Toast.LENGTH_SHORT).show();
                        }
                    });
                } else {
                    mainHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(MainActivity.this, markDone ? "Agenda dicoret & tersinkron ke Database Web ✓" : "Agenda diaktifkan kembali di Database Web", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        }).start();
    }

    private void enqueueOfflineAction(String taskId, String date, boolean markDone) {
        SharedPreferences prefs = getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String qStr = prefs.getString(KEY_OFFLINE_ACTIONS, "[]");
        try {
            JSONArray q = new JSONArray(qStr);
            JSONObject item = new JSONObject();
            item.put("taskId", taskId);
            item.put("date", date);
            item.put("markDone", markDone);
            q.put(item);
            prefs.edit().putString(KEY_OFFLINE_ACTIONS, q.toString()).apply();
        } catch (Exception ignored) {}
    }

    public static void flushOfflineQueue(Context ctx) {
        SharedPreferences prefs = ctx.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String qStr = prefs.getString(KEY_OFFLINE_ACTIONS, "[]");
        if (qStr.equals("[]")) return;

        try {
            JSONArray q = new JSONArray(qStr);
            JSONArray remaining = new JSONArray();

            for (int i = 0; i < q.length(); i++) {
                JSONObject item = q.getJSONObject(i);
                String taskId = item.optString("taskId");
                String date = item.optString("date");
                boolean markDone = item.optBoolean("markDone", true);

                try {
                    URL url = new URL(DEFAULT_SERVER_URL);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setDoOutput(true);
                    conn.setConnectTimeout(5000);
                    conn.setReadTimeout(5000);

                    String payload = "{\"action\":\"" + (markDone ? "markDone" : "toggleTask") + "\",\"taskId\":\"" + taskId + "\",\"date\":\"" + date + "\"}";
                    OutputStream os = conn.getOutputStream();
                    os.write(payload.getBytes("UTF-8"));
                    os.close();

                    int resCode = conn.getResponseCode();
                    conn.disconnect();
                    if (resCode != 200) {
                        remaining.put(item);
                    }
                } catch (Exception e) {
                    remaining.put(item);
                }
            }

            prefs.edit().putString(KEY_OFFLINE_ACTIONS, remaining.toString()).apply();
        } catch (Exception ignored) {}
    }

    // ===================== ROBUST OFFLINE-FALLBACK ALARM SCHEDULER =====================
    public interface SyncCallback {
        void onSyncComplete(boolean success, int scheduledCount, String error);
    }

    public static void syncAndScheduleAlarms(final Context context, final SyncCallback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                boolean networkSuccess = false;
                JSONArray tasks = null;
                JSONObject alarmConf = null;

                // 1. Try to fetch from Online Database
                try {
                    URL url = new URL(DEFAULT_SERVER_URL);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setRequestProperty("User-Agent", "AuraDeskAlarm/2.0 (Samsung Galaxy A10s SM-A107F)");
                    conn.setRequestProperty("X-Device-Id", "Samsung-A10s");
                    conn.setRequestProperty("X-Battery-Level", getBatteryLevel(context) + "%");
                    conn.setConnectTimeout(7000);
                    conn.setReadTimeout(7000);

                    int code = conn.getResponseCode();
                    if (code == 200) {
                        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                        StringBuilder sb = new StringBuilder();
                        String line;
                        while ((line = reader.readLine()) != null) {
                            sb.append(line);
                        }
                        reader.close();
                        conn.disconnect();

                        JSONObject res = new JSONObject(sb.toString());
                        tasks = res.optJSONArray("tasks");
                        JSONObject settings = res.optJSONObject("settings");
                        alarmConf = settings != null ? settings.optJSONObject("alarm") : null;
                        networkSuccess = true;

                        // Periksa sinyal uji coba alarm dari Web Dashboard (Cloud Remote Trigger)
                        if (settings != null) {
                            JSONObject testSignal = settings.optJSONObject("alarm_test_signal");
                            if (testSignal != null) {
                                long trigTime = testSignal.optLong("timestamp", 0);
                                SharedPreferences sPrefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
                                long lastHandled = sPrefs.getLong("last_handled_test_signal", 0);
                                if (trigTime > 0 && trigTime > lastHandled && (System.currentTimeMillis() - trigTime) < 90000) {
                                    sPrefs.edit().putLong("last_handled_test_signal", trigTime).apply();
                                    try {
                                        Intent serviceIntent = new Intent(context, AlarmSoundService.class);
                                        serviceIntent.setAction(AlarmSoundService.ACTION_START);
                                        serviceIntent.putExtra(AlarmSoundService.EXTRA_TITLE, "Uji Coba Alarm dari Web Dashboard");
                                        serviceIntent.putExtra(AlarmSoundService.EXTRA_TIME, "Sekarang WIB");
                                        serviceIntent.putExtra(AlarmSoundService.EXTRA_TASK_ID, "cloud-test");
                                        if (Build.VERSION.SDK_INT >= 26) {
                                            context.startForegroundService(serviceIntent);
                                        } else {
                                            context.startService(serviceIntent);
                                        }
                                    } catch (Exception ignoredService) {}
                                }
                            }
                        }
                    }
                } catch (Exception ignored) {}

                // 2. Offline Fallback: If network failed, load from local SharedPreferences cache
                SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
                if (!networkSuccess || tasks == null) {
                    String cachedTasksStr = prefs.getString(KEY_CACHED_TASKS, null);
                    if (cachedTasksStr != null && !cachedTasksStr.isEmpty()) {
                        try {
                            tasks = new JSONArray(cachedTasksStr);
                        } catch (Exception ignored) {}
                    }
                    String cachedSettingsStr = prefs.getString(KEY_ALARM_SETTINGS, null);
                    if (cachedSettingsStr != null && !cachedSettingsStr.isEmpty()) {
                        try {
                            alarmConf = new JSONObject(cachedSettingsStr);
                        } catch (Exception ignored) {}
                    }
                }

                if (tasks == null) tasks = new JSONArray();

                boolean ringOnStart = alarmConf != null ? alarmConf.optBoolean("ringOnStart", true) : true;
                int ringBeforeMinutes = alarmConf != null ? alarmConf.optInt("ringBeforeMinutes", 0) : 0;
                boolean ringOnEnd = alarmConf != null ? alarmConf.optBoolean("ringOnEnd", true) : true;
                boolean ringOnWakeup = alarmConf != null ? alarmConf.optBoolean("ringOnWakeup", true) : true;

                // 3. Filter and Schedule Exact Hardware Alarms for Today
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
                sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
                String todayDate = sdf.format(new Date());

                JSONArray todayTasks = new JSONArray();
                AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

                int scheduled = 0;
                for (int i = 0; i < tasks.length(); i++) {
                    try {
                        JSONObject t = tasks.getJSONObject(i);
                        String recurrence = t.optString("recurrence", "none");
                        String date = t.optString("date", "");
                        String status = t.optString("status", "");

                        if ("cancelled".equals(status)) continue;

                        boolean isCompletedToday = false;
                        boolean isRecurring = (recurrence != null && !recurrence.isEmpty() && !"none".equals(recurrence));
                        if (!isRecurring) {
                            if ("done".equals(status)) isCompletedToday = true;
                        } else {
                            JSONArray compDates = t.optJSONArray("completedDates");
                            if (compDates != null) {
                                for (int c = 0; c < compDates.length(); c++) {
                                    if (todayDate.equals(compDates.optString(c))) {
                                        isCompletedToday = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (isCompletedToday) continue;

                        boolean applies = false;
                        if ("none".equals(recurrence)) {
                            applies = todayDate.equals(date);
                        } else if ("daily".equals(recurrence)) {
                            applies = true;
                        } else if ("weekdays".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            int dow = c.get(Calendar.DAY_OF_WEEK);
                            applies = (dow >= Calendar.MONDAY && dow <= Calendar.FRIDAY);
                        } else if ("weekends".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            int dow = c.get(Calendar.DAY_OF_WEEK);
                            applies = (dow == Calendar.SATURDAY || dow == Calendar.SUNDAY);
                        } else if ("weekly_sunday".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            applies = (c.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY);
                        } else if ("weekly_monday".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            applies = (c.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY);
                        } else if ("weekly_tuesday".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            applies = (c.get(Calendar.DAY_OF_WEEK) == Calendar.TUESDAY);
                        } else if ("weekly_wednesday".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            applies = (c.get(Calendar.DAY_OF_WEEK) == Calendar.WEDNESDAY);
                        } else if ("weekly_thursday".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            applies = (c.get(Calendar.DAY_OF_WEEK) == Calendar.THURSDAY);
                        } else if ("weekly_friday".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            applies = (c.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY);
                        } else if ("weekly_saturday".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            applies = (c.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY);
                        } else if ("weekly_day".equals(recurrence)) {
                            try {
                                SimpleDateFormat sdfTask = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
                                sdfTask.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
                                Date taskStartDate = sdfTask.parse(date);
                                Calendar cTask = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                                cTask.setTime(taskStartDate);
                                Calendar cToday = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                                applies = (cToday.get(Calendar.DAY_OF_WEEK) == cTask.get(Calendar.DAY_OF_WEEK));
                            } catch (Exception ignored) {}
                        } else if ("yearly".equals(recurrence)) {
                            if (date.length() >= 5 && todayDate.length() >= 5) {
                                applies = todayDate.substring(5).equals(date.substring(5));
                            }
                        }

                        if (!applies) continue;

                        String timeStart = t.optString("timeStart", "");
                        if (timeStart.isEmpty() || !timeStart.contains(":")) continue;

                        todayTasks.put(t);

                        String timeEnd = t.optString("timeEnd", "");
                        String taskId = t.optString("id", "task_" + i);
                        String taskTitle = t.optString("title", "Agenda");

                        // Schedule Exact Alarm on Start
                        String[] parts = timeStart.split(":");
                        int hour = Integer.parseInt(parts[0]);
                        int min = Integer.parseInt(parts[1]);

                        Calendar targetCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                        targetCal.set(Calendar.HOUR_OF_DAY, hour);
                        targetCal.set(Calendar.MINUTE, min);
                        targetCal.set(Calendar.SECOND, 0);
                        targetCal.set(Calendar.MILLISECOND, 0);
                        long triggerTimeStart = targetCal.getTimeInMillis();

                        // Warning X minutes before
                        if (ringBeforeMinutes > 0) {
                            long triggerBefore = triggerTimeStart - (ringBeforeMinutes * 60 * 1000L);
                            if (triggerBefore > System.currentTimeMillis()) {
                                Intent intent = new Intent(context, AlarmReceiver.class);
                                intent.putExtra(AlarmSoundService.EXTRA_TITLE, "⏰ Peringatan (" + ringBeforeMinutes + " Mnt): " + taskTitle);
                                intent.putExtra(AlarmSoundService.EXTRA_TIME, timeStart + " - " + timeEnd);
                                intent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId + "_before");

                                int reqCode = (taskId + "_before").hashCode() & 0x7fffffff;
                                PendingIntent pi = PendingIntent.getBroadcast(
                                        context, reqCode, intent,
                                        PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
                                );
                                setExactAlarm(am, triggerBefore, pi);
                                scheduled++;
                            }
                        }

                        // Exact Alarm at Start
                        if (ringOnStart && triggerTimeStart > System.currentTimeMillis()) {
                            Intent intent = new Intent(context, AlarmReceiver.class);
                            intent.putExtra(AlarmSoundService.EXTRA_TITLE, "🔔 Agenda Dimulai: " + taskTitle);
                            intent.putExtra(AlarmSoundService.EXTRA_TIME, timeStart + " - " + timeEnd);
                            intent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId + "_start");

                            int reqCode = (taskId + "_start").hashCode() & 0x7fffffff;
                            PendingIntent pi = PendingIntent.getBroadcast(
                                    context, reqCode, intent,
                                    PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
                            );
                            setExactAlarm(am, triggerTimeStart, pi);
                            scheduled++;
                        }

                        // Alarm at End (Evaluation / Checklist)
                        if (ringOnEnd && timeEnd.contains(":")) {
                            String[] endParts = timeEnd.split(":");
                            int endHour = Integer.parseInt(endParts[0]);
                            int endMin = Integer.parseInt(endParts[1]);

                            Calendar endCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            endCal.set(Calendar.HOUR_OF_DAY, endHour);
                            endCal.set(Calendar.MINUTE, endMin);
                            endCal.set(Calendar.SECOND, 0);
                            endCal.set(Calendar.MILLISECOND, 0);
                            long triggerTimeEnd = endCal.getTimeInMillis();

                            if (triggerTimeEnd > System.currentTimeMillis()) {
                                Intent intent = new Intent(context, AlarmReceiver.class);
                                intent.putExtra(AlarmSoundService.EXTRA_TITLE, "✅ Waktu Selesai (Checklist/Evaluasi): " + taskTitle);
                                intent.putExtra(AlarmSoundService.EXTRA_TIME, timeStart + " - " + timeEnd);
                                intent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId + "_end");

                                int reqCode = (taskId + "_end").hashCode() & 0x7fffffff;
                                PendingIntent pi = PendingIntent.getBroadcast(
                                        context, reqCode, intent,
                                        PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
                                );
                                setExactAlarm(am, triggerTimeEnd, pi);
                                scheduled++;
                            }
                        }
                    } catch (Exception ignored) {}
                }

                // Sleep Wakeup Alarm
                if (ringOnWakeup) {
                    for (int k = 0; k < todayTasks.length(); k++) {
                        try {
                            JSONObject st = todayTasks.getJSONObject(k);
                            String sTitle = st.optString("title", "").toLowerCase();
                            if (sTitle.contains("tidur") || sTitle.contains("istirahat")) {
                                String sEnd = st.optString("timeEnd", "");
                                if (sEnd.contains(":")) {
                                    String[] sp = sEnd.split(":");
                                    int wHour = Integer.parseInt(sp[0]);
                                    int wMin = Integer.parseInt(sp[1]);

                                    Calendar wCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                                    wCal.set(Calendar.HOUR_OF_DAY, wHour);
                                    wCal.set(Calendar.MINUTE, wMin);
                                    wCal.set(Calendar.SECOND, 0);
                                    wCal.set(Calendar.MILLISECOND, 0);
                                    long wTime = wCal.getTimeInMillis();

                                    if (wTime > System.currentTimeMillis()) {
                                        Intent intent = new Intent(context, AlarmReceiver.class);
                                        intent.putExtra(AlarmSoundService.EXTRA_TITLE, "🌅 Alarm Bangun Tidur • Waktu Istirahat Selesai");
                                        intent.putExtra(AlarmSoundService.EXTRA_TIME, sEnd + " WIB");
                                        intent.putExtra(AlarmSoundService.EXTRA_TASK_ID, "sleep_wakeup");

                                        int reqCode = "sleep_wakeup".hashCode() & 0x7fffffff;
                                        PendingIntent pi = PendingIntent.getBroadcast(
                                                context, reqCode, intent,
                                                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
                                        );
                                        setExactAlarm(am, wTime, pi);
                                        scheduled++;
                                    }
                                }
                            }
                        } catch (Exception ignored) {}
                    }
                }

                // 4. Update SharedPreferences Cache (Always fresh)
                if (todayTasks.length() > 0 || networkSuccess) {
                    prefs.edit()
                            .putString(KEY_CACHED_TASKS, todayTasks.toString())
                            .putString(KEY_ALARM_SETTINGS, alarmConf != null ? alarmConf.toString() : "{}")
                            .putLong(KEY_LAST_SYNC, System.currentTimeMillis())
                            .apply();
                }

                // 5. Update Status Notifications (Agenda Akan Datang & Sudah Terlewat)
                NotificationHelper.updateStatusNotifications(context, todayTasks);

                if (callback != null) {
                    callback.onSyncComplete(networkSuccess, scheduled, networkSuccess ? null : "Offline Mode");
                }
            }
        }).start();
    }

    public static void markTaskCompletedLocally(Context context, String taskId, String date) {
        if (context == null || taskId == null) return;
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
            String cachedStr = prefs.getString(KEY_CACHED_TASKS, null);
            if (cachedStr != null && !cachedStr.isEmpty()) {
                JSONArray arr = new JSONArray(cachedStr);
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject obj = arr.getJSONObject(i);
                    if (taskId.equals(obj.optString("id"))) {
                        String rec = obj.optString("recurrence", "none");
                        boolean isRec = (rec != null && !rec.isEmpty() && !"none".equals(rec));
                        if (!isRec) {
                            obj.put("status", "done");
                        } else {
                            obj.put("status", "todo");
                        }
                        JSONArray comp = obj.optJSONArray("completedDates");
                        if (comp == null) comp = new JSONArray();
                        boolean found = false;
                        for (int k = 0; k < comp.length(); k++) {
                            if (comp.optString(k).equals(date)) {
                                found = true;
                                break;
                            }
                        }
                        if (!found && date != null) comp.put(date);
                        obj.put("completedDates", comp);
                        break;
                    }
                }
                prefs.edit().putString(KEY_CACHED_TASKS, arr.toString()).apply();
            }
        } catch (Exception ignored) {}
    }

    public static boolean postTaskActionDirect(Context context, String taskId, String date, boolean markDone) {
        try {
            URL url = new URL(DEFAULT_SERVER_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("User-Agent", "AuraDeskAlarm/2.0 (Samsung Galaxy A10s SM-A107F)");
            conn.setRequestProperty("X-Device-Id", "Samsung-A10s");
            conn.setRequestProperty("X-Battery-Level", getBatteryLevel(context) + "%");
            conn.setDoOutput(true);
            conn.setConnectTimeout(6000);
            conn.setReadTimeout(6000);

            String payload = "{\"action\":\"" + (markDone ? "markDone" : "toggleTask") + "\",\"taskId\":\"" + taskId + "\",\"date\":\"" + date + "\"}";
            OutputStream os = conn.getOutputStream();
            os.write(payload.getBytes("UTF-8"));
            os.close();

            int code = conn.getResponseCode();
            conn.disconnect();
            return (code == 200);
        } catch (Exception e) {
            return false;
        }
    }

    private static void setExactAlarm(AlarmManager am, long triggerAtMillis, PendingIntent pi) {
        if (am == null) return;
        if (Build.VERSION.SDK_INT >= 23) {
            am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAtMillis, pi);
        } else {
            am.setExact(AlarmManager.RTC_WAKEUP, triggerAtMillis, pi);
        }
    }

    private void scheduleTestAlarm() {
        Toast.makeText(this, "Pengingat Getar & Notifikasi diuji dalam 3 detik (Tanpa Suara Berisik)...", Toast.LENGTH_SHORT).show();

        AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this, AlarmReceiver.class);
        intent.putExtra(AlarmSoundService.EXTRA_TITLE, "Agenda Dimulai: Uji Coba Pengingat");
        intent.putExtra(AlarmSoundService.EXTRA_TIME, "Sekarang");
        intent.putExtra(AlarmSoundService.EXTRA_TASK_ID, "test_agenda_silent");

        PendingIntent pi = PendingIntent.getBroadcast(
                this, 9999, intent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        long triggerAt = System.currentTimeMillis() + 3000;
        setExactAlarm(am, triggerAt, pi);
    }

    private void scheduleTestWakeupAlarm() {
        Toast.makeText(this, "Alarm Bangun Tidur (Suara Keras) diuji dalam 3 detik...", Toast.LENGTH_SHORT).show();

        AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this, AlarmReceiver.class);
        intent.putExtra(AlarmSoundService.EXTRA_TITLE, "Alarm Bangun Tidur (Uji Coba)");
        intent.putExtra(AlarmSoundService.EXTRA_TIME, "Sekarang");
        intent.putExtra(AlarmSoundService.EXTRA_TASK_ID, "sleep_wakeup_test");

        PendingIntent pi = PendingIntent.getBroadcast(
                this, 9998, intent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        long triggerAt = System.currentTimeMillis() + 3000;
        setExactAlarm(am, triggerAt, pi);
    }

    private void requestBatteryOptimizationExemption() {
        if (Build.VERSION.SDK_INT >= 23) {
            PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
            if (pm != null && !pm.isIgnoringBatteryOptimizations(getPackageName())) {
                Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + getPackageName()));
                try {
                    startActivity(intent);
                } catch (Exception e) {
                    Toast.makeText(this, "Buka Pengaturan > Aplikasi > Optimasi Baterai > Pilih Tidak Dibatasi", Toast.LENGTH_LONG).show();
                }
            } else {
                Toast.makeText(this, "Aplikasi sudah bebas pembatasan baterai!", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
