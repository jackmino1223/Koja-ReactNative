/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {strings} from './components/i18n'
import RNRestart from 'react-native-restart';
import Login from './simple-login/index.js';
import HomeScreen from './layouts/Home.js';
import VehicleList from './layouts/VehicleList.js';
import VehicleHistory from './layouts/VehicleHistory.js';
import ShowOnMap from './layouts/ShowOnMap.js';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast'
import base64 from 'base-64'
import DefaultPreference from 'react-native-default-preference';
import Button from './components/Button'

var REQUEST_URL = 'https://api.koja.frdid.com/api/user/v1/emailLogin/';
var REQUEST_URL_PHONE = 'https://api.koja.frdid.com/api/user/v1/phoneLogin/';
var REQUEST_URL_DETAIL = 'https://api.koja.frdid.com/api/user/v1/detail/';
var REQUEST_URL_DEVICES = 'https://api.koja.frdid.com/api/device/v1/devices/'
var REQUEST_URL_DEVICE_TYPES = 'https://api.koja.frdid.com/api/device/v1/types/'

var globalThis;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    globalThis = this;
    this.state = {
      visible: false,
      loaded: false,
      logined: false,
    };

    // DefaultPreference.clear('userId');
    // DefaultPreference.clear('sessionId');


    DefaultPreference.getAll().then(function(configDatas) {

        userId = configDatas.userId;
        sessionId = configDatas.sessionId;
        userName = configDatas.userName;

        global.lang = (configDatas.lang == null)? 'ir':configDatas.lang;
        strings.setLanguage(global.lang);
        console.log("language", global.lang);

        var logined = false;
        if(userId != null){
          logined = true;
          globalThis.fetchDList(userId, sessionId);
          global.userName = userName;
        }else{
          globalThis.setState({
            loaded: true,
          });
        }
        globalThis.setState({
          logined: logined,
        });
    });
  }
  static navigationOptions = {
    title: 'Welcome', header: false
  };
  componentDidMount() {
    console.log("did mount")
  }


  render() {
    if(this.state.loaded == true){
      if(this.state.logined == true){
        // return (<HomeScreen />)
      }
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backgroundImage}>
            <Spinner visible={this.state.visible} overlayColor={"rgba(0,0,0,0.8)"} textContent={strings.signing_in} textStyle={{color: '#fff'}} />
            <Login onLogin={this.onLogin}
               // onResetPassword={onResetPassword}
               // haveResetPassword={false}
               inputStyle={{textAlign: (global.lang == 'ir')?'right':'left'}}
               inputIconStyle={(global.lang == 'ir')?{right: 10}:{left: 10}}
               logoImage={require('./images/logo.png')}/>
            <View style={{flexDirection: 'row', position: 'absolute', top: 20, right: 40}}>
               <Button style={styles.button} onPress={() => this.onUS()}>
                 <Image
                   source={require('./images/us.png')} style={{width: 30, height: 30}} />
               </Button>
               <Button style={styles.button} onPress={() => this.onIran()}>
                 <Image
                   source={require('./images/iran.png')} style={{width: 30, height: 30}} />
               </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
            <Spinner visible={true} overlayColor={"rgba(0,0,0,0.8)"} textContent={strings.loading} textStyle={{color: '#fff'}} />
           );
  }

  async onUS(){
    console.log("onUs");
    DefaultPreference.set('lang', 'en').then(function() {RNRestart.Restart();});
  }

  async onIran(){
    DefaultPreference.set('lang', 'ir').then(function() {RNRestart.Restart();});
    RNRestart.Restart();
  }

  onLogin = (email, password, remembermeChecked) => {

    if(email == ""){
      Toast.show(strings.enter_name);
      return;
    }
    if(password == ""){
      Toast.show(strings.enter_password);
      return;
    }

    this.setState({
      visible: true
    });
    console.log(email, password) // user credentials
    var myRequest = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: email,
        password: password,
        device: '290daj0923',
        deviceType: 'ANDROID'
      })
    };

    console.log(myRequest.body);


    fetch(REQUEST_URL_PHONE, myRequest)
    .then((response) => {
      this.setState({
        // loaded:true,
        visible: false
      });
      if(response.status == 200)
        return response.json()
    })
    .then((responseData) => {
        if(responseData != null){
          this.setState({
            // loaded:true,
            visible: true
          });
          console.log(responseData);
          global.userName = email;
          DefaultPreference.set('userName', email).then(function() {console.log('done')});
          DefaultPreference.set('userId', responseData.userId.toString()).then(function() {console.log('done')});
          DefaultPreference.set('sessionId', responseData.sessionId).then(function() {console.log('done')});
          this.fetchDList(responseData.userId, responseData.sessionId);
          return;
        }else{
          setTimeout(()=>{
            Toast.show('Username or password is incorrect');
          },100)
        }
    })
    .catch((error) => {
          // console.error(error);
    })
    .done();
  }

  fetchDList(userId, sessionId){
     global.userId = userId;
     global.sessionId = sessionId;
     global.navigation = this.props.navigation;
     const { navigate } = global.navigation;
     console.log(userId, sessionId);
     console.log("go home");
      encrypted = base64.encode(userId + ":" + sessionId)
      var myRequest = {
        method: 'GET',
        headers: {
          'Authorization': 'Session ' + encrypted,
          'Accept': 'application/json',
          'Connection': 'close',
        }
      };
      fetch(REQUEST_URL_DEVICES,myRequest)
      .then((response) => response.json())
      .then((responseData) => {
        global.Dlist = responseData;
        console.log(global.Dlist);
        globalThis.setState({
          loaded: true,
          visible: false
        });
        navigate('Home')

      })
      .catch((error) => {
        globalThis.setState({
          loaded: true,
          visible: false
        });
      })
      .done();

      fetch(REQUEST_URL_DEVICE_TYPES)
      .then((response) => response.json())
      .then((responseData) => {
        global.DTypelist = responseData;
        console.log(global.DTypelist);
      })
      .done();
      global.userDetail = {};
      fetch(REQUEST_URL_DETAIL,myRequest)
      .then((response) => response.json())
      .then((responseData) => {
        global.userDetail = responseData;
      })
      .catch((error) => {
      })
      .done();

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundImage: {
    backgroundColor: '#fff',
    flex: 1,
    width: null,
    height: null,
  },
  city: {
    // backgroundColor: '#85C5BD',
    // flex: 1,
    // width: null,
    // height: null,
    resizeMode: 'cover', // or 'stretch'
    alignSelf: 'center',
    position: 'absolute',
    height: 800,
    width: 1600,
    // left: -400,
    bottom: -270
  },
  button: {
    margin: 5,
  }
});

export const koja = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  VehicleList: { screen: VehicleList },
  VehicleHistory: { screen: VehicleHistory },
  ShowOnMap: { screen: ShowOnMap },
});

// AppRegistry.registerComponent('koja', () => koja);


// 'use strict';

// import React from 'react-native';
// import ReactNativeLogin from './components/app';

// var {
//   AppRegistry
// } = React;

// AppRegistry.registerComponent('ReactNativeLogin', () => ReactNativeLogin);
