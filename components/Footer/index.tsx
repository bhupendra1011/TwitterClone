import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign, Entypo, EvilIcons, Feather } from "@expo/vector-icons"
import { TweetType } from "../../types"
import tweets from '../../data/tweets'

interface FooterContainerProps {
    tweet: TweetType
}

const Footer = ({ tweet }: FooterContainerProps) => {
    return (
        <View style={styles.root}>
            <View style={styles.iconContainer}>
                <Feather name="message-circle" color="grey" size={20} />
                <Text style={styles.number}>{tweet.numberOfComments}</Text>
            </View>
            <View style={styles.iconContainer}>
                <EvilIcons name="retweet" color="grey" size={30} />
                <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
            </View>
            <View style={styles.iconContainer}>
                <AntDesign name="hearto" color="grey" size={20} />
                <Text style={styles.number}>{tweet.numberOfLikes}</Text>
            </View>
            <View style={styles.iconContainer}>
                <EvilIcons name="share-google" color="grey" size={28} />
            </View>

        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    number: {
        color: "grey",
        marginLeft: 10

    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})
