import React, {useState, useEffect, useContext} from 'react';
import {
    Alert,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import DateTimeComponent from "../dateTime/DateTimeComponent";
import PhotoCameraComponent from "./PhotoCameraComponent";
import TakePhoto from "./TakePhoto";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import {context} from "../../app/context/Provider";

const ShowNoteClick = ({ visible, onClose, allValueShow }) => {
    const {handleUpdateNoteProvider,handleDeleteNote,isConnected} = useContext(context);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('#3d4242');
    const [image, setImage] = useState<string | null>(null);
    const [showColorPalette, setShowColorPalette] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [timeDateVisible, setTimeDateVisible] = useState(false);
    const [imageClickTextVisible, setImageClickTextVisible] = useState(false);
    const [showImageCamara, setShowImageCamara] = useState(false);
    const [ShowPhoto, setShowPhoto] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);

    useEffect(() => {
        if (allValueShow && visible) {
            setTitle(allValueShow.title || '');
            setContent(allValueShow.content || '');
            setColor(allValueShow.color || '#FFFFFF');
            setImage(allValueShow.image || null);
            setPhotoUri(allValueShow.photoUri || null);
        }
    }, [allValueShow, visible]);

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor);
        setShowColorPalette(false);
    };

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setShowImageCamara(false);
            setPhotoUri(null);
        }
    };

    const pictureSet = () => {
        setShowImageCamara(false);
        setImageClickTextVisible(true);
        setShowPhoto(false);
        setImage(null);
    };

    const imageOrCamera = () => {
        setShowImageCamara(true);
    };

    const actionCamera = () => {
        setShowPhoto(true);
        setPhotoUri(null);
    };

    const handleSaveNote = async () => {
        if (title.trim() == '') {

        } else {
            if (isConnected) {
                try {
                    const id = allValueShow.id;
                    handleUpdateNoteProvider({id,title, content, color, image, date, photoUri });

                    const dateString = String(date).trim();
                    const now = new Date();
                    if (dateString !== '') {
                        console.log("Current local time:", now.toLocaleString());
                        console.log("Scheduling notification for date:", date.toLocaleString());

                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "⏰ Alarm",
                                body: "Your alarm is ringing!",
                            },
                            trigger: date, // Use the trigger date
                        });
                    }
                    // Reset fields after successful save
                    setTitle('');
                    setContent('');
                    setColor('#F8F8F8');
                    setImage(null);
                    setDate(now);
                    setShowColorPalette(false);
                    setPhotoUri(null)
                    onClose();

                    // Show a success alert (optional)
                } catch (error) {
                    console.error('Error saving note:', error);
                    Alert.alert("Error", "Failed to save the note. Please try again.");
                }
            }
        }
    };

    const handleDeleteNoteAction = (id) => {
        if (isConnected) {
            handleDeleteNote({id});
            onClose();
            setShowColorPalette(false);
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBg} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
                {allValueShow ? (
                    <View style={styles.modal}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Note</Text>
                        </View>

                        <View style={styles.content}>
                            <TextInput
                                placeholder="Title"
                                value={title}
                                onChangeText={setTitle}
                                style={[styles.input, { backgroundColor: color,color:'white' }]}
                            />
                            <TextInput
                                placeholder="Note content"
                                value={content}
                                onChangeText={setContent}
                                multiline
                                style={[styles.input, { backgroundColor: color, height: 100 ,color:'white'}]}
                            />
                            {image  && <Image source={{ uri: image  }} style={styles.image} />}
                            {photoUri  && <Image source={{ uri: photoUri  }} style={styles.image} />}
                        </View>

                        <View style={styles.bottomBar}>
                            <TouchableOpacity onPress={() => setShowColorPalette(!showColorPalette)} style={styles.iconButton}>
                                <MaterialIcons name="palette" size={24} color="black" />
                            </TouchableOpacity>

                            {showColorPalette && (
                                <View style={styles.colorPalette}>
                                    {['#9e6e16', '#6a9e16', '#9e1697', '#16999e'].map((c) => (
                                        <TouchableOpacity
                                            key={c}
                                            style={[styles.colorOption, { backgroundColor: c }]}
                                            onPress={() => handleColorChange(c)}
                                        />
                                    ))}
                                </View>
                            )}

                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
                                <FontAwesome name="bell" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={imageOrCamera}
                                style={styles.iconButton}
                                accessibilityLabel="Pick an image"
                            >
                                <MaterialIcons name="photo" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>handleDeleteNoteAction(allValueShow.id)}  style={styles.iconButton}>
                                <FontAwesome name="trash" size={20} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleSaveNote} style={styles.iconButton}>
                                <FontAwesome name="save" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                        <PhotoCameraComponent
                            visible={showImageCamara}
                            onClose={() => setShowImageCamara(false)}
                            handlePickImage={handlePickImage}
                            actionCamera={actionCamera}
                        />

                        {timeDateVisible && (
                            <DateTimeComponent
                                showDatePicker={showDatePicker}
                                setShowDatePicker={setShowDatePicker}
                                showTimePicker={showTimePicker}
                                setShowTimePicker={setShowTimePicker}
                                date={date}
                                setDate={setDate}
                                setTimeDateVisible={setTimeDateVisible}
                            />
                        )}

                        <TakePhoto
                            visible={ShowPhoto}
                            onClose={() => setShowPhoto(false)}
                            photoUri={photoUri}
                            setPhotoUri={setPhotoUri}
                            handleConfirmPhoto={pictureSet}
                        />
                    </View>
                ) : (
                    <Text>No notes available</Text>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 200,
        backgroundColor: Colors.dark.background,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2000,
        padding: 20,
        flex: 1,
        borderColor: Colors.dark.background2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerContainer: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    input: {
        padding: 8,
        fontSize: 16,
        marginVertical: 5,
        borderColor: Colors.dark.background,
        borderWidth: 1,
        borderRadius: 5,
    },
    contentInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    colorOption: {
        width: 30,
        height: 30,
        borderColor: Colors.dark.background2,
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
        backgroundColor: Colors.dark.background2,
        shadowColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderTopWidth: 2,
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

export default ShowNoteClick;
