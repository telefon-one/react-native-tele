/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { Endpoint } from 'react-native-sip'

const Rec = async (data) => {
  console.log('It works!')
}
AppRegistry.registerHeadlessTask('Rec', () => Rec)


// import InCallManager from 'react-native-incall-manager';
 
// --- start manager when the chat start based on logics of your app 
// On Call Established:
// InCallManager.start({media: 'audio'}); // audio/video, default: audio
 


/*
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import CallDetectorManager from 'react-native-call-detection'

startListenerTapped() {
	this.callDetector = new CallDetectorManager((event)=> {
	// For iOS event will be either "Connected",
	// "Disconnected","Dialing" and "Incoming"
	
	// For Android event will be either "Offhook",
	// "Disconnected", "Incoming" or "Missed"
  
  console.log("CallDetectorManager(event)",event)

	if (event === 'Disconnected') {
	// Do something call got disconnected
	} 
	else if (event === 'Connected') {
	// Do something call got connected
	// This clause will only be executed for iOS
	} 
	else if (event === 'Incoming') {
	// Do something call got incoming
	}
	else if (event === 'Dialing') {
	// Do something call got dialing
	// This clause will only be executed for iOS
	} 
	else if (event === 'Offhook') {
	//Device call state: Off-hook. 
	// At least one call exists that is dialing,
	// active, or on hold, 
	// and no calls are ringing or waiting.
	// This clause will only be executed for Android
	}
	else if (event === 'Missed') {
    	// Do something call got missed
    	// This clause will only be executed for Android
    }
},
true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
()=>{
  console.log("Android permissions");

}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
{
title: 'Phone State Permission',
message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
} // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
)
}

stopListenerTapped() {
	this.callDetector && this.callDetector.dispose();
}

*/


Test = function () {


  return <Text>ok</Text>;
  /*
let endpoint = new Endpoint();
let state = await endpoint.start(); // List of available accounts and calls when RN context is started, could not be empty because Background service is working on Android
let {accounts, calls, settings, connectivity} = state;

// Subscribe to endpoint events
endpoint.on("registration_changed", (account) => {});
endpoint.on("connectivity_changed", (online) => {});
endpoint.on("call_received", (call) => {});
endpoint.on("call_changed", (call) => {});
endpoint.on("call_terminated", (call) => {});
endpoint.on("call_screen_locked", (call) => {}); // Android only
*/
}


class App extends Component {
  

  constructor() {
    super();
    this.state = { data: [] };
    this.endpoint = new Endpoint();
  }

  async componentDidMount() {

    //const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`);
    //const json = await response.json();
    //this.setState({ data: json });

    //startListenerTapped();
    
    
    //RNImmediatePhoneCall.immediatePhoneCall('900');
    
    let configuration = {
      "name": "MyUserName",
      "username": "50363",
      "domain": "sip.zadarma.com",
      "password": "Password50363",
      "proxy": null,
      "transport": "UDP",//null, // Default TCP
      //"port": "5080",
      "regServer": "sip.zadarma.com", // Default wildcard
      "regTimeout": 3600, // Default 3600
      "regHeaders": {
        //"X-Custom-Header": "Value"
      },
      //"regContactParams": ";unique-device-token-id=XXXXXXXXX",
      "regOnAdd": true,  // Default true, use false for manual REGISTRATION
    
      /*
      service: {
          ua: "siptest"
      }

      network: {
        useAnyway: false,           // Default: true
        useWifi: true,              // Default: true
        use3g: true,                // Default: false
        useEdge: false,             // Default: false
        useGprs: false,             // Default: false
        useInRoaming: false,        // Default: false
        useOtherNetworks: true      // Default: false
      }
*/
service: {
  ua: "siptest",
  stun: ['stun.l.google.com:19302','stun4.l.google.com:19302']
},

network: {
useAnyway: true,           // Default: true
useWifi: true,              // Default: true
use3g: true,                // Default: false
useEdge: true,             // Default: false
useGprs: true,             // Default: false
useInRoaming: true,        // Default: false
useOtherNetworks: true      // Default: false
}



};

    console.log(6);
    let state = await this.endpoint.start();

    console.log(7);

    let { accounts, calls, settings, connectivity } = state;
    
    try {
      console.log("endpoint.createAccount");
      this.account = await this.endpoint.createAccount(configuration);
      console.log("account",this.account);

/*
let options = {
  headers: {
    "P-Assserted-Identity": "Header example",
    "X-UA": "React native"
  }
}
 
let call = await this.endpoint.makeCall(this.account, "+79006367756", options);
*/
//console.log(call.getId());



    } catch (err) {

      console.log("err");
      console.error(err);
    }

    console.log(7);


    console.log("settings", settings);
    // Subscribe to endpoint events
    this.endpoint.on("registration_changed", (account) => { 
      console.log("registration_changed",account); 
      

      let options = {
        headers: {
          "P-Assserted-Identity": "Header example",
          "X-UA": "React native"
        }
      }

           /*
     const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

     if (granted) {
       console.log( "You can use the ACCESS_FINE_LOCATION" )
     } 
     else {
       console.log( "ACCESS_FINE_LOCATION permission denied" )
     }*/

     //makeCall 
     



if(1==0){   
      
      let call =  this.endpoint.makeCall(account, "50013", options);
      //let call =  this.endpoint.makeCall(account, "1111", options);
      call.then(() => {
        console.log("call.getId",call.getId() );
      }).catch((e) => {
          console.log(e);

      });
    }


    console.log(8);

    });
    this.endpoint.on("connectivity_changed", (online) => { console.log("connectivity_changed",online); });
    this.endpoint.on("call_received", (call) => { 
      
      console.log("call_received",call);
      this.callId=call.getId();  
      console.log("this.callId",this.callId);

      console.log(call._provisionalMedia[0].audioStream);

    let options = {};
    let promise = this.endpoint.answerCall(call, options);

    promise.then(() => {
      console.log('Answer complete, expect that "call_changed" will be fired.');
    });
    
    promise.catch((e) => {
      console.log('Answer failed, show error',e);
    });


  });
    this.endpoint.on("call_changed", (call) => { 
      console.log("call_changed");
      console.log("call",call);
      this.callId=call.getId();  
      console.log("this.callId",this.callId);


    });
    this.endpoint.on("call_terminated", (call) => { 
      console.log("call_terminated");
    this.callId=call.getId();  
    console.log("this.callId",this.callId);

  });
    this.endpoint.on("call_screen_locked", (call) => { console.log("call_screen_locked"); }); // Android only


//await endpoint.hangupCall(call, options);
//await endpoint.declineCall(call, options);
}



  async componentWillUnmount() {
    //await this.endpoint.deleteAccount(this.account); 
    //stopListenerTapped();
  }

  //const App: () => React$Node = () => {
  render() {




    return (
      <>
        <Test />
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
              </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
              </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
export default App;





      /*
      setTimeout(() => {
        console.log("endpoint.registerAccount(account, true)");
        //endpoint.registerAccount(this.account, true);
        console.log("account",this.account);
        setInterval(() => {
            console.log("account",this.account);
  
        }, 2000);

        
      }, 5000);*/


      /*


        8
 LOG  call_received {"_accountId": 0, "_audioCount": 1, "_callId": "38fad2f50e11dab96a61eaba63dfc434@37.139.38.60:5060", "_connectDuration": -1, "_constructionTime": 1576669904, "_held": false, "_id": 0, "_lastReason": "", "_lastStatusCode": "PJSIP_SC_NULL", "_localContact": "\"MyUserName\" <sip:50363@10.21.178.53:42239;ob>", "_localUri": "<sip:50363@37.139.38.17>", "_media": [], "_muted": false, "_provisionalMedia": [{"audioStream": [Object], "dir": "PJMEDIA_DIR_NONE", "status": "PJSUA_CALL_MEDIA_NONE", "type": "PJMEDIA_TYPE_AUDIO", "videoStream": [Object]}], "_remoteAudioCount": 1, "_remoteContact": "<sip:50013@37.139.38.60:5060>", "_remoteName": "Logistica", "_remoteNumber": "50013", "_remoteOfferer": true, "_remoteUri": "\"Logistica\" <sip:50013@sip.zadarma.com>", "_remoteVideoCount": 0, "_speaker": false, "_state": "PJSIP_INV_STATE_NULL", "_stateText": "NULL", "_totalDuration": 0, "_videoCount": 1}
 LOG  this.callId 0
 LOG  call_changed
 LOG  this.callId 0
 LOG  call_changed
 LOG  this.callId 0
 LOG  Answer complete, expect that "call_changed" will be fired.
 LOG  call_changed
 LOG  this.callId 0
 LOG  call_terminated


      */