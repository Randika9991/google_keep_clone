import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LodingPage from "../components/pages/loadingPage/LodingPage";
import LoginScreen from "../components/pages/loginScreen/LoginScreen";
import RegisterScreen from "../components/pages/loginScreen/Register";
import home from "../app/pages/home";
import {AudioProvider} from './context/Provider'
import * as Notifications from 'expo-notifications';
import NotificationHandler from "../components/notification/NotificationHandler";


const stack = createNativeStackNavigator()

import '../components/fireBase/firebaseConfig';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function index() {

  return (
      <NavigationContainer independent={true}>
        <NotificationHandler/>
        <AudioProvider>
          <stack.Navigator initialRouteName={'Loding-Page'}>
            <stack.Screen name='Loding-Page' component={LodingPage} options={{ headerShown: false }} />
            <stack.Screen name='Login-Page' component={LoginScreen} options={{ headerShown: false }} />
            <stack.Screen name='home' component={home} options={{ headerShown: false }} />
            <stack.Screen name='RegisterPage' component={RegisterScreen} options={{ headerShown: false }} />
          </stack.Navigator>
        </AudioProvider>
      </NavigationContainer>
  )
}