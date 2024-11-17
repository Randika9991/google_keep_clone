import React, { useRef, useState, useEffect } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from 'expo-camera/legacy';

const TakePhoto = ({ visible, onClose,photoUri,setPhotoUri,handleConfirmPhoto, }) => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);

    useEffect(() => {
        if (visible && !permission?.granted) {
            requestCameraPermission();
        }
    }, [visible]);

    const requestCameraPermission = async () => {
        const { status } = await requestPermission();
        if (status !== 'granted') {
            Alert.alert(
                "Permission Required",
                "This app needs camera access to take photos.",
                [{ text: 'OK', onPress: handleClose }]
            );
        }
    };

    // const handleConfirmPhoto = () => {
    //     // Action for confirming the photo
    //     Alert.alert("Photo confirmed!", "The photo has been saved.");
    //      handleClose;
    // };

    function toggleCameraType() {
        setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function takePicture() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);
        }
    }

    const handleRetakePhoto = () => {
        setPhotoUri(null);
    };

    const handleClose = () => {
        setPhotoUri(null);
        onClose();
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
        >
            <View style={styles.modalBg}>
                <View style={styles.container}>
                    {permission?.granted ? (
                        <Camera ref={cameraRef} style={styles.camera} type={type}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                    <Text style={styles.text}>Flip Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={takePicture}>
                                    <Text style={styles.text}>photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleClose}>
                                    <Text style={styles.text}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    ) : (
                        <Text style={styles.permissionText}>Camera permission required</Text>
                    )}
                    {photoUri &&
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: photoUri }} style={styles.previewImage} />
                        <View style={styles.previewButtons}>
                            <TouchableOpacity style={styles.button} onPress={handleConfirmPhoto}>
                                <Text style={styles.text}>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: 36,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    previewContainer: {
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '80%',
        height: '80%',
    },
    previewImage:{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '80%',
        height: '80%',
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
    },
    permissionText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    }
});

export default TakePhoto;
