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



const sipInit = () => {
  let configuration = {
    "name": "MyUserName",
    "username": "50363",
    "domain": "sip.zadarma.com",
    "password": "Password50363",
    "proxy": null,
    "transport": "UDP",//null, // Default TCP
    "regServer": "sip.zadarma.com", // Default wildcard
    "regTimeout": 3600, // Default 3600
    "regHeaders": {
      //"X-Custom-Header": "Value"
    },
    //"regContactParams": ";unique-device-token-id=XXXXXXXXX",
    "regOnAdd": true,  // Default true, use false for manual REGISTRATION

    service: {
      ua: "siptest",
      stun: ['stun.l.google.com:19302', 'stun4.l.google.com:19302']
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

  let state = await this.endpoint.start();

  console.log(7);

  let { accounts, calls, settings, connectivity } = state;

  try {
    console.log("endpoint.createAccount");
    this.account = await this.endpoint.createAccount(configuration);
    console.log("account", this.account);

  } catch (err) {

    console.log("err");
    console.error(err);
  }

  console.log(7);


  console.log("settings", settings);
  // Subscribe to endpoint events
  this.endpoint.on("registration_changed", (account) => {
    console.log("registration_changed", account);


    let options = {
      headers: {
        "P-Assserted-Identity": "Header example",
        "X-UA": "React native"
      }
    }


    //makeCall 




    if (1 == 0) {

      let call = this.endpoint.makeCall(account, "50013", options);
      //let call =  this.endpoint.makeCall(account, "1111", options);
      call.then(() => {
        console.log("call.getId", call.getId());
      }).catch((e) => {
        console.log(e);

      });
    }


    console.log(8);

  });
  this.endpoint.on("connectivity_changed", (online) => { console.log("connectivity_changed", online); });
  this.endpoint.on("call_received", (call) => {

    console.log("call_received", call);
    this.callId = call.getId();
    console.log("this.callId", this.callId);

    console.log(call._provisionalMedia[0].audioStream);

    let options = {};
    let promise = this.endpoint.answerCall(call, options);

    promise.then(() => {
      console.log('Answer complete, expect that "call_changed" will be fired.');
    });

    promise.catch((e) => {
      console.log('Answer failed, show error', e);
    });


  });
  this.endpoint.on("call_changed", (call) => {
    console.log("call_changed");
    console.log("call", call);
    this.callId = call.getId();
    console.log("this.callId", this.callId);


  });
  this.endpoint.on("call_terminated", (call) => {
    console.log("call_terminated");
    this.callId = call.getId();
    console.log("this.callId", this.callId);

  });
  this.endpoint.on("call_screen_locked", (call) => { console.log("call_screen_locked"); }); // Android only


}


const sipDestroy = () => {

}

class App extends Component {


  constructor() {
    super();
    this.state = { data: [] };
    this.endpoint = new Endpoint();
  }

  async componentDidMount() {
    sipInit();
  }



  async componentWillUnmount() {
    sipDestroy();
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
