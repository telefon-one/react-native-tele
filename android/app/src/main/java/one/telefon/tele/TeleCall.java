package one.telefon.tele;

import android.content.Context;
import android.media.AudioManager;
import android.util.Log;
import android.view.View;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import android.telecom.Call;

public class TeleCall /* extends Call */ {
    private static String TAG = "onte.telefon.tele.TeleCall";

    private Call call;

    private boolean isHeld = false;
    private boolean isMuted = false;

    public TeleCall() {

    }

    public void answer()
    {
        call.answer(call.getDetails().getVideoState());
    }

    public void reject() {
        call.reject(false, "");
    }

    public void disconnect() {
        call.disconnect();
    }

    public void makeCall(String destination) {
        
    }
    
    public void delete() {
        
    }
    /*
     * public TeleCall(Call call1) { this.call = call1; }
     */

    /*
     * 
     * public TeleCall(TeleAccount acc, int call_id) { super(acc, call_id);
     * this.account = acc; }
     * 
     * public TeleCall(TeleAccount acc) { super(acc); this.account = acc; }
     */

    /*
     * public TeleService getService() { return account.getService(); }
     */

    /*
     * public void hold() throws Exception { if (isHeld) { return; }
     * 
     * isHeld = true;
     * 
     * // Emmit changes getService().emmitCallUpdated(this);
     * 
     * // Send reinvite to server for hold setHold(new CallOpParam(true)); }
     * 
     * public void unhold() throws Exception { if (!isHeld) { return; }
     * 
     * isHeld = false;
     * 
     * // Emmit changes getService().emmitCallUpdated(this);
     * 
     * // Send reinvite to server for release from hold CallOpParam prm = new
     * CallOpParam(true); prm.getOpt().setFlag(1);
     * 
     * reinvite(prm); }
     * 
     * public void mute() throws Exception { if (isMuted) { return; }
     * 
     * isMuted = true; doMute(true);
     * 
     * // Emmit changes getService().emmitCallUpdated(this); }
     * 
     * public void unmute() throws Exception { if (!isMuted) { return; }
     * 
     * isMuted = false; doMute(false);
     * 
     * // Emmit changes getService().emmitCallUpdated(this); }
     * 
     * private void doMute(boolean mute) throws Exception { CallInfo info; try {
     * info = getInfo(); } catch (Exception exc) { return; }
     * 
     * for (int i = 0; i < info.getMedia().size(); i++) { Media media = getMedia(i);
     * CallMediaInfo mediaInfo = info.getMedia().get(i);
     * 
     * if (mediaInfo.getType() == pjmedia_type.PJMEDIA_TYPE_AUDIO && media != null
     * && mediaInfo.getStatus() == pjsua_call_media_status.PJSUA_CALL_MEDIA_ACTIVE)
     * { AudioMedia audioMedia = AudioMedia.typecastFromMedia(media);
     * 
     * // connect or disconnect the captured audio try { AudDevManager mgr =
     * account.getService().getAudDevManager();
     * 
     * if (mute) { mgr.getCaptureDevMedia().stopTransmit(audioMedia); } else {
     * mgr.getCaptureDevMedia().startTransmit(audioMedia); }
     * 
     * } catch (Exception exc) { Log.e(TAG,
     * "An error occurs while adjusting audio levels", exc); } } } }
     * 
     * public void redirect(String destination) throws Exception { SipHeader
     * contactHeader = new SipHeader(); contactHeader.setHName("Contact");
     * contactHeader.setHValue(destination);
     * 
     * SipHeaderVector contactHeaders = new SipHeaderVector();
     * contactHeaders.add(contactHeader);
     * 
     * SipTxOption tx = new SipTxOption(); tx.setHeaders(contactHeaders);
     * 
     * CallOpParam prm = new CallOpParam();
     * prm.setStatusCode("PJSIP_SC_MOVED_TEMPORARILY); prm.setTxOption(tx);
     * 
     * answer(prm); }
     */

    /*
     * @Override public void onCallState(OnCallStateParam prm) {
     * super.onCallState(prm);
     * 
     * getService().emmitCallStateChanged(this, prm); }
     * 
     * @Override public void onCallMediaEvent(OnCallMediaEventParam prm) {
     * super.onCallMediaEvent(prm);
     * 
     * // Hack to resize all video windows. // for (TeleVideoMediaChange listener :
     * mediaListeners) { // listener.onChange(); // } }
     */

    // @Override
    // public void onCallMediaState(OnCallMediaStateParam prm) {

    /*
     * for (int i = 0; i < info.getMedia().size(); i++) { Media media = getMedia(i);
     * CallMediaInfo mediaInfo = info.getMedia().get(i);
     * 
     * if (mediaInfo.getType() == pjmedia_type.PJMEDIA_TYPE_AUDIO && media != null
     * && mediaInfo.getStatus() == pjsua_call_media_status.PJSUA_CALL_MEDIA_ACTIVE)
     * { AudioMedia audioMedia = AudioMedia.typecastFromMedia(media);
     * 
     * // connect the call audio media to sound device try { AudDevManager mgr =
     * account.getService().getAudDevManager();
     * 
     * try { audioMedia.adjustRxLevel((float) 1.5); audioMedia.adjustTxLevel((float)
     * 1.5); } catch (Exception exc) { Log.e(TAG,
     * "An error while adjusting audio levels", exc); }
     * 
     * audioMedia.startTransmit(mgr.getPlaybackDevMedia());
     * mgr.getCaptureDevMedia().startTransmit(audioMedia); } catch (Exception exc) {
     * Log.e(TAG, "An error occurs while connecting audio media to sound device",
     * exc); } } }
     */

    // Emmit changes
    // getService().emmitCallUpdated(this);
    // }

    public void updateState(int state) {
        /*
         * String state_str='PJSIP_INV_STATE_UNKNOWN';
         * 
         * //this.currentCall.state='PJSIP_INV_STATE_NULL'; if (state ===
         * STATE_CONNECTING) { str_state='PJSIP_INV_STATE_CALLING'; this.incoming=false;
         * } if (state === STATE_RINGING) { str_state='PJSIP_INV_STATE_INCOMING';
         * this.incoming=true; }
         * 
         * if (state === STATE_DIALING) { str_state='PJSIP_INV_STATE_EARLY';
         * this.incoming=false; } if (state === STATE_ACTIVE) {
         * str_state='PJSIP_INV_STATE_CONFIRMED'; } if (state === STATE_DISCONNECTED) {
         * str_state='PJSIP_INV_STATE_DISCONNECTED'; this._lastReason='PJSIP_SC_OK'; }
         * if (state === STATE_DISCONNECTING) { //TODO
         * this.currentCall.state='PJSIP_INV_STATE_DISCONNECTED';
         * this.currentCall._state=this.currentCall.state;
         * this._lastReason='PJSIP_SC_OK'; }
         */
    }

    public JSONObject toJson() {
        JSONObject json = new JSONObject();

        Call.Details details;
        try {
            details = call.getDetails();
        } catch (Exception exc) {
            Log.e(TAG, "An error occurs while getting call details", exc);
            return json;
        }

        if (call == null) {
            return json;
        }

        String uri = details.getHandle().toString();
        String name = details.getCallerDisplayName();

        // API SPECIFIED
        // long creationTimeMillis;
        // if (android.os.Build.VERSION.SDK_INT >= 26) {
        // if (Build.VERSION.SDK_INT >= 26) {
        // creationTimeMillis = details.getCreationTimeMillis();
        // } else {
        // creationTimeMillis = 0;
        // }
        // int direction;
        // if (android.os.Build.VERSION.SDK_INT >= 29) {
        // direction = details.getCallDirection();
        // } else {
        // direction = 0;
        // }

        int state = call.getState();
        long connectTimeMillis = details.getConnectTimeMillis();

        try {
            // -----
            // AudioManager audioManager = (AudioManager)
            // getService().getBaseContext().getSystemService(Context.AUDIO_SERVICE);
            // boolean speaker = audioManager.isSpeakerphoneOn();

            // -----
            int connectDuration = -1;
            // String state_str=StateToSip(state);

            // if (info.getState() == "PJSIP_INV_STATE_CONFIRMED" || info.getState() ==
            // "PJSIP_INV_STATE_DISCONNECTED") {
            // connectDuration = info.getConnectDuration().getSec();
            // }

            // -----
            // json.put("id", getId());
            // json.put("callId", info.getCallIdString());
            // json.put("accountId", account.getId());

            // -----
            // json.put("localContact", info.getLocalContact());
            // json.put("localUri", info.getLocalUri());
            json.put("remoteContact", name);
            json.put("remoteUri", uri);

            // -----
            json.put("state", state);
            // json.put("stateText", info.getStateText());
            // json.put("connectDuration", connectDuration);
            // json.put("totalDuration", info.getTotalDuration().getSec());
            // json.put("held", isHeld);
            // json.put("muted", isMuted);
            // json.put("speaker", speaker);

            /*
             * try { json.put("lastStatusCode", info.getLastStatusCode()); } catch
             * (Exception e) { json.put("lastStatusCode", null); }
             * 
             * json.put("lastReason", info.getLastReason());
             * 
             * // ----- json.put("remoteOfferer", info.getRemOfferer());
             * json.put("remoteAudioCount", info.getRemAudioCount());
             * json.put("remoteVideoCount", info.getRemVideoCount());
             * 
             * // ----- // json.put("audioCount", info.getSetting().getAudioCount()); //
             * json.put("videoCount", info.getSetting().getVideoCount());
             * 
             * json.put("media", mediaInfoToJson(info.getMedia()));
             * json.put("provisionalMedia", mediaInfoToJson(info.getProvMedia()));
             */

            return json;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /*
     * private JSONArray mediaInfoToJson(CallMediaInfoVector media) { JSONArray
     * result = new JSONArray();
     * 
     * try { long size = media.size(); JSONObject json = new JSONObject();
     * 
     * for (int i = 0; i < size; i++) { CallMediaInfo info = media.get(i);
     * 
     * JSONObject audioStreamJson = new JSONObject();
     * audioStreamJson.put("confSlot", info.getAudioConfSlot());
     * 
     * JSONObject videoStreamJson = new JSONObject();
     * videoStreamJson.put("captureDevice", info.getVideoCapDev());
     * videoStreamJson.put("windowId", info.getVideoIncomingWindowId());
     * 
     * json.put("dir", info.getDir().toString()); json.put("type",
     * info.getType().toString()); json.put("status", info.getStatus().toString());
     * json.put("audioStream", audioStreamJson); json.put("videoStream",
     * videoStreamJson);
     * 
     * result.put(json); } } catch (Exception e) { throw new RuntimeException(e); }
     * 
     * return result; }
     */

    public String toJsonString() {
        return toJson().toString();
    }
}
