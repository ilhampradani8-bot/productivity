package me.ilhampradani.productivity.alarm;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

/**
 * Aura Desk Notification Helper
 * Mengelola notifikasi status bar native untuk:
 * 1. Agenda Akan Datang (Upcoming - Channel Low/Default, Informatif)
 * 2. Agenda Terlewat (Missed - Channel Default, Wajib Evaluasi/Checklist)
 * 3. Sedang Pengingat (Ringing - Channel High, Heads-up)
 */
public class NotificationHelper {

    public static final String CHANNEL_UPCOMING = "aura_channel_upcoming";
    public static final String CHANNEL_MISSED = "aura_channel_missed";
    public static final String CHANNEL_ACTIVE = "aura_alarm_channel_high";

    public static final int NOTIF_ID_UPCOMING = 1001;
    public static final int NOTIF_ID_MISSED = 1002;
    public static final int NOTIF_ID_ACTIVE = 9901;

    public static void initChannels(Context context) {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm == null) return;

            // 1. Channel Agenda Akan Datang
            NotificationChannel cUpcoming = new NotificationChannel(
                    CHANNEL_UPCOMING,
                    "Agenda Akan Datang",
                    NotificationManager.IMPORTANCE_LOW
            );
            cUpcoming.setDescription("Notifikasi status informatif agenda eksekutif berikutnya");
            cUpcoming.setShowBadge(true);
            nm.createNotificationChannel(cUpcoming);

            // 2. Channel Agenda Terlewat
            NotificationChannel cMissed = new NotificationChannel(
                    CHANNEL_MISSED,
                    "Agenda Terlewat",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            cMissed.setDescription("Pemberitahuan agenda hari ini yang belum selesai dicoret");
            cMissed.enableVibration(true);
            cMissed.setShowBadge(true);
            nm.createNotificationChannel(cMissed);

            // 3. Channel Sedang Pengingat (Alarm Aktif)
            NotificationChannel cActive = new NotificationChannel(
                    CHANNEL_ACTIVE,
                    "Sedang Pengingat & Alarm",
                    NotificationManager.IMPORTANCE_HIGH
            );
            cActive.setDescription("Peringatan langsung saat alarm berdering");
            cActive.enableVibration(true);
            cActive.setBypassDnd(true);
            cActive.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            nm.createNotificationChannel(cActive);
        }
    }

    public static void updateStatusNotifications(Context context, JSONArray todayTasks) {
        if (context == null || todayTasks == null) return;
        initChannels(context);

        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
        String todayDate = sdf.format(new Date());

        Calendar nowCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
        int nowMins = nowCal.get(Calendar.HOUR_OF_DAY) * 60 + nowCal.get(Calendar.MINUTE);

        JSONObject nextUpcomingTask = null;
        int nextDiffMins = Integer.MAX_VALUE;

        List<JSONObject> missedTasks = new ArrayList<>();

        for (int i = 0; i < todayTasks.length(); i++) {
            JSONObject t = todayTasks.optJSONObject(i);
            if (t == null) continue;
            String status = t.optString("status", "");
            if ("cancelled".equals(status)) continue;

            // Periksa apakah sudah diselesaikan hari ini
            boolean isCompletedToday = false;
            if ("done".equals(status)) {
                isCompletedToday = true;
            }
            JSONArray compDates = t.optJSONArray("completedDates");
            if (compDates != null) {
                for (int k = 0; k < compDates.length(); k++) {
                    if (todayDate.equals(compDates.optString(k))) {
                        isCompletedToday = true;
                        break;
                    }
                }
            }
            if (isCompletedToday) continue;

            String timeStart = t.optString("timeStart", "");
            String timeEnd = t.optString("timeEnd", "");
            if (timeStart.isEmpty() || !timeStart.contains(":")) continue;

            int startMins = parseMins(timeStart);
            int endMins = timeEnd.contains(":") ? parseMins(timeEnd) : (startMins + 60);

            // 1. Agenda Terlewat: Waktu selesai sudah lewat dan belum dicoret
            if (nowMins > endMins) {
                missedTasks.add(t);
            } 
            // 2. Agenda Akan Datang: Belum selesai dan belum lewat batas akhir
            else {
                int diff = startMins - nowMins;
                if (diff < nextDiffMins) {
                    nextDiffMins = diff;
                    nextUpcomingTask = t;
                }
            }
        }

        // Tampilkan atau batalkan notifikasi Agenda Akan Datang
        if (nextUpcomingTask != null) {
            showUpcomingNotification(context, nm, nextUpcomingTask, nowMins, todayDate);
        } else {
            nm.cancel(NOTIF_ID_UPCOMING);
        }

        // Tampilkan atau batalkan notifikasi Agenda Terlewat
        if (!missedTasks.isEmpty()) {
            showMissedNotification(context, nm, missedTasks, todayDate);
        } else {
            nm.cancel(NOTIF_ID_MISSED);
        }
    }

    private static void showUpcomingNotification(Context context, NotificationManager nm, JSONObject task, int nowMins, String todayDate) {
        String title = task.optString("title", "Agenda Eksekutif");
        String timeStart = task.optString("timeStart", "");
        String timeEnd = task.optString("timeEnd", "");
        String taskId = task.optString("id", "");

        int startMins = parseMins(timeStart);
        int endMins = parseMins(timeEnd);

        String timeInfo;
        if (nowMins >= startMins && nowMins <= endMins) {
            timeInfo = "Sedang Berlangsung (" + timeStart + " - " + timeEnd + " WIB)";
        } else {
            int diff = startMins - nowMins;
            if (diff <= 60) {
                timeInfo = "Dimulai dalam " + diff + " menit (" + timeStart + " WIB)";
            } else {
                int hrs = diff / 60;
                int m = diff % 60;
                timeInfo = "Pukul " + timeStart + " WIB (dalam " + hrs + "j " + (m > 0 ? m + "m" : "") + ")";
            }
        }

        Intent appIntent = new Intent(context, MainActivity.class);
        appIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(
                context, 101, appIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        // Aksi langsung di notifikasi: Coret Selesai
        Intent doneIntent = new Intent(context, AlarmReceiver.class);
        doneIntent.putExtra("action", "action_mark_done");
        doneIntent.putExtra("task_id", taskId);
        doneIntent.putExtra("date", todayDate);
        PendingIntent donePi = PendingIntent.getBroadcast(
                context, (taskId + "_up_done").hashCode() & 0x7fffffff, doneIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        Notification.Builder builder = (Build.VERSION.SDK_INT >= 26)
                ? new Notification.Builder(context, CHANNEL_UPCOMING)
                : new Notification.Builder(context);

        builder.setContentTitle("Agenda Berikutnya: " + title)
                .setContentText(timeInfo)
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentIntent(pi)
                .setOngoing(true)
                .setAutoCancel(false)
                .addAction(android.R.drawable.checkbox_on_background, "Coret Selesai", donePi);

        nm.notify(NOTIF_ID_UPCOMING, builder.build());
    }

    private static void showMissedNotification(Context context, NotificationManager nm, List<JSONObject> missedTasks, String todayDate) {
        int count = missedTasks.size();
        String title;
        String content;

        JSONObject firstTask = missedTasks.get(0);
        String firstTitle = firstTask.optString("title", "Agenda");
        String firstTime = firstTask.optString("timeStart", "") + " - " + firstTask.optString("timeEnd", "");
        String firstId = firstTask.optString("id", "");

        if (count == 1) {
            title = "Agenda Terlewat: " + firstTitle;
            content = "Jadwal " + firstTime + " WIB belum dicoret. Ketuk untuk evaluasi.";
        } else {
            title = count + " Agenda Terlewat Belum Selesai";
            content = "Termasuk \"" + firstTitle + "\". Ketuk untuk evaluasi kendala.";
        }

        Intent appIntent = new Intent(context, MainActivity.class);
        appIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(
                context, 102, appIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        Notification.Builder builder = (Build.VERSION.SDK_INT >= 26)
                ? new Notification.Builder(context, CHANNEL_MISSED)
                : new Notification.Builder(context);

        builder.setContentTitle(title)
                .setContentText(content)
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setContentIntent(pi)
                .setAutoCancel(true);

        if (count == 1) {
            Intent doneIntent = new Intent(context, AlarmReceiver.class);
            doneIntent.putExtra("action", "action_mark_done");
            doneIntent.putExtra("task_id", firstId);
            doneIntent.putExtra("date", todayDate);
            PendingIntent donePi = PendingIntent.getBroadcast(
                    context, (firstId + "_miss_done").hashCode() & 0x7fffffff, doneIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0)
            );
            builder.addAction(android.R.drawable.checkbox_on_background, "Tandai Selesai", donePi);
        }

        nm.notify(NOTIF_ID_MISSED, builder.build());
    }

    private static int parseMins(String timeStr) {
        if (timeStr == null || !timeStr.contains(":")) return 0;
        try {
            String[] p = timeStr.trim().split(":");
            return Integer.parseInt(p[0]) * 60 + Integer.parseInt(p[1]);
        } catch (Exception e) {
            return 0;
        }
    }
}
