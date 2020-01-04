package one.telefon.tele;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public class TeleBroadcastEmiter {

    private static String TAG = "one.telefon.tele.TeleBroadcastEmiter";

    private Context context;

    public TeleBroadcastEmiter(Context context) {
        this.context = context;
    }

    public void fireStarted(Intent original/*, List<TeleAccount> accounts*/, List<TeleCall> calls/*, JSONObject settings*/) {
        try {
            JSONArray dataAccounts = new JSONArray();
            /*
            for (TeleAccount account : accounts) {
                dataAccounts.put(account.toJson());
            }*/

            JSONArray dataCalls = new JSONArray();
            for (TeleCall call : calls) {
                dataCalls.put(call.toJson());
            }

            JSONObject data = new JSONObject();
            //data.put("accounts", dataAccounts);
            data.put("calls", dataCalls);
            //data.put("settings", settings);

            Intent intent = new Intent();
            intent.setAction(TeleActions.EVENT_STARTED);
            intent.putExtra("callback_id", original.getIntExtra("callback_id", -1));
            intent.putExtra("data", data.toString());

            context.sendBroadcast(intent);
        } catch (Exception e) {
            Log.e(TAG, "Failed to send ACCOUNT_CREATED event", e);
        }
    }

    public void fireIntentHandled(Intent original, JSONObject result) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_HANDLED);
        intent.putExtra("callback_id", original.getIntExtra("callback_id", -1));
        intent.putExtra("data", result.toString());

        context.sendBroadcast(intent);
    }

    public void fireIntentHandled(Intent original) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_HANDLED);
        intent.putExtra("callback_id", original.getIntExtra("callback_id", -1));

        context.sendBroadcast(intent);
    }

    public void fireIntentHandled(Intent original, Exception e) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_HANDLED);
        intent.putExtra("callback_id", original.getIntExtra("callback_id", -1));
        intent.putExtra("exception", e.getMessage());

        context.sendBroadcast(intent);
    }

    /*
    public void fireAccountCreated(Intent original, TeleAccount account) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_ACCOUNT_CREATED);
        intent.putExtra("callback_id", original.getIntExtra("callback_id", -1));
        intent.putExtra("data", account.toJsonString());

        context.sendBroadcast(intent);
    }

    public void fireRegistrationChangeEvent(TeleAccount account) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_REGISTRATION_CHANGED);
        intent.putExtra("data", account.toJsonString());

        context.sendBroadcast(intent);
    }

    public void fireMessageReceivedEvent(TeleMessage message) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_MESSAGE_RECEIVED);
        intent.putExtra("data", message.toJsonString());

        context.sendBroadcast(intent);
    }

    */

    public void fireCallReceivedEvent(TeleCall call) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_CALL_RECEIVED);
        intent.putExtra("data", call.toJsonString());

        context.sendBroadcast(intent);
    }

    public void fireCallChanged(TeleCall call) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_CALL_CHANGED);
        intent.putExtra("data", call.toJsonString());

        context.sendBroadcast(intent);
    }

    public void fireCallTerminated(TeleCall call) {
        Intent intent = new Intent();
        intent.setAction(TeleActions.EVENT_CALL_TERMINATED);
        intent.putExtra("data", call.toJsonString());

        context.sendBroadcast(intent);
    }
}
