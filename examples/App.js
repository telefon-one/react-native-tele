
import React, { Component } from 'react';

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

import { Endpoint } from 'react-native-tele'
//import { ReplaceDialer } from 'react-native-replace-dialer'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default class App extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {

  
/*
      request(PERMISSIONS.ANDROID.READ_CALL_LOG).then(result => {console.log("READ_CALL_LOG");});
      request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then(result => {console.log("READ_PHONE_STATE");}); 
      request(PERMISSIONS.ANDROID.CALL_PHONE).then(result => {console.log("READ_CALL_PHONE");});
 */
  
    /*
    let tReplaceDialer = new ReplaceDialer();

    if (!tReplaceDialer.isDefault()) {
      console.log('Is NOT default dialer, try to set.');
      if (tReplaceDialer.setDefault()) {
        console.log('Default dialer sucessfully set.');
      } else {
        console.log('Default dialer NOT set');
      }
    }*/


    let tEndpoint = new Endpoint();
    console.log(tEndpoint);

    //let state = await tEndpoint.start({ReplaceDialer:true,Permissions:true}); // List of calls when RN context is started, could not be empty because Background service is working on Android
    let state = await tEndpoint.start({ReplaceDialer:false,Permissions:false}); // List of calls when RN context is started, could not be empty because Background service is working on Android
    let { calls, settings } = state;
    console.log("calls",calls);
    console.log("settings",settings);

    // Subscribe to endpoint events
    // tEndpoint.on("registration_changed", (account) => {}); // TODO
    // tEndpoint.on("connectivity_changed", (online) => {}); // TODO
    tEndpoint.on("call_received", (call) => { console.log("call_received",call); });
    tEndpoint.on("call_changed", (call) => { console.log("call_changed",call);  });
    tEndpoint.on("call_terminated", (call) => { console.log("call_terminated",call);  });
    // tEndpoint.on("call_screen_locked", (call) => {  console.log("call_screen_locked",call);  }); // Android only


    let options = {
      headers: {
        "sim": "1" // TODO
      }
    }

    let call = await tEndpoint.makeCall(1,"900", options);
    console.log("call",call);
  }

  render() {



    return (
      <>
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


