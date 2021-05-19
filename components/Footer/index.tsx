import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo, EvilIcons, Feather } from "@expo/vector-icons"


import { Auth, API, graphqlOperation } from "aws-amplify"

import { TweetType } from "../../types"
import tweets from '../../data/tweets'
import { createLike, deleteLike } from '../../graphql/mutations'

interface FooterContainerProps {
    tweet: TweetType
}

const Footer = ({ tweet }: FooterContainerProps) => {

    const [user, setUser] = React.useState(null);
    const [myLike, setMyLike] = React.useState(null);
    const [likesCount, setLikesCount] = React.useState(tweet.likes.items.length)
    React.useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setUser(currentUser)
            const searchLike = tweet.likes.items.find(like => like.userID === currentUser.attributes.sub);
            setMyLike(searchLike)
        }
        fetchUser();
    }, [])

    const handleLike = async () => {
        try {
            const like = {
                userID: user.attributes.sub,
                tweetID: tweet.id
            }
            const res = await API.graphql(graphqlOperation(createLike, { input: like }));
            setMyLike(res.data.createLike)
            setLikesCount(prev => prev + 1)

        } catch (error) {
            console.log(error);

        }
    }

    const handleNotLike = async () => {
        try {
            await API.graphql(graphqlOperation(deleteLike, { input: { id: myLike.id } }));
            setMyLike(null);
            setLikesCount(prev => prev - 1)

        } catch (error) {
            console.log(error);


        }
    }

    const onLike = async () => {
        if (!user) return;
        if (!myLike) { await handleLike(); }
        else {
            await handleNotLike();

        }
    }

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
                <TouchableOpacity onPress={onLike}>
                    <AntDesign name={myLike ? "heart" : "hearto"} color={myLike ? "red" : "grey"} size={20} />
                </TouchableOpacity>
                <Text style={styles.number}>{likesCount}</Text>
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
