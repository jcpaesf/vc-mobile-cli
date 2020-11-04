import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import AppStack from './src/routes/AppStack';
import AppProvider from './src/hooks';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';

export default function App() {
  useEffect(() => {
    OneSignal.init('adba5911-2086-4094-aae4-17738e235819');
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    SplashScreen.hide();

    return () => { OneSignal.removeEventListener('opened', onOpened); }
  }, []);

  function onOpened(result: any) {
    console.log(result);
  }

  function onIds(device: any) {
    console.log(device);
  }

  return (
    <AppProvider>
      <AppStack />
      <StatusBar barStyle="light-content" />
    </AppProvider>
  );
}