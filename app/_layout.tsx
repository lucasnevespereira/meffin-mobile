import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {Slot, useRouter} from 'expo-router';
import {ClerkProvider, useAuth} from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import i18n from '@/i18n';
import {I18nextProvider} from 'react-i18next';


const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }


    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
            <I18nextProvider i18n={i18n}>
                <App/>
            </I18nextProvider>
        </ClerkProvider>

    );
}

const App = () => {
    const router = useRouter()
    const {isLoaded, isSignedIn} = useAuth();
    // TODO get user currency metadata
    useEffect(() => {
        // TODO: add condition if user does not have currency
        if (isLoaded && !isSignedIn) {
            router.navigate('/(auth)');
        } else if (isLoaded && isSignedIn) {
            router.navigate('/(app)/home');
        }
    }, [isLoaded]);
    return (
        <Slot/>
    )
}

export default RootLayout;
