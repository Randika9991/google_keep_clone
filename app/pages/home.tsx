import React, {useContext, useState} from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/Colors';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import NoteDetail from "../../components/NoteDetail";
import ImageNoteDetails from "../../components/ImageNoteDetails";
import PhotoCameraComponent from "../../components/imagePhoto/PhotoCameraComponent";
import TakePhoto from "../../components/imagePhoto/TakePhoto"; // Import icons
import { context } from '../context/Provider';

export default function AddNote() {
    const {valueSave} = useContext(context);

    const [search, searchTitle] = useState('');
    const [selectedText, setSelectedText] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);

    const [imageClickTextVisible, setImageClickTextVisible] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [showImageCamara, setShowImageCamara] = useState(false);

    const [ShowPhoto, setShowPhoto] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);

    const actionCamera = () =>{
        setShowPhoto(true);
        setPhotoUri(null);
        // setImageClickTextVisible(true);
    }

    const handleBannerPress = () => {
        setSelectedText(true);
        setDetailVisible(true); // Show the modal when the banner is pressed
    };

    const imageOrCamera = () => {
        setShowImageCamara(true);
    };

    const pictureSet = () => {
        setImage(null);
        setShowImageCamara(false)
        setImageClickTextVisible(true);
        setShowPhoto(false)
    };

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setShowImageCamara(false)
            setImageClickTextVisible(true);
            setPhotoUri(null);
        }
    };

    function handleValueClick(id) {
        console.log(id);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerMain}>
                    <Image
                        style={styles.tinyLogo}
                        source={{ uri: 'https://img.icons8.com/?size=100&id=OTxpMqWbm71F&format=png&color=000000' }}
                    />
                    <TextInput
                        placeholder="Search your notes"
                        value={search}
                        onChangeText={searchTitle}
                        style={styles.searchInput}
                    />
                    <Image
                        style={styles.tinyLogo}
                        source={{ uri: 'https://img.icons8.com/?size=100&id=114442&format=png&color=000000' }}
                    />
                </View>
            </View>
            <ScrollView style={styles.scrollStyle}>
                <View style={styles.notesContainer}>
                    {valueSave && Array.isArray(valueSave) && valueSave.length > 0 ? (
                        valueSave.map((note) => {
                            console.log('Note:', note._id);  // Log the individual note object
                            return (
                                <TouchableOpacity
                                    key={`${note.title}-${note.someOtherProperty}`}
                                    style={styles.noteItem}
                                    onPress={() => handleValueClick(note._id)}
                                >
                                    {(note.image || note.photoUri) && (
                                        <Image source={{ uri: note.image || note.photoUri }} style={styles.image} />
                                    )}
                                    <Text style={styles.showText}>
                                        {note.title}  {/* Render each note's title */}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                    ) : (
                        <Text>No notes available</Text>  // Fallback if valueSave is empty or not an array
                    )}
                </View>
            </ScrollView>


            <View style={styles.content}>
            </View>

            <View style={styles.bottomBarRightSide}>
                <TouchableOpacity onPress={() =>handleBannerPress()}>
                    <Image
                        style={styles.plusLogo}
                        source={{ uri: 'https://img.icons8.com/?size=100&id=62888&format=png&color=000000' }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={() => {/* Handle pencil icon action */}}>
                    <FontAwesome name="pencil" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={imageOrCamera}>
                    <MaterialIcons name="photo" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {selectedText && (
                <NoteDetail
                    visible={detailVisible}
                    onClose={() => setDetailVisible(false)}
                    note={selectedText}  // Pass the selected note
                />
            )}
            <ImageNoteDetails
                visible={imageClickTextVisible}
                onClose={() => setImageClickTextVisible(false)}// Pass the selected note
                image={image}
                photoUri={photoUri}
                setPhotoUri={setPhotoUri}
                setImage={setImage}
                handlePickImage={imageOrCamera}
            />
            <PhotoCameraComponent
                visible={showImageCamara}
                onClose={() => setShowImageCamara(false)}// Pass the selected note
                handlePickImage={handlePickImage}
                actionCamera={actionCamera}
            />
            <TakePhoto
                visible={ShowPhoto}
                onClose={() => setShowPhoto(false)}// Pass the selected note
                photoUri={photoUri}
                setPhotoUri={setPhotoUri}
                handleConfirmPhoto={pictureSet}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.pastelBackgrounds.pastelWhite,
    },
    headerContainer: {
        zIndex: 3,
        height: 80,
        top: 20,
        backgroundColor: Colors.pastelBackgrounds.pastelWhite,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerMain: {
        width: '100%',
        backgroundColor: Colors.pastelBackgrounds.pastelPurple,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 5,
    },
    plusLogo: {
        width: 30,
        height: 30,
    },
    tinyLogo: {
        width: 30,
        height: 30,
        marginRight: 20,
    },
    searchInput: {
        backgroundColor: Colors.pastelBackgrounds.pastelPurple,
        borderRadius: 8,
        padding: 8,
        width: '70%',
    },
    content: {
        marginTop: 18, // Adjust content placement below header
        padding: 20,
    },
    modalText:{
        position: 'absolute',
        top: -5,
        right: 180,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    TakePhotoBar: {
        position: 'absolute',
        bottom: 0,
        top: 15,
        right: 200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    TakeImageBar: {
        position: 'absolute',
        bottom: 0,
        top: 70,
        right: 200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: Colors.pastelBackgrounds.pastelPurple,
        shadowColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderTopWidth: 5,
    },
    bottomBarRightSide: {
        zIndex: 2,
        position: 'absolute',
        borderRadius: 15,
        bottom: 50,
        width: '20%',
        right: 40,
        height: 60,
        backgroundColor: Colors.pastelBackgrounds.pastelGreen,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 5,
    },
    notesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'space-between',
    },
    noteItem: {
        width: '48%', // This ensures two notes per row
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,

    },
    image: {
        width: '100%',
        height: 150,  // Adjust size based on your design
        borderRadius: 8,
        marginBottom: 10,
    },
    scrollStyle: {
        width: '100%',
        height: 150,  // Adjust size based on your design
        borderRadius: 8,
        marginBottom: 10,
    },
    showText:{
        width: '100%', // Adjust size based on your design
        borderRadius: 8,
        marginBottom: 10,
    }
});
