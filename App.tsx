import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import AppStack from './src/routes/AppStack';
import AppProvider from './src/hooks';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <AppStack />
      <StatusBar barStyle="light-content" />
    </AppProvider>
  );
}