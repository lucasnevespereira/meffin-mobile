import {Text, SafeAreaView, StyleSheet, View, Image} from "react-native";
import Colors from "@/constants/colors";
import {useOAuth} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";
import SocialBtn from "@/components/ui/buttons/SocialBtn";
import {useTranslation} from "react-i18next";

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
}

const Index = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const {startOAuthFlow: googleAuth} = useOAuth({strategy: Strategy.Google});
    const {startOAuthFlow: appleAuth} = useOAuth({strategy: Strategy.Apple});

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
        }[strategy];

        try {
            const {setActive, createdSessionId, signUp} = await selectedAuth();
            if (createdSessionId) {
                const createdUserId = signUp?.createdUserId;
                await setActive!({session: createdSessionId});
                if (signUp && createdUserId) {
                    console.log('User signed up:', createdUserId)
                    router.navigate('/(auth)/onboarding');
                } else {
                    router.navigate('/(app)/home');
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('@/assets/logo.png')} style={styles.logoImage} />
                <Text style={styles.logoText}>Meffin</Text>
            </View>
            <View style={styles.loginContainer}>
                <SocialBtn iconName={"logo-google"} buttonText={t('login.google')}
                           onPress={() => onSelectAuth(Strategy.Google)}/>
                <SocialBtn iconName={"logo-apple"} buttonText={t('login.apple')}
                           onPress={() => onSelectAuth(Strategy.Apple)}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme.primary,
        padding: 50,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    logoText: {
        fontSize: 32,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    loginContainer: {
        gap: 20,
        padding: 20,
    },
})

export default Index;