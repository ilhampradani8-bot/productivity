package me.ilhampradani.productivity.alarm;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.PowerManager;
import android.provider.Settings;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class MainActivity extends Activity {

    public static final String PREF_NAME = "aura_alarm_prefs";
    public static final String KEY_SERVER_URL = "server_url";
    public static final String KEY_CACHED_TASKS = "cached_tasks";
    public static final String KEY_ALARM_SETTINGS = "alarm_settings";
    public static final String KEY_LAST_SYNC = "last_sync";
    public static final String DEFAULT_SERVER_URL = "https://productivity.ilhampradani.me/api/sync";

    private LinearLayout tasksContainer;
    private TextView tvStatus;
    private TextView tvLastSync;
    private TextView tvAlarmCount;
    private Handler mainHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mainHandler = new Handler(Looper.getMainLooper());

        // Root View
        ScrollView scrollView = new ScrollView(this);
        scrollView.setBackgroundColor(Color.parseColor("#0F172A")); // Slate 900
        scrollView.setFillViewport(true);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(35, 45, 35, 55);

        // Header Title
        TextView tvHeader = new TextView(this);
        tvHeader.setText("AURA DESK ALARM");
        tvHeader.setTextColor(Color.WHITE);
        tvHeader.setTextSize(22);
        tvHeader.setTypeface(Typeface.MONOSPACE, Typeface.BOLD);
        tvHeader.setGravity(Gravity.CENTER);
        root.addView(tvHeader);

        TextView tvSub = new TextView(this);
        tvSub.setText("Executive Alarm & Telemetri • Ilham Pradani, S.H.");
        tvSub.setTextColor(Color.parseColor("#94A3B8"));
        tvSub.setTextSize(12);
        tvSub.setGravity(Gravity.CENTER);
        tvSub.setPadding(0, 5, 0, 30);
        root.addView(tvSub);

        // Status Card
        LinearLayout statusCard = new LinearLayout(this);
        statusCard.setOrientation(LinearLayout.VERTICAL);
        statusCard.setPadding(30, 25, 30, 25);
        GradientDrawable cardBg = new GradientDrawable();
        cardBg.setColor(Color.parseColor("#1E293B"));
        cardBg.setCornerRadius(20);
        cardBg.setStroke(2, Color.parseColor("#334155"));
        statusCard.setBackground(cardBg);

        tvStatus = new TextView(this);
        tvStatus.setText("● Terhubung ke Server Cloudflare");
        tvStatus.setTextColor(Color.parseColor("#10B981")); // Emerald
        tvStatus.setTextSize(13);
        tvStatus.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        statusCard.addView(tvStatus);

        tvLastSync = new TextView(this);
        tvLastSync.setText("Terakhir Sinkron: Belum pernah");
        tvLastSync.setTextColor(Color.parseColor("#CBD5E1"));
        tvLastSync.setTextSize(11);
        tvLastSync.setPadding(0, 6, 0, 6);
        statusCard.addView(tvLastSync);

        tvAlarmCount = new TextView(this);
        tvAlarmCount.setText("Alarm Aktif Hari Ini: Memuat...");
        tvAlarmCount.setTextColor(Color.parseColor("#A5B4FC"));
        tvAlarmCount.setTextSize(12);
        tvAlarmCount.setTypeface(Typeface.MONOSPACE, Typeface.BOLD);
        statusCard.addView(tvAlarmCount);

        root.addView(statusCard);

        // Action Buttons Row
        LinearLayout btnRow = new LinearLayout(this);
        btnRow.setOrientation(LinearLayout.VERTICAL);
        btnRow.setPadding(0, 25, 0, 25);

        // Button 1: Sync Now
        Button btnSync = new Button(this);
        btnSync.setText("🔄 Sinkronkan Jadwal Sekarang");
        btnSync.setTextColor(Color.WHITE);
        btnSync.setTextSize(14);
        btnSync.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        GradientDrawable btnSyncBg = new GradientDrawable();
        btnSyncBg.setColor(Color.parseColor("#4F46E5")); // Indigo 600
        btnSyncBg.setCornerRadius(16);
        btnSync.setBackground(btnSyncBg);
        btnSync.setPadding(20, 20, 20, 20);

        LinearLayout.LayoutParams p1 = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        p1.setMargins(0, 0, 0, 15);
        btnSync.setLayoutParams(p1);

        btnSync.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                triggerSync();
            }
        });
        btnRow.addView(btnSync);

        // Button 2: Test Alarm
        Button btnTest = new Button(this);
        btnTest.setText("🔊 Uji Coba Bunyi Alarm (3 Detik)");
        btnTest.setTextColor(Color.WHITE);
        btnTest.setTextSize(13);
        btnTest.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        GradientDrawable btnTestBg = new GradientDrawable();
        btnTestBg.setColor(Color.parseColor("#059669")); // Emerald 600
        btnTestBg.setCornerRadius(16);
        btnTest.setBackground(btnTestBg);
        btnTest.setPadding(20, 20, 20, 20);

        LinearLayout.LayoutParams p2 = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        p2.setMargins(0, 0, 0, 15);
        btnTest.setLayoutParams(p2);

        btnTest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                scheduleTestAlarm();
            }
        });
        btnRow.addView(btnTest);

        // Button 3: Battery Whitelist (Samsung Anti-Kill)
        Button btnBattery = new Button(this);
        btnBattery.setText("⚡ Izinkan Alarm Berjalan di Latar (Samsung)");
        btnBattery.setTextColor(Color.parseColor("#E2E8F0"));
        btnBattery.setTextSize(12);
        GradientDrawable btnBatBg = new GradientDrawable();
        btnBatBg.setColor(Color.parseColor("#334155"));
        btnBatBg.setCornerRadius(16);
        btnBattery.setBackground(btnBatBg);
        btnBattery.setPadding(20, 18, 20, 18);

        btnBattery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                requestBatteryOptimizationExemption();
            }
        });
        btnRow.addView(btnBattery);

        root.addView(btnRow);

        // Alarms List Header
        TextView tvListTitle = new TextView(this);
        tvListTitle.setText("DAFTAR ALARM AGENDA HARI INI");
        tvListTitle.setTextColor(Color.WHITE);
        tvListTitle.setTextSize(13);
        tvListTitle.setTypeface(Typeface.MONOSPACE, Typeface.BOLD);
        tvListTitle.setPadding(0, 10, 0, 15);
        root.addView(tvListTitle);

        // Tasks Container
        tasksContainer = new LinearLayout(this);
        tasksContainer.setOrientation(LinearLayout.VERTICAL);
        root.addView(tasksContainer);

        scrollView.addView(root);
        setContentView(scrollView);

        // Initial Load & Sync
        loadCachedTasksUI();
        triggerSync();
    }

    private void scheduleTestAlarm() {
        Toast.makeText(this, "Alarm uji coba akan berbunyi dalam 3 detik...", Toast.LENGTH_SHORT).show();

        AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this, AlarmReceiver.class);
        intent.putExtra(AlarmSoundService.EXTRA_TITLE, "Uji Coba Alarm Eksekutif");
        intent.putExtra(AlarmSoundService.EXTRA_TIME, "Sekarang");
        intent.putExtra(AlarmSoundService.EXTRA_TASK_ID, "test-alarm");

        PendingIntent pi = PendingIntent.getBroadcast(
                this, 9999, intent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        long triggerAt = System.currentTimeMillis() + 3000;
        if (Build.VERSION.SDK_INT >= 23) {
            am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pi);
        } else {
            am.setExact(AlarmManager.RTC_WAKEUP, triggerAt, pi);
        }
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
                Toast.makeText(this, "Aplikasi sudah diizinkan bebas pembatasan baterai!", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void triggerSync() {
        tvStatus.setText("● Sedang menyinkronkan ke database...");
        tvStatus.setTextColor(Color.parseColor("#F59E0B")); // Amber

        syncAndScheduleAlarms(this, new SyncCallback() {
            @Override
            public void onSyncComplete(boolean success, int scheduledCount, String error) {
                mainHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        if (success) {
                            tvStatus.setText("● Terhubung ke Database Online (200 OK)");
                            tvStatus.setTextColor(Color.parseColor("#10B981"));
                            SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy, HH:mm:ss", new Locale("id", "ID"));
                            tvLastSync.setText("Terakhir Sinkron: " + sdf.format(new Date()) + " WIB");
                            tvAlarmCount.setText("Alarm Aktif Hari Ini: " + scheduledCount + " Agenda");
                            loadCachedTasksUI();
                        } else {
                            tvStatus.setText("● Gagal terhubung: " + error);
                            tvStatus.setTextColor(Color.parseColor("#EF4444"));
                        }
                    }
                });
            }
        });
    }

    private void loadCachedTasksUI() {
        tasksContainer.removeAllViews();
        SharedPreferences prefs = getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String jsonStr = prefs.getString(KEY_CACHED_TASKS, null);

        if (jsonStr == null || jsonStr.isEmpty()) {
            TextView emptyTv = new TextView(this);
            emptyTv.setText("Belum ada agenda yang tersinkronkan. Klik tombol sinkron di atas.");
            emptyTv.setTextColor(Color.parseColor("#94A3B8"));
            emptyTv.setTextSize(12);
            emptyTv.setPadding(0, 10, 0, 10);
            tasksContainer.addView(emptyTv);
            return;
        }

        try {
            JSONArray arr = new JSONArray(jsonStr);
            for (int i = 0; i < arr.length(); i++) {
                JSONObject t = arr.getJSONObject(i);
                String title = t.optString("title", "Agenda");
                String start = t.optString("timeStart", "");
                String end = t.optString("timeEnd", "");

                LinearLayout itemCard = new LinearLayout(this);
                itemCard.setOrientation(LinearLayout.VERTICAL);
                itemCard.setPadding(25, 20, 25, 20);

                GradientDrawable itemBg = new GradientDrawable();
                itemBg.setColor(Color.parseColor("#1E293B"));
                itemBg.setCornerRadius(14);
                itemCard.setBackground(itemBg);

                LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
                );
                lp.setMargins(0, 0, 0, 12);
                itemCard.setLayoutParams(lp);

                TextView tvT = new TextView(this);
                tvT.setText(title);
                tvT.setTextColor(Color.WHITE);
                tvT.setTextSize(13);
                tvT.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
                itemCard.addView(tvT);

                TextView tvTime = new TextView(this);
                tvTime.setText("⏰ " + start + " - " + end + " WIB (Alarm Terpasang)");
                tvTime.setTextColor(Color.parseColor("#34D399"));
                tvTime.setTextSize(11);
                tvTime.setPadding(0, 4, 0, 0);
                itemCard.addView(tvTime);

                tasksContainer.addView(itemCard);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public interface SyncCallback {
        void onSyncComplete(boolean success, int scheduledCount, String error);
    }

    public static void syncAndScheduleAlarms(final Context context, final SyncCallback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL(DEFAULT_SERVER_URL);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setConnectTimeout(8000);
                    conn.setReadTimeout(8000);

                    int code = conn.getResponseCode();
                    if (code != 200) {
                        if (callback != null) callback.onSyncComplete(false, 0, "HTTP " + code);
                        return;
                    }

                    BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        sb.append(line);
                    }
                    reader.close();
                    conn.disconnect();

                    JSONObject res = new JSONObject(sb.toString());
                    JSONArray tasks = res.optJSONArray("tasks");
                    if (tasks == null) tasks = new JSONArray();

                    JSONObject settings = res.optJSONObject("settings");
                    JSONObject alarmConf = settings != null ? settings.optJSONObject("alarm") : null;
                    boolean ringOnStart = alarmConf != null ? alarmConf.optBoolean("ringOnStart", true) : true;
                    int ringBeforeMinutes = alarmConf != null ? alarmConf.optInt("ringBeforeMinutes", 0) : 0;
                    boolean ringOnEnd = alarmConf != null ? alarmConf.optBoolean("ringOnEnd", true) : true;
                    boolean ringOnWakeup = alarmConf != null ? alarmConf.optBoolean("ringOnWakeup", true) : true;

                    // Filter tasks for today (Jakarta Time)
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
                    sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
                    String todayDate = sdf.format(new Date());

                    JSONArray todayTasks = new JSONArray();
                    AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

                    int scheduled = 0;
                    for (int i = 0; i < tasks.length(); i++) {
                        JSONObject t = tasks.getJSONObject(i);
                        String recurrence = t.optString("recurrence", "none");
                        String date = t.optString("date", "");
                        String status = t.optString("status", "");

                        if ("cancelled".equals(status)) continue;

                        boolean applies = false;
                        if ("none".equals(recurrence)) {
                            applies = todayDate.equals(date);
                        } else if ("daily".equals(recurrence)) {
                            applies = true;
                        } else if ("weekdays".equals(recurrence)) {
                            Calendar c = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                            int dow = c.get(Calendar.DAY_OF_WEEK);
                            applies = (dow >= Calendar.MONDAY && dow <= Calendar.FRIDAY);
                        }

                        if (!applies) continue;

                        String timeStart = t.optString("timeStart", "");
                        if (timeStart.isEmpty() || !timeStart.contains(":")) continue;

                        todayTasks.put(t);

                        String timeEnd = t.optString("timeEnd", "");
                        String taskId = t.optString("id", "task_" + i);
                        String taskTitle = t.optString("title", "Agenda");

                        // 1. Waktu Mulai Agenda
                        String[] parts = timeStart.split(":");
                        int hour = Integer.parseInt(parts[0]);
                        int min = Integer.parseInt(parts[1]);

                        Calendar targetCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
                        targetCal.set(Calendar.HOUR_OF_DAY, hour);
                        targetCal.set(Calendar.MINUTE, min);
                        targetCal.set(Calendar.SECOND, 0);
                        targetCal.set(Calendar.MILLISECOND, 0);
                        long triggerTimeStart = targetCal.getTimeInMillis();

                        // OPSI A: Peringatan Awal (Early Warning X menit sebelum mulai)
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
                                if (Build.VERSION.SDK_INT >= 23) {
                                    am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerBefore, pi);
                                } else {
                                    am.setExact(AlarmManager.RTC_WAKEUP, triggerBefore, pi);
                                }
                                scheduled++;
                            }
                        }

                        // OPSI B: Alarm Tepat Waktu Mulai (00 Menit)
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
                            if (Build.VERSION.SDK_INT >= 23) {
                                am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerTimeStart, pi);
                            } else {
                                am.setExact(AlarmManager.RTC_WAKEUP, triggerTimeStart, pi);
                            }
                            scheduled++;
                        }

                        // OPSI C: Alarm Saat Agenda Berakhir (Checklist / Evaluasi Kendala)
                        if (ringOnEnd && timeEnd.contains(":")) {
                            try {
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
                                    if (Build.VERSION.SDK_INT >= 23) {
                                        am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerTimeEnd, pi);
                                    } else {
                                        am.setExact(AlarmManager.RTC_WAKEUP, triggerTimeEnd, pi);
                                    }
                                    scheduled++;
                                }
                            } catch (Exception e) {}
                        }
                    }

                    // OPSI D: Alarm Bangun Tidur Pagi (Alokasi Istirahat Habis)
                    if (ringOnWakeup) {
                        for (int k = 0; k < todayTasks.length(); k++) {
                            JSONObject st = todayTasks.getJSONObject(k);
                            String sTitle = st.optString("title", "").toLowerCase();
                            if (sTitle.contains("tidur") || sTitle.contains("istirahat")) {
                                String sEnd = st.optString("timeEnd", "");
                                if (sEnd.contains(":")) {
                                    try {
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
                                            if (Build.VERSION.SDK_INT >= 23) {
                                                am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, wTime, pi);
                                            } else {
                                                am.setExact(AlarmManager.RTC_WAKEUP, wTime, pi);
                                            }
                                            scheduled++;
                                        }
                                    } catch (Exception e) {}
                                }
                            }
                        }
                    }

                    // Simpan ke SharedPreferences
                    SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
                    prefs.edit()
                            .putString(KEY_CACHED_TASKS, todayTasks.toString())
                            .putString(KEY_ALARM_SETTINGS, alarmConf != null ? alarmConf.toString() : "{}")
                            .putLong(KEY_LAST_SYNC, System.currentTimeMillis())
                            .apply();

                    if (callback != null) callback.onSyncComplete(true, scheduled, null);

                } catch (Exception e) {
                    if (callback != null) callback.onSyncComplete(false, 0, e.getMessage());
                }
            }
        }).start();
    }
}
