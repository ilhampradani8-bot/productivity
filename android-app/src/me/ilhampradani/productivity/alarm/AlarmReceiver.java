package me.ilhampradani.productivity.alarm;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class AlarmReceiver extends BroadcastReceiver {

    public static final String CHANNEL_AGENDA_VIBRATE = "aura_channel_agenda_vibrate";

    /**
     * Memeriksa apakah alarm ini adalah Alarm Bangun Tidur.
     * Hanya Alarm Bangun Tidur yang diizinkan membunyikan audio sirene keras.
     * Semua agenda lainnya hanya berupa notifikasi dan getaran tanpa suara berisik.
     */
    public static boolean isWakeupAlarm(String taskId, String title) {
        if (taskId != null) {
            String lowerId = taskId.toLowerCase();
            if (lowerId.contains("sleep_wakeup") || lowerId.contains("wakeup") || lowerId.contains("bangun")) {
                return true;
            }
        }
        if (title != null) {
            String lowerTitle = title.toLowerCase();
            if (lowerTitle.contains("bangun") || lowerTitle.contains("wake up") || lowerTitle.contains("wakeup") || lowerTitle.contains("subuh")) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void onReceive(final Context context, Intent intent) {
        String action = intent.getStringExtra("action");

        // 1. Aksi Tandai Selesai langsung dari notifikasi (Akan Datang / Terlewat / Alarm Berdering)
        if ("action_mark_done".equals(action)) {
            final String taskId = intent.getStringExtra("task_id");
            String taskDate = intent.getStringExtra("date");
            if (taskDate == null || taskDate.isEmpty()) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
                sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
                taskDate = sdf.format(new Date());
            }
            final String date = taskDate;

            // Matikan suara & getar alarm jika sedang berdering
            Intent stopIntent = new Intent(context, AlarmSoundService.class);
            stopIntent.setAction(AlarmSoundService.ACTION_STOP);
            context.startService(stopIntent);

            // Batalkan notifikasi agenda jika ada
            if (taskId != null) {
                try {
                    NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
                    if (nm != null) {
                        int notifId = (taskId.hashCode() & 0x7fffffff);
                        nm.cancel(notifId);
                    }
                } catch (Exception ignored) {}
            }

            // Tandai selesai lokal & kirim ke database cloud di latar belakang
            new Thread(new Runnable() {
                @Override
                public void run() {
                    MainActivity.markTaskCompletedLocally(context, taskId, date);
                    MainActivity.postTaskActionDirect(context, taskId, date, true);
                    MainActivity.syncAndScheduleAlarms(context, null);
                }
            }).start();

            Toast.makeText(context, "Agenda berhasil dicoret selesai", Toast.LENGTH_SHORT).show();
            return;
        }

        // 2. Memicu sinkronisasi dari Web Dashboard
        if ("sync".equals(action)) {
            MainActivity.syncAndScheduleAlarms(context, new MainActivity.SyncCallback() {
                @Override
                public void onSyncComplete(boolean success, int scheduledCount, String error) {
                    if (success) {
                        Toast.makeText(context, "Aura Desk: Jadwal & Alarm berhasil diperbarui (" + scheduledCount + " Alarm aktif)", Toast.LENGTH_SHORT).show();
                    }
                }
            });
            return;
        }

        // 3. Pemicu Alarm Hardware Tiba (Saatnya berdering / bergetar)
        String title = intent.getStringExtra(AlarmSoundService.EXTRA_TITLE);
        String time = intent.getStringExtra(AlarmSoundService.EXTRA_TIME);
        String taskId = intent.getStringExtra(AlarmSoundService.EXTRA_TASK_ID);

        boolean isWakeup = isWakeupAlarm(taskId, title);

        if (isWakeup) {
            // ========================================================
            // KHUSUS ALARM BANGUN TIDUR: SUARA DERIK KERAS + LAYAR PENUH
            // ========================================================
            Intent serviceIntent = new Intent(context, AlarmSoundService.class);
            serviceIntent.setAction(AlarmSoundService.ACTION_START);
            serviceIntent.putExtra(AlarmSoundService.EXTRA_TITLE, title);
            serviceIntent.putExtra(AlarmSoundService.EXTRA_TIME, time);
            serviceIntent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId);
            serviceIntent.putExtra(AlarmSoundService.EXTRA_IS_WAKEUP, true);

            if (Build.VERSION.SDK_INT >= 26) {
                context.startForegroundService(serviceIntent);
            } else {
                context.startService(serviceIntent);
            }

            // Tampilkan Layar Penuh Bangun Tidur
            Intent alertIntent = new Intent(context, AlarmAlertActivity.class);
            alertIntent.putExtra(AlarmSoundService.EXTRA_TITLE, title);
            alertIntent.putExtra(AlarmSoundService.EXTRA_TIME, time);
            alertIntent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId);
            alertIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            context.startActivity(alertIntent);
        } else {
            // ========================================================
            // AGENDA BIASA: HANYA NOTIFIKASI + GETARAN (TIDAK BERISIK, 0% SUARA SIRENE)
            // ========================================================
            showAgendaNotificationWithVibration(context, title, time, taskId);
        }
    }

    private void showAgendaNotificationWithVibration(Context context, String title, String time, String taskId) {
        if (title == null || title.isEmpty()) title = "Agenda Eksekutif";
        if (time == null || time.isEmpty()) time = "Sekarang";

        // 1. Getaran Haptic Sopan (2 getaran terasa di saku, tanpa loop berisik)
        try {
            Vibrator v = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
            if (v != null && v.hasVibrator()) {
                long[] pattern = {0, 450, 200, 450};
                if (Build.VERSION.SDK_INT >= 26) {
                    v.vibrate(VibrationEffect.createWaveform(pattern, -1));
                } else {
                    v.vibrate(pattern, -1);
                }
            }
        } catch (Exception ignored) {}

        // 2. Tampilkan Notifikasi Heads-up Elegan di Status Bar
        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;

        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = nm.getNotificationChannel(CHANNEL_AGENDA_VIBRATE);
            if (channel == null) {
                channel = new NotificationChannel(
                        CHANNEL_AGENDA_VIBRATE,
                        "Pengingat Agenda (Getar & Notifikasi)",
                        NotificationManager.IMPORTANCE_HIGH
                );
                channel.setDescription("Pengingat getar dan notifikasi heads-up untuk agenda kerja tanpa suara berisik");
                channel.enableVibration(true);
                channel.setVibrationPattern(new long[]{0, 450, 200, 450});
                channel.setSound(null, null); // 100% hening tanpa audio sirene
                channel.enableLights(true);
                channel.setLightColor(Color.parseColor("#4F46E5"));
                channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                nm.createNotificationChannel(channel);
            }
        }

        // Intent Buka Aplikasi
        Intent appIntent = new Intent(context, MainActivity.class);
        appIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent appPi = PendingIntent.getActivity(
                context, (taskId + "_open").hashCode() & 0x7fffffff, appIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        // Intent Coret Selesai Langsung
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String todayDate = sdf.format(new Date());

        Intent doneIntent = new Intent(context, AlarmReceiver.class);
        doneIntent.putExtra("action", "action_mark_done");
        doneIntent.putExtra("task_id", taskId);
        doneIntent.putExtra("date", todayDate);
        PendingIntent donePi = PendingIntent.getBroadcast(
                context, (taskId + "_done_action").hashCode() & 0x7fffffff, doneIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        Notification.Builder builder = (Build.VERSION.SDK_INT >= 26)
                ? new Notification.Builder(context, CHANNEL_AGENDA_VIBRATE)
                : new Notification.Builder(context);

        builder.setContentTitle(title)
                .setContentText(time + " WIB • Pengingat Agenda Eksekutif")
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentIntent(appPi)
                .setAutoCancel(true)
                .setPriority(Notification.PRIORITY_HIGH)
                .addAction(android.R.drawable.checkbox_on_background, "Coret Selesai", donePi);

        int notifId = (taskId != null ? taskId.hashCode() : 8800) & 0x7fffffff;
        nm.notify(notifId, builder.build());
    }
}
