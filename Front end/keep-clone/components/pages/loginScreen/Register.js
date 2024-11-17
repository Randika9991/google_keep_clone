// Register.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text,StyleSheet,TouchableOpacity,Pressable } from 'react-native';
import { auth } from '../../fireBase/firebaseConfig';
import Icon from 'react-native-vector-icons/Feather';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Colors} from "../../../constants/Colors";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');
        if (email.trim() === '' || password.trim() === '') {
            setError('Email and password cannot be empty.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Registration Successful');
            navigation.navigate('Login-Page');
        } catch (error) {
            // console.log(error);
            alert(error);
        }
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.header}>
                <Icon name="chevron-left" size={30} color="white" onPress={() => navigation.navigate('Login-Page')} />
                <Text style={styles.headerText}>Login</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.formField}>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Email"
                        placeholderTextColor="grey"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.formField}>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Password"
                        placeholderTextColor="grey"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.formButton} onPress={handleRegister}>
                    <Text style={styles.formButtonText}>REGISTER</Text>
                </TouchableOpacity>

                <Pressable style={styles.recoverBtn} onPress={() => navigation.navigate('Login-Page')}>
                    <Text style={styles.headerText}>Already have an account? Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formField: {
        width: '100%',
        height: 50,
        backgroundColor: '#333333',
        borderRadius: 5,
        marginBottom: 10,
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
        marginVertical: 20,
    },
});
