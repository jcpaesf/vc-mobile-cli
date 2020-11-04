import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

import AppStack from './src/routes/AppStack';
import AppProvider from './src/hooks';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';

export default function App() {
  useEffect(() => {
    (Platform.OS === "android") ? OneSignal.init('adba5911-2086-4094-aae4-17738e235819') : OneSignal.init('56a250fe-8fd9-4ad2-a71f-eeb7f2dd7606');
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