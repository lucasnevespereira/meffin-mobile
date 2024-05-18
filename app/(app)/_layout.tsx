import {Tabs} from 'expo-router';
import React from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import Colors from "@/constants/Colors";


const AppLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.grey,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({size, color}) => <Ionicons name="wallet" size={size} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({size, color}) => <Ionicons name="person" size={size} color={color}/>,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        borderTopColor: Colors.transparent,
        backgroundColor: Colors.transparent,
        position: "absolute",
        marginBottom: 10,
        marginTop: 5,
        paddingHorizontal: 12,
        paddingTop: 12,
        height: 100,
        marginHorizontal: 35,
        borderTopWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppLayout;
