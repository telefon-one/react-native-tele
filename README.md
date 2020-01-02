

# react-native-tele

**UPDATE**: Now is compatible with RN 0.60+ (AndroidX)



## Support
- Currently support for Android.  
- Support audio call events + actions.
- You can use it to build an Android app that can communicates with calls (for example Dialers).
- Interface of Android version is based on (https://github.com/datso/react-native-pjsip) 
- API is based on android Java

## To do

 - [ ] Add ToDo
 - [ ] Add examples (with Headless JS)

## Examples

- [Android](https://github.com/telefon-one/react-native-tele/blob/master/examples/) 
- [Google.Play] TODO


## Installation

- [Android](https://github.com/telefon-one/react-native-tele/blob/master/docs/installation_android.md)

## Usage

First of all you have to initialize module to be able to work with it.

There are some interesting moment in initialization.
When application goes to background, sip module is still working and able to receive calls, but your javascipt is totally suspended.
When User open your application, javascript start to work and now your js application need to know what status have your account or may be you have pending incoming call.

So thats why first step should call start method for sip module.

```javascript
import {Endpoint} from 'react-native-tele'

let tEndpoint = new Endpoint();
let state = await endpoint.start(); // List of calls when RN context is started, could not be empty because Background service is working on Android
let {calls,settings} = state;

// Subscribe to endpoint events
// tEndpoint.on("registration_changed", (account) => {}); // TODO
// tEndpoint.on("connectivity_changed", (online) => {}); // TODO
tEndpoint.on("call_received", (call) => {});
tEndpoint.on("call_changed", (call) => {});
tEndpoint.on("call_terminated", (call) => {});
// tEndpoint.on("call_screen_locked", (call) => {}); // Android only
```


To be able to make a call first of all you should createAccount, and pass account instance into Endpoint.makeCall function.
This function will return a promise that will be resolved when sip initializes the call.

```javascript
let options = {
  headers: {
    "sim": "1" // TODO
  }
}

let call = await tEndpoint.makeCall(destination, options);
call.getId() // Use this id to detect changes and make actions

tEndpoint.addListener("call_changed", (newCall) => {
  if (call.getId() === newCall.getId()) {
     // Our call changed, do smth.
  }
}
tEndpoint.addListener("call_terminated", (newCall) => {
  if (call.getId() === newCall.getId()) {
     // Our call terminated
  }
}
```

## API

[DOCUMENTATION] https://github.com/telefon-one/react-native-tele/blob/master/docs