import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import AppStack from './src/routes/AppStack';
import AppProvider from './src/hooks';
import Firebase from '@react-native-firebase/app';
import firebaseConfig from './google-services.json';

export default function App() {
  useEffect(() => {
    !Firebase.apps.length ? Firebase.initializeApp(firebaseConfig) : Firebase.app();
  }, []);

  return (
    <AppProvider>
      <AppStack />
      <StatusBar barStyle="light-content" />
    </AppProvider>
  );
}