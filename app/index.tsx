import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LodingPage from "../components/pages/loadingPage/LodingPage";
import LoginScreen from "../components/pages/loginScreen/LoginScreen";
import home from "../app/pages/home";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import NotificationHandler from '../components/notification/NotificationHandler'; // Adjust path as needed

const stack = createNativeStackNavigator()

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
        <stack.Navigator initialRouteName="Loding-Page">
          <stack.Screen name='Loding-page' component={LodingPage} options={{
            headerShown: false,
          }} />
          <stack.Screen name='Login-Page' component={LoginScreen} options={{
            headerShown: false,
          }} />
          <stack.Screen name='home' component={home} options={{
            headerShown: false,
          }} />
        </stack.Navigator>
      </NavigationContainer>
  )
}


//add font style in this code use anywhere add style inside
// style={{fontFamily: 'GloriaHallelujah'}}

// const [fontsLoaded] = useFonts({
//     'GloriaHallelujah': require('../assets/fonts/GloriaHallelujah-Regular.ttf')
// });
//
// useEffect(() => {
//     async function prepare() {
//         if (!fontsLoaded) {
//             await SplashScreen.preventAutoHideAsync();
//         } else {
//             await SplashScreen.hideAsync();
//         }
//     }
//     prepare();
// }, [fontsLoaded]);
//
// if (!fontsLoaded) return null;
// Renders nothing until the font is loaded
