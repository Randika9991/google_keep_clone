import React, { createContext, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [title, setTitle] = useState('');

    return (
        <AudioContext.Provider value={{title, setTitle}}>
            {children}
        </AudioContext.Provider>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        padding: 20,
    },
});