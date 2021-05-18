import React from 'react'
import { StyleSheet, Image } from 'react-native'

interface ProfilePictureProps {
    image?: string,
    size?: number,
}

const ProfilePicture = ({ image, size = 20 }: ProfilePictureProps) => {
    return (
        <Image source={{ uri: image || '' }} style={{ width: size, height: size, borderRadius: size }} />
    )
}

export default ProfilePicture

const styles = StyleSheet.create({})
