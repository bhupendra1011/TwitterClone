import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const NewTweetButton = () => {
    const onPress = () => {
        console.warn("tweet created")
    }
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={.8}>
            <MaterialCommunityIcons name="feather" size={28} color="white" />
        </TouchableOpacity>
    )
}

export default NewTweetButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.tint,
        position: "absolute",
        bottom: 20,
        right: 20,
        padding: 8,
        borderRadius: 50
    }
})
