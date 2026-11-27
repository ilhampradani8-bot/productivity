package me.ilhampradani.productivity.alarm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.widget.Toast;

public class AlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(final Context context, Intent intent) {
        String action = intent.getStringExtra("action");
        if ("sync".equals(action)) {
            // Trigger background sync and alarm rescheduling from web
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

        String title = intent.getStringExtra(AlarmSoundService.EXTRA_TITLE);
        String time = intent.getStringExtra(AlarmSoundService.EXTRA_TIME);
        String taskId = intent.getStringExtra(AlarmSoundService.EXTRA_TASK_ID);

        // 1. Jalankan Service Audio Alarm
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

        // 2. Tampilkan Layar Penuh Alarm Popup
        Intent alertIntent = new Intent(context, AlarmAlertActivity.class);
        alertIntent.putExtra(AlarmSoundService.EXTRA_TITLE, title);
        alertIntent.putExtra(AlarmSoundService.EXTRA_TIME, time);
        alertIntent.putExtra(AlarmSoundService.EXTRA_TASK_ID, taskId);
        alertIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        context.startActivity(alertIntent);
    }
}
