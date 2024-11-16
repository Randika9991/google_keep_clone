import React, { useState } from 'react';
import {Modal, View, TouchableWithoutFeedback, StyleSheet, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Colors} from "../../constants/Colors";


const DateTimeComponent = ({ visible, showDatePicker,setShowDatePicker,setShowTimePicker, showTimePicker, onClose,date,setDate,setTimeDateVisible }) => {
    const onDateChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setDate(selectedDate);

            setShowDatePicker(false);
            setShowTimePicker(true);
        } else {
            setShowDatePicker(false);
        }
    };

    const onTimeChange = async (event, selectedTime) => {
        if (event.type === 'set' && selectedTime) {
            const newDate = new Date(date);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setDate(newDate);
            setShowTimePicker(false);
            setTimeDateVisible(false);
            const now = new Date();
            if (newDate <= now) {
                Alert.alert("Invalid time", "Please select a time in the future.");
                return;
            }
            Alert.alert("Alarm Set", `Alarm set for ${newDate.toLocaleString()}`);
        } else {
            setShowTimePicker(false);
        }
    };

    return (
        <View>
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
        </View>
    );
};


const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 200,
        backgroundColor: Colors.pastelBackgrounds.pastelWhite,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2000,
        padding: 20,
        flex: 1,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
    },
    headerContainer: {
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingTop: 10,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
        padding: 8,
        fontSize: 16,
        marginVertical: 5,
        borderColor: Colors.dark.background,
        borderWidth: 1,
        borderRadius: 5,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 10,
    },
    iconButton: {
        padding: 10,
        marginHorizontal: 8,
    },
    image: {
        width: '100%',
        height: '50%',
        marginVertical: 5,
        borderRadius: 5,
        borderColor: Colors.dark.background,
        borderWidth: 1,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 48,
        backgroundColor: Colors.pastelBackgrounds.pastelPurple,
        shadowColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderTopWidth: 5,
    },
    colorPalette: {
        flexDirection: 'row',
        padding: 4,
        right: 5,

        justifyContent: 'space-evenly',
        borderRadius: 20,

        borderColor:Colors.pastelBackgrounds.pastelGreen,

    },
});

export default DateTimeComponent;
