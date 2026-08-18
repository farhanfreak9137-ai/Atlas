package com.farhan.atlas;

import android.app.AppOpsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Calendar;
import java.util.List;

@CapacitorPlugin(name = "AtlasPhoneControl")
public class AtlasPhoneControlPlugin extends Plugin {

    @PluginMethod
    public void checkPermissions(PluginCall call) {
        Context context = getContext();
        boolean usageGranted = isUsageAccessGranted(context);
        boolean overlayGranted = isOverlayGranted(context);

        JSObject ret = new JSObject();
        ret.put("usageAccessGranted", usageGranted);
        ret.put("overlayGranted", overlayGranted);
        call.resolve(ret);
    }

    @PluginMethod
    public void requestUsageAccess(PluginCall call) {
        Context context = getContext();
        Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
        call.resolve();
    }

    @PluginMethod
    public void requestOverlayPermission(PluginCall call) {
        Context context = getContext();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:" + context.getPackageName())
            );
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        }
        call.resolve();
    }

    @PluginMethod
    public void getTodayScreenTimeMinutes(PluginCall call) {
        Context context = getContext();
        long totalTimeInMs = 0;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            UsageStatsManager usageStatsManager = (UsageStatsManager) context.getSystemService(Context.USAGE_STATS_SERVICE);
            if (usageStatsManager != null) {
                Calendar calendar = Calendar.getInstance();
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                long startTime = calendar.getTimeInMillis();
                long endTime = System.currentTimeMillis();

                List<UsageStats> statsList = usageStatsManager.queryUsageStats(
                    UsageStatsManager.INTERVAL_DAILY,
                    startTime,
                    endTime
                );

                if (statsList != null) {
                    for (UsageStats stats : statsList) {
                        totalTimeInMs += stats.getTotalTimeInForeground();
                    }
                }
            }
        }

        int totalMinutes = (int) (totalTimeInMs / (1000 * 60));
        JSObject ret = new JSObject();
        ret.put("minutes", totalMinutes);
        call.resolve(ret);
    }

    @PluginMethod
    public void getInstalledApps(PluginCall call) {
        Context context = getContext();
        android.content.pm.PackageManager pm = context.getPackageManager();
        java.util.List<android.content.pm.ApplicationInfo> packages = pm.getInstalledApplications(android.content.pm.PackageManager.GET_META_DATA);

        com.getcapacitor.JSArray appsList = new com.getcapacitor.JSArray();
        for (android.content.pm.ApplicationInfo appInfo : packages) {
            if (pm.getLaunchIntentForPackage(appInfo.packageName) != null) {
                String appName = pm.getApplicationLabel(appInfo).toString();
                String packageName = appInfo.packageName;

                JSObject appObj = new JSObject();
                appObj.put("appName", appName);
                appObj.put("packageName", packageName);
                appsList.put(appObj);
            }
        }

        JSObject ret = new JSObject();
        ret.put("apps", appsList);
        call.resolve(ret);
    }

    private boolean isUsageAccessGranted(Context context) {
        try {
            AppOpsManager appOps = (AppOpsManager) context.getSystemService(Context.APP_OPS_SERVICE);
            int mode = appOps.checkOpNoThrow(
                AppOpsManager.OPSTR_GET_USAGE_STATS,
                android.os.Process.myUid(),
                context.getPackageName()
            );
            return mode == AppOpsManager.MODE_ALLOWED;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isOverlayGranted(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return Settings.canDrawOverlays(context);
        }
        return true;
    }
}
