import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function explore() {
    const [title, setTitle] = useState('');
    const [search, searchTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('#FFFFFF');
    const [image, setImage] = useState(null);

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor);
    };

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            // setImage(result.uri);
        }
    };

    const handleSaveNote = () => {
        console.log({ title, content, color, image, search});
        setTitle('');
        setContent('');
        setColor('#FFFFFF');
        setImage(null);

    };

    return (
        <View style={styles.container}>
            {/* Static Header */}
            <View style={styles.headerContainer}>

                <Text style={styles.headerText}>Note</Text>

            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <TextInput
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    style={[styles.input, { backgroundColor: color }]}
                />
                <TextInput
                    placeholder="Note content"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    style={[styles.input, { backgroundColor: color, height: 100 }]}
                />
                <View style={styles.colorPicker}>
                    {['#FFD700', '#FF6347', '#90EE90', '#ADD8E6'].map((c) => (
                        <TouchableOpacity
                            key={c}
                            style={[styles.colorOption, { backgroundColor: c }]}
                            onPress={() => handleColorChange(c)}
                        />
                    ))}
                </View>
                <Button title="Pick an image" onPress={handlePickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Button title="Save Note" onPress={handleSaveNote} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
    },
    tinyLogo: {
        width: 40,
        height: 40,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    searchInput: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 8,
        width: '40%',
    },
    content: {
        marginTop: 120, // to place content below the header
        padding: 20,
    },
    input: {
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        borderRadius: 5,
    },
    colorPicker: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
});
