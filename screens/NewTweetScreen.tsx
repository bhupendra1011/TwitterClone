import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Image, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfilePicture from '../components/ProfilePicture';
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createTweet } from '../graphql/mutations';


const NewTweetScreen = () => {
    const navigation = useNavigation();

    const [tweet, setTweet] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState('');


    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImageUrl(result.uri);
        }
    }

    const uploadImage = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const urlParts = imageUrl.split('.');
            const extension = urlParts[urlParts.length - 1]
            const key = `${uuidv4()}.${extension}`
            debugger;
            console.log(key);
            await Storage.put(key, blob);
            return key

        } catch (error) {
            console.log(error);

        }
        return '';
    }



    const onPostTweet = async () => {
        let image;
        if (!!imageUrl) {
            image = await uploadImage();
        }

        try {
            const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const newTweet = {
                title: tweet,
                image: image,
                userID: currentUser.attributes.sub
            }
            await API.graphql(graphqlOperation(createTweet, { input: newTweet }))
            navigation.goBack();

        } catch (error) {
            console.log(error);

        }
    }

    React.useEffect(() => {
        getPermissionAsync();
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={24} color={Colors.light.tint} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onPostTweet}>
                    <Text style={styles.buttonText}> Tweet</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.newTweetContainer}>
                <ProfilePicture image={"https://pbs.twimg.com/profile_images/1383042648550739968/fS6W0TvY_200x200.jpg"} size={30} />
                <View style={styles.inputsContainer}>
                    <TextInput numberOfLines={3} multiline={true} style={styles.tweetInput} placeholder={"What's happening"} onChangeText={(val) => setTweet(val)} value={tweet} />
                    <Button title="Upload Photo " onPress={pickImage} />
                    {!!imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NewTweetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: "white",
        padding: 15
    },
    headerContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 30
    },
    buttonText: {
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: "bold",
        fontSize: 16
    },
    newTweetContainer: {
        flexDirection: "row",

        padding: 15

    },
    inputsContainer: {

    },
    tweetInput: {
        height: 100,
        maxHeight: 300,
        fontSize: 18

    },
    imageInput: {


    }
})
