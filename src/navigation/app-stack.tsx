import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash';
import { HOME, SPLASH } from '../constants/constants';
import HomeScreen from '../screens/home';

const AppStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={SPLASH}
                screenOptions={{
                    headerShown: false,
                }}
                >
                <Stack.Screen name={SPLASH} options={{ headerShown: false }}>
                    {(props) => <SplashScreen />}
                </Stack.Screen>
                <Stack.Screen name={HOME} options={{ headerShown: false }}>
                    {(props) => <HomeScreen/>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    )
}
export default AppStack