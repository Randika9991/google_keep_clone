import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { auth } from '../../fireBase/firebaseConfig'; // Import your firebase config

import {getAuth, onAuthStateChanged } from 'firebase/auth';

const LodingPage = ({ navigation }: { navigation: any }) => {
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is signed in:', user);
                navigation.replace('Home'); // Replace 'Home' with your main screen route
            } else {
                console.log('No user is signed in');
                navigation.replace('Login-Page'); // Replace 'Login-Page' with your login screen route
            }
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, [navigation]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000000',
            }}
        >
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://www.google.com/images/icons/product/keep-512.png',
                }}
            />
        </View>
    );
};

export default LodingPage;

const styles = StyleSheet.create({
    nametext: {
        fontSize: 32,
        color: 'red',
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    tinyLogo: {
        width: 150,
        height: 150,
        margin: 20,
    },
});
