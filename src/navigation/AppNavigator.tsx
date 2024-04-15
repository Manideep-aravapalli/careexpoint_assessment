import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddNewUserScreen from '../screens/AddNewUserScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddNewUserScreen" component={AddNewUserScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
