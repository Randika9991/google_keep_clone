// NotificationHandler.js
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const NotificationHandler = () => {
    useEffect(() => {
        // Request permissions for notifications
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission for notifications is not granted!');
            }
        })();

        // Set up notification received listener
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification received:", notification);
        });

        // Clean up listener on unmount
        return () => {
            notificationListener.remove();
        };
    }, []);

    return null; // This component does not render anything
};

export default NotificationHandler;
