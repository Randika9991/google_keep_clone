import { auth } from '../../fireBase/firebaseConfig'; // Import your firebaseConfig
// import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Colors } from '../../../constants/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            if (email === '' || password === '') {
                setError('Email and password are required');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address');
                return;
            }
            try {
                // const auth = getAuth();
                await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate('home');

                await AsyncStorage.setItem('user', JSON.stringify({
                    email: userCredential.user.email,
                    loggedIn: true,
                }));

            } catch (err: any){
                switch (err.code) {
                    case 'auth/invalid-email':
                        setError('The email address is not valid. Please check and try again.');
                        break;
                    case 'auth/user-disabled':
                        setError('This account has been disabled. Please contact support.');
                        break;
                    case 'auth/user-not-found':
                        setError('No account found with this email. Please sign up.');
                        break;
                    case 'auth/wrong-password':
                        setError('Incorrect password. Please try again.');
                        break;
                    case 'auth/invalid-credential':
                        setError('Incorrect credential. Please try again.');
                        break;
                    default:
                        setError('Login failed. Please check your credentials.');
                        break;
                }
            }
             // Navigate to the home screen after successful login
        } catch (err: any) {
            // Handle specific Firebase errors
            console.error(err.code); // Log the actual error for debugging purposes
        }
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.header}>
                <Icon name="chevron-left" size={30} color="white" onPress={() => navigation.navigate('RegisterPage')} />
                <Image
                    style={styles.headerImage}
                    source={{
                        uri: 'https://www.google.com/images/icons/product/keep-512.png',
                    }}
                />
            </View>

            <View style={styles.formContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}

                <View style={styles.formFeild}>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Email or phone number"
                        placeholderTextColor="grey"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.formFeild}>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Password"
                        placeholderTextColor="grey"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity
                    style={styles.formButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.formButtonText}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerImage: {
        width: 120,
        height: 50,
        resizeMode: 'contain',
    },
    headerText: {
        color: 'white',
        fontSize: 16,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formFeild: {
        width: '100%',
        height: 50,
        backgroundColor: '#333333',
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 10,
    },
    formInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: 'grey',
    },
    formButton: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.pastelBackgrounds.pastelYellow,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    formButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recoverBtn: {
        marginVertical: 30,
        fontWeight: 'bold',
    },
    guideText: {
        color: 'grey',
        fontSize: 18,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});
