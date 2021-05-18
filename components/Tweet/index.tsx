import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import { TweetType } from "../../types";

interface TweetProps {
    tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {

    return (
        <View style={styles.root}>
            <LeftContainer user={tweet.user} style={styles.left} />
            <RightContainer tweet={tweet} style={styles.right} />
        </View>
    )
}

export default Tweet

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        width: "100%",
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: "lightgrey"
    },
    left: {

    },
    right: {

    }
})
