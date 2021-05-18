import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfilePicture from '../components/ProfilePicture';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createTweet } from '../graphql/mutations';

const NewTweetScreen = () => {
    const navigation = useNavigation();

    const [tweet, setTweet] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");

    const onPostTweet = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const newTweet = {
                title: tweet,
                image: imageUrl,
                userID: currentUser.attributes.sub
            }
            await API.graphql(graphqlOperation(createTweet, { input: newTweet }))

        } catch (error) {
            console.log(error);

        } finally {
            navigation.goBack();
        }
    }


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
                    <TextInput style={styles.imageInput} placeholder={"Image Url(optional)d"} value={imageUrl} onChangeText={(val) => setImageUrl(val)} />
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
