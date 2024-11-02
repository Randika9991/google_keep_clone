// NotificationHandler.js
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import {Alert} from "react-native";

const NotificationHandler = () => {
    useEffect(() => {
        // Request permissions for notifications
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Enable notifications in settings');
            } else {
                console.log('Notification permission granted:', status);
            }
        })();

        // Set up notification received listener
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification received:", notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notification response:", response);
        });

        // Clean up listener on unmount
        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);

    return null; // This component does not render anything
};

export default NotificationHandler;
