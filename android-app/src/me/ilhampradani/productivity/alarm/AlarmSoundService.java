package me.ilhampradani.productivity.alarm;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.os.VibrationEffect;
import android.os.Vibrator;

public class AlarmSoundService extends Service {
    public static final String ACTION_START = "me.ilhampradani.alarm.START";
    public static final String ACTION_STOP = "me.ilhampradani.alarm.STOP";
    public static final String EXTRA_TITLE = "extra_title";
    public static final String EXTRA_TIME = "extra_time";
    public static final String EXTRA_TASK_ID = "extra_task_id";
    public static final String EXTRA_IS_WAKEUP = "extra_is_wakeup";

    public static final String CHANNEL_WAKEUP_ID = "aura_alarm_channel_wakeup";
    public static final String CHANNEL_SILENT_VIBRATE_ID = "aura_channel_silent_vibrate";
    private static final int NOTIF_ID = 9901;

    private MediaPlayer mediaPlayer;
    private Vibrator vibrator;
    private static boolean isRinging = false;

    public static boolean isAlarmRinging() {
        return isRinging;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannels();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && ACTION_STOP.equals(intent.getAction())) {
            stopAlarm();
            stopSelf();
            return START_NOT_STICKY;
        }

        String taskTitle = intent != null && intent.hasExtra(EXTRA_TITLE) ? intent.getStringExtra(EXTRA_TITLE) : "Agenda Eksekutif";
        String taskTime = intent != null && intent.hasExtra(EXTRA_TIME) ? intent.getStringExtra(EXTRA_TIME) : "Sekarang";
        String taskId = intent != null && intent.hasExtra(EXTRA_TASK_ID) ? intent.getStringExtra(EXTRA_TASK_ID) : "";
        boolean isWakeup = intent != null && intent.getBooleanExtra(EXTRA_IS_WAKEUP, false);
        if (!isWakeup) {
            isWakeup = AlarmReceiver.isWakeupAlarm(taskId, taskTitle);
        }

        startForeground(NOTIF_ID, buildNotification(taskTitle, taskTime, taskId, isWakeup));
        playAlarmOrVibrate(isWakeup);

        return START_STICKY;
    }

    private void playAlarmOrVibrate(boolean isWakeup) {
        if (isRinging) return;
        isRinging = true;

        if (isWakeup) {
            // KHUSUS ALARM BANGUN TIDUR: PUTAR SUARA SIRENE KERAS + GETAR LOOPING
            try {
                Uri alarmUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
                if (alarmUri == null) {
                    alarmUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
                }
                if (alarmUri == null) {
                    alarmUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
                }

                mediaPlayer = new MediaPlayer();
                mediaPlayer.setDataSource(this, alarmUri);

                AudioAttributes audioAttributes = new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_ALARM)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                        .build();
                mediaPlayer.setAudioAttributes(audioAttributes);
                mediaPlayer.setLooping(true);
                mediaPlayer.prepare();
                mediaPlayer.start();
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (vibrator != null && vibrator.hasVibrator()) {
                    long[] pattern = {0, 600, 300, 600, 300, 800};
                    vibrator.vibrate(pattern, 0); // Loop indefinitely until dismissed
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            // AGENDA BIASA: 0% SUARA SIRENE (HANYA GETARAN 2 KALI)
            try {
                vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (vibrator != null && vibrator.hasVibrator()) {
                    long[] pattern = {0, 450, 200, 450};
                    if (Build.VERSION.SDK_INT >= 26) {
                        vibrator.vibrate(VibrationEffect.createWaveform(pattern, -1));
                    } else {
                        vibrator.vibrate(pattern, -1);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void stopAlarm() {
        isRinging = false;
        try {
            if (mediaPlayer != null) {
                if (mediaPlayer.isPlaying()) {
                    mediaPlayer.stop();
                }
                mediaPlayer.release();
                mediaPlayer = null;
            }
        } catch (Exception ignored) {}

        try {
            if (vibrator != null) {
                vibrator.cancel();
                vibrator = null;
            }
        } catch (Exception ignored) {}
    }

    private Notification buildNotification(String title, String time, String taskId, boolean isWakeup) {
        PendingIntent fullScreenPendingIntent = null;

        if (isWakeup) {
            Intent alertIntent = new Intent(this, AlarmAlertActivity.class);
            alertIntent.putExtra(EXTRA_TITLE, title);
            alertIntent.putExtra(EXTRA_TIME, time);
            alertIntent.putExtra(EXTRA_TASK_ID, taskId);
            alertIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

            fullScreenPendingIntent = PendingIntent.getActivity(
                    this, 0, alertIntent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
            );
        } else {
            Intent mainIntent = new Intent(this, MainActivity.class);
            mainIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

            fullScreenPendingIntent = PendingIntent.getActivity(
                    this, 0, mainIntent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
            );
        }

        Intent stopIntent = new Intent(this, AlarmSoundService.class);
        stopIntent.setAction(ACTION_STOP);
        PendingIntent stopPendingIntent = PendingIntent.getService(
                this, 1, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        Intent doneIntent = new Intent(this, AlarmReceiver.class);
        doneIntent.putExtra("action", "action_mark_done");
        doneIntent.putExtra("task_id", taskId);
        PendingIntent donePendingIntent = PendingIntent.getBroadcast(
                this, 2, doneIntent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        String channelId = isWakeup ? CHANNEL_WAKEUP_ID : CHANNEL_SILENT_VIBRATE_ID;

        Notification.Builder builder = (Build.VERSION.SDK_INT >= 26)
                ? new Notification.Builder(this, channelId)
                : new Notification.Builder(this);

        String notifTitle = isWakeup ? ("Alarm Bangun: " + title) : ("Pengingat: " + title);
        String notifSub = isWakeup ? (time + " WIB • Alarm Bangun Tidur Berdering") : (time + " WIB • Pengingat Jadwal Eksekutif");

        builder.setContentTitle(notifTitle)
                .setContentText(notifSub)
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentIntent(fullScreenPendingIntent)
                .setOngoing(isWakeup)
                .setAutoCancel(!isWakeup)
                .addAction(android.R.drawable.checkbox_on_background, "Coret Selesai", donePendingIntent)
                .addAction(android.R.drawable.ic_menu_close_clear_cancel, "Tutup", stopPendingIntent)
                .setPriority(Notification.PRIORITY_HIGH);

        if (isWakeup && fullScreenPendingIntent != null) {
            builder.setFullScreenIntent(fullScreenPendingIntent, true);
        }

        return builder.build();
    }

    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) {
                // 1. Channel Khusus Alarm Bangun Tidur (Audio Siren + Looping Vibrate)
                NotificationChannel channelWakeup = new NotificationChannel(
                        CHANNEL_WAKEUP_ID,
                        "Alarm Bangun Tidur Eksekutif",
                        NotificationManager.IMPORTANCE_HIGH
                );
                channelWakeup.setDescription("Alarm audio suara dering untuk membangunkan tidur");
                channelWakeup.enableVibration(true);
                channelWakeup.setBypassDnd(true);
                channelWakeup.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                nm.createNotificationChannel(channelWakeup);

                // 2. Channel Agenda Biasa (Getar + Notifikasi, 0% Suara Berisik)
                NotificationChannel channelSilent = new NotificationChannel(
                        CHANNEL_SILENT_VIBRATE_ID,
                        "Pengingat Agenda (Getar & Notifikasi)",
                        NotificationManager.IMPORTANCE_HIGH
                );
                channelSilent.setDescription("Notifikasi dan getaran tanpa suara keras untuk agenda kerja");
                channelSilent.enableVibration(true);
                channelSilent.setVibrationPattern(new long[]{0, 450, 200, 450});
                channelSilent.setSound(null, null); // 100% hening tanpa audio sirene
                channelSilent.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                nm.createNotificationChannel(channelSilent);
            }
        }
    }

    @Override
    public void onDestroy() {
        stopAlarm();
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
