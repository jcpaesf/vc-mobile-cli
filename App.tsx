import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import AppStack from './src/routes/AppStack';
import AppProvider from './src/hooks';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  useEffect(() => {
    OneSignal.init('9e333e86-9a73-4b4a-ae3b-7becc107aebe');

    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    SplashScreen.hide();

    return () => {
      OneSignal.removeEventListener('opened', onOpened);
    };
  }, []);

  function onOpened(result: any) {
    console.log(result);
  }

  async function onIds(device: any) {
    await AsyncStorage.setItem('@VsConnect:tokenDevice', device.userId);
  }

  return (
    <AppProvider>
      <AppStack />
      <StatusBar barStyle="light-content" />
    </AppProvider>
  );
}
