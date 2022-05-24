/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {koja} from './app/app.js'

const GoogleAPIAvailability = require('react-native-google-api-availability-bridge');
GoogleAPIAvailability.checkGooglePlayServices((result) => {
  if(result === 'update') {
    GoogleAPIAvailability.promptGooglePlayUpdate(false);
  }
});

AppRegistry.registerComponent('koja', () => koja);
