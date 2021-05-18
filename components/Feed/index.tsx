import React from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'

import Tweet from '../Tweet'


import { API, graphqlOperation } from "aws-amplify"
import { listTweets } from '../../graphql/queries'
// import tweets from '../../data/tweets'



const Feed = () => {

    const [tweets, setTweets] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    const fetchTweets = async () => {
        setLoading(true)
        try {
            const res = await API.graphql(graphqlOperation(listTweets));
            console.log(res)
            setTweets(res.data.listTweets.items);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }

    React.useEffect(() => {
        fetchTweets();
    }, [])

    return (
        <View style={styles.feedContainer}>
            <FlatList
                refreshing={loading}
                onRefresh={fetchTweets}
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
