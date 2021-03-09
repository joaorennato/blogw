import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Single from '../screens/Single';

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Single" component={Single} />
        </Stack.Navigator>
    );
}