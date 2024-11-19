import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAudioForNextOpening = async (audio, index ,newSound) => {
    try {
        await AsyncStorage.setItem('previousAudio', JSON.stringify({ audio, index,newSound }));
    } catch (error) {
        console.log("Error storing audio for next opening", error);
    }
};


