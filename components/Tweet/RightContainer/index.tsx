import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TweetType } from '../../../types'
import { Ionicons } from "@expo/vector-icons"
import Footer from '../../Footer'

interface RightContainerProps {
    tweet: TweetType
}

const RightContainer = ({ tweet }: RightContainerProps) => {
    return (
        <View style={styles.root}>
            <View style={styles.tweetHeaderContainer}>
                <View style={styles.tweetHeaderNames}>
                    <Text style={styles.name}>{tweet.user.name}</Text>
                    <Text style={styles.username}>@{tweet.user.username}</Text>
                    <Text style={styles.createdAt}>15s</Text>
                </View>
                <View>
                    <Ionicons name="chevron-down" size={15} color="grey" style={styles.moreIcon} />
                </View>
            </View>
            <View>
                <Text style={styles.content}>{tweet.content}</Text>
                {tweet.image && <Image source={{ uri: tweet.image }} style={styles.image} />}
            </View>
            <Footer tweet={tweet} />
        </View>
    )
}

export default RightContainer

const styles = StyleSheet.create({
    root: {

        flex: 1,
        marginHorizontal: 10
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        borderRadius: 12,
        overflow: "hidden",
        marginVertical: 10

    },
    tweetHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    tweetHeaderNames: {
        flexDirection: "row"
    },
    name: {
        marginRight: 5,
        fontWeight: "bold",
    },
    username: {
        marginHorizontal: 5,
        color: "grey"
    },
    createdAt: {
        marginHorizontal: 5
    },
    moreIcon: {

    },
    content: {
        lineHeight: 18,
        marginTop: 5
    }

})
