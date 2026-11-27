package me.ilhampradani.productivity.alarm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class AlarmReceiver extends BroadcastReceiver {
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

        // 3. Pemicu Alarm Hardware Tiba (Saatnya berdering)
        String title = intent.getStringExtra(AlarmSoundService.EXTRA_TITLE);
        String time = intent.getStringExtra(AlarmSoundService.EXTRA_TIME);
        String taskId = intent.getStringExtra(AlarmSoundService.EXTRA_TASK_ID);

        // Jalankan Service Audio Alarm
        Intent serviceIntent = new Intent(context, AlarmSoundService.class);
        serviceIntent.setAction(AlarmSoundService.ACTION_START);
        serviceIntent.putExtra(AlarmSoundService.EXTRA_TITLE, title);
        serviceIntent.putExtra(AlarmSoundService.EXTRA_TIME, time);
        serviceIntent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId);

        if (Build.VERSION.SDK_INT >= 26) {
            context.startForegroundService(serviceIntent);
        } else {
            context.startService(serviceIntent);
        }

        // Tampilkan Layar Penuh Alarm Popup
        Intent alertIntent = new Intent(context, AlarmAlertActivity.class);
        alertIntent.putExtra(AlarmSoundService.EXTRA_TITLE, title);
        alertIntent.putExtra(AlarmSoundService.EXTRA_TIME, time);
        alertIntent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId);
        alertIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        context.startActivity(alertIntent);
    }
}
