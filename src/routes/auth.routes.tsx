import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../Pages/Landing';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import ConfirmEmail from '../Pages/ConfirmEmail';
import Scan from '../Pages/Scan';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} >
                <Screen name="Landing" component={Landing} />
                <Screen name="SignIn" component={SignIn} />
                <Screen name="SignUp" component={SignUp} />
                <Screen name="ConfirmEmail" component={ConfirmEmail} options={{ gestureEnabled: false }} />
                <Screen name="Scan" component={Scan} />
            </Navigator>
        </NavigationContainer>
    )
};

export default AppStack;