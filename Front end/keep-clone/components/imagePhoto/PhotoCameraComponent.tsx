import React, { useEffect } from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {MaterialIcons} from "@expo/vector-icons";

const PhotoCameraComponent = ({ visible, onClose,handlePickImage,actionCamera}) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBg} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                <Text style={styles.modalHeaderText}>Add Image</Text>

                <TouchableOpacity style={styles.actionButton} onPress={handlePickImage}>
                    <MaterialIcons name="photo" size={24} color="black" />
                    <Text style={styles.textModal}>Choose image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={actionCamera}>
                    <MaterialIcons name="camera-alt" size={24} color="black" />
                    <Text style={styles.textModal}>Take Photo</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        position: 'absolute',
        bottom: '30%',
        left: '10%',
        right: '10%',
        backgroundColor: Colors.pastelBackgrounds.pastelPurple,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center', // Center items horizontally
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        borderWidth: 5,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '90%',
        backgroundColor: Colors.pastelBackgrounds.pastelGreen,
        borderRadius: 10,
        marginBottom: 10,
    },
    textModal: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black',
    },
});

export default PhotoCameraComponent;

