import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';

import { AuthContext } from '../context/AuthContext';
import MovieDetails from '../screens/Movie/MovieDetails';
import SearchScreen from '../screens/Search/SearchScreen';

const Stack = createNativeStackNavigator();

const Navigation = (props) => {

    const { userInfo } = useContext(AuthContext);


    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    userInfo.token
                        ?
                        <>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="MovieDetails"
                                component={MovieDetails}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SearchScreen"
                                component={SearchScreen}
                                options={{ headerShown: false }}
                            />

                        </>
                        :
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />

                }
            </Stack.Navigator>
        </NavigationContainer>
    )

};

export default Navigation;
