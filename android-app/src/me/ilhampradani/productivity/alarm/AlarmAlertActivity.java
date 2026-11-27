package me.ilhampradani.productivity.alarm;

import android.app.Activity;
import android.content.Intent;
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

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

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

        // Root Container
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setGravity(Gravity.CENTER);
        root.setPadding(40, 60, 40, 60);
        root.setBackgroundColor(Color.parseColor("#0F172A")); // Slate 900 dark theme

        // Card Box
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setGravity(Gravity.CENTER);
        card.setPadding(45, 50, 45, 50);

        GradientDrawable cardBg = new GradientDrawable();
        cardBg.setColor(Color.parseColor("#1E293B")); // Slate 800
        cardBg.setCornerRadius(32);
        cardBg.setStroke(3, Color.parseColor("#4F46E5")); // Indigo accent
        card.setBackground(cardBg);

        // Icon Pill
        TextView iconView = new TextView(this);
        iconView.setText("⏰");
        iconView.setTextSize(54);
        iconView.setGravity(Gravity.CENTER);
        card.addView(iconView);

        // Subtitle Alert
        TextView alertTag = new TextView(this);
        alertTag.setText("PENGINGAT AGENDA EKSEKUTIF");
        alertTag.setTextColor(Color.parseColor("#A5B4FC")); // Indigo 200
        alertTag.setTextSize(13);
        alertTag.setTypeface(Typeface.MONOSPACE, Typeface.BOLD);
        alertTag.setGravity(Gravity.CENTER);
        alertTag.setPadding(0, 20, 0, 10);
        card.addView(alertTag);

        // Task Title
        TextView titleView = new TextView(this);
        titleView.setText(taskTitle);
        titleView.setTextColor(Color.WHITE);
        titleView.setTextSize(22);
        titleView.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        titleView.setGravity(Gravity.CENTER);
        titleView.setPadding(0, 10, 0, 15);
        card.addView(titleView);

        // Time Pillar
        TextView timeView = new TextView(this);
        timeView.setText("Waktu: " + taskTime + " WIB");
        timeView.setTextColor(Color.parseColor("#34D399")); // Emerald 400
        timeView.setTextSize(16);
        timeView.setTypeface(Typeface.MONOSPACE, Typeface.BOLD);
        timeView.setGravity(Gravity.CENTER);
        timeView.setPadding(0, 0, 0, 40);
        card.addView(timeView);

        // Button 1: Matikan Alarm
        Button btnStop = new Button(this);
        btnStop.setText("Matikan Alarm");
        btnStop.setTextColor(Color.WHITE);
        btnStop.setTextSize(15);
        btnStop.setTypeface(Typeface.DEFAULT, Typeface.BOLD);

        GradientDrawable btnStopBg = new GradientDrawable();
        btnStopBg.setColor(Color.parseColor("#DC2626")); // Red 600
        btnStopBg.setCornerRadius(24);
        btnStop.setBackground(btnStopBg);
        btnStop.setPadding(30, 25, 30, 25);

        LinearLayout.LayoutParams btnParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        btnParams.setMargins(0, 0, 0, 20);
        btnStop.setLayoutParams(btnParams);

        btnStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopAlarmService();
                finish();
            }
        });
        card.addView(btnStop);

        // Button 2: Tandai Selesai di Web / Database
        Button btnDone = new Button(this);
        btnDone.setText("Selesai & Catat di Database ✓");
        btnDone.setTextColor(Color.WHITE);
        btnDone.setTextSize(14);
        btnDone.setTypeface(Typeface.DEFAULT, Typeface.BOLD);

        GradientDrawable btnDoneBg = new GradientDrawable();
        btnDoneBg.setColor(Color.parseColor("#059669")); // Emerald 600
        btnDoneBg.setCornerRadius(24);
        btnDone.setBackground(btnDoneBg);
        btnDone.setPadding(30, 25, 30, 25);
        btnDone.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        btnDone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopAlarmService();
                markTaskDoneInDatabase(taskId);
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

    private void markTaskDoneInDatabase(final String taskId) {
        if (taskId == null || taskId.isEmpty()) return;
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    // Kirim pembaruan ke server productivity
                    URL url = new URL("https://productivity.ilhampradani.me/api/sync");
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setDoOutput(true);
                    conn.setConnectTimeout(6000);
                    conn.setReadTimeout(6000);

                    // Payload sederhana tanda selesai
                    String payload = "{\"action\":\"markDone\",\"taskId\":\"" + taskId + "\"}";
                    OutputStream os = conn.getOutputStream();
                    os.write(payload.getBytes("UTF-8"));
                    os.close();
                    conn.getResponseCode();
                    conn.disconnect();
                } catch (Exception ignored) {}
            }
        }).start();
    }

    @Override
    public void onBackPressed() {
        stopAlarmService();
        super.onBackPressed();
    }
}
