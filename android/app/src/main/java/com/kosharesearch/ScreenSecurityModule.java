package com.kosharesearch;

import android.app.Activity;
import android.view.WindowManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ScreenSecurityModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public ScreenSecurityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ScreenSecurity"; // JS에서 NativeModules.ScreenSecurity 로 접근됨
    }

    @ReactMethod
    public void enableFlagSecure() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(() -> {
                activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
            });
        }
    }

    @ReactMethod
    public void disableFlagSecure() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(() -> {
                activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
            });
        }
    }
}
