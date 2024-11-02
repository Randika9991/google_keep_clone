import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LodingPage from "../components/pages/loadingPage/LodingPage";
import LoginScreen from "../components/pages/loginScreen/LoginScreen";
import home from "../app/pages/home";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {AudioProvider} from './context/Provider'


import * as Notifications from 'expo-notifications';
import NotificationHandler from "../components/notification/NotificationHandler";

const stack = createNativeStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function index() {

  const [fontsLoaded] = useFonts({
    'GloriaHallelujah': require('../assets/fonts/GloriaHallelujah-Regular.ttf')
  });

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync();
      } else {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
      <NavigationContainer independent={true}>

        <NotificationHandler />
        <AudioProvider>
        <stack.Navigator initialRouteName="Loding-Page">
          <stack.Screen name='Loding-page' component={LodingPage} options={{
            headerShown: false,
          }}/>
          <stack.Screen name='Login-Page' component={LoginScreen} options={{
            headerShown: false,
          }}/>
          <stack.Screen name='home' component={home} options={{
            headerShown: false,
          }}/>
        </stack.Navigator>
        </AudioProvider>
      </NavigationContainer>
  )
}