package me.ilhampradani.productivity.alarm;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class AlarmAlertActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Turn on screen and show over lockscreen (Samsung Android 11 compatible)
        if (Build.VERSION.SDK_INT >= 27) {
            setShowWhenLocked(true);
            setTurnScreenOn(true);
        } else {
            getWindow().addFlags(
                    WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                    WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                    WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
                    WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
            );
        }

        String taskTitle = getIntent().getStringExtra(AlarmSoundService.EXTRA_TITLE);
        if (taskTitle == null || taskTitle.isEmpty()) taskTitle = "Agenda Kerja Eksekutif";

        String taskTime = getIntent().getStringExtra(AlarmSoundService.EXTRA_TIME);
        if (taskTime == null || taskTime.isEmpty()) taskTime = "Waktu Selesai";

        final String taskId = getIntent().getStringExtra(AlarmSoundService.EXTRA_TASK_ID);

        // OLED True Black Root
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setGravity(Gravity.CENTER);
        root.setPadding(35, 60, 35, 60);
        root.setBackgroundColor(Color.parseColor("#000000"));

        // Apple Card Container
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setGravity(Gravity.CENTER);
        card.setPadding(40, 45, 40, 45);

        GradientDrawable cardBg = new GradientDrawable();
        cardBg.setColor(Color.parseColor("#1C1C1E")); // iOS secondary grouped background
        cardBg.setCornerRadius(28);
        cardBg.setStroke(2, Color.parseColor("#3A3A3C"));
        card.setBackground(cardBg);

        // Apple Alarm Icon Pill (Orange Bell)
        TextView iconView = new TextView(this);
        iconView.setText("🔔");
        iconView.setTextSize(52);
        iconView.setGravity(Gravity.CENTER);
        card.addView(iconView);

        // Subtitle Alert
        TextView alertTag = new TextView(this);
        alertTag.setText("EXECUTIVE ALARM");
        alertTag.setTextColor(Color.parseColor("#FF9F0A")); // Apple Orange
        alertTag.setTextSize(12);
        alertTag.setTypeface(Typeface.DEFAULT_BOLD);
        alertTag.setGravity(Gravity.CENTER);
        alertTag.setPadding(0, 16, 0, 8);
        card.addView(alertTag);

        // Task Title
        TextView titleView = new TextView(this);
        titleView.setText(taskTitle);
        titleView.setTextColor(Color.WHITE);
        titleView.setTextSize(20);
        titleView.setTypeface(Typeface.DEFAULT_BOLD);
        titleView.setGravity(Gravity.CENTER);
        titleView.setPadding(0, 6, 0, 12);
        card.addView(titleView);

        // Time Pillar (Apple Emerald / Cyan)
        TextView timeView = new TextView(this);
        timeView.setText("Pukul: " + taskTime + " WIB");
        timeView.setTextColor(Color.parseColor("#30D158")); // Apple Emerald
        timeView.setTextSize(15);
        timeView.setTypeface(Typeface.DEFAULT_BOLD);
        timeView.setGravity(Gravity.CENTER);
        timeView.setPadding(0, 0, 0, 35);
        card.addView(timeView);

        // Button 1: Hentikan Alarm (Apple Red)
        Button btnStop = new Button(this);
        btnStop.setText("Matikan Alarm");
        btnStop.setTextColor(Color.WHITE);
        btnStop.setTextSize(14);
        btnStop.setTypeface(Typeface.DEFAULT_BOLD);

        GradientDrawable btnStopBg = new GradientDrawable();
        btnStopBg.setColor(Color.parseColor("#FF453A")); // Apple Red
        btnStopBg.setCornerRadius(18);
        btnStop.setBackground(btnStopBg);
        btnStop.setPadding(25, 20, 25, 20);

        LinearLayout.LayoutParams btnParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        btnParams.setMargins(0, 0, 0, 16);
        btnStop.setLayoutParams(btnParams);

        btnStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopAlarmService();
                finish();
            }
        });
        card.addView(btnStop);

        // Button 2: Tandai Selesai di Web & Database (Apple Emerald)
        Button btnDone = new Button(this);
        btnDone.setText("Selesai & Catat di Database ✓");
        btnDone.setTextColor(Color.WHITE);
        btnDone.setTextSize(14);
        btnDone.setTypeface(Typeface.DEFAULT_BOLD);

        GradientDrawable btnDoneBg = new GradientDrawable();
        btnDoneBg.setColor(Color.parseColor("#30D158")); // Apple Emerald
        btnDoneBg.setCornerRadius(18);
        btnDone.setBackground(btnDoneBg);
        btnDone.setPadding(25, 20, 25, 20);
        btnDone.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        btnDone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopAlarmService();
                markTaskDoneTwoWay(taskId);
                Toast.makeText(AlarmAlertActivity.this, "Agenda ditandai selesai!", Toast.LENGTH_SHORT).show();
                finish();
            }
        });
        card.addView(btnDone);

        root.addView(card);
        setContentView(root);
    }

    private void stopAlarmService() {
        Intent stopIntent = new Intent(this, AlarmSoundService.class);
        stopIntent.setAction(AlarmSoundService.ACTION_STOP);
        startService(stopIntent);
    }

    private void markTaskDoneTwoWay(final String cleanTaskId) {
        if (cleanTaskId == null || cleanTaskId.isEmpty()) return;

        // Strip suffixes like _start, _end, _before
        String rawId = cleanTaskId;
        if (rawId.endsWith("_start")) rawId = rawId.substring(0, rawId.length() - 6);
        else if (rawId.endsWith("_end")) rawId = rawId.substring(0, rawId.length() - 4);
        else if (rawId.endsWith("_before")) rawId = rawId.substring(0, rawId.length() - 7);

        final String finalTaskId = rawId;

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        final String todayDate = sdf.format(new Date());

        // 1. Optimistic Update in Local Cache
        SharedPreferences prefs = getSharedPreferences(MainActivity.PREF_NAME, Context.MODE_PRIVATE);
        String jsonStr = prefs.getString(MainActivity.KEY_CACHED_TASKS, "[]");
        try {
            JSONArray arr = new JSONArray(jsonStr);
            for (int i = 0; i < arr.length(); i++) {
                JSONObject t = arr.getJSONObject(i);
                if (finalTaskId.equals(t.optString("id"))) {
                    t.put("status", "done");
                    JSONArray comp = t.optJSONArray("completedDates");
                    if (comp == null) comp = new JSONArray();
                    boolean exists = false;
                    for (int k = 0; k < comp.length(); k++) {
                        if (todayDate.equals(comp.optString(k))) { exists = true; break; }
                    }
                    if (!exists) comp.put(todayDate);
                    t.put("completedDates", comp);
                    break;
                }
            }
            prefs.edit().putString(MainActivity.KEY_CACHED_TASKS, arr.toString()).apply();
        } catch (Exception ignored) {}

        // 2. Dispatch to Server or Queue if Offline
        new Thread(new Runnable() {
            @Override
            public void run() {
                boolean sent = false;
                try {
                    URL url = new URL(MainActivity.DEFAULT_SERVER_URL);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setDoOutput(true);
                    conn.setConnectTimeout(6000);
                    conn.setReadTimeout(6000);

                    String payload = "{\"action\":\"markDone\",\"taskId\":\"" + finalTaskId + "\",\"date\":\"" + todayDate + "\"}";
                    OutputStream os = conn.getOutputStream();
                    os.write(payload.getBytes("UTF-8"));
                    os.close();

                    int resCode = conn.getResponseCode();
                    conn.disconnect();
                    if (resCode == 200) sent = true;
                } catch (Exception ignored) {}

                if (!sent) {
                    // Queue for offline sync
                    SharedPreferences p = getSharedPreferences(MainActivity.PREF_NAME, Context.MODE_PRIVATE);
                    String qStr = p.getString(MainActivity.KEY_OFFLINE_ACTIONS, "[]");
                    try {
                        JSONArray q = new JSONArray(qStr);
                        JSONObject item = new JSONObject();
                        item.put("taskId", finalTaskId);
                        item.put("date", todayDate);
                        item.put("markDone", true);
                        q.put(item);
                        p.edit().putString(MainActivity.KEY_OFFLINE_ACTIONS, q.toString()).apply();
                    } catch (Exception ignored) {}
                }
            }
        }).start();
    }

    @Override
    public void onBackPressed() {
        stopAlarmService();
        super.onBackPressed();
    }
}
