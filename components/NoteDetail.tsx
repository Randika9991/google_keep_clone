import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const AlarmSetter = () => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [alarmSet, setAlarmSet] = useState(false);

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const newDate = new Date(date);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setDate(newDate);
        }
    };

    const scheduleAlarm = async () => {
        const now = new Date();
        if (date <= now) {
            Alert.alert("Error", "Please select a future date and time.");
            return;
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "⏰ Alarm",
                body: "Your alarm is ringing!",
            },
            trigger: date, // Schedule for the specified date
        });

        setAlarmSet(true);
        Alert.alert("Alarm Set", `Alarm set for ${date.toLocaleString()}`);
    };

    return (
        <View style={styles.container}>
            <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
            <Button title="Select Time" onPress={() => setShowTimePicker(true)} />

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
            {showTimePicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                />
            )}

            <Text style={styles.selectedDateText}>
                Selected Date and Time: {date.toLocaleString()}
            </Text>

            <Button title="Set Alarm" onPress={scheduleAlarm} />

            {alarmSet && (
                <Text style={styles.alarmSetText}>
                    Alarm set for: {date.toLocaleString()}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    selectedDateText: {
        fontSize: 16,
        marginVertical: 20,
        textAlign: 'center',
    },
    alarmSetText: {
        fontSize: 16,
        color: 'green',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default AlarmSetter;
