import { StyleSheet, Text, View } from 'react-native'
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

import { auth } from '../components/fireBase/firebaseConfig'; // Import your Firebase config
import { onAuthStateChanged } from 'firebase/auth';

const stack = createNativeStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function index() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is logged out
      }
    });

    // Cleanup listener
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    // Optionally, show a loading screen while the auth state is being determined
    return <LodingPage />;
  }

  return (
      <NavigationContainer independent={true}>
        <NotificationHandler />
        <AudioProvider>
          <stack.Navigator initialRouteName={isAuthenticated ? 'home' : 'Loding-Page'}>
            <stack.Screen name='Loding-Page' component={LodingPage} options={{ headerShown: false }} />
            <stack.Screen name='Login-Page' component={LoginScreen} options={{ headerShown: false }} />
            <stack.Screen name='home' component={home} options={{ headerShown: false }} />
            <stack.Screen name='RegisterPage' component={RegisterScreen} options={{ headerShown: false }} />
          </stack.Navigator>
        </AudioProvider>
      </NavigationContainer>
  )
}