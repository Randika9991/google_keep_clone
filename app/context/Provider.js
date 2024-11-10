import React, { createContext, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import axios from "axios";

export const context = createContext();

export const AudioProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [valueSave, setValueSave] = useState([]);

    const handleSaveNoteProvider = async ({ title, content, color, image, date, photoUri }) => {
        const noteData = {
            title: title.trim(),
            content: content.trim(),
            color: color,
            image: image,
            date: date,
            photoUri: photoUri,
            completed: false
        };
        // Use your local IP address instead of 'localhost'
        const response = await axios.post('http://192.168.8.136:3000/api/notes', noteData);
        console.log('Note saved:', response.data);
        getNotes();
    };

    const getNotes = async () => {
        try {
            const response = await axios.get('http://192.168.8.136:3000/api/notes');
            setValueSave(response.data); // Set the notes state with the fetched data
        } catch (error) {
            console.error('Error fetching notes:', error);
            Alert.alert('Error', 'There was an issue fetching the notes.');
        }
    };

    // Fetch notes when the component mounts
    useEffect(() => {
        getNotes();
    }, []);

    return (
        <context.Provider value={{title, setTitle,handleSaveNoteProvider,valueSave}}>
            {children}
        </context.Provider>
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