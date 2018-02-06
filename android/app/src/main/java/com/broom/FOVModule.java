package com.broom.modules.fov;

import android.hardware.Camera;
import android.hardware.Camera.CameraInfo;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.Map;

public class FOVModule extends ReactContextBaseJavaModule {

  public FOVModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
      return "FOVModule";
  }

  @ReactMethod
  public void getFOV(Promise promise) {
    try {
      Camera camera = Camera.open(Camera.CameraInfo.CAMERA_FACING_BACK);
      float fov = camera.getParameters().getHorizontalViewAngle();
      promise.resolve(fov);
    }
    catch (Exception e) {
      promise.reject(e);
    }
  }

}
