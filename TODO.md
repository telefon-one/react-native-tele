TeleService.java  handleCallMake - rerurn from intect call id -> Intent.ACTION_CALL {\"_callId":1} 
TeleService.java  handleCallMake - 2sim make call
TeleCall.java  toJson - callinfo id, etc...
Endpoint.js makeCall -> data==true hack


TeleService.java handleCallHangup -> add mCalls find, not currentCall for simulateneous calls

TeleCall creation uri collision input+output доновременно

отключение звонка при входящем


USSD

   TelephonyManager manager = (TelephonyManager)getSystemService(TELEPHONY_SERVICE);
    manager.sendUssdRequest("*100#", new TelephonyManager.UssdResponseCallback() {
        @Override
        public void onReceiveUssdResponse(TelephonyManager telephonyManager, String request, CharSequence response) {
            super.onReceiveUssdResponse(telephonyManager, request, response);
        }

        @Override
        public void onReceiveUssdResponseFailed(TelephonyManager telephonyManager, String request, int failureCode) {
            super.onReceiveUssdResponseFailed(telephonyManager, request, failureCode);
        }
    }, new Handler());

    TelephonyManager manager2 = manager.createForSubscriptionId(subIdForSecondSlotFromSubscriptonManager);
    manager2.sendUssdRequest(...);



СтарыйЖ
    String encodedHash = Uri.encode("#");
String ussd = "*" + encodedHash + "12345" + encodedHash;
startActivityForResult(new Intent("android.intent.action.CALL", Uri.parse("tel:" + ussd)), 1);


RSSI

TelephonyManager.listenGemini (phoneStateListener1, state, 0) for the 1st SIM, and

TelephonyManager.listenGemini (phoneStateListener2, state, 1) for the 2nd SIM,