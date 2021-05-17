import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import tweets from '../../data/tweets'
import Tweet from '../Tweet'


const Feed = () => {
    return (
        <View style={styles.feedContainer}>
            <FlatList
                data={tweets}
                renderItem={({ item }) => <Tweet tweet={item} />}
                keyExtractor={(tweet) => tweet.id}
            />
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    feedContainer: {

        width: "100%"
    }
})
