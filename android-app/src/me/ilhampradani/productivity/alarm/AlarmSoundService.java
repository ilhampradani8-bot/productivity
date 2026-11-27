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
import android.os.Vibrator;

public class AlarmSoundService extends Service {
    public static final String ACTION_START = "me.ilhampradani.alarm.START";
    public static final String ACTION_STOP = "me.ilhampradani.alarm.STOP";
    public static final String EXTRA_TITLE = "extra_title";
    public static final String EXTRA_TIME = "extra_time";
    public static final String EXTRA_TASK_ID = "extra_task_id";

    private static final String CHANNEL_ID = "aura_alarm_channel_high";
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
        createNotificationChannel();
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

        startForeground(NOTIF_ID, buildNotification(taskTitle, taskTime, taskId));
        playAlarmSoundAndVibrate();

        return START_STICKY;
    }

    private void playAlarmSoundAndVibrate() {
        if (isRinging) return;
        isRinging = true;

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
                vibrator.vibrate(pattern, 0); // Loop indefinitely
            }
        } catch (Exception e) {
            e.printStackTrace();
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

    private Notification buildNotification(String title, String time, String taskId) {
        Intent alertIntent = new Intent(this, AlarmAlertActivity.class);
        alertIntent.putExtra(EXTRA_TITLE, title);
        alertIntent.putExtra(EXTRA_TIME, time);
        alertIntent.putExtra(EXTRA_TASK_ID, taskId);
        alertIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent fullScreenPendingIntent = PendingIntent.getActivity(
                this, 0, alertIntent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        Intent stopIntent = new Intent(this, AlarmSoundService.class);
        stopIntent.setAction(ACTION_STOP);
        PendingIntent stopPendingIntent = PendingIntent.getService(
                this, 1, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        Notification.Builder builder = (Build.VERSION.SDK_INT >= 26)
                ? new Notification.Builder(this, CHANNEL_ID)
                : new Notification.Builder(this);

        builder.setContentTitle("🚨 PENGINGAT AGENDA EKSEKUTIF")
                .setContentText(title + " (" + time + " WIB)")
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentIntent(fullScreenPendingIntent)
                .setFullScreenIntent(fullScreenPendingIntent, true)
                .setOngoing(true)
                .addAction(android.R.drawable.ic_menu_close_clear_cancel, "Matikan Alarm", stopPendingIntent)
                .setPriority(Notification.PRIORITY_MAX);

        return builder.build();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) {
                NotificationChannel channel = new NotificationChannel(
                        CHANNEL_ID,
                        "Alarm Agenda Eksekutif",
                        NotificationManager.IMPORTANCE_HIGH
                );
                channel.setDescription("Alarm prioritas tinggi untuk agenda waktu eksekutif");
                channel.enableVibration(true);
                channel.setBypassDnd(true);
                channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                nm.createNotificationChannel(channel);
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
