import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserType } from "../../../types";
import ProfilePicture from '../../ProfilePicture';

interface LeftContainerProps {
    user: UserType
}

const LeftContainer = ({ user }: LeftContainerProps) => {
    return (
        <View>
            <ProfilePicture image={user.image} size={40} />
        </View>
    )
}

export default LeftContainer

const styles = StyleSheet.create({})
