import React, { createContext, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import axios from "axios";
import NetInfo from "@react-native-community/netinfo"; // Import NetInfo

export const context = createContext();

export const AudioProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [valueSave, setValueSave] = useState([]);
    const [isConnected, setIsConnected] = useState(true); // Track the internet connection status

    // Check internet connection on mount
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected); // Update connection status
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    const handleSaveNoteProvider = async ({ title, content, color, image, date, photoUri }) => {
        if (!isConnected) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            return;
        }

        const noteData = {
            title: title.trim(),
            content: content.trim(),
            color: color,
            image: image,
            date: date,
            photoUri: photoUri,
            completed: false
        };

        try {
            const response = await axios.post('http://192.168.8.136:3000/api/notes', noteData);
            console.log('Note saved:', response.data);
            getNotes();
        } catch (error) {
            console.error('Error saving note:', error);
            Alert.alert('Error', 'There was an issue saving the note.');
        }
    };

    const handleUpdateNoteProvider = async ({ id, title, content, color, image, date, photoUri }) => {
        if (!isConnected) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            return;
        }

        const noteData = {
            title: title.trim(),
            content: content.trim(),
            color: color,
            image: image,
            date: date,
            photoUri: photoUri,
            completed: false,
        };

        try {
            if (!id) {
                console.error("Note id is required for updating.");
                return;
            }
            const url = `http://192.168.8.136:3000/api/notes/${id}`;
            const response = await axios.put(url, noteData);
            console.log('Note updated:', response.data);
            getNotes();
        } catch (error) {
            console.error('Error updating note:', error);
            Alert.alert('Error', 'There was an issue updating the note.');
        }
    };

    const getNotes = async () => {
        if (!isConnected) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            return;
        }

        try {
            const response = await axios.get('http://192.168.8.136:3000/api/notes');
            setValueSave(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
            Alert.alert('Error', 'There was an issue fetching the notes.');
        }
    };

    const handleDeleteNote = async ({id}) => {
        // Alert.alert("Success", id);
        if (!isConnected) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            return;
        }

        try {
            // Make a DELETE request to delete the specific note by ID
            const url = `http://192.168.8.136:3000/api/notes/${id}`;
            await axios.delete(url);

            console.log('Note deleted:', id);

            // Optionally, refresh the notes list after deleting
            getNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
            Alert.alert('Error', 'There was an issue deleting the note.');
        }
    };


    useEffect(() => {
        getNotes();
    }, [isConnected]); // Trigger `getNotes` when connection status changes

    return (
        <context.Provider value={{title, setTitle, handleSaveNoteProvider, valueSave, handleUpdateNoteProvider, isConnected,handleDeleteNote }}>
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
