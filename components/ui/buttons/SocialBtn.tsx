import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

interface SocialBtnProps {
    iconName: keyof typeof Ionicons.glyphMap;
    buttonText: string;
    onPress: () => void;
}

const SocialBtn = ({iconName, buttonText, onPress}: SocialBtnProps) => {
    return (
        <TouchableOpacity style={styles.btnOutline} onPress={onPress}>
            <Ionicons name={iconName} size={24} style={styles.btnIcon}/>
            <Text style={styles.btnOutlineText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnOutline: {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: Colors.dark,
        fontSize: 16,
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
})


export default SocialBtn;