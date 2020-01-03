package one.telefon;

import com.facebook.react.ReactActivity;

import android.view.Window;
import android.view.WindowManager;
import android.os.Bundle;

import android.util.Log;

//for default dialer
import android.telecom.TelecomManager;
import android.content.Context;
import android.content.Intent;
////

import com.codegulp.invokeapp.RNInvokeApp;




/*
import com.facebook.react.ReactActivity;





import android.telecom.Call;

import com.facebook.react.bridge.Callback;


*/
//import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;

public class MainActivity extends ReactActivity {

  // for default dialer
  private TelecomManager telecomManager;
  private static final int RC_DEFAULT_PHONE = 3289;
  private static final int RC_PERMISSION = 3810;

  private static final int REQUEST_CODE_SET_DEFAULT_DIALER = 123;

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "telefon";
  }

  /*
   * Additional step: Ability to answer incoming call without Lock Screen
   */
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Window w = getWindow();
    w.setFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED, WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED);

    RNInvokeApp.sendEvent();
  }

  @Override
  public void onStart() {
    super.onStart();
    offerReplacingDefaultDialer();
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    // RNImmediatePhoneCallPackage.onRequestPermissionsResult(requestCode,
    // permissions, grantResults); // very important
    // event callback
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }

  /*
   * не ясно public void onRequestPermissionsResult(int requestCode, @NonNull
   * String permissions[], @NonNull int[] grantResult) { if(requestCode ==
   * PERMISSIONS_REQUEST_ACCESS_CALL) { if(grantResult[0] ==
   * PackageManager.PERMISSION_GRANTED) { callPerson(this.mobile_no); } } }
   */

  // for default dialer
  private void offerReplacingDefaultDialer() {
    Log.w("telefon.one-MainActivity", "offerReplacingDefaultDialer");
    TelecomManager telecomManager = (TelecomManager) getSystemService(Context.TELECOM_SERVICE);

    if (telecomManager.getDefaultDialerPackage() != getPackageName()) {
      Log.w("telefon.one", "offerReplacingDefaultDialer->send intent");
      Intent intent = new Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER);
      intent.putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, getPackageName());
      startActivityForResult(intent, RC_DEFAULT_PHONE);
      // startActivityForResult(intent, REQUEST_CODE_SET_DEFAULT_DIALER); //Different
      // code
      // Huawei/ honor : ??? manual ??? startActivityForResult(new
      // Intent(android.provider.Settings.ACTION_SETTINGS), 0);

    }
  }
}
