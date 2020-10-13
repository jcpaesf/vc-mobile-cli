import React from 'react';
import { StatusBar } from 'react-native';

import AppStack from './src/routes/AppStack';
import AppProvider from './src/hooks';

export default function App() {
  return (
    <AppProvider>
      <AppStack />
      <StatusBar barStyle="light-content" />
    </AppProvider>
  );
}