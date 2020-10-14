import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductProvider } from '../hooks/product';

import Home from '../Pages/Home';
import Exclusive from '../Pages/Exclusive';
import Videos from '../Pages/Videos';
import Profile from '../Pages/Profile';
import EditProfile from '../Pages/EditProfile';
import Notifications from '../Pages/Notifications';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
    return (
        <NavigationContainer>
            <ProductProvider>
                <Navigator screenOptions={{ headerShown: false }} >
                    <Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
                    <Screen name="Exclusive" component={Exclusive} />
                    <Screen name="Videos" component={Videos} />
                    <Screen name="Profile" component={Profile} />
                    <Screen name="EditProfile" component={EditProfile} />
                    <Screen name="Notifications" component={Notifications} />
                </Navigator>
            </ProductProvider>
        </NavigationContainer>
    )
};

export default AppStack;