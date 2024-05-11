import {Tabs} from 'expo-router';
import React from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";


const AppLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({size, color}) => <Ionicons name="home" size={size} color={color}/>,
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

export default AppLayout;
